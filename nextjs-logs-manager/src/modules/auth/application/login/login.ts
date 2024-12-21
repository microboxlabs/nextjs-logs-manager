import Email from "@/src/modules/auth/domain/Email";
import AuthRepository from "@/src/modules/auth/domain/AuthRepository";
import AuthUserError from "@/src/modules/auth/domain/errors/AuthUserError";
import LoginResponse from "@/src/modules/auth/application/login/loginResponse";
import LoginRequest from "@/src/modules/auth/application/login/loginRequest";
import Password from "@/src/modules/auth/domain/Password";

export default async function login({
  request,
  repository,
}: {
  request: LoginRequest;
  repository: AuthRepository;
}): Promise<LoginResponse> {
  const email = Email.from(request.email);
  const password = Password.from(request.password);

  if (!email.valid) {
    return { type: "validation", error: email.error };
  }
  if (!password.valid) {
    return { type: "validation", error: password.error };
  }

  const result = await repository.search({
    email: email.field,
    password: password.field,
  });

  if (result instanceof AuthUserError) {
    return { type: "domain", error: result };
  }
  return { valid: true, user: result };
}
