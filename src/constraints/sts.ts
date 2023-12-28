import { Construct } from 'constructs';
import { StsServiceConditionKey } from '../condition-keys';
import { ConditionOperator } from '../condition-operator';
import { Constraint, ConstraintAssembleContext, ConstraintPolicyMutation, ConstraintPolicyMutationType } from '../constraint';

export class StsTransitiveTagKeysConstraint extends Constraint {

  /**
   * Limit transitive tags to those specified and check for null
   */
  static tagsEqualsAndPresent(value: string, ...values: string[]): StsTransitiveTagKeysConstraint {
    return new StsTransitiveTagKeysConstraint(ConditionOperator.FOR_ALL_VALUES_STRING_EQUALS, [value, ...values]);
  }

  private constructor(private readonly operator: ConditionOperator, public readonly values: string[]) {
    super();
  }

  // @ts-ignore
  assemble(scope: Construct, context: ConstraintAssembleContext): ConstraintPolicyMutation[] {

    return [
      {
        type: ConstraintPolicyMutationType.CONDITION,
        key: StsServiceConditionKey.TransitiveTagKeys,
        operator: this.operator,
        value: this.values,
      },
      this.isNotNullCondition(StsServiceConditionKey.TransitiveTagKeys),
    ];
  }
}

export class StsCognitoIdentityConstraint extends Constraint {

  static identityPool(identityPoolId: string, amr: string): StsCognitoIdentityConstraint {
    return new StsCognitoIdentityConstraint(identityPoolId, amr);
  }

  private constructor(public readonly identityPoolId: string, public readonly amr: string) {
    super();
  }

  // @ts-ignore
  assemble(scope: Construct, context: ConstraintAssembleContext): ConstraintPolicyMutation[] {

    return [
      {
        type: ConstraintPolicyMutationType.CONDITION,
        operator: ConditionOperator.STRING_EQUALS,
        key: StsServiceConditionKey.CognitoIdentityAud,
        value: [this.identityPoolId],
      },
      {
        type: ConstraintPolicyMutationType.CONDITION,
        operator: ConditionOperator.FOR_ANY_VALUE_STRING_LIKE,
        key: StsServiceConditionKey.CognitoIdentityAmr,
        value: [this.amr],
      },
    ];
  }
}
