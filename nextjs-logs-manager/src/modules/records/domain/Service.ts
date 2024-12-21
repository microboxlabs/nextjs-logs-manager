import ValueObject from "../../shared/domain/ValueObject";

export default class Service {
  constructor(readonly value: string) {}

  static from(value: string | null | undefined): ValueObject<Service> {
    value = (value ?? "").trim();
    if (value.length === 0) {
      return { valid: false, error: "Service name is required" };
    }
    // min length: 4
    if (value.length < 4) {
      return { valid: false, error: "Service name is too short, min 4 chars." };
    }
    // max length: 256
    if (value.length > 256) {
      return {
        valid: false,
        error: "Service name is too long, max 256 chars.",
      };
    }
    return { valid: true, field: new Service(value) };
  }
}
