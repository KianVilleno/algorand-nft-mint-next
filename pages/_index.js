// import styled from "@emotion/styled";
// import axios from "axios";
// import optInAsset from "components/algorand/optInAsset";
// import React, { useRef } from "react";
// import { Box } from "theme-ui";

// const Index = () => {
//   const userAccount = useRef();

//   const handleCreateAsset = async () => {
//     const createAsset = await axios.get("/api/createAsset");
//     console.log(createAsset);
//   };

//   const handleOptInAsset = async () => {
//     const res = await optInAsset(userAccount);
//     console.log(res);
//   };

//   const handleTransferAsset = async () => {
//     const transferAsset = await axios.get("/api/transferAsset");
//     console.log(transferAsset);
//   };

//   const handleConnectAlgo = async () => {
//     let resp = await AlgoSigner.connect();
//     console.log(resp);
//     getUserAccount();
//   };

//   const getUserAccount = async () => {
//     userAccount.current = await AlgoSigner.accounts({
//       ledger: "TestNet",
//     });
//     // console.log(userAccount.current[0]['address'])
//     console.log(userAccount.current);
//   };

//   return (
//     <Wrapper>
//       <button onClick={handleConnectAlgo}>Connect AlgoSigner</button>
//       <button onClick={handleCreateAsset}>Mint NFT</button>
//       <button onClick={handleOptInAsset}>OPT in NFT</button>
//       <button onClick={handleTransferAsset}>Transfer NFT</button>
//     </Wrapper>
//   );
// };

// export default Index;

// const Wrapper = styled(Box)`
//   width: 100vw;
//   height: 100vh;

//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;