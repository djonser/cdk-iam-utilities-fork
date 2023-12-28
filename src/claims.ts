import { Annotations } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AwsPrincipalTagConditionKey, AwsRequestTagConditionKey } from './condition-keys';

export interface Claim {

  /**
   * Name represents the original value of the claim/attribute
   */
  readonly name: string;
  /**
   * Tag Name is name of the tag corresponding to name.
   * It can either match name or be a different value
   */
  readonly tagName: string;
}

// Represents something holding a list of claims that have been defined.
export interface IMappedClaims {
  get claims(): Claim[];
}

export interface IClaimsContext {
  readonly mappedClaims: IMappedClaims;
  readonly knownClaims: string[];
}

export class MappedClaims implements IMappedClaims {

  static create(claim: string, ...additionalClaims: string[]): MappedClaims {
    return new MappedClaims([claim, ...additionalClaims].map(x => ({
      tagName: x,
      name: x,
    })));
  }

  static createMapped(claims: { [key: string]: string }): MappedClaims {
    return new MappedClaims(Object.keys(claims).map(claim => ({
      name: claim,
      tagName: claims[claim],
    })));
  }


  get claims(): Claim[] {
    return this._claims;
  }

  private constructor(private readonly _claims: Claim[]) {
  }
}

export class ClaimsUtility {

  static forContext(context: IClaimsContext): ClaimsUtility {
    return new ClaimsUtility(context.knownClaims, context.mappedClaims);
  }

  public readonly knownClaims: string[];
  public readonly mappedClaims: IMappedClaims;

  private constructor(knownClaims: string[], mappedClaims: IMappedClaims) {
    this.knownClaims = knownClaims;
    this.mappedClaims = mappedClaims;
  }

  tagNameForClaim(claim: string): string {

    if (this.knownClaims.length > 0 && !this.knownClaims.includes(claim)) {
      throw new Error(`The claim "${claim}" is not a known claim`);
    }

    const claimObj = this.mappedClaims.claims.filter(x => x.name === claim || x.tagName === claim);

    if (claimObj.length === 0) {
      throw new Error(`The claim "${claim}" is not a mapped claim`);
    } else if (claimObj.length > 1) {
      throw new Error(`The claim "${claim}" was found both as a claim and tag name in different mapped claims`);
    }

    return claimObj[0].tagName;
  }

  tagName(scope: Construct, claim: string): string {

    if (this.knownClaims.length > 0 && !this.knownClaims.includes(claim)) {
      Annotations.of(scope).addError(`The claim "${claim}" is not a mapped claim`);
    }

    const claimObj = this.mappedClaims.claims.filter(x => x.name === claim || x.tagName === claim);

    if (claimObj.length === 0) {
      Annotations.of(scope).addError(`Claim ${claim} is not mapped`);
      return '';
    } else if (claimObj.length > 1) {
      Annotations.of(scope).addError(`The claim "${claim}" was found both as a claim and tag name in different mapped claims`);
      return '';
    }

    return claimObj[0].tagName;
  }

  public requestTagCondition(claim: string): AwsRequestTagConditionKey {
    return AwsRequestTagConditionKey.tag(this.tagNameForClaim(claim));
  }

  public principalTagCondition(claim: string): AwsPrincipalTagConditionKey {
    return AwsPrincipalTagConditionKey.tag(this.tagNameForClaim(claim));
  }
}
