export enum ConditionOperator {
  STRING_EQUALS = 'StringEquals',
  STRING_NOT_EQUALS = 'StringNotEquals',
  STRING_EQUALS_IGNORECASE = 'StringEqualsIgnoreCase',
  STRING_NOT_EQUALS_IGNORECASE = 'StringNotEqualsIgnoreCase',
  STRING_LIKE = 'StringLike',
  STRING_NOT_LIKE = 'StringNotLike',
  STRING_EQUALS_IFEXISTS = 'StringEqualsIfExists',
  STRING_NOT_EQUALS_IFEXISTS = 'StringNotEqualsIfExists',
  STRING_EQUALS_IGNORECASE_IFEXISTS = 'StringEqualsIgnoreCaseIfExists',
  STRING_NOT_EQUALS_IGNORECASE_IFEXISTS = 'StringNotEqualsIgnoreCaseIfExists',
  STRING_LIKE_IFEXISTS = 'StringLikeIfExists',
  STRING_NOT_LIKE_IFEXISTS = 'StringNotLikeIfExists',
  DATE_EQUALS = 'DateEquals',
  DATE_NOT_EQUALS = 'DateNotEquals',
  DATE_LESS_THAN = 'DateLessThan',
  DATE_LESS_THAN_EQUALS = 'DateLessThanEquals',
  DATE_GREATER_THAN = 'DateGreaterThan',
  DATE_GREATER_THAN_EQUALS = 'DateGreaterThanEquals',
  DATE_EQUALS_IFEXISTS = 'DateEqualsIfExists',
  DATE_NOT_EQUALS_IFEXISTS = 'DateNotEqualsIfExists',
  DATE_LESS_THAN_IFEXISTS = 'DateLessThanIfExists',
  DATE_LESS_THAN_EQUALS_IFEXISTS = 'DateLessThanEqualsIfExists',
  DATE_GREATER_THAN_IFEXISTS = 'DateGreaterThanIfExists',
  DATE_GREATER_THAN_EQUALS_IFEXISTS = 'DateGreaterThanEqualsIfExists',
  NUMERIC_EQUALS = 'NumericEquals',
  NUMERIC_NOT_EQUALS = 'NumericNotEquals',
  NUMERIC_LESS_THAN = 'NumericLessThan',
  NUMERIC_LESS_THAN_EQUALS = 'NumericLessThanEquals',
  NUMERIC_GREATER_THAN = 'NumericGreaterThan',
  NUMERIC_GREATER_THAN_EQUALS = 'NumericGreaterThanEquals',
  NUMERIC_EQUALS_IFEXISTS = 'NumericEqualsIfExists',
  NUMERIC_NOT_EQUALS_IFEXISTS = 'NumericNotEqualsIfExists',
  NUMERIC_LESS_THAN_IFEXISTS = 'NumericLessThanIfExists',
  NUMERIC_LESS_THAN_EQUALS_IFEXISTS = 'NumericLessThanEqualsIfExists',
  NUMERIC_GREATER_THAN_IFEXISTS = 'NumericGreaterThanIfExists',
  NUMERIC_GREATER_THAN_EQUALS_IFEXISTS = 'NumericGreaterThanEqualsIfExists',
  FOR_ANY_VALUE_STRING_LIKE = 'ForAnyValue:StringLike',
  FOR_ANY_VALUE_STRING_EQUALS = 'ForAnyValue:StringEquals',
  FOR_ALL_VALUES_STRING_LIKE = 'ForAllValues:StringLike',
  FOR_ALL_VALUES_STRING_EQUALS = 'ForAllValues:StringEquals',
  FOR_ALL_VALUES_STRING_EQUALS_IGNORECASE = 'ForAllValues:StringEqualsIgnoreCase',
  BOOL = 'Bool',
  BOOL_IFEXISTS = 'BoolIfExists',
  BINARY_EQUALS = 'BinaryEquals',
  ARN_EQUALS = 'ArnEquals',
  ARN_LIKE = 'ArnLike',
  ARN_NOT_EQUALS = 'ArnNotEquals',
  ARN_NOT_LIKE = 'ArnNotLike',
  ARN_EQUALS_IFEXISTS = 'ArnEqualsIfExists',
  ARN_LIKE_IFEXISTS = 'ArnLikeIfExists',
  ARN_NOT_EQUALS_IFEXISTS = 'ArnNotEqualsIfExists',
  ARN_NOT_LIKE_IFEXISTS = 'ArnNotLikeIfExists',
  IP_ADDRESS = 'IpAddress',
  IP_ADDRESS_IFEXISTS = 'IpAddressIfExists',
  NOT_IP_ADDRESS = 'NotIpAddress',
  NOT_IP_ADDRESS_IFEXISTS = 'NotIpAddressIfExists',
  NULL = 'Null',
}

