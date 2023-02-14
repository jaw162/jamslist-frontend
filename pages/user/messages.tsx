import AllConvosDisplay from "@/components/AllConvosDisplay";
import FullConvoDisplay from "@/components/FullConvoDisplay";
import Layout from "@/components/Layout";
import useGetUserMessages from "@/helpersAndHooks/useGetUserMessages";
import useGetMessage from "@/helpersAndHooks/useGetMessage";
import { Box, Container, Textarea, Flex } from "@chakra-ui/react";
import { ChatIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { handleMessageSending } from "@/helpersAndHooks/sendMessage";
import { toast } from "react-toastify";

export default function MessagesDashboard() {
  const { userMessages } = useGetUserMessages();
  const { fullMessages, handleFetch } = useGetMessage(
    userMessages?.conversation
  );

  const [activeMessage, setActiveMessage] = useState<number | string>("");
  const [reply, setReply] = useState("");

  return (
    <Layout makeLarge={true}>
      <Container
        maxWidth={"maxWidth"}
        display={"grid"}
        gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
        paddingBottom={"10rem"}
      >
        <Box
          fontSize={"2.5rem"}
          as="h1"
          p={"1rem"}
          gridColumn={"1/3"}
          marginBottom={"4rem"}
        >
          Your Messages
        </Box>
        <Container gridColumn={"1/3"}>
          {userMessages && (
            <AllConvosDisplay
              handleFetch={handleFetch}
              messages={userMessages.conversation}
              fullMessages={fullMessages}
              userId={userMessages.id}
              setActiveMessage={setActiveMessage}
            />
          )}
        </Container>
        <Container w={"100%"} gridColumn={"3/6"}>
          {fullMessages[activeMessage] && userMessages?.id && (
            <Container
              position={{ base: "fixed", "sm-m": "unset" }}
              top={{ base: "0" }}
              left={{ base: "0" }}
              h={{ base: "100%" }}
              bg={{ base: "white", "sm-m": "unset" }}
            >
              <CloseIcon
                cursor={"pointer"}
                onClick={() => setActiveMessage("")}
              />
              <FullConvoDisplay
                userId={userMessages.id}
                messages={fullMessages[activeMessage].messages}
              />
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleMessageSending({
                    content: reply,
                    id: fullMessages[activeMessage].id,
                    handleError: toast.error,
                    onSuccess: () => {
                      toast.success("Success");
                      setReply("");
                      handleFetch(fullMessages[activeMessage].id, toast.error);
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
            </Container>
          )}
        </Container>
      </Container>
    </Layout>
  );
}
