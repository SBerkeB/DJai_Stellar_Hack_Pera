import { UserWithWalletModel } from "models/index";
import * as usersWDal from "../../DAL/usersw.dal";
export const connectWallet = async (
  displayName: string,
  walletAddress: string
) => {
  console.log("Connecting wallet with:", { displayName, walletAddress });

  const existingUser = await usersWDal.readUserByWalletAddress(walletAddress);
  console.log("Existing user found:", existingUser);

  if (existingUser) {
    return existingUser;
  }

  const user: UserWithWalletModel = {
    displayName: displayName,
    walletAddress: walletAddress,
    createdAt: new Date(),
    whiteListed: false,
  };

  console.log("Creating new user:", user);
  const createdUser = await usersWDal.createUser(user);
  console.log("Created user result:", createdUser);

  return createdUser;
};
