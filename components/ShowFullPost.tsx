import { PostWithUsername } from "..";
import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import date from "date-and-time";
import FormatText from "./FormatText";

export default function ShowFullPost({
  post,
  onReply,
}: {
  post: PostWithUsername;
  onReply: (arg: PostWithUsername) => void;
}) {
  const posted = new Date(post.createdAt);
  return (
    <Flex
      flexDirection={"column"}
      border={"5px solid"}
      borderColor={"blue.400"}
      bg={"white"}
      p={"2rem"}
      borderRadius={"10px"}
      position={"sticky"}
      top={"1rem"}
      maxH={"70vh"}
      marginBottom={"1rem"}
      width={"100%"}
    >
      <Box
        as="h3"
        fontSize={"1.1rem"}
        paddingBottom={"1rem"}
        fontWeight={"900"}
        color={"blue.400"}
        maxH={"10%"}
      >
        {post.title}
      </Box>
      <Box
        paddingBottom={"1rem"}
        maxH={"85%"}
        overflowY={"scroll"}
        maxW={"100%"}
      >
        <FormatText text={post.content} />
      </Box>
      <Grid
        gridTemplateColumns={"repeat(2, 1fr)"}
        gridTemplateRows={"repeat(2, 1fr)"}
        maxH={"10%"}
      >
        <Box fontSize={".8rem"}>
          {date.format(posted, "DD MMM YY")}, {date.format(posted, "hh:mm A")}
        </Box>
        <Box textAlign={"right"} fontSize={".8rem"}>
          {post.author.username}
        </Box>
        <Button
          onClick={() => onReply(post)}
          gridColumn={"2"}
          fontSize={".8rem"}
        >
          Reply
        </Button>
      </Grid>
    </Flex>
  );
}
