import { MongoClient, MongoError, Collection } from "mongodb";
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, "../../.env");

dotenv.config({ path: envPath });

const DB_URL = process.env.DB_URL || "";
const DB_NAME = process.env.DB_NAME || "";

let UserCollection: Collection;
let ChatsCollection: Collection;
let UserWithWalletCollection: Collection;

const runMongoClient = async () => {
  return MongoClient.connect(DB_URL)
    .then((client: MongoClient) => {
      console.log("MONGO CONNECTION SUCCESS");

      const dbo = client.db(DB_NAME);
      UserCollection = dbo.collection("users");
      ChatsCollection = dbo.collection("chats");
      UserWithWalletCollection = dbo.collection("usersWithWallet");

      return true;
    })
    .catch((err: MongoError) => {
      throw err;
    });
};

const getUserCollection = async () => UserCollection;
const getChatsCollection = async () => ChatsCollection;
const getUserWithWalletCollection = async () => UserWithWalletCollection;
export {
  runMongoClient,
  getUserCollection,
  getChatsCollection,
  getUserWithWalletCollection,
};
