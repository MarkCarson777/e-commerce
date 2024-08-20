"use client";

import { ReactElement } from "react";

import CircleLeft from "./icons/circle-left.svg";
import Home from "./icons/home.svg";

export interface IconProps {
  icon: string;
  color?: string;
  size?: number;
  [key: string]: any;
}

interface IconComponents {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const icons: IconComponents = {
  CircleLeft,
  Home,
};

export const Icon = ({
  icon,
  color,
  size,
  ...rest
}: IconProps): ReactElement => {
  const Component = icons[icon];

  return <Component {...rest} fill={color} width={size} height={size} />;
};
