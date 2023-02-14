import { API_URL } from "@/config";

const deleteMessage = async ({ id }: { id: number }) => {
  const res = await fetch(`${API_URL}/api/conversation/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw `${data.message}`;
  }
};

export const handleDelete = ({
  id,
  handleError,
  onSuccess,
}: {
  id: number;
  handleError: (arg: string) => void;
  onSuccess?: () => void;
}) => {
  deleteMessage({
    id,
  })
    .then(res => {
      if (onSuccess) onSuccess();
    })
    .catch(err => {
      console.error(err);
      handleError(typeof err === "string" ? err : "Something went wrong");
    });
};
