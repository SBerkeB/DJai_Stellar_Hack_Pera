import { UserModel } from "models/index";
import * as usersDal from "../../DAL/users.dal";
import { hashPassword, comparePassword } from "./password.helper";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const existingUser = await usersDal.readUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already in use");
  }
  const hashedPassword = await hashPassword(password);
  const user: UserModel = {
    userName: username,
    password: hashedPassword,
    emailAddress: email,
    createdAt: new Date(),
    whiteListed: false,
  };
  return await usersDal.createUser(user);
};

export const loginUser = async (email: string, password: string) => {
  const existingUser = await usersDal.readUserByEmail(email);
  console.log("existingUser", existingUser);
  if (!existingUser) {
    throw new Error("User not found.");
  }

  const isValidPassword = await comparePassword(
    password,
    existingUser.password
  );
  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }
  return existingUser;
};
