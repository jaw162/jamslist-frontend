import { Flex, Button, Input, Textarea } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { handleReply } from "@/helpersAndHooks/replyToPost";
import { useState } from "react";
import { toast } from "react-toastify";

type Message = {
  userToId: string;
  title: string;
  content: string;
};

export default function ReplyToPostModal({
  setReplyWindowClicked,
  message,
  setMessage,
}: {
  setReplyWindowClicked: (arg: boolean) => void;
  message: Message;
  setMessage: (arg: Message) => void;
}) {
  const { userToId, title, content } = message;

  return (
    <Flex
      position={"fixed"}
      top={"0"}
      left={"0"}
      h={"100%"}
      w={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      bg={"blackAlpha.600"}
    >
      <Flex
        as="form"
        h={"25rem"}
        bg={"white"}
        p={"1rem"}
        m={"1rem"}
        flexDir={"column"}
        justifyContent={"space-around"}
        position={"relative"}
        onSubmit={e => {
          e.preventDefault();
          handleReply({
            userToId,
            title,
            content,
            onSuccess: () => toast.success("Success"),
            handleError: toast.error,
          });
        }}
      >
        <CloseIcon
          position={"absolute"}
          top={"-30px"}
          right={"-30px"}
          h={"1.5rem"}
          w={"1.5rem"}
          color={"gray.100"}
          cursor={"pointer"}
          onClick={() => setReplyWindowClicked(false)}
        />
        <Input
          name="title"
          onChange={e => {
            setMessage({ ...message, title: e.target.value });
          }}
          value={message.title}
          bg={"white"}
        />
        <Textarea
          name="content"
          value={message.content}
          onChange={e => {
            setMessage({ ...message, content: e.target.value });
          }}
          h={"50%"}
          bg={"white"}
          resize={"none"}
        />
        <Button type="submit">Send</Button>
      </Flex>
    </Flex>
  );
}
