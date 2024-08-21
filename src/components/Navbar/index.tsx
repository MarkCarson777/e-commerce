"use client";

import clsx from "clsx";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

import Link from "next/link";

import { signOut } from "@/firebase/auth";

type NavbarProps = {
  className?: string;
};

export function Navbar(props: NavbarProps) {
  const { className } = props;
  const { currentUser } = useAuthContext();
  const router = useRouter();

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
            <Link href="/signin" className="text-gray-300 hover:text-white">
              USER
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-300 hover:text-white">
              CART
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="text-gray-300 hover:text-white">
              DASHBOARD
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
