import ValueObject from "@/src/modules/shared/domain/ValueObject";

export default class Timestamp {
  constructor(readonly value: Date) {}

  static from(value: string | null | undefined): ValueObject<Timestamp> {
    value = (value ?? "").trim().replace("s+", " ");
    // expected format: YYYY-MM-DD HH:MM:SS
    const pattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (!pattern.test(value)) {
      return { valid: false, error: "Invalid timestamp" };
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return { valid: false, error: "Invalid timestamp" };
    }
    return { valid: true, field: new Timestamp(date) };
  }

  toString(): string {
    return this.value
      .toLocaleString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(",", "");
  }
}
