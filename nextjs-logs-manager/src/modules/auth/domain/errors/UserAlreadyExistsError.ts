import AuthUserError from "@/src/modules/auth/domain/errors/AuthUserError";

export default class UserAlreadyExistsError extends AuthUserError {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
  }
}
