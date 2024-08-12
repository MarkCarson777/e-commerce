"use client";

import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  console.log("user", user);

  useEffect(() => {
    if (user === null) router.push("/signin");
  }, [user]);

  return <h1>Only logged in users can view this page</h1>;
}
