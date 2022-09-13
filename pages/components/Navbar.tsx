import { Box, HStack, Image } from "@chakra-ui/react";

import Link from "next/link";

import Head from "next/head";

function Navbar() {
  return (
    <>
      {/*
    Displaying Tab title of the page
    */}
      <Head children={undefined}>
        <title>LW3 Task</title>
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
        p={["0", "10px", "10px"]}
        bg={"white"}
        boxShadow="1px 1px 1px 1px grey"
        w="100%"
      >
        {/* Cons */}

        <HStack justify="space-between" w={["100%", "98%", "80vw"]}>
          {/* Displaying the ICON of Website */}

          <a href="/">
            <Image
              pl={["10", "0", "20"]}
              src="./learnweb3.png"
              width={"30"}
              height="10"
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

{/* Dummy responsive Hamburger Menu */}
          <Box p="2px" borderRadius={"10px"} _hover={{backgroundColor:"#DEDEDE",cursor:"pointer"}}>
            <Link href="/">
              <Image
                display={["flex", "flex", "none"]}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/240px-Hamburger_icon.svg.png"
                width={"6"}
                height="6"
              />
            </Link>

          </Box>
        </HStack>
      </Box>
    </>
  );
}

const NavLink = ({ title, link }) => {
  return (
    <Box _hover={{ textDecoration: "none" }}>
      <Link href={link}>{title}</Link>
    </Box>
  );
};

export default Navbar;