export enum StringConditionOperator {
  STRING_EQUALS = 'StringEquals',
  STRING_NOT_EQUALS = 'StringNotEquals',
  STRING_EQUALS_IGNORECASE = 'StringEqualsIgnoreCase',
  STRING_NOT_EQUALS_IGNORECASE = 'StringNotEqualsIgnoreCase',
  STRING_LIKE = 'StringLike',
  STRING_NOT_LIKE = 'StringNotLike',
  STRING_EQUALS_IFEXISTS = 'StringEqualsIfExists',
  STRING_NOT_EQUALS_IFEXISTS = 'StringNotEqualsIfExists',
  STRING_EQUALS_IGNORECASE_IFEXISTS = 'StringEqualsIgnoreCaseIfExists',
  STRING_NOT_EQUALS_IGNORECASE_IFEXISTS = 'StringNotEqualsIgnoreCaseIfExists',
  STRING_LIKE_IFEXISTS = 'StringLikeIfExists',
  STRING_NOT_LIKE_IFEXISTS = 'StringNotLikeIfExists',
}

export enum ArnConditionOperator {
  ARN_EQUALS = 'ArnEquals',
  ARN_LIKE = 'ArnLike',
  ARN_NOT_EQUALS = 'ArnNotEquals',
  ARN_NOT_LIKE = 'ArnNotLike',
  ARN_EQUALS_IFEXISTS = 'ArnEqualsIfExists',
  ARN_LIKE_IFEXISTS = 'ArnLikeIfExists',
  ARN_NOT_EQUALS_IFEXISTS = 'ArnNotEqualsIfExists',
  ARN_NOT_LIKE_IFEXISTS = 'ArnNotLikeIfExists',
}

export enum IpAddressConditionOperator {
  IP_ADDRESS = 'IpAddress',
  IP_ADDRESS_IFEXISTS = 'IpAddressIfExists',
  NOT_IP_ADDRESS = 'NotIpAddress',
  NOT_IP_ADDRESS_IFEXISTS = 'NotIpAddressIfExists',
}


export enum StringMultiValueConditionOperator {
  FOR_ANY_VALUE_STRING_LIKE = 'ForAnyValue:StringLike',
  FOR_ALL_VALUES_STRING_LIKE = 'ForAllValues:StringLike',
  FOR_ALL_VALUES_STRING_EQUALS = 'ForAllValues:StringEquals',
  FOR_ALL_VALUES_STRING_EQUALS_IGNORECASE = 'ForAllValues:StringEqualsIgnoreCase',
  FOR_ANY_VALUE_STRING_EQUALS = 'ForAnyValue:StringEquals',
}

export abstract class OperatorUtils {


  public static readonly String = [
    'StringEquals',
    'StringNotEquals',
    'StringEqualsIgnoreCase',
    'StringNotEqualsIgnoreCase',
    'StringLike',
    'StringNotLike',
    'StringEqualsIfExists',
    'StringNotEqualsIfExists',
    'StringEqualsIgnoreCaseIfExists',
    'StringNotEqualsIgnoreCaseIfExists',
    'StringLikeIfExists',
    'StringNotLikeIfExists',
  ];

  public static readonly Arn = [
    'ArnEquals',
    'ArnLike',
    'ArnNotEquals',
    'ArnNotLike',
    'ArnEqualsIfExists',
    'ArnLikeIfExists',
    'ArnNotEqualsIfExists',
    'ArnNotLikeIfExists',
  ];

  public static readonly IpAddress = [
    'IpAddress',
    'IpAddressIfExists',
    'NotIpAddress',
    'NotIpAddressIfExists',
  ];

  public static readonly Date = [
    'DateEquals',
    'DateNotEquals',
    'DateLessThan',
    'DateLessThanEquals',
    'DateGreaterThan',
    'DateGreaterThanEquals',
    'DateEqualsIfExists',
    'DateNotEqualsIfExists',
    'DateLessThanIfExists',
    'DateLessThanEqualsIfExists',
    'DateGreaterThanIfExists',
    'DateGreaterThanEqualsIfExists',
  ];

  public static readonly Numeric = [
    'NumericEquals',
    'NumericNotEquals',
    'NumericLessThan',
    'NumericLessThanEquals',
    'NumericGreaterThan',
    'NumericGreaterThanEquals',
    'NumericEqualsIfExists',
    'NumericNotEqualsIfExists',
    'NumericLessThanIfExists',
    'NumericLessThanEqualsIfExists',
    'NumericGreaterThanIfExists',
    'NumericGreaterThanEqualsIfExists',
  ];

