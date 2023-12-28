import { ConditionKey } from '../keys';

// generated
export class LambdaServiceConditionKey extends ConditionKey {

  /**
   * Filters access by the ARN of an AWS Lambda code signing config
   **/
  public static readonly CodeSigningConfigArn = new LambdaServiceConditionKey('lambda:CodeSigningConfigArn', ['Arn']);

  /**
   * Filters access by the ID from a non-AWS event source configured for the AWS Lambda function
   **/
  public static readonly EventSourceToken = new LambdaServiceConditionKey('lambda:EventSourceToken', ['String']);

  /**
   * Filters access by the ARN of an AWS Lambda function
   **/
  public static readonly FunctionArn = new LambdaServiceConditionKey('lambda:FunctionArn', ['Arn']);

  /**
   * Filters access by authorization type specified in request. Available during CreateFunctionUrlConfig, UpdateFunctionUrlConfig, DeleteFunctionUrlConfig, GetFunctionUrlConfig, ListFunctionUrlConfig, AddPermission and RemovePermission operations
   **/
  public static readonly FunctionUrlAuthType = new LambdaServiceConditionKey('lambda:FunctionUrlAuthType', ['String']);

  /**
   * Filters access by the ARN of a version of an AWS Lambda layer
   **/
  public static readonly Layer = new LambdaServiceConditionKey('lambda:Layer', ['ArrayOfString']);

  /**
   * Filters access by restricting the AWS service or account that can invoke a function
   **/
  public static readonly Principal = new LambdaServiceConditionKey('lambda:Principal', ['String']);

  /**
   * Filters access by the ID of security groups configured for the AWS Lambda function
   **/
  public static readonly SecurityGroupIds = new LambdaServiceConditionKey('lambda:SecurityGroupIds', ['ArrayOfString']);

  /**
   * Filters access by the ARN of the AWS Lambda function from which the request originated
   **/
  public static readonly SourceFunctionArn = new LambdaServiceConditionKey('lambda:SourceFunctionArn', ['Arn']);

  /**
   * Filters access by the ID of subnets configured for the AWS Lambda function
   **/
  public static readonly SubnetIds = new LambdaServiceConditionKey('lambda:SubnetIds', ['ArrayOfString']);

  /**
   * Filters access by the ID of the VPC configured for the AWS Lambda function
   **/
  public static readonly VpcIds = new LambdaServiceConditionKey('lambda:VpcIds', ['String']);

  private constructor(name: string, supportedOperators: string[]) {
    super(name, { supportedOperators });
  }
}
