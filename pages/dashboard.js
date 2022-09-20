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

import ShowCollection from "./components/ShowCollection";

/**    Hardcoded Conytract Address Values for LW3 and Buildspace Collection to filter results with*/
const lw3ContractAddress = "0x1ed25648382c2e6da067313e5dacb4f138bc8b33";
const buildSpaceContractAddress = "0x322a88a26c23d45c7887711cadf055275701738e";

// Global variable to make request with
const alchemy = new Alchemy({
  // hardcoded my API key ,
  //can store it in .env file but right now , i don't think there's an issue with this

  apiKey: "Ye6S888IuNTfAGGPQf2C_ZRvXJD9YQdQ",

  network: Network.MATIC_MAINNET,
});

function Dashboard() {
  //  Wallet Connection status Hook
  const { isConnected, isDisconnected, address } = useAccount();
  //   //  Wallet Connection status Component State Variables
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  // Array for Holding BAYC NFT Collection
  const [lw3Collection, setLw3Collection] = useState(null);
  const [buildSpaceCollection, setBuildSpaceCollection] = useState(null);

  async function fetchLw3NFTs() {
    //    As `getNftsForOwner` accepts only an Array of addresses
    //    converting an string into an array of one string element
    let addresses = [];
    addresses.push(lw3ContractAddress);
// dummy address that has some LW3 NFTs : 0xb4e5BCdE9b9e1F6f7fAF766cAfAfCdf2491cd9Ea
    let nfts = await alchemy.nft.getNftsForOwner(address, {
      contractAddresses: addresses,
    });

    setLw3Collection(nfts?.ownedNfts);
  }
  async function fetchBuildspaceNFTs() {
    //    As `getNftsForOwner` accepts only an Array of addresses
    //    converting an string into an array of one string element

    let addresses = [];
    addresses.push(buildSpaceContractAddress);

    let nfts = await alchemy.nft.getNftsForOwner(address, {
      contractAddresses: addresses,
    });

    setBuildSpaceCollection(nfts?.ownedNfts);
  }

  //  Managing Component State using UseEffect
  // Everytime the Wallet is Connected or Disconnected
  // it will update the state variables
  useEffect(() => {
    if (isConnected == true) {
      fetchLw3NFTs();
      fetchBuildspaceNFTs();
      setIsWalletConnected(true);
    }
    if (isDisconnected == true) setIsWalletConnected(false);
  }, [isConnected, isDisconnected]);

  return (
    // The Over All Conainer of the Dashboard
    <Box pt="10" width="100%" height="fit-content" bg="black">
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
        pb="5"
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
        <Stack spacing={"2"} direction={["column", "column", "row"]}>
          <Box
            width={["max-content", "100%"]}
            fontSize={["3vw", "10px", "12px", "14px"]}
          >
            <ConnectButton  />
          </Box>
          <ButtonGroup variant="solid" spacing="5">
            <Button
              width={["31vw", "100%"]}
              fontSize={["3vw", "10px", "12px", "14px"]}
              px="2"
            >
              <Link href="/">Back to Website</Link>
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>

      <VStack
        height={
          isWalletConnected &&
          lw3Collection == null &&
          buildSpaceCollection == null
            ? "fit-content"
            : "100vh"
        }
        justify={!isWalletConnected ? "center" : "normal"}
      >
        <Text
          bgGradient="linear(to-r,#84e1bc, #1652f0)"
          bgClip="text"
          fontSize={["xl", "3xl", "4xl"]}
          fontWeight="900"
          maxW={["60vw", "50vw", "40vw"]}
          lineHeight="2ch"
        >
          {/* Showing Customized Messages if Wallet is connected or not */}
          {!isWalletConnected
            ? "Your Wallet is Not Connected ! Connect your Polygon Wallet First"
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
          {isWalletConnected &&
            lw3Collection == null &&
            buildSpaceCollection == null &&
            " Loading.."}
        </Text>
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
      </VStack>
    </Box>
  );
}

export default Dashboard;
