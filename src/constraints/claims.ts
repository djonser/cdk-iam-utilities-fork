import { Annotations } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ClaimsUtility } from '../claims';
import { GlobalConditionKey, AwsRequestTagConditionKey } from '../condition-keys';
import { ConditionOperator } from '../condition-operator';
import { Constraint, ConstraintAssembleContext, ConstraintPolicyMutation, ConstraintPolicyMutationType } from '../constraint';
import { ConditionKey } from '../keys';
import { PolicyVariable } from '../policy-variable';

export abstract class ClaimConstraint extends Constraint {

  protected constructor(public readonly operator: ConditionOperator, public readonly claim: string, public readonly values: string[]) {
    super();
  }

  // @ts-ignore
  assemble(scope: Construct, context: ConstraintAssembleContext): ConstraintPolicyMutation[] {

    if (!context.claimsContext) {
      throw new Error('Cannot create condition without providing a claimsContext');
    }

    const {
      knownClaims,
    } = context.claimsContext;

    let conditionKey: ConditionKey;
    const tagName = ClaimsUtility.forContext(context.claimsContext).tagName(scope, this.claim);

    if (knownClaims.length > 0 && !knownClaims.includes(this.claim)) {
      Annotations.of(scope).addError(`"${this.claim}" is not among known claims`);
    }

    if (knownClaims.length > 0 && knownClaims.includes(tagName) && this.claim !== tagName) {
      Annotations.of(scope).addError(`"${this.claim} cannot be mapped to a tag name corresponding with name of a different known claim`);
    }

    if (context.policyType.principalType?.isFederated) {
      conditionKey = GlobalConditionKey.requestTag(tagName);
    } else {
      conditionKey = GlobalConditionKey.principalTag(tagName);
    }


    return [{
      type: ConstraintPolicyMutationType.CONDITION,
      key: conditionKey,
      operator: this.operator,
      value: this.values,
    }];
  }
}


export interface PassClaimsConstraintSettings {
  readonly claims: { [key: string]: string };
  readonly allowAnyTags: boolean;
  readonly specificallyAllowedTags?: string[];
}

export class PassClaimsConstraint extends Constraint {

  static create(claims: PassClaimsConstraintSettings): PassClaimsConstraint {
    return new PassClaimsConstraint(claims);
  }


  private constructor(public readonly settings: PassClaimsConstraintSettings) {
    super();
  }

  // @ts-ignore
  assemble(scope: Construct, context: ConstraintAssembleContext): ConstraintPolicyMutation[] {

    const claims = Object.keys(this.settings.claims);

    if (claims.length === 0) {
      Annotations.of(scope).addError('Define at least a single claim when using the PassedClaimConstraint');
    }

    if (context.policyType.principalType?.isFederated) {
      Annotations.of(scope).addError('Cannot use PassedClaimConstraint on federated principals');
    }

    const claimsContext = context.claimsContext;

    if (!claimsContext) {
      throw new Error('Cannot create condition without providing claims in the context');
    }


    const output: ConstraintPolicyMutation[] = [];
    let passed: string[] = [];

    for (const claim of claims) {

      const tagName = ClaimsUtility.forContext(context.claimsContext).tagName(scope, claim);
      const passedAs = this.settings.claims[claim];
      passed.push(passedAs);

      output.push({
        type: ConstraintPolicyMutationType.CONDITION,
        key: AwsRequestTagConditionKey.tag(passedAs),
        operator: ConditionOperator.STRING_EQUALS,
        value: [PolicyVariable.principalTag(tagName).toString()],
      });
    }


    if (!this.settings.allowAnyTags) {

      const specificallyAllowedTags = this.settings.specificallyAllowedTags;

      if (specificallyAllowedTags && specificallyAllowedTags.length > 0) {
        passed = specificallyAllowedTags;
      }

      output.push({
        type: ConstraintPolicyMutationType.CONDITION,
        key: GlobalConditionKey.TagKeys,
        operator: ConditionOperator.FOR_ALL_VALUES_STRING_EQUALS,
        value: passed,
      });
    }


    return output;
  }
}
