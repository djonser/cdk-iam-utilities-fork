import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { ConditionOperator, OperatorUtils } from '../condition-operator';
import { Constraint } from '../constraint';
import { BoolConstraint, GenericConstraint } from '../constraints';
import { BoolConditionKey, ConditionKey } from '../keys';

export class GlobalBoolConditionKey extends BoolConditionKey {
  public static readonly MultiFactorAuthPresent = new GlobalBoolConditionKey('aws:MultiFactorAuthPresent');
  public static readonly PrincipalIsAWSService = new GlobalBoolConditionKey('aws:PrincipalIsAWSService');
  public static readonly SecureTransport = new GlobalBoolConditionKey('aws:SecureTransport');
  public static readonly ViaAWSService = new GlobalBoolConditionKey('aws:ViaAWSService');

  private constructor(name: string) {
    super(name, { supportedOperators: OperatorUtils.Bool });
  }

  toBoolTrueConstraint(ifExists?: boolean): BoolConstraint {
    return BoolConstraint.whenTrue(this, ifExists);
  }

  toBoolFalseConstraint(ifExists?: boolean): BoolConstraint {
    return BoolConstraint.whenTrue(this, ifExists);
  }
}

// Example of interacting with CDK types via toVpcConstraint
export class AwsSourceVpcConditionKey extends ConditionKey {

  public static readonly Create = new AwsSourceVpcConditionKey();

  private constructor() {
    super('aws:SourceVpc', { supportedOperators: ['String'] });
  }

  toVpcConstraint(vpc: ec2.IVpc): GenericConstraint {
    return new GenericConstraint(ConditionOperator.STRING_EQUALS, this, vpc.vpcId);
  }

}

export class AwsRequestTagConditionKey extends ConditionKey {

  public static tag(tagName: string): AwsRequestTagConditionKey {
    return new AwsRequestTagConditionKey(tagName);
  }

  private constructor(tagName: string) {
    super(`aws:RequestTag/${tagName}`, { supportedOperators: ['String'] });
  }
}

export class AwsPrincipalTagConditionKey extends ConditionKey {

  public static tag(tagName: string): AwsPrincipalTagConditionKey {
    return new AwsPrincipalTagConditionKey(tagName);
  }

  private constructor(tagName: string) {
    super(`aws:PrincipalTag/${tagName}`, { supportedOperators: ['String'] });
  }
}

export class AwsResourceTagConditionKey extends ConditionKey {

  public static tag(tagName: string): AwsResourceTagConditionKey {
    return new AwsResourceTagConditionKey(tagName);
  }

  private constructor(tagName: string) {
    super(`aws:ResourceTag/${tagName}`, { supportedOperators: ['String'] });
  }
}

export class AwsFederatedProviderConditionKey extends ConditionKey {

  public static readonly Create = new AwsFederatedProviderConditionKey();

  private constructor() {
    super('aws:FederatedProvider', { supportedOperators: ['String'] });
  }

  toCognitoIdentityConstraint(): Constraint {
    return new GenericConstraint(ConditionOperator.STRING_EQUALS, this, 'cognito-identity.amazonaws.com');
  }

  toConstraint(operator: ConditionOperator, value: string, ...additionalValues: string[]): GenericConstraint {
    return new GenericConstraint(operator, this, value, ...additionalValues);
  }
}

export class GlobalConditionKey extends ConditionKey {

  /**
   * Use this key to compare the services in the policy with the services that made requests on behalf of the IAM principal (user or role).
   */
  public static readonly CalledVia = new GlobalConditionKey('aws:CalledVia', ['ArrayOfString']);

  /**
   * Use this key to compare the services in the policy with the first service that made a request on behalf of the IAM principal (user or role).
   */
  public static readonly CalledViaFirst = new GlobalConditionKey('aws:CalledViaFirst');

  /**
   * Use this key to compare the services in the policy with the last service that made a request on behalf of the IAM principal (user or role).
   */
  public static readonly CalledViaLast = new GlobalConditionKey('aws:CalledViaLast');

