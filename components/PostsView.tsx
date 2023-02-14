import { PostWithUsername, Posts } from "..";
import { Flex, Box } from "@chakra-ui/react";
import date from "date-and-time";

export default function PostsView({
  posts,
  onPostClick,
  activePost,
}: {
  posts: Posts;
  onPostClick: (arg: PostWithUsername) => void;
  activePost: PostWithUsername | null;
}) {
  return (
    <>
      {posts.map(el => {
        const posted = new Date(el.createdAt);

        return (
          <Flex
            flexDirection={"column"}
            key={el.id}
            bg={"white"}
            marginBottom={"1rem"}
            p={"2rem"}
            borderRadius={"10px"}
            transition={"all .3s"}
            border={"5px solid"}
            borderColor={activePost?.id === el.id ? "green.400" : "blue.400"}
            _hover={{
              transform: "translate(1%, -1%)",
            }}
            cursor={"pointer"}
            onClick={() => onPostClick(el)}
          >
            <Box
              as="h3"
              fontSize={"1.1rem"}
              paddingBottom={"1rem"}
              fontWeight={"900"}
              color={activePost?.id === el.id ? "green.400" : "blue.400"}
            >
              {el.title}
            </Box>
            <Box paddingBottom={"1rem"}>
              {el.content.substring(0, 200)} . . .{" "}
            </Box>
            <Flex justifyContent={"space-between"}>
              <Box fontSize={".8rem"}>
                {date.format(posted, "DD MMM YY")},{" "}
                {date.format(posted, "hh:mm A")}
              </Box>
              <Box fontSize={".8rem"}>{el.author.username}</Box>
            </Flex>
          </Flex>
        );
      })}
    </>
  );
}
