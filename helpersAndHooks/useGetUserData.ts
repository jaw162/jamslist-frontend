import { API_URL } from "@/config";
import { NextRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserDashboardResponse } from "..";
import Router from "next/router";

async function fetchData(id: string) {
  const res = await fetch(`${API_URL}/api/user/dashboard/${id}`, {
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

export default function useGetUserData(router: NextRouter) {
  const [userData, setUserData] = useState<UserDashboardResponse | null>(null);
  const [needsRefresh, setNeedsRefresh] = useState<boolean>(true);

  const path = router.asPath.substring(6);

  const id = path === "[userId]" ? null : path;

  useEffect(() => {
    if (!id || !needsRefresh) return;

    fetchData(id)
      .then(res => {
        const { user } = res;
        setUserData(user);
        setNeedsRefresh(false);
      })
      .catch(err => {
        console.error(err);
        Router.push("/404");
        setUserData(null);
      });
  }, [id, needsRefresh]);

  return { userData, setNeedsRefresh };
}
