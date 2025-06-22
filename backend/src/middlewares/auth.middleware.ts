import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;
  console.log("Token from cookie:", token);

  if (!token) {
    res.status(401).json({ error: "Missing authentication token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("Decoded Token:", decoded);

    (req as Request & { user?: string | JwtPayload }).user = decoded;
    next();
  } catch (err) {
    console.log("Token verification failed:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
