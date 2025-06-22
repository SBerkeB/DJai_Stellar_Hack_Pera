import express, { Router } from "express";

import { login, register } from "../components/auth/auth.controller";
import { connectWallet } from "../components/wallet-connection/connection.controller";

const connectWalletRouter = express.Router();

connectWalletRouter.post("/wallet-connect", connectWallet);

export default connectWalletRouter;
