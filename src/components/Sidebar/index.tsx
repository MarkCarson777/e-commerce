import clsx from "clsx";

// Next
import Link from "next/link";

type SidebarProps = {
  className?: string;
};

export function Sidebar(props: SidebarProps) {
  const { className } = props;

  return (
    <div className={clsx("h-screen w-2/12", className)}>
      <Link href="/">E-COMMERCE</Link>
      <Link href="/dashboard">STORE MANAGEMENT</Link>
      <Link href="#">SETTINGS</Link>
    </div>
  );
}
