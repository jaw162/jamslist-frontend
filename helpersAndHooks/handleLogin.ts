import { API_URL } from "@/config";
import { User } from "..";

const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
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

export const handleLogin = ({
  username,
  password,
  setUser,
  handleError,
  onSuccess,
}: {
  username: string;
  password: string;
  setUser: (arg: User) => void;
  handleError: (arg: string) => void;
  onSuccess?: () => void;
}) => {
  login({ username, password })
    .then(res => {
      setUser(res);
      if (onSuccess) onSuccess();
    })
    .catch(err => {
      console.error(err);
      handleError(typeof err === "string" ? err : "Something went wrong");
    });
};
