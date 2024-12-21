import LoginRequest from "../application/login/loginRequest";
import AuthRepository from "@/src/modules/auth/domain/AuthRepository";
import PrismaAuthUserRepository from "@/src/modules/auth/infrastructure/PrismaAuthUserRepositoty";
import login from "@/src/modules/auth/application/login";
import RegisterRequest from "@/src/modules/auth/application/register/registerRequest";
import register from "../application/register";

export default class AuthService {
  private readonly repository: AuthRepository;

  constructor() {
    this.repository = new PrismaAuthUserRepository();
  }

  async login(payload: LoginRequest) {
    return login({
      request: payload,
      repository: this.repository,
    });
  }

  async register(payload: RegisterRequest) {
    return register({
      request: payload,
      repository: this.repository,
    });
  }
}
