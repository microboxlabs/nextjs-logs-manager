import ValueObject from "../../shared/domain/ValueObject";

export default class Message {
  constructor(readonly value: string) {}

  static from(value: string | null | undefined): ValueObject<Message> {
    value = (value ?? "").trim();
    if (value.length === 0) {
      return { valid: false, error: "Message is required" };
    }
    // min length: 4
    if (value.length < 4) {
      return { valid: false, error: "Message is too short, min 4 chars." };
    }
    if (value.length > 1024) {
      return { valid: false, error: "Message is too long, max 1024 chars." };
    }
    return { valid: true, field: new Message(value) };
  }
}
