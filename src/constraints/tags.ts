import { Construct } from 'constructs';
import { GlobalConditionKey, AwsPrincipalTagConditionKey, AwsRequestTagConditionKey, AwsResourceTagConditionKey } from '../condition-keys';
import {
  ConditionOperator,
  OperatorUtils,
  StringConditionOperator,
  StringMultiValueConditionOperator,
} from '../condition-operator';
import { Constraint, ConstraintAssembleContext, ConstraintPolicyMutation, ConstraintPolicyMutationType } from '../constraint';


export abstract class TagConstraint extends Constraint {

  protected constructor() {
    super();
  }

}

export class RequestTagConstraint extends TagConstraint {

  static stringEquals(tagName: string, value: string, ...values: string[]): RequestTagConstraint {
    return new RequestTagConstraint(ConditionOperator.STRING_EQUALS, tagName, [value, ...values]);
  }

  static stringLike(tagName: string, value: string, ...values: string[]): RequestTagConstraint {
    return new RequestTagConstraint(ConditionOperator.STRING_LIKE, tagName, [value, ...values]);
  }

  private constructor(private readonly operator: ConditionOperator, public readonly tagName: string, public readonly values: string[]) {
    super();
  }

  // @ts-ignore
  assemble(scope: Construct, context: ConstraintAssembleContext): ConstraintPolicyMutation[] {

    return [{
      type: ConstraintPolicyMutationType.CONDITION,
      key: AwsRequestTagConditionKey.tag(this.tagName),
      operator: this.operator,
      value: this.values,
    }];
  }
}

export class ResourceTagConstraint extends TagConstraint {

  static stringEquals(tagName: string, value: string, ...values: string[]): ResourceTagConstraint {
    return new ResourceTagConstraint(ConditionOperator.STRING_EQUALS, tagName, [value, ...values]);
  }

  static create(operator: StringConditionOperator, tagName: string, value: string, ...values: string[]): ResourceTagConstraint {
    return new ResourceTagConstraint(OperatorUtils.convert(operator), tagName, [value, ...values]);
  }

  private constructor(private readonly operator: ConditionOperator, public readonly tagName: string, public readonly values: string[]) {
    super();
  }

  // @ts-ignore
  assemble(scope: Construct, context: ConstraintAssembleContext): ConstraintPolicyMutation[] {

    return [{
      type: ConstraintPolicyMutationType.CONDITION,
      key: AwsResourceTagConditionKey.tag(this.tagName),
      operator: this.operator,
      value: this.values,
    }];
  }
}


export class PrincipalTagConstraint extends TagConstraint {

  static stringEquals(tagName: string, value: string, ...values: string[]): PrincipalTagConstraint {
    return new PrincipalTagConstraint(ConditionOperator.STRING_EQUALS, tagName, [value, ...values]);
  }

  private constructor(private readonly operator: ConditionOperator, public readonly tagName: string, public readonly values: string[]) {
    super();
  }

  // @ts-ignore
  assemble(scope: Construct, context: ConstraintAssembleContext): ConstraintPolicyMutation[] {

    return [{
      type: ConstraintPolicyMutationType.CONDITION,
      key: AwsPrincipalTagConditionKey.tag(this.tagName),
      operator: this.operator,
      value: this.values,
    }];
  }
}

export class TagKeysConstraint extends Constraint {

  static create(operator: StringMultiValueConditionOperator, isNotNull: boolean, value: string, ...values: string[]): TagKeysConstraint {
    return new TagKeysConstraint(operator, isNotNull, [value, ...values]);
  }

  /**
   * Limit request tags to those specified and check for null
   */
  static requireTagsEquals(value: string, ...values: string[]): TagKeysConstraint {
    return new TagKeysConstraint(StringMultiValueConditionOperator.FOR_ALL_VALUES_STRING_EQUALS, true, [value, ...values]);
  }

  // eslint-disable-next-line max-len
  private constructor(public readonly operator: StringMultiValueConditionOperator, private readonly isNotNull: boolean, public readonly values: string[]) {
    super();
  }

  // @ts-ignore
  assemble(scope: Construct, _: ConstraintAssembleContext): ConstraintPolicyMutation[] {

    const constraints: ConstraintPolicyMutation[] = [
      {
        type: ConstraintPolicyMutationType.CONDITION,
        key: GlobalConditionKey.TagKeys,
        operator: OperatorUtils.convert(this.operator),
        value: this.values,
      },
    ];

    if (this.isNotNull) {
      constraints.push(this.isNotNullCondition(GlobalConditionKey.TagKeys));
    }

    return constraints;
  }
}

