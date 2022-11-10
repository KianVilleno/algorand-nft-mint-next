import {
  uniqueNamesGenerator,
  names,
  countries,
  NumberDictionary,
  colors,
} from "unique-names-generator";

import lastnames from "data/lastnames";
import _ from "lodash";

const generateNFTDetails = async () => {
  const generateCountry = uniqueNamesGenerator({
    dictionaries: [countries],
  });
  const generateFirstName = uniqueNamesGenerator({
    dictionaries: [names],
  });
  const generateColors = uniqueNamesGenerator({
    dictionaries: [colors],
  });
  const generateLastName = _.sample(lastnames);

  const jerseyNumber = _.random(0, 99);
  const jerseyColor =
    generateColors.charAt(0).toUpperCase() + generateColors.slice(1);
  const country = generateCountry;
  const name = `${generateFirstName} ${generateLastName}`;

  const height = `${_.random(165, 201)} cm`;
  const haircut = _.sample([
    "Buzz Cut",
    "Crew Cut",
    "Ivy League",
    "Caesar Haircut",
    "Military Haircut",
    "French Crop",
    "Fade Haircut",
    "Undercut",
    "Bald",
  ]);
  const pace = _.random(60, 99);
  const shooting = _.random(60, 99);
  const passing = _.random(60, 99);
  const dribbling = _.random(60, 99);
  const defending = _.random(60, 99);
  const physical = _.random(60, 99);
  const rating = Math.round(
    (pace + shooting + passing + dribbling + defending + physical) / 6
  );

  const NFT_NAME = "WOBL FIFA #" + jerseyNumber;
  const NFT_SYMBOL = "WBF" + jerseyNumber;

  const properties = {
    Name: name,
    "Jersey Number": jerseyNumber,
    "Jersey Color": jerseyColor,
    Height: height,
    Country: country,
    Haircut: haircut,
    Pace: pace,
    Shooting: shooting,
    Passing: passing,
    Dribbling: dribbling,
    Defending: defending,
    Physical: physical,
    Rating: rating,
  };

  return { nft_name: NFT_NAME, nft_symbol: NFT_SYMBOL, properties };
};

export default generateNFTDetails;
