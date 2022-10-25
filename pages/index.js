/*global AlgoSigner*/

import {
  loadStdlib,
  ALGO_MyAlgoConnect as MyAlgoConnect,
} from "@reach-sh/stdlib";
import { useEffect, useState } from "react";
import * as backend from "../reach/build/index.main.mjs";

const stdlib = loadStdlib("ALGO");

stdlib.setWalletFallback(
  stdlib.walletFallback({
    providerEnv: "TestNet",
    MyAlgoConnect,
  })
);

function App() {
  const [userAccount, setUserAccount] = useState();

  const [debugLogs, setDebugLogs] = useState();

  const handleClick = async () => {
    const accCreator = await stdlib.newAccountFromMnemonic(
      "course sea lunar arrow core kite small time into inch staff toward supreme mechanic lobster cage nasty flavor debris slam harbor doctor allow absorb huge"
    );

    const accBuyer = await stdlib.newAccountFromMnemonic(
      "ignore jungle blush toddler critic solar aisle review pigeon banana entry truth seed waste drama release ordinary salute find aware tackle addict ordinary ability youth"
    );

    // const accBuyer = userAccount;

    const ctcCreator = accCreator.contract(backend);
    const ctcBuyer = accBuyer.contract(backend, ctcCreator.getInfo());

    const NFT_NAME = "SB TST 9";
    const NFT_SYMB = "SBT9";

    dLog(`Creating NFT... ${NFT_NAME} ${NFT_SYMB}`);

    const theNFT = await stdlib.launchToken(accCreator, NFT_NAME, NFT_SYMB, {
      supply: 5,
    });
    dLog(`Created token ${theNFT.id}`);

    const price = 2;

    dLog(`Setting price of the NFT ${price} ALGOS.`);

    await Promise.all([
      backend.Creator(ctcCreator, {
        getSale: () => {
          dLog("[Admin]: Making the sale for the NFT");
          return [theNFT.id, stdlib.parseCurrency(price)];
        },
      }),
      (async () => {
        dLog("[Buyer]: Joined the contract");
        dLog("Waiting for the user to sign the transaction.");
        try {
          const a = await backend.Buyer(ctcBuyer, {
            seeParams: async ([nftId, price]) => {
              dLog(
                `[Buyer] Got the NFT ${nftId} with the price of ${stdlib.formatCurrency(
                  price
                )}.`
              );
              await accBuyer.tokenAccept(nftId);
            },
          });
          dLog(`[Buyer] Successfully bought the NFT`);
          dLog(
            `Visit the NFT in explorer: https://testnet.algoexplorer.io/asset/${theNFT.id}`
          );
        } catch (error) {
          dLog(`error!`);
        }
      })(),
    ]);
  };

  const connectWallet = async () => {
    dLog(`Connecting to wallet...`);
    const acc = await stdlib.getDefaultAccount();
    setUserAccount(acc);
  };

  const dLog = (str) => setDebugLogs((prev) => `${prev || ""}${str}\n`);

  useEffect(() => {
    if (userAccount?.getAddress()) {
      dLog(`Added Account: ${userAccount?.getAddress()}`);
    }
  }, [userAccount]);

  return (
    <div className="App">
      <textarea rows={30} cols={100} value={debugLogs}>
        {debugLogs}
      </textarea>
      <br />
      <br />
      <button onClick={connectWallet}>Connect Wallet</button>
      {true && <button onClick={handleClick}>MINT an NFT</button>}
    </div>
  );
}

export default App;
