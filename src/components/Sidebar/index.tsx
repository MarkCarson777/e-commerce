import clsx from "clsx";

// Next
import Link from "next/link";

type SidebarProps = {
  className?: string;
};

export function Sidebar(props: SidebarProps) {
  const { className } = props;

  return (
    <div className={clsx("flex flex-col h-screen w-2/12", className)}>
      <Link href="/">E-COMMERCE</Link>
      <Link href="/dashboard">STORE MANAGEMENT</Link>
      <Link href="#">ORDER MANAGEMENT</Link>
      <Link href="/dashboard/settings">SETTINGS</Link>
    </div>
  );
}
