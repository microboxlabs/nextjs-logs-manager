import AuthUser from "@/src/modules/auth/domain/AuthUser";
import { cookies } from "next/headers";
import { jwtVerify as verify } from "jose";

const getActiveUser = async () => {
  const cookieStore = cookies();
  try {
    const authCookie = cookieStore.get("auth-token");
    if (!authCookie) {
      return undefined;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return undefined;
    }
    const result = await verify(
      authCookie.value,
      new TextEncoder().encode(secret),
    );
    if (!result) {
      return undefined;
    }
    return result.payload as AuthUser;
  } catch (e) {
    console.error({ error: e, cookie: cookieStore });
    return undefined;
  }
};

export default getActiveUser;
