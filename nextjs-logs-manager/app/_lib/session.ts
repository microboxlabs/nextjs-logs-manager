/* 
    The session is the element that a website uses to coorelate the "device" with a sesion from the database
    in this case we will save this data in the localstorage for easy access, but if we somehow do db based session storing
    we could make something like letting the user "close his sessions on all devices" or even check where is a session open.
*/

import "server-only";

import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

if (!process.env.SECRET) {
  throw new Error("The SECRET value is not setted on the .env file");
}

const secret = new TextEncoder().encode(process.env.SECRET);
const alg = "HS256";

const cookie = {
  name: "session",
  options: {
    httpOnly: true, // the cookie will only be sent through http or https
    secure: true, // the cookie is only sent through https
    sameSite: "lax" as const, // this lets cookies be sent through links but no embeded content (to avoid a especicfic kind of attack called "CSRF")
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000,
};

export const encrypt = async (payload: JWTPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);
};

interface CustomJWTPayload extends JWTPayload {
  userId: number;
  roleId: number;
}

export const decrypt = async (
  session: string,
): Promise<CustomJWTPayload | null> => {
  try {
    const result = await jwtVerify(session, secret, {
      algorithms: [alg],
    });

    return result.payload as CustomJWTPayload;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createSession = async (userId: number, roleId: number) => {
  const expires = new Date(Date.now() + cookie.duration); // the session will expirate 24 hours from now
  const session = await encrypt({ userId, roleId, expires });

  cookies().set(cookie.name, session, { ...cookie.options, expires });

  redirect("/");
};

// the should redirect is setted for cases that dont need to redirect if there is no session (like a navbar)
export const verifySession = async (should_redirect: boolean) => {
  const verifiable_cookie = cookies().get(cookie.name)?.value;

  if (!verifiable_cookie) {
    if (should_redirect) {
      redirect("/login");
    } else {
      return;
    }
  }

  const session = await decrypt(verifiable_cookie);

  if (!session?.userId) {
    if (should_redirect) {
      redirect("/login");
    } else {
      return;
    }
  }

  return { userId: session.userId, roleId: session.roleId };
};

export const deleteSession = async () => {
  "use server";
  cookies().delete("session");
  redirect("/login");
};
