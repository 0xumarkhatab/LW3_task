import { Box, HStack,VStack, Image,Button } from "@chakra-ui/react";
import React, { useState } from "react";

import Link from "next/link";

import Head from "next/head";

function Navbar() {
  const [showDropMenu,setShowDropMenu]=useState(false);

  return (
    <>
      {/*
    Displaying Tab title of the page
    */}
      <Head>
        <title>LearnWeb3</title>
      </Head>

      {/* 

        In Chakra UI , Alomost Everything is a Box
        Analogeous to <div> in HTMl

        Chakra UI somehow is the combonation of HTMl and React Writing styles

        Features :

        - You can Create Custom Tags like Box ,Hstack etc.
        - You can appply styles directly on the components
        - Chakra UI also provides responsive tactics like
          
          `p={["0", "10px", "10px"]}` 
          
          means the element ( on which it is applied ) will have the padding of 
          
          - 0px on Small sized screens 
          - 10px on Medium sized screens 
          - 10px on Large sized screens 
          

*/}
      <Box
        position={"fixed"}
        p={["0", "0", "10px"]}
        bg={"white"}
        boxShadow="1px 1px 1px 1px grey"
        w="100vw"
        zIndex={"10"}
        
      >
        {/* Cons */}

        <HStack justify="space-between" w={["95%", "98%", "80vw"]}>
          {/* Displaying the ICON of Website */}

          <a href="/">
            <Image
              pl={["10", "10", "20"]}
              src="./learnweb3.png"
              width={"25"}
              height="8"
              objectFit={"contain"}
            />
          </a>

          {/* Displaying Navifation Menu */}
          <HStack
            display={["none", "none", "flex"]}
            spacing="10"
            fontSize={"14px"}
            fontWeight="620"
            justify="center"
          >
            <NavLink title="Home" link={"/"} />
            <NavLink title="Explore" link={"/"} />
            <NavLink title="Pricing" link={"/"} />
            <NavLink title="Membership" link={"/"} />
            {/* All the Above links are Dummy redirecting to Home Page  */}

            {/* This Page Will  show the Minted NFTs when the Wallet is Connected  */}
            {/* Initially the Collection `Bored Ape` will be rendered */}
            <NavLink title="StartBuilding" link={"/dashboard"} />
          </HStack>


          <Box p="2px" borderRadius={"10px"} _hover={{backgroundColor:"#DEDEDE",cursor:"pointer"}}>
            <Button bg="transparent" outline={"none"} border="none" onClick={()=>setShowDropMenu(prev=>!prev)}>
              <Image
                display={["flex", "flex", "none"]}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/240px-Hamburger_icon.svg.png"
                width={"6"}
                height="6"
              />
            </Button>

          </Box>
          
        </HStack>
        {
            showDropMenu && 
          <VStack
            spacing="10"
            fontSize={"14px"}
            fontWeight="620"
            display={["flex","flex","none"]}
            pb="5"
          >
            <NavLink title="Home" link={"/"} />
            <NavLink title="Explore" link={"/"} />
            <NavLink title="Pricing" link={"/"} />
            <NavLink title="Membership" link={"/"} />
            {/* All the Above links are Dummy redirecting to Home Page  */}

            {/* This Page Will  show the Minted NFTs when the Wallet is Connected  */}
            {/* Initially the Collection `Bored Ape` will be rendered */}
            <NavLink title="StartBuilding" link={"/dashboard"} />
          </VStack>
          

          }

      </Box>
    </>
  );
}

const NavLink = ({ title, link }) => {
  return (
    <Box width={["30vw","fit-content","fit-content","fit-content","fit-content"]} fontSize={["3.5vw","12px","14px","14px","14px"]} _hover={{ textDecoration: "none" }}>
      <Link href={link}>{title}</Link>
    </Box>
  );
};

export default Navbar;
