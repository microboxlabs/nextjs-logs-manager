import AuthUserError from "@/src/modules/auth/domain/errors/AuthUserError";

export default class WrongPasswordError extends AuthUserError {
  constructor(email: string) {
    super(`Wrong password, try with another one.`);
  }
}
