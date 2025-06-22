export default interface UserModel {
  userName: string;
  emailAddress: string;
  password: string;
  createdAt: Date;
  whiteListed: boolean;
  musicPreferences?: Array<string>;
  artistPreferences?: Array<string>;
  musicsPreferences?: Array<string>;
  lastLogin?: Date;
}

export interface UserModelWithId extends UserModel {
  _id: string; // MongoDB ObjectId
}

export interface UserChangeModel {
  _id: object;
  operationType: string;
  clusterTime: object;
  wallTime: string;
  fullDocument: UserModelWithId;
  ns: object;
  documentKey: object;
}
