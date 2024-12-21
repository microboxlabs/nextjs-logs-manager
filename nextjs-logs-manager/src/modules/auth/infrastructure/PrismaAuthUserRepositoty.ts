import AuthRepository from "@/src/modules/auth/domain/AuthRepository";
import AuthUser from "@/src/modules/auth/domain/AuthUser";
import UserNotFoundError from "@/src/modules/auth/domain/errors/UserNotFoundError";
import UserAlreadyExistsError from "@/src/modules/auth/domain/errors/UserAlreadyExistsError";
import WrongPasswordError from "@/src/modules/auth/domain/errors/WrongPasswordError";
import Password from "@/src/modules/auth/domain/Password";
import Email from "@/src/modules/auth/domain/Email";
import FullName from "@/src/modules/auth/domain/FullName";
import { PrismaRepository } from "@/src/modules/shared/infrastructure/PrismaRepository";
import PasswordSecurity from "@/src/modules/auth/domain/PasswordSecurity";
import AuthUserRole from "@/src/modules/auth/domain/AuthUserRole";

export default class PrismaAuthUserRepository
  extends PrismaRepository
  implements AuthRepository
{
  async search(payload: {
    email: Email;
    password: Password;
  }): Promise<UserNotFoundError | WrongPasswordError | AuthUser> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: payload.email.value,
      },
      select: {
        fullName: true,
        email: true,
        role: {
          select: {
            name: true,
          },
        },
        password: true,
      },
    });
    if (!user) {
      return new UserNotFoundError();
    }
    const security = new PasswordSecurity();
    // compare password
    const match = await security.compare({
      password: payload.password.value,
      hash: user.password,
    });
    if (!match) {
      return new WrongPasswordError(payload.email.value);
    }
    return {
      fullName: user.fullName,
      email: user.email,
      role: user.role.name as AuthUserRole,
    };
  }

  async register(payload: {
    fullName: FullName;
    email: Email;
    password: Password;
  }) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: payload.email.value,
      },
    });
    if (existingUser) {
      return new UserAlreadyExistsError(payload.email.value);
    }
    const security = new PasswordSecurity();
    // hash password
    const hash = await security.hash(payload.password.value);
    // create user
    const user = await this.prisma.user.create({
      data: {
        fullName: payload.fullName.value,
        email: payload.email.value,
        password: hash,
        role: {
          connect: {
            name: AuthUserRole.user,
          },
        },
      },
      include: {
        role: true,
      },
    });
    return {
      fullName: user.fullName,
      email: user.email,
      role: user.role.name as AuthUserRole,
    };
  }
}
