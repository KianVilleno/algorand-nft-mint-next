const algosdk = require("algosdk");
const algoToken = { "X-API-Key": "fetqTyZ8r82MSX9YT2pLq53iRMZwVibQx3TtrZ2h" };
const algodPort = "443";
const algodServer = "https://testnet-algorand.api.purestake.io/ps2";

let algodClient = new algosdk.Algodv2(algoToken, algodServer, algodPort);

const transferAsset = async (req, res) => {
  const account = algosdk.mnemonicToSecretKey(
    "course sea lunar arrow core kite small time into inch staff toward supreme mechanic lobster cage nasty flavor debris slam harbor doctor allow absorb huge"
  );
  const userAccount = algosdk.mnemonicToSecretKey(
    "ignore jungle blush toddler critic solar aisle review pigeon banana entry truth seed waste drama release ordinary salute find aware tackle addict ordinary ability youth"
  );
  const account2 = userAccount;
  try {
    let params = await algodClient.getTransactionParams().do();

    const sender = account.addr;
    const recipient = account2.addr;
    let revocationTarget = undefined;
    let closeRemainderTo = undefined;
    const assetId = 115796279; // Correct asset ID?
    const amount = 100; // Transfer 100 units of asset aUSD
    const note = algosdk.encodeObj("");

    let transferTxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
      sender,
      recipient,
      closeRemainderTo,
      revocationTarget,
      amount,
      note,
      assetId,
      params
    );
    let rawSignedTxn = transferTxn.signTxn(account.sk);
    let txId = transferTxn.txID().toString();
    console.log("Signed transaction with txID: %s", txId);

    // Submit the transaction
    await algodClient.sendRawTransaction(rawSignedTxn).do();

    console.log(txId);
    res.json(txId);
  } catch (error) {
    console.log("err", error);
    res.json(error);
  }
};

export default transferAsset;
