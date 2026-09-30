import jwt from "jsonwebtoken";

export type TokenData = {
  userId: number;
  email: string;
  role: "GUEST" | "HOST" | "GUIDE" | "ADMIN";
};

const secret = process.env.JWT_SECRET ?? "";

if (!secret) {
  throw new Error("JWT_SECRET is missing");
}

export function createToken(data: TokenData): string {
  return jwt.sign(data, secret, {
    expiresIn: "7d",
  });
}


export function verifyToken(token: string): TokenData | null {
  try {
    const decoded = jwt.verify(token, secret);

    console.log("JWT DECODED:", decoded);

    if (typeof decoded === "string") {
      console.log("JWT ERROR: decoded token is string");
      return null;
    }

    if (
      typeof decoded.userId !== "number" ||
      typeof decoded.email !== "string" ||
      !["GUEST", "HOST", "GUIDE", "ADMIN"].includes(
        decoded.role as string
      )
    ) {
      console.log("JWT ERROR: invalid payload:", decoded);
      return null;
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role as TokenData["role"],
    };
  } catch (error) {
    console.error("JWT VERIFY ERROR:", error);
    return null;
  }
}