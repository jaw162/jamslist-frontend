import { API_URL } from "@/config";

const post = async ({
  postId,
  title,
  content,
  genre,
}: {
  postId: string;
  title: string;
  content: string;
  genre: string;
}) => {
  const res = await fetch(`${API_URL}/api/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      genre,
    }),
    credentials: "include",
  });

  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw `${data.message}`;
  }
};

export const handleListingEdit = ({
  postId,
  genre,
  title,
  content,
  handleError,
  onSuccess,
}: {
  postId: string;
  genre: string;
  title: string;
  content: string;
  handleError: (arg: string) => void;
  onSuccess?: () => void;
}) => {
  post({
    postId,
    genre,
    title,
    content,
  })
    .then(res => {
      if (onSuccess) onSuccess();
    })
    .catch(err => {
      console.error(err);
      handleError(typeof err === "string" ? err : "Something went wrong");
    });
};
