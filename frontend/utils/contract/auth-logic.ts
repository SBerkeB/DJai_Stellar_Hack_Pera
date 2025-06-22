import { account, server } from "./passkeys";
import { Client as ContractClient, networks } from "../../packages/deejaay_contract";
import { Api } from "@stellar/stellar-sdk/rpc";
// import { createChatLedgerKeys, getNextIndex, rpc, stellarExpertLink } from "./stellar";
import { scValToNative } from "@stellar/stellar-sdk";

const djaiContract = new ContractClient({
    rpcUrl: process.env.NEXT_PUBLIC_STELLAR_RPC_URL as string,
    contractId: networks.testnet.contractId,
    networkPassphrase: process.env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE as string,
});

