import { API_URL } from "@/config";
import { useEffect, useState } from "react";
import { convoResponse, MessagesByUser } from "..";

async function fetchData(id: number) {
  const res = await fetch(`${API_URL}/api/conversation/${id}`, {
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

export type Conversations = { [key: string]: convoResponse };

export default function useGetConvos(
  conversations: MessagesByUser["conversation"] | undefined
) {
  const [fullMessages, setUserMessages] = useState<Conversations>({});

  useEffect(() => {
    if (!conversations) return;

    const obj = conversations.reduce((acc, cur) => {
      return { ...acc, [cur.id]: null };
    }, {});

    setUserMessages(obj);
  }, [conversations]);

  function handleFetch(id: number, handleError: (arg: string) => void) {
    fetchData(id)
      .then(res => {
        const { convo } = res;
        setUserMessages({ ...fullMessages, [convo.id]: convo });
      })
      .catch(err => {
        console.error(err);
        handleError(typeof err === "string" ? err : "Something went wrong");
      });
  }

  return { fullMessages, handleFetch };
}
