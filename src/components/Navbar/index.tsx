"use client";

// React
import { useState, useEffect } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Third party
import clsx from "clsx";
// Context
import { useAuthContext } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserContext";
// Components
import { Icon } from "@/components/Icon";
// Images
import apollaLogo from "/public/images/apolla.png";
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
    <nav
      className={clsx(
        "grid grid-cols-3 bg-[#fff] pl-4 py-4 pr-8 w-full text-black",
        className
      )}
    >
      <ul className="flex items-center gap-8">
        <li>
          <Link href="/">
            <Image src={apollaLogo} alt="Apolla Showroom" width={72} />
          </Link>
        </li>
        <li>
          <Link href="#">
            <span className="uppercase hover:underline font-montserrat">
              Shop
            </span>
          </Link>
        </li>
        <li>
          <Link href="#">
            <span className="uppercase hover:underline font-montserrat">
              Sizing and fit
            </span>
          </Link>
        </li>
        <li>
          <Link href="#">
            <span className="uppercase hover:underline font-montserrat">
              Customer care
            </span>
          </Link>
        </li>
      </ul>
      <div className="flex items-center justify-center">
        <Link href="/">
          <span className="uppercase font-montserrat text-2xl tracking-[8px] font-medium">
            Apolla Showroom
          </span>
        </Link>
      </div>
      <ul className="flex gap-8 justify-end items-center">
        <li>
          <Link href="#">
            <Icon icon="Search" height={24} width={24} color="#000" />
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
          >
            <Icon icon="User" height={24} width={24} color="#000" />
          </Link>
        </li>
        <li>
          <Link href="#">
            <Icon icon="Cart" height={24} width={24} color="#000" />
          </Link>
        </li>
        {/* {currentUser !== null && (
          <button
            type="button"
            onClick={() => {
              signOut();
              router.push("/");
            }}
          >
            <Icon icon="Signout" size={24} color="#000" />
          </button>
        )} */}
      </ul>
    </nav>
  );
}
