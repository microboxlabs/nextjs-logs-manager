import AuthUserRole from "@/src/modules/auth/domain/AuthUserRole";

type AuthUser = {
  fullName: string;
  email: string;
  role: AuthUserRole;
};

export default AuthUser;