  public static readonly Many = [
    'ForAnyValue:StringLike',
    'ForAllValues:StringLike',
    'ForAllValues:StringEquals',
    'ForAllValues:StringEqualsIgnoreCase',
  ];

  public static readonly Bool = [
    'Bool',
    'BoolIfExists',
  ];


  public static readonly Binary = [
    'BinaryEquals',
  ];

  public static operatorIsSupported(supportedOperators: string[], operator: ConditionOperator): boolean | undefined {


    if (!supportedOperators || supportedOperators.length === 0) {
      return undefined;
    }

    const shortName = OperatorUtils.operatorShortName(operator);

    return supportedOperators.find(x => x === shortName || x === operator) !== undefined;

  }

  public static arraySupport(value: ConditionOperator): boolean {
    return value.startsWith('For');
  }

  public static convert(value: any): ConditionOperator {
    return fromString(value);
  }

  public static operatorShortName(operator: ConditionOperator): string {


    if (operator.startsWith('String')) {
      return 'String';
    } else if (operator.startsWith('Date')) {
      return 'Date';
    } else if (operator.startsWith('Arn')) {
      return 'Arn';
    } else if (operator.startsWith('Bool')) {
      return 'Bool';
    } else if (operator.startsWith('Numeric')) {
      return 'Numeric';
    } else if (operator.startsWith('For') && operator.includes(':String')) {
      return 'ArrayOfString';
    }
    return 'UNKNOWN';

  }

  private constructor() {
  }
}


