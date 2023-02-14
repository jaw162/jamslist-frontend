import { Box, Flex, Grid } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      as="footer"
      justifyContent={"flex-start"}
      maxW={"maxWidth"}
      margin={"0 auto"}
      p={"4rem 1rem"}
    >
      <Grid
        gridTemplateColumns={"repeat(2, 1fr)"}
        gridTemplateRows={"repeat(4, 1fr)"}
        gap={".5rem"}
      >
        <Box as="h4" fontSize={"1.2rem"}>
          SUPPORT
        </Box>
        <Box as="h4" fontSize={"1.2rem"}>
          COMPANY
        </Box>
        <Box as="p" _hover={{ color: "blue" }}>
          Help
        </Box>
        <Box as="p" _hover={{ color: "blue" }}>
          About
        </Box>
        <Box as="p" _hover={{ color: "blue" }}>
          Track Order
        </Box>
        <Box as="p" _hover={{ color: "blue" }}>
          Blog
        </Box>
        <Box as="p" _hover={{ color: "blue" }}>
          Returns
        </Box>
        <Box as="p" _hover={{ color: "blue" }}>
          Press
        </Box>
      </Grid>
    </Flex>
  );
}
