import {
  Flex,
  Input,
  Textarea,
  Button,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Genre } from "..";
import { handleListingEdit } from "@/helpersAndHooks/postEdit";
import { toast } from "react-toastify";

const genres = [
  "Rock",
  "Blues",
  "Jazz",
  "Indie",
  "Reggae",
  "Pop",
  "Electronic",
  "None",
  "Other",
];

export default function PostListingModal({
  postId,
  title,
  content,
  genre,
  setPostModalOpen,
}: {
  postId: string;
  title: string;
  content: string;
  genre: typeof Genre[keyof typeof Genre];
  setPostModalOpen: (arg: boolean) => void;
}) {
  const [listing, setListing] = useState<{
    title: string;
    content: string;
    postId: string;
    genre: typeof Genre[keyof typeof Genre];
  }>({ title, content, postId, genre });

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
      color={"black"}
      zIndex={"1"}
    >
      <Flex
        as="form"
        h={"30rem"}
        bg={"white"}
        p={"1rem"}
        m={"1rem"}
        flexDir={"column"}
        justifyContent={"space-around"}
        position={"relative"}
        onSubmit={e => {
          e.preventDefault();
          if (!title || !content || !genre) return;

          handleListingEdit({
            postId,
            content: listing.content,
            genre: listing.genre,
            title: listing.title,
            handleError: toast.error,
            onSuccess: () => {
              toast.success("Success");
              setPostModalOpen(false);
            },
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
          onClick={() => setPostModalOpen(false)}
        />
        <FormLabel>Genre</FormLabel>
        <Select
          onChange={e =>
            setListing({
              ...listing,
              genre: e.target.value as keyof typeof Genre,
            })
          }
          placeholder="Select genre"
          defaultValue={genre}
        >
          {genres.map(genre => (
            <option value={genre} key={genre}>
              {genre}
            </option>
          ))}
        </Select>
        <FormLabel>Title</FormLabel>
        <Input
          name="title"
          onChange={e => {
            setListing({ ...listing, title: e.target.value });
          }}
          value={listing.title}
          bg={"white"}
        />
        <FormLabel>Content</FormLabel>
        <Textarea
          name="content"
          value={listing.content}
          onChange={e => {
            setListing({ ...listing, content: e.target.value });
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
