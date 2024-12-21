import ValueObject from "../../shared/domain/ValueObject";

export default class FullName {
  private constructor(public readonly value: string) {}

  static from(value: string | null | undefined): ValueObject<FullName> {
    // remove unnecessary whitespaces
    value = (value ?? "")?.trim().replace(/\s+/g, " ");
    if (value.length === 0) {
      return { valid: false, error: "Full name is required" };
    }

    if (value.length < 2) {
      return { valid: false, error: "Full name is too short, min 2 chars." };
    }

    if (value.length > 256) {
      return { valid: false, error: "Full name is too long, max 256 chars." };
    }

    return { valid: true, field: new FullName(value) };
  }
}
