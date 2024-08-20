import clsx from "clsx";

// Next
import Link from "next/link";
// Components
import { Icon } from "@/components/Icon";

type SidebarProps = {
  className?: string;
};

type TabProps = {
  name: string;
  path: string;
};

export function Sidebar(props: SidebarProps) {
  const { className } = props;

  const tabs: TabProps[] = [
    { name: "STORE MANAGEMENT", path: "/dashboard" },
    { name: "ORDER MANAGEMENT", path: "/dashboard/orders" },
    { name: "SETTINGS", path: "/dashboard/settings" },
  ];

  return (
    <div
      className={clsx(
        "flex flex-col h-screen w-3/12 bg-gray-800 text-white p-4 gap-4",
        className
      )}
    >
      <Link href="/" className="w-fit">
        <div className="flex gap-2">
          <Icon icon="Home" size={24} color="#fff" />
          <span>E-COMMERCE</span>
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        {tabs.map((tab, index) => {
          return (
            <Link key={index} href={tab.path}>
              <div className="p-4 border-2 border-gray-400 rounded-md hover:bg-gray-600">
                {tab.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
