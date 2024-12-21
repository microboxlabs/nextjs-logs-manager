import AuthUser from "@/src/modules/auth/domain/AuthUser";
import UserNotFoundError from "@/src/modules/auth/domain/errors/UserNotFoundError";
import UserAlreadyExistsError from "@/src/modules/auth/domain/errors/UserAlreadyExistsError";
import WrongPasswordError from "@/src/modules/auth/domain/errors/WrongPasswordError";
import Email from "@/src/modules/auth/domain/Email";
import Password from "@/src/modules/auth/domain/Password";
import FullName from "@/src/modules/auth/domain/FullName";

export default interface AuthRepository {
  search(payload: {
    email: Email;
    password: Password;
  }): Promise<UserNotFoundError | WrongPasswordError | AuthUser>;

  register(payload: {
    fullName: FullName;
    email: Email;
    password: Password;
  }): Promise<AuthUser | UserAlreadyExistsError>;
}
