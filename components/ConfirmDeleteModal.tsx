import { Flex, Button, Box } from "@chakra-ui/react";

export default function ConfirmDeleteModal({
  handleDelete,
  setConfirmOpen,
}: {
  handleDelete: () => void;
  setConfirmOpen: (arg: boolean) => void;
}) {
  return (
    <Flex
      position={"fixed"}
      justifyContent={"center"}
      alignItems={"center"}
      h={"100%"}
      w={"100%"}
      left={"0"}
      top={"0"}
      zIndex={"1"}
      bg={"blackAlpha.500"}
    >
      <Flex
        borderRadius={"10px"}
        border={"5px solid"}
        borderColor={"blue.400"}
        h={"15rem"}
        w={"20rem"}
        bg={"white"}
        flexDir={"column"}
        justifyContent={"center"}
      >
        <Box as="p" textAlign={"center"}>
          Are you sure you want to delete?
        </Box>
        <Box p={"1rem"} m={"0 auto"} w={"fit-content"}>
          <Button onClick={handleDelete} marginRight={"1rem"}>
            OK
          </Button>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
        </Box>
      </Flex>
    </Flex>
  );
}
