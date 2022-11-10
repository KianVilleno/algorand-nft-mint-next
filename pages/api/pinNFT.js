import { Readable } from "stream";
import dataUriToBuffer from "data-uri-to-buffer";
const toFile = require("data-uri-to-file");

const pinataApiKey = "55b06797ba351b2197d6";
const pinataApiSecret =
  "65cd5f2016f7bb2949914e265be27e89fba7e655e6280c8bb76b1d4d65555399";

const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(pinataApiKey, pinataApiSecret);

var FormData = require("form-data");
var fs = require("fs");

const pinNFT = async (req, res) => {
  const { nftConfig, nftImage } = req?.body;

  const optionsFile = {
    pinataMetadata: {
      name: nftConfig?.nft_name + " image",
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };

  const buff = dataUriToBuffer(nftImage);
  const stream = Readable.from(buff);
  stream.path = `${nftConfig.nft_symbol}.png`;

  const resultFile = await pinata.pinFileToIPFS(stream, optionsFile);

  console.log(resultFile);

  const metadata = {
    name: nftConfig?.nft_name,
    description: "SB NFT",
    image: `ipfs://${resultFile.IpfsHash}`,
    image_mimetype: `image/jpg`,
    properties: nftConfig?.properties,
  };

  const optionsJSON = {
    pinataMetadata: {
      name: nftConfig?.nft_name + " metadata",
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };

  const resultMeta = await pinata.pinJSONToIPFS(metadata, optionsJSON);

  res.json({ resultMeta });
};

export default pinNFT;


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}
