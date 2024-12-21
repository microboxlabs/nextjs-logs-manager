import AuthUserError from "@/src/modules/auth/domain/errors/AuthUserError";

export default class UserNotFoundError extends AuthUserError {
  constructor() {
    super(`Email not found, try with another one`);
  }
}
