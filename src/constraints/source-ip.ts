import { Annotations, Token } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { GlobalConditionKey } from '../condition-keys';
import { ConditionOperator, OperatorUtils, IpAddressConditionOperator } from '../condition-operator';
import { Constraint, ConstraintAssembleContext, ConstraintPolicyMutation, ConstraintPolicyMutationType } from '../constraint';

export class SourceIpCidrList {

  static create(...cidrs: string[]): SourceIpCidrList {

    if (cidrs.length === 0) {
      throw new Error('At least one CIDR should be specified');
    }

    return new SourceIpCidrList(cidrs);
  }

  private constructor(public readonly cidrs: string[]) {

  }

  toSourceIpConstraint(operator?: IpAddressConditionOperator): SourceIpConstraint {

    return SourceIpConstraint.createFromCidrList(operator ? operator : IpAddressConditionOperator.IP_ADDRESS, this);
  }

  applyToPolicy(policy: iam.PolicyStatement, operator?: IpAddressConditionOperator): void {

    const val: any = {};
    val[GlobalConditionKey.SourceIp.toString()] = this.cidrs;

    policy.addCondition(operator ? operator : IpAddressConditionOperator.IP_ADDRESS, val);
  }

}

// Only conceptual, actually not tested.
export class SourceIpConstraint extends Constraint {

  public static create(operator: IpAddressConditionOperator, ...cidrs: string[]): SourceIpConstraint {
    return new SourceIpConstraint(OperatorUtils.convert(operator), SourceIpCidrList.create(...cidrs));
  }

  public static createFromCidrList(operator: IpAddressConditionOperator, cidrList: SourceIpCidrList): SourceIpConstraint {
    return new SourceIpConstraint(OperatorUtils.convert(operator), cidrList);
  }

  public static requireSourceFromCidrList(cidrList: SourceIpCidrList): SourceIpConstraint {
    return new SourceIpConstraint(ConditionOperator.IP_ADDRESS, cidrList);
  }

  private constructor(private readonly operator: ConditionOperator, private readonly cidrList: SourceIpCidrList) {
    super();
  }

  private validateCidrList(scope: Construct): void {

    for (const cidr of this.cidrList.cidrs) {

      if (Token.isUnresolved(cidr)) {
        continue;
      }

      if (cidr.includes(':')) {
        continue; // TODO: validate ipv6
      }

      const octets = cidr.split('.');

      if (octets.length !== 4) {
        Annotations.of(scope).addError('Invalid IpV4 address provided creating a CidrList as static, ensure all cidrs are static');
        continue;
      }

      const numbers = octets.map((x: string) => parseInt(x, 10))
        .filter((x: number) => x >= 0 && x <= 255);

      if (numbers.length !== 4) {
        Annotations.of(scope).addError('Invalid IpV4 address provided creating a CidrList.');
        continue;
      }

      const parts = cidr.split('/');

      if (parts.length !== 2) {
        Annotations.of(scope).addError('Invalid IpV4 address provided creating a CidrList');
        continue;
      }

      const mask = parseInt(parts[1], 10);

      if (mask > 32 || mask < 0) {
        Annotations.of(scope).addError('Invalid IpV4 address provided creating a CidrList');
      }

    }

  }

  // @ts-ignore
  assemble(scope: Construct, context: ConstraintAssembleContext): ConstraintPolicyMutation[] {

    this.validateCidrList(scope);

    return [
      {
        type: ConstraintPolicyMutationType.CONDITION,
        key: GlobalConditionKey.SourceIp,
        operator: this.operator,
        value: [...this.cidrList.cidrs],
      },
    ];
  }
}
