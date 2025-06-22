export default interface ChatModel {
    userId: string; // MongoDB ObjectId
    messages: Array<{
        role: "user" | "assistant";
        content: string;
        timestamp: number;
        date: Date;
    }>;
}

export interface ChatModelWithId extends ChatModel {
    _id: string; // MongoDB ObjectId
}

export interface ChatChangeModel {
  _id: object;
  operationType: string;
  clusterTime: object;
  wallTime: string;
  fullDocument: ChatModelWithId;
  ns: object;
  documentKey: object;
}