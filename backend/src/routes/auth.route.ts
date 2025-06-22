import express, { Router } from "express";

import { login, register } from "../components/auth/auth.controller";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
