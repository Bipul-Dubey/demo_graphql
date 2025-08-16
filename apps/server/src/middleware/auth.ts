import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export interface JWTPayload {
  userId: string;
  email: string;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const JWT_SECRET = process.env.JWT_SECRET!;
const TOKEN_TTL = "7d"; // change to taste

export const generateToken = (payload: JWTPayload): string =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_TTL });

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    throw new AuthenticationError("Invalid or expired token");
  }
};

export const extractBearer = (authHeader?: string): string | null => {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(" ");
  return scheme === "Bearer" ? token : null;
};
