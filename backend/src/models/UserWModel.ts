export default interface UserWithWalletModel {
  displayName: string;
  walletAddress: string;
  createdAt: Date;
  whiteListed: boolean;
  musicPreferences?: Array<string>;
  artistPreferences?: Array<string>;
  musicsPreferences?: Array<string>;
}

export interface UserWithWalletModelWithId extends UserWithWalletModel {
  _id: string; // MongoDB ObjectId
}

export interface UserWithWalletChangeModel {
  _id: object;
  operationType: string;
  clusterTime: object;
  wallTime: string;
  fullDocument: UserWithWalletModelWithId;
  ns: object;
  documentKey: object;
}
