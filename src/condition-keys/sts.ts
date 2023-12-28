import { ConditionKey } from '../keys';

export class IamResourceTagConditionKey extends ConditionKey {

  static tag(tagName: string): IamResourceTagConditionKey {
    return new IamResourceTagConditionKey(tagName);
  }

  private constructor(tagName: string) {
    super(`iam:ResourceTag/${tagName}`, { supportedOperators: ['String'] });
  }
}

export class StsServiceConditionKey extends ConditionKey {

  /**
   * Filters access by the login information for Amazon Cognito
   **/
  public static readonly CognitoIdentityAmr = new StsServiceConditionKey('cognito-identity.amazonaws.com:amr', ['ForAnyValue:StringLike']);

  /**
   * Filters access by the Amazon Cognito identity pool ID
   **/
  public static readonly CognitoIdentityAud = new StsServiceConditionKey('cognito-identity.amazonaws.com:aud', ['StringEquals']);

  /**
   * Filters access by the subject of the claim (the Amazon Cognito user ID)
   **/
  public static readonly CognitoIdentitySub = new StsServiceConditionKey('cognito-identity.amazonaws.com:sub', ['StringEquals']);

  /**
   * Filters access by the service that is obtaining a bearer token
   **/
  public static readonly AWSServiceName = new StsServiceConditionKey('sts:AWSServiceName', ['String']);

  /**
   * Filters access by the duration in seconds when getting a bearer token
   **/
  public static readonly DurationSeconds = new StsServiceConditionKey('sts:DurationSeconds', ['String']);

  /**
   * Filters access by the unique identifier required when you assume a role in another account
   **/
  public static readonly ExternalId = new StsServiceConditionKey('sts:ExternalId', ['String']);

  /**
   * Filters access by the role session name required when you assume a role
   **/
  public static readonly RoleSessionName = new StsServiceConditionKey('sts:RoleSessionName', ['String']);

  /**
   * Filters access by the source identity that is passed in the request
   **/
  public static readonly SourceIdentity = new StsServiceConditionKey('sts:SourceIdentity', ['String']);

  /**
   * Filters access by the transitive tag keys that are passed in the request
   **/
  public static readonly TransitiveTagKeys = new StsServiceConditionKey('sts:TransitiveTagKeys', ['ArrayOfString']);

  /**
   * Filters access by the tags that are attached to the role that is being assumed
   */
  public static iamResourceTag(tagName: string): IamResourceTagConditionKey {
    return IamResourceTagConditionKey.tag(tagName);
  }

  private constructor(name: string, supportedOperators: string[]) {
    super(name, { supportedOperators });
  }
}
