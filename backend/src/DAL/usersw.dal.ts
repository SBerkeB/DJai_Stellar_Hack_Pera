import { getUserWithWalletCollection } from "../clients";

import { UserWithWalletModel } from "../models";

const createUser = async (Data: UserWithWalletModel) => {
  try {
    const collection = await getUserWithWalletCollection();
    const result = await collection.insertOne(Data);
    // Return the created user document with the inserted ID
    return {
      _id: result.insertedId,
      ...Data,
    };
  } catch (err) {
    throw err;
  }
};

const readUserById = async (spotifyId: number) => {
  try {
    const collection = await getUserWithWalletCollection();
    const spotify = await collection.findOne({ spotifyId: spotifyId });
    const result = spotify ? spotify : false;
    return result;
  } catch (err) {
    throw err;
  }
};

const readUserByWalletAddress = async (walletAddress: string) => {
  try {
    const collection = await getUserWithWalletCollection();
    const user = await collection.findOne({ walletAddress: walletAddress });
    const result = user ? user : false;
    return result;
  } catch (err) {
    throw err;
  }
};

const updateUserById = async (
  spotifyId: number,
  updateVariable: string,
  newData: any
) => {
  try {
    const collection = await getUserWithWalletCollection();
    const result = await collection.updateOne(
      { spotifyId: spotifyId },
      { $set: { [updateVariable]: newData } }
    );
    return result;
  } catch (err) {
    throw err;
  }
};

const updateUserByWalletAddress = async (
  walletAddress: string,
  updateVariable: string,
  newData: any
) => {
  try {
    const collection = await getUserWithWalletCollection();
    const result = await collection.updateOne(
      { walletAddress: walletAddress },
      { $set: { [updateVariable]: newData } }
    );
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteUserById = async (spotifyId: number) => {
  try {
    const collection = await getUserWithWalletCollection();
    const result = await collection.deleteOne({ spotifyId: spotifyId });
    return result;
  } catch (err) {
    throw err;
  }
};

const readAllUser = async () => {
  try {
    const collection = await getUserWithWalletCollection();
    const userList = await collection.find({}).toArray();
    return userList;
  } catch (err) {
    return err;
  }
};

const readLatestUser = async (latestN: number) => {
  try {
    const collection = await getUserWithWalletCollection();
    const userList = await collection
      .find({})
      .sort({ timestamp: 1 })
      .limit(latestN)
      .toArray();
    return userList;
  } catch (err) {
    return err;
  }
};

export {
  createUser,
  readUserById,
  updateUserById,
  updateUserByWalletAddress,
  deleteUserById,
  readAllUser,
  readLatestUser,
  readUserByWalletAddress,
};
