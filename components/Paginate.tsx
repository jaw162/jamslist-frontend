import { NextRouter } from "next/router";
import { CountyPageResponse } from "..";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

export default function Paginate({
  page,
  countyData,
  totalPages,
  router,
}: {
  page: string;
  countyData: CountyPageResponse;
  totalPages: number;
  router: NextRouter;
}) {
  return (
    <>
      {page !== "1" && (
        <ArrowBackIcon
          onClick={() => {
            router.push(`/${countyData.slug}?page=${Number(page) - 1}`);
          }}
          borderRadius={"10px"}
          border={"5px solid"}
          bg={"white"}
          m={"1rem"}
          h={"2.5rem"}
          w={"2.5rem"}
          borderColor={"blue.400"}
          color={"blackAlpha.900"}
          cursor={"pointer"}
        />
      )}
      {Array.from({ length: totalPages }, (x, i) => {
        return (
          <Box
            onClick={() => {
              router.push(`/${countyData.slug}?page=${i + 1}`);
            }}
            key={i}
            borderRadius={"10px"}
            border={"5px solid"}
            bg={"white"}
            m={".5rem"}
            p={".5rem 1rem"}
            borderColor={page === String(i + 1) ? "green.400" : "blue.400"}
            color={page === String(i + 1) ? "green.400" : "blue.400"}
            cursor={"pointer"}
          >
            {i + 1}
          </Box>
        );
      })}
      {page !== String(totalPages) && (
        <ArrowForwardIcon
          onClick={() => {
            router.push(`/${countyData.slug}?page=${Number(page) + 1}`);
          }}
          borderRadius={"10px"}
          border={"5px solid"}
          bg={"white"}
          m={"1rem"}
          h={"2.5rem"}
          w={"2.5rem"}
          borderColor={"blue.400"}
          cursor={"pointer"}
          color={"blackAlpha.900"}
        />
      )}
    </>
  );
}
