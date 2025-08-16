import type { Request } from "express";
import { User } from "../models/User";
import { extractBearer, verifyToken, JWTPayload } from "./auth";

/* ------------------------------------------------------------------ */
/* Context shape                                                       */
/* ------------------------------------------------------------------ */
export interface Context {
  user?: typeof User.prototype; // hydrated mongoose doc
  isAuthenticated: boolean;
}

/* ------------------------------------------------------------------ */
/* Factory                                                             */
/* ------------------------------------------------------------------ */
export const createContext = async ({
  req,
}: {
  req: Request;
}): Promise<Context> => {
  const raw = extractBearer(req.headers.authorization);
  if (!raw) return { isAuthenticated: false };

  let payload: JWTPayload;
  try {
    payload = verifyToken(raw);
  } catch {
    return { isAuthenticated: false };
  }

  const user = await User.findById(payload.userId);
  return {
    user: user ?? undefined,
    isAuthenticated: !!user,
  };
};
