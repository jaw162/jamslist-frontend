import { API_URL } from "@/config";
import { User } from "..";

async function checkIfLoggedIn() {
  const res = await fetch(`${API_URL}/api/user/me`, {
    method: "GET",
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
}

export default function loggedInChecker(setUser: (arg: User | null) => void) {
  checkIfLoggedIn()
    .then(res => {
      setUser(res);
    })
    .catch(err => console.error(err));
}
