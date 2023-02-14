import { API_URL } from "@/config";

const reply = async ({ id, content }: { id: number; content: string }) => {
  const res = await fetch(`${API_URL}/api/conversation/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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

export const handleMessageSending = ({
  id,
  content,
  handleError,
  onSuccess,
}: {
  id: number;
  content: string;
  handleError: (arg: string) => void;
  onSuccess?: () => void;
}) => {
  reply({
    id,
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
