const pinataApiKey = "55b06797ba351b2197d6";
const pinataApiSecret =
  "65cd5f2016f7bb2949914e265be27e89fba7e655e6280c8bb76b1d4d65555399";

const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(pinataApiKey, pinataApiSecret);

const exclude = [
  "QmaiDYLaGhzqp1VH5ecrwB26AH7tF2VHHtg68BajKvBJ6J",
  "QmSfTQw6Z1rXaUN98fUfTjmEaEXhooVhdmrLBBCbXNKQWo",
  "QmZz5ikcK27YmTb5Mq2Vi7butrATRtqpPzwX8QDYgpSrzj",
  "QmQFJtM3SQVSgcEhvXetaFnTGxcthsVwJwLhe3D5SFKvJs",
  "Qmd9n5eGwXL5UdCrUCL77k1as7TbxnJWZCquKGpXcWKZFT",
];

const deletePinata = async (req, res) => {
  const pinataList = await pinata.pinList({ pageLimit: 100 });
  const filteredList = pinataList.rows
    .map((list) => list?.ipfs_pin_hash)
    .filter((list) => !exclude.includes(list));

  console.log(pinataList);

  for (let i = 0; i < filteredList.length; i++) {
    await pinata.unpin(filteredList[i]);
    console.log(`Deleting ${filteredList[i]}...`);
  }

  res.send("ok");
};

export default deletePinata;
