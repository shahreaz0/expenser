import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
  type UserType,
} from "@kinde-oss/kinde-typescript-sdk";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

export const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: process.env.KINDE_DOMAIN!,
  clientId: process.env.KINDE_CLIENT_ID!,
  clientSecret: process.env.KINDE_CLIENT_SECRET,
  redirectURL: process.env.KINDE_REDIRECT_URI!,
  logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI,
});

export function sessionManager(c: Context): SessionManager {
  return {
    async getSessionItem(key: string) {
      const res = getCookie(c, key);

      return res;
    },
    async setSessionItem(key: string, value: unknown) {
      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      } as const;

      if (typeof value === "string") {
        setCookie(c, key, value, cookieOptions);
      } else {
        setCookie(c, key, JSON.stringify(value), cookieOptions);
      }
    },
    async removeSessionItem(key: string) {
      deleteCookie(c, key);
    },
    async destroySession() {
      ["id_token", "access_token", "refresh_token", "user"].forEach((key) => {
        deleteCookie(c, key);
      });
    },
  };
}

import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

type Env = {
  Variables: {
    user: UserType;
  };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const user = await kindeClient.getUserProfile(sessionManager(c));

    c.set("user", user);

    await next();
  } catch (error) {
    console.log(error);
    throw new HTTPException(401, {
      message: "Unauthorize",
    });
  }
});
