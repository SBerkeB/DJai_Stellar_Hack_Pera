import { Request, Response } from "express";
import * as connectionService from "./connection.service";

export const connectWallet = async (req: Request, res: Response) => {
  try {
    const { walletAddress, displayName } = req.body;
    const user = await connectionService.connectWallet(
      displayName,
      walletAddress
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
