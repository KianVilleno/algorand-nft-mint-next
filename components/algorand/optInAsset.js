const algosdk = require("algosdk");
const algoToken = { "X-API-Key": "fetqTyZ8r82MSX9YT2pLq53iRMZwVibQx3TtrZ2h" };
const algodPort = "443";
const algodServer = "https://testnet-algorand.api.purestake.io/ps2";

let algodClient = new algosdk.Algodv2(algoToken, algodServer, algodPort);

const optInAsset = async (userAccount) => {
  // const userAccount = algosdk.mnemonicToSecretKey(
  //   "ignore jungle blush toddler critic solar aisle review pigeon banana entry truth seed waste drama release ordinary salute find aware tackle addict ordinary ability youth"
  // );

  const account2 = userAccount;

  try {
    let params = await algodClient.getTransactionParams().do();
    const assetId = 115796279; // Note: change the asset ID if it was different for your new asset

    const sender = account2.addr;
    const recipient = sender; // transaction to yourself

    // We set revocationTarget to undefined as this is not a clawback operation
    let revocationTarget = undefined;

    // CloseReaminerTo is set to undefined as we are not closing out an asset
    let closeRemainderTo = undefined;

    const amount = 0;

    let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
      sender,
      recipient,
      closeRemainderTo,
      revocationTarget,
      amount,
      undefined,
      assetId,
      params
    );

    // Use the AlgoSigner encoding library to make the transactions base64
    const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

    const signedTxs = await AlgoSigner.signTxn([{ txn: txn_b64 }]);
    console.log(signedTxs);

    // Get the base64 encoded signed transaction and convert it to binary
    let binarySignedTx = await AlgoSigner.encoding.base64ToMsgpack(
      signedTxs[0].blob
    );

    // Send the transaction through the SDK client
    let id = await algodClient.sendRawTransaction(binarySignedTx).do();
    console.log(id);
    // let rawSignedTxn = optinTxn.signTxn(account2.sk);
    // let txId = optinTxn.txID().toString();
    // console.log("Signed transaction with txID: %s", txId);

    // // Submit the transaction
    // await algodClient.sendRawTransaction(rawSignedTxn).do();
  } catch (error) {
    console.log(error);
  }
};

export default optInAsset;
