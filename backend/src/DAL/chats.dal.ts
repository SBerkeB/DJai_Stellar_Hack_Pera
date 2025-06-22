import { getChatsCollection } from "../clients"

import { ChatModel } from "../models";




const createChat = async (Data: ChatModel)  => {
    try {
        const collection = await getChatsCollection();
        const result = await collection.insertOne(Data);
        return result;
    } catch (err) {
        return err;
    }
}

const readChatById = async (postId: number) => {
    try {
        const collection = await getChatsCollection();
        const chat = await collection.findOne({ "postId": postId });
        const result = chat ?  chat :  false;
        return result;
    } catch (err) {
        return err;
    }
}


const updateChatById = async (chatId: number, updateVariable: string, newData: any) => {
    try {
        const collection = await getChatsCollection();
        const result = await collection.updateOne({"postId": chatId}, {$set: {[updateVariable]: newData}});
        return result;
    } catch (err) {
        return err;
    }
}

const deleteChatById = async (postId: number) => {
    try {
        const collection = await getChatsCollection();
        const result = await collection.deleteOne({"postId": postId});
        return result;
    } catch (err) {
        return  err;
    }
}

const readAllChats = async () => {
    try {
        const collection = await getChatsCollection();
        const chatsList = await collection.find({}).toArray();
        return chatsList;
    } catch (err) {
        return err;
    }
}

const readLatestChats = async (latestN: number) => {
    try {
        const collection = await getChatsCollection();
        const latestItems = await collection.find({}).sort({ dateTime: -1 }).limit(latestN).toArray(); 
        return latestItems;
    } catch (err) {
        return err;
    }
}

export {
    createChat,
    readChatById,
    updateChatById,
    deleteChatById,
    readAllChats,
    readLatestChats
};