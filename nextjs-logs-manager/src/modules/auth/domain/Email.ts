import ValueObject from "@/src/modules/shared/domain/ValueObject";

export default class Email {
  private constructor(public readonly value: string) {}
  static from(value: string | null | undefined): ValueObject<Email> {
    // remove unnecessary whitespaces
    value = (value ?? "")?.trim().replace(/\s+/g, " ");
    if (value.length === 0) {
      return { valid: false, error: "Email is required" };
    }

    if (value.length < 6) {
      return { valid: false, error: "Email is too short, min 6 chars." };
    }

    if (value.length > 256) {
      return { valid: false, error: "Email is too long, max 256 chars." };
    }

    // check allowed characters: alphanumeric username, which can include dots, underscores, percentage signs, plus signs, and hyphens.
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(value)) {
      return { valid: false, error: "Invalid email format" };
    }

    return { valid: true, field: new Email(value) };
  }
}
