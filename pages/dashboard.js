/*
 *   Chakra UI for importing ReUseable React Components
 */

import {
  Box,
  Stack,
  Heading,
  HStack,
  Button,
  ButtonGroup,
  VStack,
  Text,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";

import { Alchemy, Network } from "alchemy-sdk";

//  Wallet Connection
import { ConnectButton } from "@rainbow-me/rainbowkit";

import Link from "next/link";
import React, { useState, useEffect } from "react";

// Checking if the Wallet is Connected or Not
import { useAccount, useConnect, useDisconnect } from "wagmi";

const lw3ContractAddress = "0x1ed25648382c2e6da067313e5dacb4f138bc8b33";
const buildSpaceContractAddress = "0x322a88a26c23d45c7887711cadf055275701738e";
/*
 *       Fetching Bored Ape NFT Collection NFT By ID from Open Sea API
 *
 */

// async function fetchLw3CollectionNFT(id) {
//   const options = { method: "GET" };
//   let nft = null;
//   return await fetch(
//     `https://api.opensea.io/api/v1/asset/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/${id}/?include_orders=false`,
//     options
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       nft = response;
//       return nft;
//     })
//     .catch((err) => console.error(err));
// }

// async function fetchBuildSpaceCollectionNFT(id) {
//   const options = { method: "GET" };
//   let nft = null;
//   return await fetch(
//     `https://api.opensea.io/api/v1/asset/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/${id}/?include_orders=false`,
//     options
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       nft = response;
//       return nft;
//     })
//     .catch((err) => console.error(err));
// }
// // Fetching All NFTs from ID 0 to 20

// async function fetchLw3NFTs(setter) {
//   let nfts = [];
//   for (let index = 1; index <= 4; index++) {
//     const element = await fetchLw3CollectionNFT(index);
//     nfts.push(element);
//   }
//   setter(nfts);
// }

// async function fetchBuildSpaceNFTs(setter) {
//   let nfts = [];
//   for (let index = 1; index <= 4; index++) {
//     const element = await fetchBuildSpaceCollectionNFT(index);
//     nfts.push(element);
//   }
//   setter(nfts);
// }

function Dashboard() {
  //  Wallet Connection status Hook
  const { isConnected, isDisconnected, address } = useAccount();
  //   //  Wallet Connection status Component State Variables
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [owner, setOwner] = useState(
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
  );
  // Array for Holding BAYC NFT Collection
  const [lw3Collection, setLw3Collection] = useState(null);
  const [buildSpaceCollection, setBuildSpaceCollection] = useState(null);

  async function fetchLw3NFTs() {
    let addresses = [];
    addresses.push(lw3ContractAddress);
    const alchemy = new Alchemy({
      apiKey: "Ye6S888IuNTfAGGPQf2C_ZRvXJD9YQdQ",
      network: Network.MATIC_MAINNET,
    });

    let nfts = await alchemy.nft.getNftsForOwner(owner, {
      contractAddresses: addresses,
    });
    console.log("lw3 nfts are ", nfts);

    setLw3Collection(nfts?.ownedNfts);
  }
  async function fetchBuildspaceNFTs() {
    let addresses = [];
    addresses.push(buildSpaceContractAddress);
    const alchemy = new Alchemy({
      apiKey: "Ye6S888IuNTfAGGPQf2C_ZRvXJD9YQdQ",
      network: Network.MATIC_MAINNET,
    });

    let nfts = await alchemy.nft.getNftsForOwner(owner, {
      contractAddresses: addresses,
    });
    console.log("buildspace nfts are ", nfts);

    setBuildSpaceCollection(nfts?.ownedNfts);
  }

  //  Managing Component State using UseEffect
  // Everytime the Wallet is Connected or Disconnected
  // it will update the state variables
  useEffect(() => {
    fetchLw3NFTs();
    fetchBuildspaceNFTs();

    if (isConnected == true) setIsWalletConnected(true);
    if (isDisconnected == true) setIsWalletConnected(false);
  }, [isConnected, isDisconnected]);

  return (
    // The Over All Conainer of the Dashboard
    <Box pt="10" width="100%" height="fit-cpontent" bg="black">
      {/* 
    Horizontal Stack ( Flex display ) for showing Wallet Connection and Back to Website Buttons

*/}
      <Stack
        direction={["column", "row", "row"]}
        spacing={"10"}
        px={"2rem"}
        pt="20"
        width="95%"
        justify={"space-between"}
      >
        {/* 
            Responsive Fonts

            {["1rem", "2rem", "2rem"]}

            Denotes different values for FontSize as Follows

            For Small Devices - font size is 1 rem
            For Medium Devices - font size is 2 rem
            For Large Devices - font size is 3 rem
            
        */}
        <Heading color="white" fontSize={["1rem", "2rem", "2rem"]}>
          Dashboard
        </Heading>
        <Stack
          display={["none", "flex", "flex"]}
          spacing={"2"}
          direction={["column", "column", "row"]}
        >
          <Box
            width={["max-content", "100%"]}
            fontSize={["10px", "12px", "14px"]}
          >
            <ConnectButton />
          </Box>
          <ButtonGroup variant="solid" spacing="5">
            <Button
              width={["20vw", "100%"]}
              fontSize={["10px", "12px", "14px"]}
            >
              <Link href="/">Back to Website</Link>
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>

      <VStack
        justify="center"
        height={
          isWalletConnected &&
          (lw3Collection?.length > 0 || buildSpaceCollection?.length > 0)
            ? "fit-content"
            : "90vh"
        }
      >
        <Text
          bgGradient="linear(to-r,#84e1bc, #1652f0)"
          bgClip="text"
          fontSize={["xl", "3xl", "4xl"]}
          fontWeight="900"
          maxW={["60vw", "50vw", "40vw"]}
          lineHeight="2ch"
          mt="10"
        >
          {/* Showing Customized Messages if Wallet is connected or not */}
          {!isWalletConnected
            ? "Your Wallet is Not Connected ! Connect Wallet First"
            : "My Minted NFTs"}

          {/* If the NFT Collection is not Fetched Yet , Show Loading Screen */}
        </Text>

        <Text
          bgGradient="linear(to-r,#84e1bc, #1652f0)"
          bgClip="text"
          fontSize={["2xl", "3xl", "4xl"]}
          fontWeight="900"
          maxW={["60vw", "50vw", "40vw"]}
          lineHeight="2ch"
          pt="5"
        >
          {!isWalletConnected &&
            lw3Collection == null &&
            buildSpaceCollection?.length == null &&
            " Loading.."}
        </Text>
      </VStack>

      {/*  Showing Collections  */}
      {isWalletConnected && (
        <>
          <ShowCollection collection={lw3Collection} title={"LW3"} />
          <ShowCollection
            collection={buildSpaceCollection}
            title="Buildspace"
          />
        </>
      )}
    </Box>
  );
}

function ShowCollection({ collection, title }) {
  return (
    <VStack justify={"center"}>
      <Text
        bgGradient="linear(to-r,#84e1bc, #1652f0)"
        bgClip="text"
        fontSize={["2xl", "3xl", "4xl"]}
        fontWeight="900"
        maxW={["60vw", "50vw", "40vw"]}
        lineHeight="2ch"
        pt="5"
      >
        {title} NFTs
      </Text>
      <Grid
        p={["2", "10", "10"]}
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gap={6}
      >
        {collection.length == 0 && (
          <VStack
            justify={"center"}
            fontSize={["xl", "2xl", "3xl"]}
            fontWeight="600"
            width="85vw"

            lineHeight="2ch"
            pt="5"
          >
            <Text color={"white"}> You have No Buildspace NFTs</Text>
          </VStack>
        )}
        {collection?.map((item) => {
          return <NftItem key={"NFT " + item.id} item={item} />;
        })}
      </Grid>
    </VStack>
  );
}

function NftItem({ item }) {
  return (
    <GridItem>
      <Box p={["0", "2", "5"]}>
        <a
          target="_blank"
          href={`https://opensea.io/assets/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/${item?.token_id}`}
        >
          <Image
            width={["50%", "100%", "100%"]}
            key={"img of " + item.id}
            src={item.media[0].gateway}
            alt={"item" + item.id}
          />
        </a>
        <Heading
          pl={["0", "3vw", "3vw"]}
          pt="4"
          fontSize={["14px", "16px", "18px"]}
          color={"white"}
        >
          {item.title}
        </Heading>
        <Heading
          pl={["0", "3vw", "3vw"]}
          pt="4"
          fontSize={["12px", "14px", "16px"]}
          color={"white"}
        >
          #{item.tokenId}
        </Heading>
      </Box>
    </GridItem>
  );
}
export default Dashboard;
