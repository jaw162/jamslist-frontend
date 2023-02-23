import { UserDashboardResponse } from "..";
import { BellIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { Conversations } from "@/helpersAndHooks/useGetMessage";
import { useState } from "react";
import { handleDelete } from "@/helpersAndHooks/handleMessageDelete";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import date from "date-and-time";

export default function AllConvosDisplay({
  messages,
  handleFetch,
  setActiveMessage,
  fullMessages,
  userId,
}: {
  messages: UserDashboardResponse["conversation"];
  handleFetch: (id: number, handleError: (arg: string) => void) => void;
  setActiveMessage: (id: number) => void;
  fullMessages: Conversations;
  userId: string;
}) {
  const [confirmDelete, setConfirmOpen] = useState(false);
  const [convoID, setConvoId] = useState<number>();

  return (
    <>
      {messages.length
        ? messages.map(el => {
            const sentAt = new Date(el.messages[0].createdAt);

            return (
              <Flex
                key={el.id}
                justifyContent={"flex-start"}
                alignItems={"center"}
                m={"1rem 0"}
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  key={el.id}
                  w={{ base: "100%", sm: "50%" }}
                  bg={"white"}
                  p={".5rem"}
                  cursor={"pointer"}
                  onClick={() => {
                    if (!fullMessages[el.id]) {
                      handleFetch(el.id, toast.error);
                      setActiveMessage(el.id);
                    } else {
                      setActiveMessage(el.id);
                    }
                  }}
                  border={"2px solid"}
                  borderColor={"gray.200"}
                  borderRadius={"5px"}
                >
                  <Box>
                    <Box>{el.user[0].username}</Box>
                    <Box>{el.messages[0].title}</Box>
                    <Box>{el.messages[0].content}</Box>
                    <Box>{date.format(sentAt, "DD/MM/YY HH:MM")}</Box>
                  </Box>
                  {el?.messages[0].read ||
                  el?.messages[0].authorId === userId ? null : (
                    <BellIcon color={"blue.700"} />
                  )}
                </Flex>
                <DeleteIcon
                  _hover={{ color: "blue" }}
                  margin={"0 1rem"}
                  onClick={() => {
                    setConvoId(el.id);
                    setConfirmOpen(true);
                  }}
                  cursor={"pointer"}
                />
              </Flex>
            );
          })
        : null}
      {confirmDelete && (
        <ConfirmDeleteModal
          handleDelete={() => {
            handleDelete({
              id: convoID as number,
              onSuccess: () => {
                setConfirmOpen(false);
                toast.success("Success");
              },
              handleError: toast.error,
            });
          }}
          setConfirmOpen={setConfirmOpen}
        />
      )}
    </>
  );
}
