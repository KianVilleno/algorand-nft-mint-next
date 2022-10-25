const algosdk = require("algosdk");
const algoToken = { "X-API-Key": "fetqTyZ8r82MSX9YT2pLq53iRMZwVibQx3TtrZ2h" };
const algodPort = "443";
const algodServer = "https://testnet-algorand.api.purestake.io/ps2";

let algodClient = new algosdk.Algodv2(algoToken, algodServer, algodPort);

const createAsset = async (req, res) => {
  const account = algosdk.mnemonicToSecretKey(
    "course sea lunar arrow core kite small time into inch staff toward supreme mechanic lobster cage nasty flavor debris slam harbor doctor allow absorb huge"
  );

  const randId = Math.floor(Math.random() * 100000);

  try {
    let txParamsJS = await algodClient.getTransactionParams().do();
    const txn =
      await new algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        assetURL:
          "https://gateway.pinata.cloud/ipfs/QmQFJtM3SQVSgcEhvXetaFnTGxcthsVwJwLhe3D5SFKvJs",
        from: account.addr,
        assetName: `SB Test ${randId}`,
        unitName: `SBT${randId}`,
        total: +100,
        decimals: +0,
        note: algosdk.encodeObj(""),
        suggestedParams: { ...txParamsJS },
      });

    let rawSignedTxn = txn.signTxn(account.sk);
    let tx = await algodClient.sendRawTransaction(rawSignedTxn).do();
    console.log("Asset Creation Txn : " + tx.txId);

    res.json(tx);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export default createAsset;
