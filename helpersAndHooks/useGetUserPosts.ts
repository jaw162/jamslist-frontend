import { API_URL } from "@/config";
import { useEffect, useState } from "react";
import { PostsByUser } from "..";
import Router from "next/router";

async function fetchData() {
  const res = await fetch(`${API_URL}/api/posts`, {
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

export default function useGetUserPosts() {
  const [userPosts, setUserPosts] = useState<PostsByUser>(null);

  useEffect(() => {
    fetchData()
      .then(res => {
        setUserPosts(res);
      })
      .catch(err => {
        console.error(err);
        Router.push("/404");
        setUserPosts(null);
      });
  }, []);

  return { userPosts };
}
