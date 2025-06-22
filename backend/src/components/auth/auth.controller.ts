import { Request, Response, NextFunction } from "express";

import * as authService from "./auth.service";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await authService.registerUser(username, email, password);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("Logging user in.");
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Missing email or password" });
      return;
    }
    const existingUser = await authService.loginUser(email, password);

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("JWT secret key is missing in environment variables");
    }

    const token = jwt.sign({ id: existingUser.user_id }, secretKey, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
