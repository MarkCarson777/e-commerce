"use client";

// Third party
import clsx from "clsx";
// React
import { useState, useEffect } from "react";
// Next
import Link from "next/link";
import { useRouter } from "next/navigation";
// Context
import { useAuthContext } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserContext";
// Firebase
import { signOut } from "@/firebase/auth";
// Components
import { Icon } from "@/components/Icon";
// Types
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
          const user: User = await getUser(currentUser.uid);
          setIsAdmin(user.isAdmin);
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
              <Icon icon="Search" size={24} color="#fff" />
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
              <Icon icon="User" size={24} color="#fff" />
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-300 hover:text-white">
              <Icon icon="Cart" size={24} color="#fff" />
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
              <Icon icon="Signout" size={24} color="#fff" />
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
}
