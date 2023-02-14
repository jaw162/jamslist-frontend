import { TabPanel, Flex, Box } from "@chakra-ui/react";
import { CountyApiResponse } from "..";
import { useRouter } from "next/router";

export default function CountiesList({
  country,
}: {
  country: CountyApiResponse[];
}) {
  const router = useRouter();

  return (
    <TabPanel
      display={"grid"}
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
    >
      {country.map(el => {
        return (
          <Flex
            key={el.abbreviation}
            justifyContent={"space-between"}
            m={"1rem 1rem 1rem 0"}
            _hover={{ textDecor: "underline" }}
            cursor={"pointer"}
            borderBottom={"2px"}
            borderColor={"blue.200"}
            p={".6rem 0"}
            onClick={() => {
              router.push(`/${el.slug}?page=1`);
            }}
          >
            <Box as="h4">{el.name}</Box>
            <Box as="h4">{el._count.post} Posts</Box>
          </Flex>
        );
      })}
    </TabPanel>
  );
}
