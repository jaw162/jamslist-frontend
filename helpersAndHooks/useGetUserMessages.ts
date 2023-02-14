import { API_URL } from "@/config";
import { useEffect, useState } from "react";
import { MessagesByUser } from "..";
import Router from "next/router";

async function fetchData() {
  const res = await fetch(`${API_URL}/api/user/messages`, {
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

export default function useGetUserMessages() {
  const [userMessages, setUserMessages] = useState<MessagesByUser | null>(null);

  useEffect(() => {
    fetchData()
      .then(res => {
        const { user } = res;
        setUserMessages(user);
      })
      .catch(err => {
        console.error(err);
        Router.push("/404");
        setUserMessages(null);
      });
  }, []);

  return { userMessages };
}