function fromString(value: string): ConditionOperator {

  switch (value.toLowerCase()) {

    case 'StringEquals'.toLowerCase():
      return ConditionOperator.STRING_EQUALS;
    case 'StringNotEquals'.toLowerCase():
      return ConditionOperator.STRING_NOT_EQUALS;
    case 'StringEqualsIgnoreCase'.toLowerCase():
      return ConditionOperator.STRING_EQUALS_IGNORECASE;
    case 'StringNotEqualsIgnoreCase'.toLowerCase():
      return ConditionOperator.STRING_NOT_EQUALS_IGNORECASE;
    case 'StringLike'.toLowerCase():
      return ConditionOperator.STRING_LIKE;
    case 'StringNotLike'.toLowerCase():
      return ConditionOperator.STRING_NOT_LIKE;
    case 'StringEqualsIfExists'.toLowerCase():
      return ConditionOperator.STRING_EQUALS_IFEXISTS;
    case 'StringNotEqualsIfExists'.toLowerCase():
      return ConditionOperator.STRING_NOT_EQUALS_IFEXISTS;
    case 'StringEqualsIgnoreCaseIfExists'.toLowerCase():
      return ConditionOperator.STRING_EQUALS_IGNORECASE_IFEXISTS;
    case 'StringNotEqualsIgnoreCaseIfExists'.toLowerCase():
      return ConditionOperator.STRING_NOT_EQUALS_IGNORECASE_IFEXISTS;
    case 'StringLikeIfExists'.toLowerCase():
      return ConditionOperator.STRING_LIKE_IFEXISTS;
    case 'StringNotLikeIfExists'.toLowerCase():
      return ConditionOperator.STRING_NOT_LIKE_IFEXISTS;
    case 'DateEquals'.toLowerCase():
      return ConditionOperator.DATE_EQUALS;
    case 'DateNotEquals'.toLowerCase():
      return ConditionOperator.DATE_NOT_EQUALS;
    case 'DateLessThan'.toLowerCase():
      return ConditionOperator.DATE_LESS_THAN;
    case 'DateLessThanEquals'.toLowerCase():
      return ConditionOperator.DATE_LESS_THAN_EQUALS;
    case 'DateGreaterThan'.toLowerCase():
      return ConditionOperator.DATE_GREATER_THAN;
    case 'DateGreaterThanEquals'.toLowerCase():
      return ConditionOperator.DATE_GREATER_THAN_EQUALS;
    case 'DateEqualsIfExists'.toLowerCase():
      return ConditionOperator.DATE_EQUALS_IFEXISTS;
    case 'DateNotEqualsIfExists'.toLowerCase():
      return ConditionOperator.DATE_NOT_EQUALS_IFEXISTS;
    case 'DateLessThanIfExists'.toLowerCase():
      return ConditionOperator.DATE_LESS_THAN_IFEXISTS;
    case 'DateLessThanEqualsIfExists'.toLowerCase():
      return ConditionOperator.DATE_LESS_THAN_EQUALS_IFEXISTS;
    case 'DateGreaterThanIfExists'.toLowerCase():
      return ConditionOperator.DATE_GREATER_THAN_IFEXISTS;
    case 'DateGreaterThanEqualsIfExists'.toLowerCase():
      return ConditionOperator.DATE_GREATER_THAN_EQUALS_IFEXISTS;
    case 'NumericEquals'.toLowerCase():
      return ConditionOperator.NUMERIC_EQUALS;
    case 'NumericNotEquals'.toLowerCase():
      return ConditionOperator.NUMERIC_NOT_EQUALS;
    case 'NumericLessThan'.toLowerCase():
      return ConditionOperator.NUMERIC_LESS_THAN;
    case 'NumericLessThanEquals'.toLowerCase():
      return ConditionOperator.NUMERIC_LESS_THAN_EQUALS;
    case 'NumericGreaterThan'.toLowerCase():
      return ConditionOperator.NUMERIC_GREATER_THAN;
    case 'NumericGreaterThanEquals'.toLowerCase():
      return ConditionOperator.NUMERIC_GREATER_THAN_EQUALS;
    case 'NumericEqualsIfExists'.toLowerCase():
      return ConditionOperator.NUMERIC_EQUALS_IFEXISTS;
    case 'NumericNotEqualsIfExists'.toLowerCase():
      return ConditionOperator.NUMERIC_NOT_EQUALS_IFEXISTS;
    case 'NumericLessThanIfExists'.toLowerCase():
      return ConditionOperator.NUMERIC_LESS_THAN_IFEXISTS;
    case 'NumericLessThanEqualsIfExists'.toLowerCase():
      return ConditionOperator.NUMERIC_LESS_THAN_EQUALS_IFEXISTS;
    case 'NumericGreaterThanIfExists'.toLowerCase():
      return ConditionOperator.NUMERIC_GREATER_THAN_IFEXISTS;
    case 'NumericGreaterThanEqualsIfExists'.toLowerCase():
      return ConditionOperator.NUMERIC_GREATER_THAN_EQUALS_IFEXISTS;
    case 'Bool'.toLowerCase():
      return ConditionOperator.BOOL;
    case 'BoolIfExists'.toLowerCase():
      return ConditionOperator.BOOL_IFEXISTS;
    case 'BinaryEquals'.toLowerCase():
      return ConditionOperator.BINARY_EQUALS;
    case 'ArnEquals'.toLowerCase():
      return ConditionOperator.ARN_EQUALS;
    case 'ArnLike'.toLowerCase():
      return ConditionOperator.ARN_LIKE;
    case 'ArnNotEquals'.toLowerCase():
      return ConditionOperator.ARN_NOT_EQUALS;
    case 'ArnNotLike'.toLowerCase():
      return ConditionOperator.ARN_NOT_LIKE;
    case 'ArnEqualsIfExists'.toLowerCase():
      return ConditionOperator.ARN_EQUALS_IFEXISTS;
    case 'ArnLikeIfExists'.toLowerCase():
      return ConditionOperator.ARN_LIKE_IFEXISTS;
    case 'ArnNotEqualsIfExists'.toLowerCase():
      return ConditionOperator.ARN_NOT_EQUALS_IFEXISTS;
    case 'ArnNotLikeIfExists'.toLowerCase():
      return ConditionOperator.ARN_NOT_LIKE_IFEXISTS;
    case 'IpAddress'.toLowerCase():
      return ConditionOperator.IP_ADDRESS;
    case 'IpAddressIfExists'.toLowerCase():
      return ConditionOperator.IP_ADDRESS_IFEXISTS;
    case 'NotIpAddress'.toLowerCase():
      return ConditionOperator.NOT_IP_ADDRESS;
    case 'NotIpAddressIfExists'.toLowerCase():
      return ConditionOperator.NOT_IP_ADDRESS_IFEXISTS;
    case 'Null'.toLowerCase():
      return ConditionOperator.NULL;
    case 'ForAnyValue:StringLike'.toLowerCase():
      return ConditionOperator.FOR_ANY_VALUE_STRING_LIKE;
    case 'ForAnyValue:StringEquals'.toLowerCase():
      return ConditionOperator.FOR_ANY_VALUE_STRING_EQUALS;
    case 'ForAllValues:StringEquals'.toLowerCase():
      return ConditionOperator.FOR_ALL_VALUES_STRING_EQUALS;
    case 'ForAllValues:StringEqualsIgnoreCase'.toLowerCase():
      return ConditionOperator.FOR_ALL_VALUES_STRING_EQUALS_IGNORECASE;
    case 'ForAllValues:StringLike':
      return ConditionOperator.FOR_ALL_VALUES_STRING_LIKE;
  }

  throw new Error('Not implemented');

}
