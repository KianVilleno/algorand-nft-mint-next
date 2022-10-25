import * as backend from "../reach/build/index.main.mjs";
import { loadStdlib } from "@reach-sh/stdlib";

const stdlib = loadStdlib("ALGO");
stdlib.setProviderByName("TestNet");

const handleClick = async () => {
  console.log("hello");

  const accCreator = await stdlib.newAccountFromMnemonic(
    "course sea lunar arrow core kite small time into inch staff toward supreme mechanic lobster cage nasty flavor debris slam harbor doctor allow absorb huge"
  );

  const accBuyer = await stdlib.newAccountFromMnemonic(
    "ignore jungle blush toddler critic solar aisle review pigeon banana entry truth seed waste drama release ordinary salute find aware tackle addict ordinary ability youth"
  );

  const ctcCreator = accCreator.contract(backend);
  const ctcBuyer = accBuyer.contract(backend, ctcCreator.getInfo());

  const theNFT = await stdlib.launchToken(accCreator, "SB TST 6", "SBT6", {
    supply: 1,
  });

  const price = 5;

  await Promise.all([
    backend.Creator(ctcCreator, {
      getSale: () => {
        console.log(`Creator sets parameters of sale`);
        return [theNFT.id, stdlib.parseCurrency(price)];
      },
    }),
    (async () => {
      await backend.Buyer(ctcBuyer, {
        seeParams: async ([nftId, price]) => {
          console.log(
            `Buyer sees that the NFT is ${nftId}, the price is ${stdlib.formatCurrency(
              price
            )}.`
          );
          await accBuyer.tokenAccept(nftId);
        },
      });
    })(),
  ]);
};

export default handleClick;
