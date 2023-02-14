import Layout from "@/components/Layout";
import useGetUserPosts from "@/helpersAndHooks/useGetUserPosts";
import { Container, Box, Flex } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import date from "date-and-time";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import EditPostModal from "@/components/EditPostModal";
import { handlePostDelete } from "@/helpersAndHooks/handlePostDelete";
import { toast } from "react-toastify";
import { Genre } from "@/index";

type singlePost = {
  id: string;
  title: string;
  content: string;
  genre: typeof Genre[keyof typeof Genre];
  countyId: string;
  createdAt: string;
};

export default function PostsDashboard() {
  const { userPosts } = useGetUserPosts();
  const [confirmDelete, setConfirmDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [postToChange, setPostToChange] = useState<singlePost>();

  return (
    <Layout makeLarge={true}>
      <Container
        maxW={"maxWidth"}
        gridTemplateColumns={"repeat(5, 1fr)"}
        display={"grid"}
        p={"5rem 0"}
      >
        <Box gridColumn={"1/1"} as={"h1"} fontSize={"2.5rem"}>
          Your Posts
        </Box>
        <Box gridColumn={"3/5"}>
          {userPosts?.posts.length
            ? userPosts.posts.map(el => {
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
                    borderColor={"blue.400"}
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
                    <Box paddingBottom={"1rem"}>{el.content}</Box>
                    <Flex justifyContent={"space-between"}>
                      <Box fontSize={".8rem"}>
                        {date.format(posted, "DD MMM YY")},{" "}
                        {date.format(posted, "hh:mm A")}
                      </Box>
                      <Box fontSize={".8rem"}>You</Box>
                    </Flex>
                    <Flex w={"100%"} justifyContent={"flex-end"}>
                      <DeleteIcon
                        h={"2rem"}
                        m={".5rem .5rem 0 0 "}
                        cursor={"pointer"}
                        _hover={{ color: "blue" }}
                        onClick={() => {
                          setPostToChange(el);
                          setConfirmDeleteOpen(true);
                        }}
                      />
                      <EditIcon
                        h={"2rem"}
                        marginTop={".5rem"}
                        cursor={"pointer"}
                        _hover={{ color: "blue" }}
                        onClick={() => {
                          setPostToChange(el);
                          setEditOpen(true);
                        }}
                      />
                    </Flex>
                  </Flex>
                );
              })
            : "No posts to show!"}
          {confirmDelete && postToChange && (
            <ConfirmDeleteModal
              handleDelete={() => {
                handlePostDelete({
                  id: postToChange.id,
                  onSuccess: () => {
                    toast.success("Success");
                    setConfirmDeleteOpen(false);
                  },
                  handleError: toast.error,
                });
              }}
              setConfirmOpen={setConfirmDeleteOpen}
            />
          )}
          {editOpen && postToChange && (
            <EditPostModal
              postId={postToChange.id}
              content={postToChange.content}
              title={postToChange.title}
              genre={postToChange.genre}
              setPostModalOpen={setEditOpen}
            />
          )}
        </Box>
      </Container>
    </Layout>
  );
}
