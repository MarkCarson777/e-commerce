"use client";

import clsx from "clsx";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserContext";

import Link from "next/link";

import { signOut } from "@/firebase/auth";

import { User } from "@/types";

type NavbarProps = {
  className?: string;
};

export function Navbar(props: NavbarProps) {
  const { className } = props;
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { currentUser } = useAuthContext();
  const { getUser } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      const fetchUser = async () => {
        try {
          const result: User = await getUser(currentUser.uid);
          setIsAdmin(result.isAdmin);
        } catch (error) {
          console.error("Error fetching user", error);
        }
      };

      fetchUser();
    }
  }, [currentUser]);

  return (
    <nav className={clsx("bg-gray-800 p-4 w-full h-[56px]", className)}>
      <div className="relative flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link href="#" className="text-gray-300 hover:text-white">
              SHOP
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-300 hover:text-white">
              SIZING AND FIT
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-300 hover:text-white">
              CUSTOMER CARE
            </Link>
          </li>
        </ul>
        <Link
          href="/"
          className="absolute left-1/2 transform -translate-x-1/2 text-white text-xl font-bold"
        >
          E-COMMERCE
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="#" className="text-gray-300 hover:text-white">
              SEARCH
            </Link>
          </li>
          <li>
            <Link
              href={
                currentUser === null
                  ? "/signin"
                  : isAdmin
                  ? "/dashboard"
                  : "/account"
              }
              className="text-gray-300 hover:text-white"
            >
              USER
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-300 hover:text-white">
              CART
            </Link>
          </li>

          {currentUser !== null && (
            <button
              type="button"
              onClick={() => {
                signOut();
                router.push("/");
              }}
            >
              <span>Sign out</span>
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
}
