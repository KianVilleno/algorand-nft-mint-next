import algosdk from "algosdk";
import React from "react";
import { CID } from "multiformats/cid";

const codeToCodec = (code) => {
  switch (code.toString(16)) {
    case "55":
      return "raw";
    case "70":
      return "dag-pb";
    default:
      throw new Error("Unknown codec");
  }
};

const cidToReserveURL = (ipfshash) => {
  const [cid, filename] = ipfshash.split("/");

  const decoded = CID.parse(cid);
  const version = decoded.version;
  const codec = codeToCodec(decoded.code);

  if (version === 0 && filename) {
    throw new Error("CID version 0 does not support directories");
  }

  const url = `template-ipfs://{ipfscid:${version}:${codec}:reserve:sha2-256}${
    filename ? "/" + filename : ""
  }`;

  const reserveAddress = algosdk.encodeAddress(
    Uint8Array.from(Buffer.from(decoded.multihash.digest))
  );

  return {
    url,
    reserveAddress,
  };
};


export default cidToReserveURL;