  /**
   * Use this key to compare the date and time of the request with the date and time that you specify in the policy.
   */
  public static readonly CurrentTime = new GlobalConditionKey('aws:CurrentTime', ['Date']);
  public static readonly Ec2InstanceSourceVpc = new GlobalConditionKey('aws:Ec2InstanceSourceVpc');
  public static readonly Ec2InstanceSourcePrivateIPv4 = new GlobalConditionKey('aws:Ec2InstanceSourcePrivateIPv4', ['IpAddress']);
  public static readonly EpochTime = new GlobalConditionKey('aws:EpochTime', ['Numeric', 'Date']);
  public static readonly FederatedProvider = AwsFederatedProviderConditionKey.Create;
  public static readonly MultiFactorAuthAge = new GlobalConditionKey('aws:FederatedProvider', ['Numeric']);
  public static readonly MultiFactorAuthPresent = GlobalBoolConditionKey.MultiFactorAuthPresent;
  public static readonly PrincipalAccount = new GlobalConditionKey('aws:PrincipalAccount');
  public static readonly PrincipalArn = new GlobalConditionKey('aws:PrincipalArn', ['Arn', 'String']);
  public static readonly PrincipalIsAWSService = GlobalBoolConditionKey.PrincipalIsAWSService;
  public static readonly PrincipalOrgID = new GlobalConditionKey('aws:PrincipalOrgID');
  public static readonly PrincipalOrgPaths = new GlobalConditionKey('aws:PrincipalOrgPaths');
  public static readonly PrincipalServiceName = new GlobalConditionKey('aws:PrincipalServiceName');
  public static readonly PrincipalServiceNamesList = new GlobalConditionKey('aws:PrincipalServiceNamesList');
  public static readonly PrincipalType = new GlobalConditionKey('aws:PrincipalType');
  public static readonly Referer = new GlobalConditionKey('aws:Referer');
  public static readonly RequestedRegion = new GlobalConditionKey('aws:RequestedRegion');
  public static readonly ResourceAccount = new GlobalConditionKey('aws:ResourceAccount');
  public static readonly ResourceOrgID = new GlobalConditionKey('aws:ResourceOrgID');
  public static readonly ResourceOrgPaths = new GlobalConditionKey('aws:ResourceOrgPaths');
  public static readonly SecureTransport = GlobalBoolConditionKey.SecureTransport;
  public static readonly SourceAccount = new GlobalConditionKey('aws:SourceAccount');
  public static readonly SourceArn = new GlobalConditionKey('aws:SourceArn');
  public static readonly SourceIdentity = new GlobalConditionKey('aws:SourceIdentity');
  public static readonly SourceIp = new GlobalConditionKey('aws:SourceIp', ['IpAddress']);
  public static readonly SourceOrgID = new GlobalConditionKey('aws:SourceOrgID');
  public static readonly SourceOrgPaths = new GlobalConditionKey('aws:SourceOrgPaths');
  public static readonly SourceVpc = AwsSourceVpcConditionKey.Create;
  public static readonly SourceVpce = new GlobalConditionKey('aws:SourceVpce');
  public static readonly TagKeys = new GlobalConditionKey('aws:TagKeys', ['ArrayOfString']);
  public static readonly TokenIssueTime = new GlobalConditionKey('aws:TokenIssueTime', ['Date']);
  public static readonly UserAgent = new GlobalConditionKey('aws:UserAgent');
  public static readonly Userid = new GlobalConditionKey('aws:Userid');
  public static readonly Username = new GlobalConditionKey('aws:Username');
  public static readonly ViaAWSService = GlobalBoolConditionKey.ViaAWSService;
  public static readonly VpcSourceIp = new GlobalConditionKey('aws:VpcSourceIp', ['IpAddress']);

  /**
   * Use this key to compare the tag key-value pair that was passed in the request with the tag pair that you specify in the policy.
   * @param tagName
   */
  public static requestTag(tagName: string): AwsRequestTagConditionKey {
    return AwsRequestTagConditionKey.tag(tagName);
  }

  /**
   * Use this key to compare the tag key-value pair that you specify in the policy with the key-value pair attached to the resource.
   * @param tagName
   */
  public static resourceTag(tagName: string): AwsResourceTagConditionKey {
    return AwsResourceTagConditionKey.tag(tagName);
  }

  /**
   * Use this key to compare the tag attached to the principal making the request with the tag that you specify in the policy.
   * @param tagName
   */
  public static principalTag(tagName: string): AwsPrincipalTagConditionKey {
    return AwsPrincipalTagConditionKey.tag(tagName);
  }


  private constructor(name: string, supportedOperators?: string[]) {
    super(name, { supportedOperators: supportedOperators ?? ['String'] });
  }

  toConstraint(operator: ConditionOperator, value: string, ...additionalValues: string[]): GenericConstraint {
    return new GenericConstraint(operator, this, value, ...additionalValues);
  }

}
