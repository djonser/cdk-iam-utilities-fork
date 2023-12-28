import { Annotations } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ConditionOperator } from '../condition-operator';
import { Constraint, ConstraintAssembleContext, ConstraintPolicyMutation, ConstraintPolicyMutationType } from '../constraint';
import { ConditionKey } from '../keys';

export class BoolConstraint extends Constraint {

  public static whenTrue(key: ConditionKey, ifExists?: boolean): BoolConstraint {
    return new BoolConstraint(ifExists ? ConditionOperator.BOOL : ConditionOperator.BOOL_IFEXISTS, key, 'true');
  }

  public static whenFalse(key: ConditionKey, ifExists?: boolean): BoolConstraint {
    return new BoolConstraint(ifExists ? ConditionOperator.BOOL : ConditionOperator.BOOL_IFEXISTS, key, 'false');
  }


  private constructor(private readonly operator: ConditionOperator, private readonly key: ConditionKey, private readonly value: string) {
    super();
  }

  // @ts-ignore
  assemble(scope: Construct, context: ConstraintAssembleContext): ConstraintPolicyMutation[] {

    return [
      {
        type: ConstraintPolicyMutationType.CONDITION,
        key: this.key,
        operator: this.operator,
        value: [this.value],
      },
    ];
  }
}

export class DateConstraint extends Constraint {

  static betweenDates(key: ConditionKey, from: Date, to: Date): DateConstraint {
    return new DateConstraint(key, {
      type: 'between',
      firstDate: from,
      secondDate: to,
    });
  }

  static greaterThan(key: ConditionKey, date: Date): DateConstraint {
    return new DateConstraint(key, {
      type: 'greaterThan',
      firstDate: date,
    });
  }

  static lessThan(key: ConditionKey, date: Date): DateConstraint {
    return new DateConstraint(key, {
      type: 'lessThan',
      firstDate: date,
    });
  }

  private constructor(private readonly key: ConditionKey, private readonly settings: { type: string; firstDate: Date; secondDate?: Date }) {
    super();
  }

  private validateDates(scope: Construct): void {

    const {
      secondDate,
      firstDate,
    } = this.settings;

    if (secondDate && firstDate && firstDate > secondDate) {
      Annotations.of(scope).addError('Cannot have a "to" date that is greater than "from"');
    }

    if (firstDate && firstDate.toISOString().substring(20, 4) !== '000Z') {
      Annotations.of(scope).addWarning('Avoid instantiating Dates?');
    }

    if (secondDate && secondDate.toISOString().substring(20, 4) !== '000Z') {
      Annotations.of(scope).addWarning('Avoid instantiating Dates?');
    }

  }

  // @ts-ignore
  assemble(scope: Construct, context: ConstraintAssembleContext): ConstraintPolicyMutation[] {

    this.validateDates(scope);

    const constraints: ConstraintPolicyMutation[] = [];

    const {
      firstDate,
      secondDate,
      type,
    } = this.settings;

    if (type === 'between') {

      if (!secondDate) {
        Annotations.of(scope).addError('need to set this');
        return [];
      }

      constraints.push({
        type: ConstraintPolicyMutationType.CONDITION,
        key: this.key,
        operator: ConditionOperator.DATE_GREATER_THAN,
        value: [`${firstDate.toISOString().substring(0, 19)}Z`],
      });

      constraints.push({
        type: ConstraintPolicyMutationType.CONDITION,
        key: this.key,
        operator: ConditionOperator.DATE_LESS_THAN,
        value: [`${secondDate.toISOString().substring(0, 19)}Z`],
      });
    }

    if (type === 'greaterThan' || type === 'lessThan') {

      constraints.push({
        type: ConstraintPolicyMutationType.CONDITION,
        key: this.key,
        operator: type === 'greaterThan' ? ConditionOperator.DATE_GREATER_THAN : ConditionOperator.DATE_LESS_THAN,
        value: [`${firstDate.toISOString().substring(0, 19)}Z`],
      });
    }

    return constraints;
  }
}

export class GenericConstraint extends Constraint {

  public readonly value: string[];

  constructor(public readonly operator: ConditionOperator, public readonly key: ConditionKey, value: string, ...additionalValues: string[]) {
    super();

    this.value = [value, ...additionalValues];
  }

  // @ts-ignore
  assemble(scope: Construct, context: ConstraintAssembleContext): ConstraintPolicyMutation[] {

    return [
      {
        type: ConstraintPolicyMutationType.CONDITION,
        key: this.key,
        operator: this.operator,
        value: this.value,
      },
    ];
  }

}

export class NullConstraint extends Constraint {

  static isNull(key: ConditionKey): NullConstraint {
    return new NullConstraint(key, true);
  }

  static isNotNull(key: ConditionKey): NullConstraint {
    return new NullConstraint(key, false);
  }


  constructor(private readonly key: ConditionKey, private readonly isNull: boolean) {
    super();
  }

  // @ts-ignore
  assemble(scope: Construct, context: ConstraintAssembleContext): ConstraintPolicyMutation[] {

    return [{
      type: ConstraintPolicyMutationType.CONDITION,
      operator: ConditionOperator.NULL,
      key: this.key,
      value: [this.isNull],
    }];
  }

}
