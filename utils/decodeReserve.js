import { decodeAddress } from "algosdk";
import { CID } from "multiformats/cid";
import * as mfsha2 from "multiformats/hashes/sha2";
import * as digest from "multiformats/hashes/digest";

const decodeReserve = (r_addr) => {
  const addr = decodeAddress(r_addr);
  const mhdigest = digest.create(mfsha2.sha256.code, addr.publicKey);
  const cid = CID.create(parseInt(0), 0x70, mhdigest);

  return cid.toString();
};
export default decodeReserve;
