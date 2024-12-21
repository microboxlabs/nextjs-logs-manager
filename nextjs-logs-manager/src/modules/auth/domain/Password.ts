import ValueObject from "@/src/modules/shared/domain/ValueObject";

export default class Password {
  private constructor(public readonly value: string) {}

  static from(value: string | null | undefined): ValueObject<Password> {
    // sanitize the input
    value = value ?? "";
    if (value.length === 0) {
      return { error: "Password is required" };
    }
    // min length
    if (value.length < 8) {
      return { error: "Password is too short, min 8 characters" };
    }
    // max length
    if (value.length > 128) {
      return { error: "Password is too long, max 128 characters" };
    }
    return { valid: true, field: new Password(value) };
  }
}
