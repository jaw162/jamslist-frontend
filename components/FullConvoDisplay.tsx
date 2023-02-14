import date from "date-and-time";
import { Box, Flex } from "@chakra-ui/react";
import { DashboardMessages } from "..";

export default function FullConvoDisplay({
  messages,
  userId,
}: {
  messages: DashboardMessages;
  userId: string;
}) {
  return (
    <Box as="aside" maxH={"70vh"} overflowY={"scroll"} p={"1rem"}>
      {messages.map(message => {
        const timeCreated = new Date(message.createdAt);

        if (userId === message.authorId) {
          return (
            <Flex key={message.id} flexDir={"column"}>
              <Box as="p" fontSize={".8rem"}>
                You
              </Box>
              <Flex
                justifyContent={"flex-start"}
                bg={"blue.400"}
                key={message.id}
                color={"white"}
                w={"fit-content"}
                p={"1rem"}
                borderRadius={"5px"}
              >
                {message.content}
              </Flex>
              <Box as="p" fontSize={".8rem"}>
                {date.format(timeCreated, "DD/MM/YY hh:mm A")}
              </Box>
            </Flex>
          );
        } else {
          return (
            <Flex key={message.id} flexDir={"column"} alignItems={"flex-end"}>
              <Box as="p" fontSize={".8rem"}>
                {message.user.username}
              </Box>
              <Box
                bg={"gray.100"}
                key={message.id}
                color={"black"}
                w={"fit-content"}
                p={"1rem"}
                borderRadius={"5px"}
              >
                {message.content}
              </Box>
              <Box as="p" fontSize={".8rem"}>
                {date.format(timeCreated, "DD/MM/YY hh:mm A")}
              </Box>
            </Flex>
          );
        }
      })}
    </Box>
  );
}
