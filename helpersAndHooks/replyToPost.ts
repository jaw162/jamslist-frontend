import { API_URL } from "@/config";

const reply = async ({
  userToId,
  title,
  content,
}: {
  userToId: string;
  title: string;
  content: string;
}) => {
  const res = await fetch(`${API_URL}/api/conversation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userToId,
      title,
      content,
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

export const handleReply = ({
  userToId,
  title,
  content,
  handleError,
  onSuccess,
}: {
  userToId: string;
  title: string;
  content: string;
  handleError: (arg: string) => void;
  onSuccess?: () => void;
}) => {
  reply({
    userToId,
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
