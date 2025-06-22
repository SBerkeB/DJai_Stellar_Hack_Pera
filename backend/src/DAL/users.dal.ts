import { getUserCollection } from "../clients";

import { UserModel } from "../models";

const createUser = async (Data: UserModel) => {
  try {
    const collection = await getUserCollection();
    const result = await collection.insertOne(Data);
    return result;
  } catch (err) {
    throw err;
  }
};

const readUserById = async (spotifyId: number) => {
  try {
    const collection = await getUserCollection();
    const spotify = await collection.findOne({ spotifyId: spotifyId });
    const result = spotify ? spotify : false;
    return result;
  } catch (err) {
    throw err;
  }
};

const readUserByEmail = async (email: string) => {
  try {
    const collection = await getUserCollection();
    const user = await collection.findOne({ emailAddress: email });
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
    const collection = await getUserCollection();
    const result = await collection.updateOne(
      { spotifyId: spotifyId },
      { $set: { [updateVariable]: newData } }
    );
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteUserById = async (spotifyId: number) => {
  try {
    const collection = await getUserCollection();
    const result = await collection.deleteOne({ spotifyId: spotifyId });
    return result;
  } catch (err) {
    throw err;
  }
};

const readAllUser = async () => {
  try {
    const collection = await getUserCollection();
    const userList = await collection.find({}).toArray();
    return userList;
  } catch (err) {
    return err;
  }
};

const readLatestUser = async (latestN: number) => {
  try {
    const collection = await getUserCollection();
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
  deleteUserById,
  readAllUser,
  readLatestUser,
  readUserByEmail,
};
