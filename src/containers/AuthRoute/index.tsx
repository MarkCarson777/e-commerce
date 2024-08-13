"use client";

import { ComponentType, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

type AuthRouteProps = {
  [key: string]: any;
};

export const AuthRoute = (Page: ComponentType<AuthRouteProps>) => {
  return function AuthRouteComponent(props: AuthRouteProps) {
    const { currentUser } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!currentUser) {
        router.push("/signin");
      }
    }, [currentUser, router]);

    return currentUser ? <Page {...props} /> : null;
  };
};
