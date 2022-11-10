/*global AlgoSigner*/

import styled from "@emotion/styled";
import {
  loadStdlib,
  ALGO_MyAlgoConnect as MyAlgoConnect,
} from "@reach-sh/stdlib";

import axios from "axios";
// import Image from "next/image.js";
import { useEffect, useRef, useState } from "react";
import { AspectRatio, Box } from "theme-ui";
import cidToReserveURL from "utils/cidToReserve.js";
import decodeReserve from "utils/decodeReserve.js";
import generateNFTDetails from "utils/generateNFTDetails.js";
import upgradeNFT from "utils/upgradeNFT.js";
import * as backend from "../reach/build/index.main.mjs";

const algosdk = require("algosdk");

const ALGOD_SERVER = "https://testnet-algorand.api.purestake.io/ps2";
const INDEXER_SERVER = "https://testnet-algorand.api.purestake.io/idx2";
const TOKEN = { "X-API-Key": "fetqTyZ8r82MSX9YT2pLq53iRMZwVibQx3TtrZ2h" };
const PORT = "443";

let algodClient = new algosdk.Algodv2(TOKEN, ALGOD_SERVER, PORT);

function App() {
  const [userAccount, setUserAccount] = useState();

  const [debugLogs, setDebugLogs] = useState();
  const [nftDetails, setNftDetails] = useState({});
  const [upgradedNftDetails, setUpgradedNftDetails] = useState(null);
  const [onMint, setOnMint] = useState(false);
  const [stdlib, setStdlib] = useState();
  const [userAssets, setUserAssets] = useState([]);
  const [userAssetNFT, setUserAssetNFT] = useState(null);

  const canvasRef = useRef();

  useEffect(() => {
    const _stdlib = loadStdlib("ALGO");
    _stdlib.setWalletFallback(
      _stdlib.walletFallback({
        providerEnv: "TestNet",
        MyAlgoConnect,
      })
    );

    setStdlib(_stdlib);
  }, []);

  const handleConfig = async () => {
    dLog(`Fetching ${userAccount?.networkAccount?.addr} assets...`);
    const accountInfo = await algodClient
      .accountInformation(userAccount?.networkAccount?.addr)
      .do();
    dLog(`Fetched assets.`);

    setUserAssets(accountInfo?.assets);
  };

  const handleUpdate = async () => {
    dLog(`Updating NFT and uploading to IPFS...`);
    const getUpdatedTokenCID = await axios.post("/api/updateNFT", {
      nftConfig: upgradedNftDetails,
    });
    const updatedTokenCID = getUpdatedTokenCID?.data?.resultMeta?.IpfsHash;

    dLog(`Updated NFT uploaded ${updatedTokenCID}`);

    // const updatedTokenCID = "QmPbXcwFfkXzZKE6p4YvUXqyfyhBa2oL7PBor2rnko7bSM";

    const accCreator = await stdlib.newAccountFromMnemonic(
      "course sea lunar arrow core kite small time into inch staff toward supreme mechanic lobster cage nasty flavor debris slam harbor doctor allow absorb huge"
    );

    const params = await algodClient.getTransactionParams().do();

    const manager = accCreator?.networkAccount?.addr;
    const assetId = userAssetNFT?.index;
    const reserve = cidToReserveURL(updatedTokenCID)?.reserveAddress;

    dLog(
      `Setting up the config transaction with reserved address of ${reserve}...`
    );

    let ctxn = algosdk.makeAssetConfigTxnWithSuggestedParams(
      manager,
      undefined,
      assetId,
      manager,
      reserve,
      manager,
      manager,
      params
    );

    dLog(`Signing the transaction...`);
    // This transaction must be signed by the current manager
    const rawSignedTxn = ctxn.signTxn(accCreator.networkAccount.sk);
    let ctx = await algodClient.sendRawTransaction(rawSignedTxn).do();
    // Wait for confirmation
    dLog(`Waiting for confirmation...`);
    let confirmedTxn = await algosdk.waitForConfirmation(
      algodClient,
      ctx.txId,
      4
    );

    dLog(`Transaction completed ${ctx.txId}`);
    dLog(
      `Visit the NFT in explorer: https://testnet.algoexplorer.io/asset/${assetId}`
    );
    dLog(
      `or View it on https://www.randgallery.com/algo-collection/?address=${assetId}&testnet`
    );

    //Get the completed Transaction
    console.log(
      "Transaction " +
        ctx.txId +
        " confirmed in round " +
        confirmedTxn["confirmed-round"]
    );


  };

  const handleGetAsset = async (id) => {
    dLog(`Fetching ${id} asset...`);
    const asset = await algodClient.getAssetByID(id).do();
    setUserAssetNFT(asset);
    const decodedReserve = decodeReserve(asset?.params?.reserve);
    const getAxiosData = await axios.get(
      `https://gateway.pinata.cloud/ipfs/${decodedReserve}`
    );
    const tokenData = getAxiosData?.data;
    setNftDetails(tokenData);
    dLog(`Fetched ${id}.`);
    dLog(`Upgrading ${id} asset...`);

    const upgradedNFT = upgradeNFT(tokenData);
    setUpgradedNftDetails(upgradedNFT);

    dLog(`Upgraded ${id} asset.`);

    await generateImage(
      "https://gateway.pinata.cloud/ipfs/" + tokenData?.image?.split("/")[2]
    );
  };

  const handleClick = async () => {
    setOnMint(true);
    dLog(`Generating details for the NFT...`);
    const nftConfig = await generateNFTDetails();
    dLog(`Generating Image for the NFT...`);
    const nftImage = await generateImage();
    dLog(`Uploading the metadata to IPFS via Pinata...`);
    setNftDetails(nftConfig);
    const resultPinNft = await axios.post("/api/pinNFT", {
      nftConfig,
      nftImage,
    });
    dLog(`IPFS metadata succesuffuly uploaded.`);
    dLog(`Starting the smart contract...`);
    const accCreator = await stdlib.newAccountFromMnemonic(
      "course sea lunar arrow core kite small time into inch staff toward supreme mechanic lobster cage nasty flavor debris slam harbor doctor allow absorb huge"
    );
    const accBuyer = await stdlib.newAccountFromMnemonic(
      "ignore jungle blush toddler critic solar aisle review pigeon banana entry truth seed waste drama release ordinary salute find aware tackle addict ordinary ability youth"
    );
    // const accBuyer = userAccount;
    const ctcCreator = accCreator.contract(backend);
    const ctcBuyer = accBuyer.contract(backend, ctcCreator.getInfo());
    dLog(`Creating NFT... ${nftConfig?.nft_name} ${nftConfig?.nft_symbol}`);

    const CID = resultPinNft?.data?.resultMeta?.IpfsHash;
    const CID2RESERVE = cidToReserveURL(CID);

    const TOKEN_URL = CID2RESERVE?.url;

    const RESERVE_ADDR = CID2RESERVE?.reserveAddress;
    dLog("The CID is " + CID);
    dLog("Reserve Addr is " + RESERVE_ADDR);
    dLog("The manager is " + accCreator?.networkAccount?.addr);
    const theNFT = await stdlib.launchToken(
      accCreator,
      nftConfig?.nft_name,
      nftConfig?.nft_symbol,
      {
        supply: 1,
        decimals: 0,
        url: TOKEN_URL,
        reserve: RESERVE_ADDR,
        manager: accCreator?.networkAccount?.addr,
        managerAddr: accCreator?.networkAccount?.addr,
        manage: accCreator?.networkAccount?.addr,
      }
    );

    console.log(theNFT);

    dLog(`Created token ${theNFT.id}`);
    dLog(`Token url is ${TOKEN_URL}`);
    const price = 2;
    dLog(`Setting price of the NFT ${price} ALGOS.`);
    await Promise.all([
      backend.Creator(ctcCreator, {
        getSale: () => {
          dLog("[Admin]: Making the sale for the NFT");
          return { nftId: theNFT.id, price: stdlib.parseCurrency(price) };
        },
      }),
      (async () => {
        dLog("[Buyer]: Joined the contract");
        dLog("Waiting for the user to sign the transaction.");
        try {
          await backend.Buyer(ctcBuyer, {
            seeParams: async ({ nftId, price }) => {
              dLog(
                `[Buyer] Got the NFT ${nftId} with the price of ${stdlib.formatCurrency(
                  price
                )}.`
              );
              dLog(`[Buyer] Opt in to the NFT`);
              await accBuyer.tokenAccept(nftId);
            },
          });
          dLog(`[Buyer] Successfully bought the NFT`);
          dLog(
            `Visit the NFT in explorer: https://testnet.algoexplorer.io/asset/${theNFT.id}`
          );
          dLog(
            `or View it on https://www.randgallery.com/algo-collection/?address=${theNFT.id}&testnet`
          );
          setOnMint(false);
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
      dLog(`Added Account: ${userAccount?.networkAccount?.addr}`);
    }
  }, [userAccount]);

  const generateImage = async (url = null) =>
    new Promise((resolve, reject) => {
      if (canvasRef?.current) {
        var img = new Image();
        img.onload = draw;
        img.src = url || "/fifa_player_1.jpg";

        console.log(img);

        const c = canvasRef.current;
        c.width = 1000;
        c.height = 1000;

        var ctx = c.getContext("2d");

        function getRandomColor() {
          let color = "#";
          for (let i = 0; i < 3; i++)
            color += (
              "0" +
              Math.floor((Math.random() * Math.pow(16, 2)) / 2).toString(16)
            ).slice(-2);
          return color;
        }

        function draw() {
          // draw color
          if (!url) {
            ctx.fillStyle = getRandomColor();
            ctx.fillRect(0, 0, c.width, c.height);
            // set composite mode
            ctx.globalAlpha = 0.8;
            ctx.globalCompositeOperation = "lighter";
            // // draw image
          }
          ctx.drawImage(img, 0, 0, c.width, c.height);

          const resolveData = url ? "ok" : c.toDataURL();
          resolve(resolveData);
        }
      }
    });

  return (
    <Wrapper className="App">
      <MainWrapper>
        <HeaderWrapper mb={[3, 4]}>
          <Wavy>
            {[..."WOBL NFT MINT"].map((letter, i) => (
              <Letter
                as="span"
                idx={i + 1}
                key={i}
                dangerouslySetInnerHTML={{
                  __html: letter === " " ? "&#160;" : letter,
                }}
              />
            ))}
          </Wavy>
        </HeaderWrapper>
        <Textarea as="textarea" value={debugLogs}>
          {debugLogs}
        </Textarea>
        <ContentWrapper mt={[2, 3]}>
          <NFTWrapper mr={[2, 3]}>
            <p>NFT Name: {nftDetails?.nft_name}</p>
            <p>NFT Symbol: {nftDetails?.nft_symbol}</p>
            <p>Properties:</p>
            <Box ml={2}>
              {nftDetails &&
                nftDetails.properties &&
                Object.entries(nftDetails.properties).map(([key, value], i) => (
                  <p key={i}>
                    {key}: {value}{" "}
                    {upgradedNftDetails &&
                      upgradedNftDetails.properties[key] !== value && (
                        <span>
                          →{" "}
                          <UpgradeColor>
                            {upgradedNftDetails.properties[key]}
                          </UpgradeColor>
                        </span>
                      )}
                  </p>
                ))}
            </Box>
          </NFTWrapper>
          <ActionWrapper>
            <ImageWrapper>
              <AspectRatio ratio={1}>
                <canvas ref={canvasRef}></canvas>
                {/* <Image
                  width={500}
                  height={500}
                  src="/fifa_player_1.jpg"
                ></Image> */}
              </AspectRatio>
            </ImageWrapper>
            <ButtonWrapper mt={[2, 3]}>
              <Button
                as="button"
                onClick={connectWallet}
                disabled={userAccount}
              >
                Connect Wallet
              </Button>
              <Button
                as="button"
                disabled={!userAccount || onMint}
                onClick={handleClick}
                ml={[1]}
              >
                MINT NFT
              </Button>
            </ButtonWrapper>
          </ActionWrapper>
        </ContentWrapper>
        <ConfigWrapper mt={[2, 3]}>
          <Button
            as="button"
            onClick={handleConfig}
            disabled={!userAccount || onMint}
          >
            Upgrade NFT
          </Button>
          <Button
            as="button"
            onClick={handleUpdate}
            ml={[1]}
            disabled={!userAccount || onMint || !upgradedNftDetails}
          >
            Confirm Upgrade
          </Button>
          {userAssets.length > 0 && (
            <ListOfAssetsWrapper mt={[2, 3]}>
              {userAssets?.map((asset, i) => (
                <AssetItem
                  key={i}
                  onClick={() => handleGetAsset(asset["asset-id"])}
                  isCurrent={userAssetNFT?.index === asset["asset-id"]}
                >
                  {asset["asset-id"]}
                </AssetItem>
              ))}
            </ListOfAssetsWrapper>
          )}
        </ConfigWrapper>
      </MainWrapper>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled(Box)`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const Textarea = styled(Box)`
  border: 2px solid black;
  border-radius: 9px;
  padding: 1rem;
  resize: none;
  outline: none;
  width: 100%;
  height: 20vh;
`;

const Button = styled(Box)`
  background-color: transparent;
  border: 2px solid black;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const HeaderWrapper = styled(Box)`
  font-size: 2vw;
`;
const Wavy = styled(Box)`
  position: relative;
`;
const Letter = styled(Box)`
  @keyframes flip {
    0%,
    80% {
      transform: rotateY(360deg);
    }
  }
  position: relative;
  display: inline-block;
  text-transform: uppercase;
  animation: flip 2s infinite;
  ${({ idx }) => `animation-delay: calc(0.2s * ${idx});`};
`;

const MainWrapper = styled(Box)`
  width: 60%;
`;

const ContentWrapper = styled(Box)`
  display: flex;
  width: 100%;
`;

const NFTWrapper = styled(Box)`
  border: 2px solid black;
  border-radius: 9px;
  padding: 1rem;
  flex: 1;

  p {
    margin: 0;
    margin-bottom: 0.3rem;
  }
`;

const ButtonWrapper = styled(Box)``;

const ActionWrapper = styled(Box)`
  flex: 1;
`;

const ImageWrapper = styled(Box)`
  width: 50%;
  background-color: lightgray;
  &,
  img {
    border-radius: 9px;
  }

  canvas {
    width: 100%;
    height: 100%;
    border-radius: 9px;
  }
`;

const ConfigWrapper = styled(Box)``;
const ListOfAssetsWrapper = styled(Box)`
  border: 2px solid black;
  border-radius: 9px;
  padding: 0.5rem;
  width: 50%;
  height: 10vw;
  overflow: scroll;
`;
const AssetItem = styled(Box)`
  margin-bottom: 0.8rem;
  cursor: pointer;
  &:hover {
    font-weight: 800;
  }

  ${({ isCurrent }) => (isCurrent ? ` font-weight: 800;` : ``)};
`;

const UpgradeColor = styled.span`
  color: green;
`;
