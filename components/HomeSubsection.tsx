import { Box, Container, Flex } from "@chakra-ui/react";
import { UserDashboardResponse } from "..";
import { BellIcon } from "@chakra-ui/icons";

export default function HomeSubsection({
  messages,
  userId,
  posts,
}: {
  messages: UserDashboardResponse["conversation"];
  posts: UserDashboardResponse["posts"];
  userId: string;
}) {
  return (
    <Container
      gridColumn={"2/-1"}
      w={"100%"}
      maxW={"100%"}
      display={"grid"}
      gridTemplateColumns={"repeat(2, 1fr)"}
      gridTemplateRows={"repeat(2, 1fr)"}
      borderRight={"2px solid transparent"}
      borderColor={"blackAlpha.400"}
    >
      <Box as="aside">
        <Box as="h2">Posts</Box>
        {posts.length ? (
          posts.map(el => {
            return (
              <Flex key={el.id} flexDir={"column"}>
                <Box>{el.countyId}</Box>
                <Box>{el.title}</Box>
              </Flex>
            );
          })
        ) : (
          <Box as="p">No posts to show!</Box>
        )}
      </Box>
      <Box as="aside">
        <Box as="h2">Messages</Box>
        {messages.length ? (
          messages.map(el => {
            return (
              <Box key={el.id}>
                <Box>{el.user[0].username}</Box>
                <Box>{el.messages[0].title}</Box>
                <Box>{el.messages[0].content}</Box>
                {el.messages[0].read ||
                el.messages[0].authorId === userId ? null : (
                  <BellIcon color={"blue.700"} />
                )}
              </Box>
            );
          })
        ) : (
          <Box as="p">No messages to show!</Box>
        )}
      </Box>
    </Container>
  );
}
