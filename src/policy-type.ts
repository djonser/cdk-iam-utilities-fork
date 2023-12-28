export class ResourcePolicyType {

  // TODO: add others
  public static readonly API_GATEWAY = new ResourcePolicyType('apigateway');
  public static readonly CODE_BUILD = new ResourcePolicyType('codebuild');
  public static readonly BACKUP = new ResourcePolicyType('backup');
  public static readonly KMS = new ResourcePolicyType('kms');
  public static readonly LAMBDA = new ResourcePolicyType('lambda');
  public static readonly EVENTBRIDGE = new ResourcePolicyType('eventbridge');
  public static readonly S3 = new ResourcePolicyType('s3');
  public static readonly SECRETS_MANAGER = new ResourcePolicyType('secretsmanager');
  public static readonly GLUE = new ResourcePolicyType('glue');
  public static readonly SQS = new ResourcePolicyType('sqs');
  public static readonly SNS = new ResourcePolicyType('sns');
  public static readonly ECR = new ResourcePolicyType('ecr');
  public static readonly STS = new ResourcePolicyType('sts');

  private constructor(public readonly name: string) {
  }
}

export class PrincipalType {

  public static readonly Aws = new PrincipalType('aws');
  public static readonly Federated = new PrincipalType('federated');
  public static readonly Saml = new PrincipalType('saml');
  public static readonly Service = new PrincipalType('service');

  private constructor(public readonly type: string) {
  }

  get isFederated(): boolean {
    return this.type === 'federated' || this.type === 'saml';
  }

  get isSaml(): boolean {
    return this.type === 'saml';
  }

  get isService(): boolean {
    return this.type === 'service';
  }

  get isAws(): boolean {
    return this.type === 'aws';
  }
}

// Exists as a concept but not completed
export class PolicyType {

  public static readonly NonSpecific = new PolicyType('NonSpecific');
  public static readonly IdentityPolicy = new PolicyType('Identity');

  static resourcePolicy(type: ResourcePolicyType): PolicyType {
    return new PolicyType('Resource', type);
  }

  static trustPolicy(principalType: PrincipalType): PolicyType {
    return new PolicyType('Resource', ResourcePolicyType.STS, principalType);
  }

  // eslint-disable-next-line max-len
  private constructor(public readonly type: string, public readonly service?: ResourcePolicyType, public readonly principalType?: PrincipalType) {
  }

  get isTrustPolicy(): boolean {
    return this.isResourcePolicyForService(ResourcePolicyType.STS) && this.principalType !== undefined;
  }

  get isIdentityPolicy(): boolean {
    return this.type === 'Identity';
  }

  get isResourcePolicy(): boolean {
    return this.type === 'Resource';
  }

  isResourcePolicyForService(service: ResourcePolicyType): boolean {

    if (!this.service || this.type !== 'Resource') {
      return false;
    }

    return this.service.name == service.name;
  }

}
