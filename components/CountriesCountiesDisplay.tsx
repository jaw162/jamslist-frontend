import { byCountryReturnType } from "@/helpersAndHooks/dataFormatter";
import { Tabs, TabList, TabPanels, Tab } from "@chakra-ui/react";
import CountiesList from "./CountiesList";

export default function CountriesCountiesDisplay({
  countryAndPosts,
}: {
  countryAndPosts: byCountryReturnType;
}) {
  return (
    <Tabs
      variant={"enclosed"}
      maxW={"100vw"}
      bg={"blackAlpha.900"}
      color={"whiteAlpha.900"}
      paddingBottom={"10rem"}
    >
      <TabList maxW={"maxWidth"} m={"0 auto"} border={"0"}>
        <Tab
          fontSize={{ base: ".8rem", sm: "1rem" }}
          _selected={{ bg: "white", color: "blackAlpha.900" }}
        >
          England
        </Tab>
        <Tab
          fontSize={{ base: ".8rem", sm: "1rem" }}
          _selected={{ bg: "white", color: "blackAlpha.900" }}
        >
          Wales
        </Tab>
        <Tab
          fontSize={{ base: ".8rem", sm: "1rem" }}
          _selected={{ bg: "white", color: "blackAlpha.900" }}
        >
          Scotland
        </Tab>
        <Tab
          fontSize={{ base: ".8rem", sm: "1rem" }}
          _selected={{ bg: "white", color: "blackAlpha.900" }}
        >
          Northern Ireland
        </Tab>
      </TabList>
      <TabPanels
        maxW={"maxWidth"}
        m={"0 auto"}
        bg={"white"}
        color={"blackAlpha.900"}
        borderRadius={"0 5px 5px 5px"}
      >
        <CountiesList country={countryAndPosts["England"]} />
        <CountiesList country={countryAndPosts["Wales"]} />
        <CountiesList country={countryAndPosts["Scotland"]} />
        <CountiesList country={countryAndPosts["Northern Ireland"]} />
      </TabPanels>
    </Tabs>
  );
}
