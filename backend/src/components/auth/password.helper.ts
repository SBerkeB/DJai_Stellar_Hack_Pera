const argon2 = require("argon2");

export const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await argon2.verify(hashedPassword, password);
};
