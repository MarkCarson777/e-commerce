"use client";

import { ReactElement } from "react";

import Arrow from "./icons/ornate-arrow.svg";
import Cart from "./icons/cart.svg";
import ChevronLeft from "./icons/chevron-left.svg";
import Home from "./icons/home.svg";
import Search from "./icons/search.svg";
import Signout from "./icons/signout.svg";
import User from "./icons/user.svg";

export interface IconProps {
  icon: string;
  color?: string;
  height: number;
  width: number;
  className?: string;
  [key: string]: any;
}

interface IconComponents {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const icons: IconComponents = {
  Arrow,
  Cart,
  ChevronLeft,
  Home,
  Search,
  Signout,
  User,
};

export const Icon = ({
  icon,
  color,
  height,
  width,
  className,
  ...rest
}: IconProps): ReactElement => {
  const Component = icons[icon];

  return (
    <Component
      {...rest}
      fill={color}
      width={width}
      height={height}
      className={className}
    />
  );
};
