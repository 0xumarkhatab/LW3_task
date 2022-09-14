import { Box, Text, ButtonGroup, Button } from "@chakra-ui/react";
import React from "react";

// This is a simple Component that shows the Tagline and Purpose of the website
import Link from "next/link";
function Introduction() {
  /**
   *      How It Works ?
   *
   *      A Fadded ( Linear Graident ) Background Image
   *      Tagline
   *      Description of NFTLaunchKit
   *      Button to Start Building Stuff
   */

  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      overflow={"scroll"}
      p={["0","40","40"]}
      pt={["20vh"]}
      pl={["2","10","40","40"]}
      pb={"10"}
      /*"
       *  Background Image
       */
      backgroundImage={`linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.7)),
    url('intro_bg.jpg');`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat={"no-repeat"}
    >
      {/* Tagline */}
      <Text
        bgGradient="linear(to-r,#84e1bc, #1652f0)"
        bgClip="text"
        fontSize={["2xl","2xl", "3xl", "4xl"]}
        fontWeight="900"
        maxW={["90vw","80vw", "50vw", "40vw"]}
        lineHeight="2ch"
      >
        The best platform to Learn Web 3 for free
      </Text>

      {/* Description */}

      <Text
        pt="1rem"
        color="white"
        fontSize={["14px", "16px", "18px"]}
        fontWeight="normal"
        maxW={["90vw","80vw", "50vw", "40vw"]}
        lineHeight="3ch"
      >
        Learn Web3 has helped a lot of people to get started and be really good at building Dapps.
        It has 6 tracks as of now that turns a newbie or a beginner Web 3.0 Developer into a senior Developer
        having the grasp of web 3 security , different blockchains and different design techniques to make 
        him or her , ready for job
      </Text>

      <Text
        pt="1rem"
        color="white"
        fontSize="20px"
        fontWeight="700"
        maxW={["50vw", "40vw", "40vw"]}
        lineHeight="3ch"
      >
        Build. Design. Launch
      </Text>

      {/* Button To Navigate to Dashboard */}

      <ButtonGroup mt="4" variant="solid" spacing="5">
        <Link href="/dashboard">
        <Button width={["30vw","fit-content","fit-content","fit-content","fit-content"]} fontSize={["4vw","12px","14px","14px","16px"]} >Start Building</Button>
        </Link>
      </ButtonGroup>

    </Box>
  );
}

export default Introduction;
