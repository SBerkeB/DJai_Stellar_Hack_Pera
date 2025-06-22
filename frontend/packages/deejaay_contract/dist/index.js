import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CDTCCJSV63NAWSX66VQNVU7U7FB4VXNNT7A2WW2WIEOOG2BSV2NZUSJQ",
    }
};
export const Errors = {
    1: { message: "InvalidUser" },
    2: { message: "NoSuchUser" },
    3: { message: "UnauthorizedToEdit" },
    4: { message: "NoDonations" }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Constructor/Initialization Args for the contract's `__constructor` method */
    { admin, apikey }, 
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy({ admin, apikey }, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAZFJbml0aWFsaXplcyB0aGUgZ3Vlc3Rib29rIHdpdGggYSB3YXJtIHdlbGNvbWUgbWVzc2FnZSBmb3IgcHJvc3BlY3RpdmUKc2lnbmVycyB0byByZWFkLgoKIyBBcmd1bWVudHMKCiogYGFkbWluYCAtIFRoZSBhZGRyZXNzIHdoaWNoIHdpbGwgYmUgdGhlIG93bmVyIGFuZCBhZG1pbmlzdHJhdG9yIG9mIHRoZQpndWVzdGJvb2suCiogYHRpdGxlYCAtIFRoZSB0aXRsZSBvciBzdWJqZWN0IG9mIHRoZSB3ZWxjb21lIG1lc3NhZ2UuCiogYHRleHRgIC0gVGhlIGJvZHkgb3IgY29udGVudHMgb2YgdGhlIHdlbGNvbWUgbWVzc2FnZS4KCiMgUGFuaWNzCgoqIElmIHRoZSBgdGl0bGVgIGFyZ3VtZW50IGlzIGVtcHR5IG9yIG1pc3NpbmcuCiogSWYgdGhlIGB0ZXh0YCBhcmd1bWVudCBpcyBlbXB0eSBvciBtaXNzaW5nLgAAAAAAAA1fX2NvbnN0cnVjdG9yAAAAAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAZhcGlrZXkAAAAAABAAAAABAAAD6QAAA+0AAAAAAAAAAw==",
            "AAAAAAAAARtVcGdyYWRlIHRoZSBjb250cmFjdCdzIFdhc20gYnl0ZWNvZGUuCgojIEFyZ3VtZW50cwoKKiBgbmV3X3dhc21faGFzaGAgLSBIYXNoIGlkZW50aWZpZXIgZm9yIHRoZSBieXRlY29kZSB0aGF0IHNob3VsZCBiZQpoZW5jZWZvcnRoIHVzZWQgYnkgdGhpcyBjb250cmFjdC4gVGhlIGJ5dGVjb2RlIG11c3QgYWxyZWFkeSBiZQppbnN0YWxsZWQgYW5kIHByZXNlbnQgb24tY2hhaW4uCgojIFBhbmljcwoKKiBJZiB0aGUgV2FzbSBieXRlY29kZSBpcyBub3QgYWxyZWFkeSBpbnN0YWxsZWQgb24tY2hhaW4uAAAAAAd1cGdyYWRlAAAAAAEAAAAAAAAADW5ld193YXNtX2hhc2gAAAAAAAPuAAAAIAAAAAEAAAPpAAAD7QAAAAAAAAAD",
            "AAAAAAAAATRXcml0ZSBhIG1lc3NhZ2UgdG8gdGhlIGd1ZXN0Ym9vay4KCiMgQXJndW1lbnRzCgoqIGBhdXRob3JgIC0gVGhlIHNlbmRlciBvZiB0aGUgbWVzc2FnZS4KKiBgdGl0bGVgIC0gVGhlIHRpdGxlIG9yIHN1YmplY3Qgb2YgdGhlIGd1ZXN0Ym9vayBtZXNzYWdlLgoqIGB0ZXh0YCAtIFRoZSBib2R5IG9yIGNvbnRlbnRzIG9mIHRoZSBndWVzdGJvb2sgbWVzc2FnZS4KCiMgUGFuaWNzCgoqIElmIHRoZSBgdGl0bGVgIGFyZ3VtZW50IGlzIGVtcHR5IG9yIG1pc3NpbmcuCiogSWYgdGhlIGB0ZXh0YCBhcmd1bWVudCBpcyBlbXB0eSBvciBtaXNzaW5nLgAAAAp3cml0ZV91c2VyAAAAAAACAAAAAAAAAAZhdXRob3IAAAAAABMAAAAAAAAABmFwaWtleQAAAAAAEAAAAAEAAAPpAAAABAAAAAM=",
            "AAAAAAAAAXFFZGl0IGEgc3BlY2lmaWVkIG1lc3NhZ2UgaW4gdGhlIGd1ZXN0Ym9vay4KCiMgQXJndW1lbnRzCgoqIGBtZXNzYWdlX2lkYCAtIFRoZSBJRCBudW1iZXIgb2YgdGhlIG1lc3NhZ2UgdG8gZWRpdC4KKiBgdGl0bGVgIC0gVGhlIHRpdGxlIG9yIHN1YmplY3Qgb2YgdGhlIGd1ZXN0Ym9vayBtZXNzYWdlLgoqIGB0ZXh0YCAtIFRoZSBib2R5IG9yIGNvbnRlbnRzIG9mIHRoZSBndWVzdGJvb2sgbWVzc2FnZS4KCiMgUGFuaWNzCgoqIElmIGJvdGggdGhlIGB0aXRsZWAgQU5EIGB0ZXh0YCBhcmd1bWVudHMgYXJlIGVtcHR5IG9yIG1pc3NpbmcuCiogSWYgdGhlcmUgaXMgbm8gYXV0aG9yaXphdGlvbiBmcm9tIHRoZSBvcmlnaW5hbCBtZXNzYWdlIGF1dGhvci4AAAAAAAAJZWRpdF91c2VyAAAAAAAAAgAAAAAAAAAHdXNlcl9pZAAAAAAEAAAAAAAAAAZhcGlrZXkAAAAAABAAAAABAAAD6QAAA+0AAAAAAAAAAw==",
            "AAAAAAAAALZSZWFkIGEgc3BlY2lmaWVkIG1lc3NhZ2UgZnJvbSB0aGUgZ3Vlc3Rib29rLgoKIyBBcmd1bWVudHMKCiogYG1lc3NhZ2VfaWRgIC0gVGhlIElEIG51bWJlciBvZiB0aGUgbWVzc2FnZSB0byByZXRyaWV2ZS4KCiMgUGFuaWNzCgoqIElmIHRoZSBtZXNzYWdlIElEIGlzIG5vdCBhc3NvY2lhdGVkIHdpdGggYSBtZXNzYWdlLgAAAAAACXJlYWRfdXNlcgAAAAAAAAEAAAAAAAAAB3VzZXJfaWQAAAAABAAAAAEAAAPpAAAH0AAAAARVc2VyAAAAAw==",
            "AAAAAAAAADRSZWFkIHRoZSBsYXRlc3QgbWVzc2FnZSB0byBiZSBzZW50IHRvIHRoZSBndWVzdGJvb2suAAAAC3JlYWRfbGF0ZXN0AAAAAAAAAAABAAAD6QAAB9AAAAAEVXNlcgAAAAM=",
            "AAAAAAAAAIVDbGFpbSBhbnkgZG9uYXRpb25zIHRoYXQgaGF2ZSBiZWVuIG1hZGUgdG8gdGhlIGd1ZXN0Ym9vayBjb250cmFjdC4KCiMgUGFuaWNzCgoqIElmIHRoZSBjb250cmFjdCBpcyBub3QgaG9sZGluZyBhbnkgZG9uYXRpb25zIGJhbGFuY2UuAAAAAAAAD2NsYWltX2RvbmF0aW9ucwAAAAABAAAAAAAAAAV0b2tlbgAAAAAAABMAAAABAAAD6QAAAAsAAAAD",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAwAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAJVXNlckNvdW50AAAAAAAAAQAAAAAAAAAEVXNlcgAAAAEAAAAE",
            "AAAAAQAAAAAAAAAAAAAABFVzZXIAAAADAAAAAAAAAAZhcGlrZXkAAAAAABAAAAAAAAAABmF1dGhvcgAAAAAAEwAAAAAAAAAGbGVkZ2VyAAAAAAAE",
            "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABAAAAAAAAAALSW52YWxpZFVzZXIAAAAAAQAAAAAAAAAKTm9TdWNoVXNlcgAAAAAAAgAAAAAAAAASVW5hdXRob3JpemVkVG9FZGl0AAAAAAADAAAAAAAAAAtOb0RvbmF0aW9ucwAAAAAE"]), options);
        this.options = options;
    }
    fromJSON = {
        upgrade: (this.txFromJSON),
        write_user: (this.txFromJSON),
        edit_user: (this.txFromJSON),
        read_user: (this.txFromJSON),
        read_latest: (this.txFromJSON),
        claim_donations: (this.txFromJSON)
    };
}
