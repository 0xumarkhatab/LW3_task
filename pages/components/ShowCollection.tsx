
import { HStack,VStack,Text,Grid,GridItem,Button,ButtonGroup,Heading,Box,Image } from "@chakra-ui/react";

function ShowCollection({ collection, title }) {
    return (
      <VStack justify={"center"} minHeight="40vh">
        <Text
          bgGradient="linear(to-r,#84e1bc, #1652f0)"
          bgClip="text"
          fontSize={["2xl", "3xl", "4xl"]}
          fontWeight="900"
          mt="20"
        >
          {title} NFTs
        </Text>
        {collection?.length > 0 && (
          <Grid
            p={["2", "10", "10"]}
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
            ]}
            gap={6}
          >
            {collection?.map((item) => {
              return <NftItem key={"NFT " + item.id} item={item} />;
            })}
          </Grid>
        )}
  
        {collection?.length == 0 && (
          <HStack
            fontSize={["xl", "2xl", "3xl"]}
            fontWeight="600"
            lineHeight="2ch"
            pt="5"
          >
            <Text color={"white"}> You have No {title} NFTs</Text>
          </HStack>
        )}
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
  
  export default ShowCollection;