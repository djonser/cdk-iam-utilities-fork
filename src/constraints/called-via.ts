import { Annotations } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GlobalConditionKey } from '../condition-keys';
import { ConditionOperator } from '../condition-operator';
import { Constraint, ConstraintAssembleContext, ConstraintPolicyMutation, ConstraintPolicyMutationType } from '../constraint';

const calledViaServicePrincipals = [
  'aoss.amazonaws.com',
  'athena.amazonaws.com',
  'backup.amazonaws.com',
  'cloud9.amazonaws.com',
  'cloudformation.amazonaws.com',
  'databrew.amazonaws.com',
  'dataexchange.amazonaws.com',
  'dynamodb.amazonaws.com',
  'imagebuilder.amazonaws.com',
  'kms.amazonaws.com',
  'mgn.amazonaws.com',
  'nimble.amazonaws.com',
  'omics.amazonaws.com',
  'ram.amazonaws.com',
  'robomaker.amazonaws.com',
  'servicecatalog-appregistry.amazonaws.com',
  'sqlworkbench.amazonaws.com',
] as const;

export enum CalledViaServicePrincipal {
  AOSS = 'aoss.amazonaws.com',
  ATHENA = 'athena.amazonaws.com',
  BACKUP = 'backup.amazonaws.com',
  CLOUD9 = 'cloud9.amazonaws.com',
  CLOUDFORMATION = 'cloudformation.amazonaws.com',
  DATABREW = 'databrew.amazonaws.com',
  DATAEXCHANGE = 'dataexchange.amazonaws.com',
  DYNAMODB = 'dynamodb.amazonaws.com',
  IMAGEBUILDER = 'imagebuilder.amazonaws.com',
  KMS = 'kms.amazonaws.com',
  MGN = 'mgn.amazonaws.com',
  NIMBLE = 'nimble.amazonaws.com',
  OMICS = 'omics.amazonaws.com',
  RAM = 'ram.amazonaws.com',
  ROBOMAKER = 'robomaker.amazonaws.com',
  SERVICECATALOG_APPREGISTRY = 'servicecatalog-appregistry.amazonaws.com',
  SQLWORKBENCH = 'sqlworkbench.amazonaws.com',
}

// Concept, not actually tested
export class CalledViaConstraint extends Constraint {

  static calledVia(service: CalledViaServicePrincipal): CalledViaConstraint {

    return new CalledViaConstraint([{
      type: ConstraintPolicyMutationType.CONDITION,
      operator: ConditionOperator.FOR_ANY_VALUE_STRING_EQUALS,
      key: GlobalConditionKey.CalledVia,
      value: [service],
    }]);
  }

  static calledViaFirst(service: CalledViaServicePrincipal): CalledViaConstraint {

    return new CalledViaConstraint([{
      type: ConstraintPolicyMutationType.CONDITION,
      operator: ConditionOperator.STRING_EQUALS,
      key: GlobalConditionKey.CalledViaFirst,
      value: [service],
    }]);
  }

  static calledViaLast(service: CalledViaServicePrincipal): CalledViaConstraint {

    return new CalledViaConstraint([{
      type: ConstraintPolicyMutationType.CONDITION,
      operator: ConditionOperator.STRING_EQUALS,
      key: GlobalConditionKey.CalledViaLast,
      value: [service],
    }]);
  }

  // eslint-disable-next-line max-len
  static calledViaFirstAndLast(firstService: CalledViaServicePrincipal, lastService: CalledViaServicePrincipal): CalledViaConstraint {

    return new CalledViaConstraint([{
      type: ConstraintPolicyMutationType.CONDITION,
      operator: ConditionOperator.STRING_EQUALS,
      key: GlobalConditionKey.CalledViaFirst,
      value: [firstService],
    }, {
      type: ConstraintPolicyMutationType.CONDITION,
      operator: ConditionOperator.STRING_EQUALS,
      key: GlobalConditionKey.CalledViaLast,
      value: [lastService],
    }]);
  }

  private constructor(private readonly values: ConstraintPolicyMutation[]) {
    super();
  }

  // @ts-ignore
  assemble(scope: Construct, context: ConstraintAssembleContext): ConstraintPolicyMutation[] {

    for (const value of this.values) {
      for (const valueElement of value.value) {
        if (!calledViaServicePrincipals.includes(valueElement)) {
          Annotations.of(scope).addError(`${valueElement} is not a valid servicePrincipal to be used with the condition ${value.key.name}`);
        }
      }
    }

    return this.values;

  }

}
