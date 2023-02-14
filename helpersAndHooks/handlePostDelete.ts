import { API_URL } from "@/config";

const deletePost = async ({ id }: { id: string }) => {
  const res = await fetch(`${API_URL}/api/posts/${id}`, {
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

export const handlePostDelete = ({
  id,
  handleError,
  onSuccess,
}: {
  id: string;
  handleError: (arg: string) => void;
  onSuccess?: () => void;
}) => {
  deletePost({
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
