export class PolicyVariable {

  static username(defaultValue?: string): PolicyVariable {
    return new PolicyVariable('username', defaultValue);
  }

  static principalType(defaultValue?: string): PolicyVariable {
    return new PolicyVariable('principalType', defaultValue);
  }

  static userId(defaultValue?: string): PolicyVariable {
    return new PolicyVariable('userId', defaultValue);
  }

  static principalTag(tagName: string, defaultValue?: string): PolicyVariable {
    return new PolicyVariable('principalTag', defaultValue, tagName);
  }

  static requestTag(tagName: string, defaultValue?: string): PolicyVariable {
    return new PolicyVariable('requestTag', defaultValue, tagName);
  }

  static resourceTag(tagName: string, defaultValue?: string): PolicyVariable {
    return new PolicyVariable('resourceTag', defaultValue, tagName);
  }

  private constructor(public readonly type: string, public readonly defaultValue?: string, public readonly tagName?: string) {
  }

  get isTag(): boolean {
    return ['principalTag', 'resourceTag', 'requestTag'].includes(this.type);
  }

  toString(): string {

    let defaultValueStr = '';

    if (this.defaultValue) {
      defaultValueStr = `, '${this.defaultValue}'`;
    }

    if (!this.isTag) {
      return `\${aws:${this.type}${defaultValueStr}}`;
    }

    return `\${aws:${this.type}/${this.tagName}${defaultValueStr}}`;

  }

}
