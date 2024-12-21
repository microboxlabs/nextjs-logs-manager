import argon2 from "argon2";

export default class PasswordSecurity {
  private readonly saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds < 1 ? 10 : saltRounds;
  }

  hash(password: string) {
    return argon2.hash(password);
  }

  compare({ password, hash }: { password: string; hash: string }) {
    return argon2.verify(hash, password);
  }
}
