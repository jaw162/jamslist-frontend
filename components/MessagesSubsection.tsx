import { Box, Flex, Textarea } from "@chakra-ui/react";
import { UserDashboardResponse } from "..";
import { useState } from "react";
import FullConvoDisplay from "./FullConvoDisplay";
import useGetMessage from "@/helpersAndHooks/useGetMessage";
import AllConvosDisplay from "./AllConvosDisplay";
import { ChatIcon } from "@chakra-ui/icons";
import { handleMessageSending } from "@/helpersAndHooks/sendMessage";
import { toast } from "react-toastify";

export default function MessagesSubsection({
  messages,
  userId,
  setNeedsRefresh,
}: {
  messages: UserDashboardResponse["conversation"];
  userId: string;
  setNeedsRefresh: (arg: boolean) => void;
}) {
  const { userMessages, handleFetch } = useGetMessage(messages);
  const [activeMessage, setActiveMessage] = useState<string | number>("");
  const [reply, setReply] = useState("");

  return (
    <>
      <Box gridColumn={"2/2"}>
        {messages.length ? (
          <AllConvosDisplay
            messages={messages}
            userMessages={userMessages}
            userId={userId}
            handleFetch={handleFetch}
            setActiveMessage={setActiveMessage}
          />
        ) : null}
      </Box>
      <Box gridColumn={"3/5"}>
        {userMessages[activeMessage] ? (
          <>
            <FullConvoDisplay
              messages={userMessages[activeMessage].messages}
              userId={userId}
            />
            <form
              onSubmit={e => {
                e.preventDefault();
                handleMessageSending({
                  content: reply,
                  id: userMessages[activeMessage].id,
                  handleError: toast.error,
                  onSuccess: () => {
                    toast.success("Success");
                    setReply("");
                    handleFetch(userMessages[activeMessage].id, toast.error);
                  },
                });
              }}
            >
              <Flex alignItems={"center"}>
                <Textarea
                  required
                  onChange={e => setReply(e.target.value)}
                  value={reply}
                  resize={"none"}
                  zIndex={"0"}
                ></Textarea>
                <Box
                  as="button"
                  type="submit"
                  h={"100%"}
                  _hover={{ color: "blue" }}
                  cursor={"pointer"}
                >
                  <ChatIcon cursor={"pointer"} m={"1rem"} h={"1.2rem"} />
                </Box>
              </Flex>
              <button type="submit" />
            </form>
          </>
        ) : null}
      </Box>
    </>
  );
}
