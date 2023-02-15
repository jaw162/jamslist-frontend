import { PostWithUsername, Posts } from "..";
import { Flex, Box, Button } from "@chakra-ui/react";
import date from "date-and-time";
import { useState } from "react";

export default function PostsView({
  posts,
  onReply,
}: {
  posts: Posts;
  onReply: (arg: PostWithUsername) => void;
}) {
  const [showFull, setShowFull] = useState({ show: false, id: "" });
  const { show, id } = showFull;
  return (
    <>
      {posts.map(el => {
        const posted = new Date(el.createdAt);

        return (
          <Flex
            flexDirection={"column"}
            key={el.id}
            justifyContent={"space-around"}
            bg={"white"}
            minH={"22.5rem"}
            maxH={el.id === id ? "unset" : "22.5rem"}
            marginBottom={"1rem"}
            p={"2rem"}
            borderRadius={"10px"}
            transition={"all .3s"}
            border={"5px solid"}
            borderColor={"blue.400"}
            _hover={{
              transform: "translate(1%, -1%)",
            }}
            cursor={"pointer"}
            onClick={() => setShowFull({ show: !show, id: el.id })}
          >
            <Box
              as="h3"
              fontSize={"1.1rem"}
              paddingBottom={"1rem"}
              fontWeight={"900"}
              color={"blue.400"}
            >
              {el.title}
            </Box>
            <Box paddingBottom={"1rem"}>
              {el.id === id && show
                ? el.content
                : el.content.substring(0, 200) + "..."}
            </Box>
            <Flex justifyContent={"space-between"}>
              <Box fontSize={".8rem"}>
                {date.format(posted, "DD MMM YY")},{" "}
                {date.format(posted, "hh:mm A")}
              </Box>
              <Box fontSize={".8rem"}>{el.author.username}</Box>
            </Flex>

            <Button
              onClick={() => onReply(el)}
              gridColumn={"2"}
              fontSize={".8rem"}
            >
              Reply
            </Button>
          </Flex>
        );
      })}
    </>
  );
}
