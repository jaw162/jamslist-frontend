import { Box, Container, Flex } from "@chakra-ui/react";

export default function HomePageHero() {
  return (
    <Box
      h={300}
      bgPosition={"bottom"}
      bgSize={"contain"}
      bgRepeat={{ base: "no-repeat", heroImageBP: "repeat" }}
      bgImage={"url('/crowd-silhouette.jpg')"}
    >
      <Container
        height={"100%"}
        w={"100%"}
        maxWidth={"100%"}
        m={0}
        bg={"offWhite"}
        backgroundColor={"offWhite"}
        p={{ xl: "0", base: "0 .5rem" }}
      >
        <Flex
          maxW={"maxWidth"}
          flexDirection={"column"}
          w={"100%"}
          margin={"0 auto"}
          alignItems={"flex-start"}
        >
          <Box p={"1rem"}>Find musicians in your area...</Box>
          <Container
            m={0}
            p={"1rem"}
            borderRadius={"8px"}
            bg={"offWhiteDarker"}
          >
            <Box>
              We have thousands of musicians looking to find band members here
              everyday,{" "}
              <Box
                as="a"
                _hover={{ color: "blue.400" }}
                cursor={"pointer"}
                textDecoration={"underline"}
              >
                make an account
              </Box>{" "}
              and find some of your own today!
            </Box>
          </Container>
        </Flex>
      </Container>
    </Box>
  );
}
