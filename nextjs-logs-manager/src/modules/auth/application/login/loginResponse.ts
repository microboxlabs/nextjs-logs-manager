import AuthUserError from "@/src/modules/auth/domain/errors/AuthUserError";
import AuthUser from "@/src/modules/auth/domain/AuthUser";

type LoginResponse =
  | {
      valid?: false;
      type: "validation";
      error: string;
    }
  | {
      valid?: false;
      type: "domain";
      error: AuthUserError;
    }
  | {
      valid: true;
      user: AuthUser;
    };

export default LoginResponse;
