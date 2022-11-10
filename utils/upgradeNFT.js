import _ from "lodash";

const upgradeNFT = (nftDetails) => {
  const nftDetailsProperties = structuredClone(nftDetails?.properties);

  const upgradeStat = () => _.random(0, 5);

  const propertiesToEdit = [
    "Pace",
    "Shooting",
    "Passing",
    "Dribbling",
    "Defending",
    "Physical",
  ];

  propertiesToEdit.forEach((property) => {
    nftDetailsProperties[property] = parseInt(
      parseInt(nftDetailsProperties[property]) + upgradeStat()
    );
  });

  return { ...nftDetails, properties: nftDetailsProperties };
};

export default upgradeNFT;
