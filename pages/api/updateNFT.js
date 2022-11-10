import { Readable } from "stream";
import dataUriToBuffer from "data-uri-to-buffer";
const toFile = require("data-uri-to-file");

const pinataApiKey = "55b06797ba351b2197d6";
const pinataApiSecret =
  "65cd5f2016f7bb2949914e265be27e89fba7e655e6280c8bb76b1d4d65555399";

const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(pinataApiKey, pinataApiSecret);

const updateNFT = async (req, res) => {
  const { nftConfig } = req?.body;

  const optionsJSON = {
    pinataMetadata: {
      name: nftConfig?.nft_name + " updated metadata",
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };

  const resultMeta = await pinata.pinJSONToIPFS(nftConfig, optionsJSON);

  res.json({ resultMeta });
};

export default updateNFT;


