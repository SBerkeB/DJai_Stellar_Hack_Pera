import * as StellarSdk from "@stellar/stellar-sdk";

// Initialize Soroban RPC server for testnet

// Initalize the source account's secret key and destination account ID.
// The source account is the one that will send the payment, and the destination account
// is the one that will receive the payment.

export const makePayment = async () => {
  console.log("Starting payment transaction...");
  const rpc = new StellarSdk.rpc.Server("https://soroban-testnet.stellar.org");

  const sourceKeys = StellarSdk.Keypair.fromSecret(
    "GDU6ANHLAH2I4D777LQ7532X4BS2UMSPNNH27XF4GB5IWCCT3LU5QNJK"
  );
  const destinationId =
    "GA66PDFOLAOGU6OUGETKMZ4QWSY5HHAVHRLOXE5G7XTBHVGFTJRBWRGL";

  // First, check to make sure that the destination account exists.
  try {
    await rpc.getAccount(destinationId);
  } catch (error) {
    console.error("Error checking destination account:", error);
    throw error;
  }

  // Now we also load the source account to build the transaction.
  let sourceAccount: StellarSdk.Account;
  try {
    sourceAccount = await rpc.getAccount(sourceKeys.publicKey());
  } catch (error) {
    console.error("Error checking source account:", error);
    throw error;
  }

  // The next step is to parametrize and build the transaction object:
  // Using the source account we just loaded we begin to assemble the transaction.
  // We set the fee to the base fee, which is 100 stroops (0.00001 XLM).
  // We also set the network passphrase to TESTNET.
  const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET,
  })
    // We then add a payment operation to the transaction oject.
    // This operation will send 10 XLM to the destination account.
    // Obs.: Not specifying a explicit source account here means that the
    // operation will use the source account of the whole transaction, which we specified above.
    .addOperation(
      StellarSdk.Operation.payment({
        destination: destinationId,
        asset: StellarSdk.Asset.native(),
        amount: "100",
      })
    )
    // We include an optional memo which oftentimes is used to identify the transaction
    // when working with pooled accounts or to facilitate reconciliation.
    .addMemo(StellarSdk.Memo.id("1234567890"))
    // Finally, we set a timeout for the transaction.
    // This means that the transaction will not be valid anymore after 180 seconds.
    .setTimeout(180)
    .build();

  // We sign the transaction with the source account's secret key.
  transaction.sign(sourceKeys);

  // Now we can send the transaction to the network.
  // The sendTransaction method immediately returns a reply with the transaction hash
  // and the status "PENDING". This means the transaction was received and is being processed.
  const sendTransactionResponse = await rpc.sendTransaction(transaction);

  // Here we check the status of the transaction as there are
  // a possible outcomes after sending a transaction that would have
  // to be handled accordingly, such as "DUPLICATE" or "TRY_AGAIN_LATER".
  if (sendTransactionResponse.status !== "PENDING") {
    throw new Error(
      `Failed to send transaction, status: ${sendTransactionResponse.status}`
    );
  }

  // Here we poll the transaction status to await for its final result.
  // We can use the transaction hash to poll the transaction status later.
  const finalStatus = await rpc.pollTransaction(sendTransactionResponse.hash, {
    sleepStrategy: (_iter: number) => 500,
    attempts: 5,
  });

  // The pollTransaction method will return the final status of the transaction
  // after the specified number of attempts or when the transaction is finalized.
  // We then check the final status of the transaction and handle it accordingly.
  switch (finalStatus.status) {
    case StellarSdk.rpc.Api.GetTransactionStatus.FAILED:
    case StellarSdk.rpc.Api.GetTransactionStatus.NOT_FOUND:
      throw new Error(`Transaction failed with status: ${finalStatus.status}`);
    case StellarSdk.rpc.Api.GetTransactionStatus.SUCCESS:
      console.log("Success! Results:", finalStatus);
      break;
  }
};
