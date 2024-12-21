import RegisterRequest from "./registerRequest";
import AuthRepository from "@/src/modules/auth/domain/AuthRepository";
import Email from "@/src/modules/auth/domain/Email";
import FullName from "@/src/modules/auth/domain/FullName";
import Password from "@/src/modules/auth/domain/Password";
import RegisterResponse from "@/src/modules/auth/application/register/registerResponse";
import AuthUserError from "@/src/modules/auth/domain/errors/AuthUserError";

export default async function register({
  request,
  repository,
}: {
  request: RegisterRequest;
  repository: AuthRepository;
}): Promise<RegisterResponse> {
  const fullName = FullName.from(request.fullName);
  const email = Email.from(request.email);
  const password = Password.from(request.password);

  if (!fullName.valid) {
    return { type: "validation", error: fullName.error };
  }
  if (!email.valid) {
    return { type: "validation", error: email.error };
  }
  if (!password.valid) {
    return { type: "validation", error: password.error };
  }

  const result = await repository.register({
    fullName: fullName.field,
    email: email.field,
    password: password.field,
  });
  if (result instanceof AuthUserError) {
    return { type: "domain", error: result };
  }
  return { valid: true, user: result };
}
