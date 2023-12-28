export interface ConditionKeySettings {
  readonly supportedOperators: string[];
}

export abstract class ConditionKey {

  protected constructor(public readonly name: string, public readonly settings: ConditionKeySettings) {
  }

  toString(): string {
    return this.name;
  }

}

export abstract class BoolConditionKey extends ConditionKey {

  protected constructor(name: string, settings: ConditionKeySettings) {
    super(name, settings);
  }
}

// Can be used to represent any conditionKey not available as a type.
export class GenericConditionKey extends ConditionKey {

  public static custom(name: string, settings: ConditionKeySettings): GenericConditionKey {
    return new GenericConditionKey(name, settings);
  }

  private constructor(name: string, settings: ConditionKeySettings) {
    super(name, settings);
  }
}
