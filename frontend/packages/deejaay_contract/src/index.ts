import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDTCCJSV63NAWSX66VQNVU7U7FB4VXNNT7A2WW2WIEOOG2BSV2NZUSJQ",
  }
} as const

export type DataKey = {tag: "Admin", values: void} | {tag: "UserCount", values: void} | {tag: "User", values: readonly [u32]};


export interface User {
  apikey: string;
  author: string;
  ledger: u32;
}

export const Errors = {
  1: {message:"InvalidUser"},
  2: {message:"NoSuchUser"},
  3: {message:"UnauthorizedToEdit"},
  4: {message:"NoDonations"}
}

export interface Client {
  /**
   * Construct and simulate a upgrade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Upgrade the contract's Wasm bytecode.
   * 
   * # Arguments
   * 
   * * `new_wasm_hash` - Hash identifier for the bytecode that should be
   * henceforth used by this contract. The bytecode must already be
   * installed and present on-chain.
   * 
   * # Panics
   * 
   * * If the Wasm bytecode is not already installed on-chain.
   */
  upgrade: ({new_wasm_hash}: {new_wasm_hash: Buffer}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a write_user transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Write a message to the guestbook.
   * 
   * # Arguments
   * 
   * * `author` - The sender of the message.
   * * `title` - The title or subject of the guestbook message.
   * * `text` - The body or contents of the guestbook message.
   * 
   * # Panics
   * 
   * * If the `title` argument is empty or missing.
   * * If the `text` argument is empty or missing.
   */
  write_user: ({author, apikey}: {author: string, apikey: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u32>>>

  /**
   * Construct and simulate a edit_user transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Edit a specified message in the guestbook.
   * 
   * # Arguments
   * 
   * * `message_id` - The ID number of the message to edit.
   * * `title` - The title or subject of the guestbook message.
   * * `text` - The body or contents of the guestbook message.
   * 
   * # Panics
   * 
   * * If both the `title` AND `text` arguments are empty or missing.
   * * If there is no authorization from the original message author.
   */
  edit_user: ({user_id, apikey}: {user_id: u32, apikey: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a read_user transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Read a specified message from the guestbook.
   * 
   * # Arguments
   * 
   * * `message_id` - The ID number of the message to retrieve.
   * 
   * # Panics
   * 
   * * If the message ID is not associated with a message.
   */
  read_user: ({user_id}: {user_id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<User>>>

  /**
   * Construct and simulate a read_latest transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Read the latest message to be sent to the guestbook.
   */
  read_latest: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<User>>>

  /**
   * Construct and simulate a claim_donations transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Claim any donations that have been made to the guestbook contract.
   * 
   * # Panics
   * 
   * * If the contract is not holding any donations balance.
   */
  claim_donations: ({token}: {token: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<i128>>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
        /** Constructor/Initialization Args for the contract's `__constructor` method */
        {admin, apikey}: {admin: string, apikey: string},
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy({admin, apikey}, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAAAAAZFJbml0aWFsaXplcyB0aGUgZ3Vlc3Rib29rIHdpdGggYSB3YXJtIHdlbGNvbWUgbWVzc2FnZSBmb3IgcHJvc3BlY3RpdmUKc2lnbmVycyB0byByZWFkLgoKIyBBcmd1bWVudHMKCiogYGFkbWluYCAtIFRoZSBhZGRyZXNzIHdoaWNoIHdpbGwgYmUgdGhlIG93bmVyIGFuZCBhZG1pbmlzdHJhdG9yIG9mIHRoZQpndWVzdGJvb2suCiogYHRpdGxlYCAtIFRoZSB0aXRsZSBvciBzdWJqZWN0IG9mIHRoZSB3ZWxjb21lIG1lc3NhZ2UuCiogYHRleHRgIC0gVGhlIGJvZHkgb3IgY29udGVudHMgb2YgdGhlIHdlbGNvbWUgbWVzc2FnZS4KCiMgUGFuaWNzCgoqIElmIHRoZSBgdGl0bGVgIGFyZ3VtZW50IGlzIGVtcHR5IG9yIG1pc3NpbmcuCiogSWYgdGhlIGB0ZXh0YCBhcmd1bWVudCBpcyBlbXB0eSBvciBtaXNzaW5nLgAAAAAAAA1fX2NvbnN0cnVjdG9yAAAAAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAZhcGlrZXkAAAAAABAAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAARtVcGdyYWRlIHRoZSBjb250cmFjdCdzIFdhc20gYnl0ZWNvZGUuCgojIEFyZ3VtZW50cwoKKiBgbmV3X3dhc21faGFzaGAgLSBIYXNoIGlkZW50aWZpZXIgZm9yIHRoZSBieXRlY29kZSB0aGF0IHNob3VsZCBiZQpoZW5jZWZvcnRoIHVzZWQgYnkgdGhpcyBjb250cmFjdC4gVGhlIGJ5dGVjb2RlIG11c3QgYWxyZWFkeSBiZQppbnN0YWxsZWQgYW5kIHByZXNlbnQgb24tY2hhaW4uCgojIFBhbmljcwoKKiBJZiB0aGUgV2FzbSBieXRlY29kZSBpcyBub3QgYWxyZWFkeSBpbnN0YWxsZWQgb24tY2hhaW4uAAAAAAd1cGdyYWRlAAAAAAEAAAAAAAAADW5ld193YXNtX2hhc2gAAAAAAAPuAAAAIAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAATRXcml0ZSBhIG1lc3NhZ2UgdG8gdGhlIGd1ZXN0Ym9vay4KCiMgQXJndW1lbnRzCgoqIGBhdXRob3JgIC0gVGhlIHNlbmRlciBvZiB0aGUgbWVzc2FnZS4KKiBgdGl0bGVgIC0gVGhlIHRpdGxlIG9yIHN1YmplY3Qgb2YgdGhlIGd1ZXN0Ym9vayBtZXNzYWdlLgoqIGB0ZXh0YCAtIFRoZSBib2R5IG9yIGNvbnRlbnRzIG9mIHRoZSBndWVzdGJvb2sgbWVzc2FnZS4KCiMgUGFuaWNzCgoqIElmIHRoZSBgdGl0bGVgIGFyZ3VtZW50IGlzIGVtcHR5IG9yIG1pc3NpbmcuCiogSWYgdGhlIGB0ZXh0YCBhcmd1bWVudCBpcyBlbXB0eSBvciBtaXNzaW5nLgAAAAp3cml0ZV91c2VyAAAAAAACAAAAAAAAAAZhdXRob3IAAAAAABMAAAAAAAAABmFwaWtleQAAAAAAEAAAAAEAAAPpAAAABAAAAAM=",
        "AAAAAAAAAXFFZGl0IGEgc3BlY2lmaWVkIG1lc3NhZ2UgaW4gdGhlIGd1ZXN0Ym9vay4KCiMgQXJndW1lbnRzCgoqIGBtZXNzYWdlX2lkYCAtIFRoZSBJRCBudW1iZXIgb2YgdGhlIG1lc3NhZ2UgdG8gZWRpdC4KKiBgdGl0bGVgIC0gVGhlIHRpdGxlIG9yIHN1YmplY3Qgb2YgdGhlIGd1ZXN0Ym9vayBtZXNzYWdlLgoqIGB0ZXh0YCAtIFRoZSBib2R5IG9yIGNvbnRlbnRzIG9mIHRoZSBndWVzdGJvb2sgbWVzc2FnZS4KCiMgUGFuaWNzCgoqIElmIGJvdGggdGhlIGB0aXRsZWAgQU5EIGB0ZXh0YCBhcmd1bWVudHMgYXJlIGVtcHR5IG9yIG1pc3NpbmcuCiogSWYgdGhlcmUgaXMgbm8gYXV0aG9yaXphdGlvbiBmcm9tIHRoZSBvcmlnaW5hbCBtZXNzYWdlIGF1dGhvci4AAAAAAAAJZWRpdF91c2VyAAAAAAAAAgAAAAAAAAAHdXNlcl9pZAAAAAAEAAAAAAAAAAZhcGlrZXkAAAAAABAAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAALZSZWFkIGEgc3BlY2lmaWVkIG1lc3NhZ2UgZnJvbSB0aGUgZ3Vlc3Rib29rLgoKIyBBcmd1bWVudHMKCiogYG1lc3NhZ2VfaWRgIC0gVGhlIElEIG51bWJlciBvZiB0aGUgbWVzc2FnZSB0byByZXRyaWV2ZS4KCiMgUGFuaWNzCgoqIElmIHRoZSBtZXNzYWdlIElEIGlzIG5vdCBhc3NvY2lhdGVkIHdpdGggYSBtZXNzYWdlLgAAAAAACXJlYWRfdXNlcgAAAAAAAAEAAAAAAAAAB3VzZXJfaWQAAAAABAAAAAEAAAPpAAAH0AAAAARVc2VyAAAAAw==",
        "AAAAAAAAADRSZWFkIHRoZSBsYXRlc3QgbWVzc2FnZSB0byBiZSBzZW50IHRvIHRoZSBndWVzdGJvb2suAAAAC3JlYWRfbGF0ZXN0AAAAAAAAAAABAAAD6QAAB9AAAAAEVXNlcgAAAAM=",
        "AAAAAAAAAIVDbGFpbSBhbnkgZG9uYXRpb25zIHRoYXQgaGF2ZSBiZWVuIG1hZGUgdG8gdGhlIGd1ZXN0Ym9vayBjb250cmFjdC4KCiMgUGFuaWNzCgoqIElmIHRoZSBjb250cmFjdCBpcyBub3QgaG9sZGluZyBhbnkgZG9uYXRpb25zIGJhbGFuY2UuAAAAAAAAD2NsYWltX2RvbmF0aW9ucwAAAAABAAAAAAAAAAV0b2tlbgAAAAAAABMAAAABAAAD6QAAAAsAAAAD",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAwAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAJVXNlckNvdW50AAAAAAAAAQAAAAAAAAAEVXNlcgAAAAEAAAAE",
        "AAAAAQAAAAAAAAAAAAAABFVzZXIAAAADAAAAAAAAAAZhcGlrZXkAAAAAABAAAAAAAAAABmF1dGhvcgAAAAAAEwAAAAAAAAAGbGVkZ2VyAAAAAAAE",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABAAAAAAAAAALSW52YWxpZFVzZXIAAAAAAQAAAAAAAAAKTm9TdWNoVXNlcgAAAAAAAgAAAAAAAAASVW5hdXRob3JpemVkVG9FZGl0AAAAAAADAAAAAAAAAAtOb0RvbmF0aW9ucwAAAAAE" ]),
      options
    )
  }
  public readonly fromJSON = {
    upgrade: this.txFromJSON<Result<void>>,
        write_user: this.txFromJSON<Result<u32>>,
        edit_user: this.txFromJSON<Result<void>>,
        read_user: this.txFromJSON<Result<User>>,
        read_latest: this.txFromJSON<Result<User>>,
        claim_donations: this.txFromJSON<Result<i128>>
  }
}