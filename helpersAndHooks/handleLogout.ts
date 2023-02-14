import { API_URL } from "@/config";

const logout = async () => {
  const res = await fetch(`${API_URL}/api/logout`, {
    method: "POST",
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

export const handleLogout = ({
  setUser,
  handleError,
  onSuccess,
}: {
  setUser: (arg: null) => void;
  handleError: (arg: string) => void;
  onSuccess?: () => void;
}) => {
  logout()
    .then(res => {
      setUser(null);
      if (onSuccess) onSuccess();
    })
    .catch(err => {
      console.error(err);
      handleError(typeof err === "string" ? err : "Something went wrong");
    });
};
