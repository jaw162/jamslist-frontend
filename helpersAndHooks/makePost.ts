import { API_URL } from "@/config";

const post = async ({
  countyId,
  title,
  content,
  genre,
}: {
  countyId: string;
  title: string;
  content: string;
  genre: string;
}) => {
  const res = await fetch(`${API_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      countyId,
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

export const handleListingPost = ({
  countyId,
  genre,
  title,
  content,
  handleError,
  onSuccess,
}: {
  countyId: string;
  genre: string;
  title: string;
  content: string;
  handleError: (arg: string) => void;
  onSuccess?: () => void;
}) => {
  post({
    countyId,
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
