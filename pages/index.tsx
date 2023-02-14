import { API_URL } from "@/config";
import { byCountry } from "@/helpersAndHooks/dataFormatter";
import Layout from "@/components/Layout";
import { byCountryReturnType } from "@/helpersAndHooks/dataFormatter";
import CountriesCountiesDisplay from "@/components/CountriesCountiesDisplay";
import { Box, Container } from "@chakra-ui/react";

export default function Home({
  countryAndPosts,
}: {
  countryAndPosts: byCountryReturnType;
}) {
  return (
    <Layout makeLarge={true}>
      <Container
        as="aside"
        m={"0"}
        maxW={"100vw"}
        bg={"blackAlpha.900"}
        color={"whiteAlpha.900"}
      >
        <Box
          m={"0 auto"}
          maxWidth={"maxWidth"}
          p={{ xl: "1rem", base: "1rem 0" }}
        >
          Browse by Country...
        </Box>
      </Container>
      <CountriesCountiesDisplay countryAndPosts={countryAndPosts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const countiesRes = await fetch(`${API_URL}/api/counties`);

  const counties = await countiesRes.json();

  const countryAndPosts = byCountry(counties);

  return {
    props: { countryAndPosts },
  };
}
