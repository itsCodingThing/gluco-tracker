import { AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import {
  HouseIcon,
  LucideIcon,
  TrendingUpDownIcon,
  UserPenIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NetworkStatus from "@/components/network-status";

interface BottomTab {
  to: string;
  title: string;
  Icon: LucideIcon;
}

const tabs: BottomTab[] = [
  { to: "/", title: "Dashboard", Icon: HouseIcon },
  {
    to: "/measurement",
    title: "Measurement",
    Icon: TrendingUpDownIcon,
  },
  { to: "/profile", title: "Profile", Icon: UserPenIcon },
];

function BottomNav() {
  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200">
      <div className="flex justify-between px-6 py-3">
        {tabs.map(({ to, title, Icon }, i) => {
          return (
            <NavLink
              key={i}
              to={to}
              className={({ isActive }) =>
                cn("flex flex-col items-center text-gray-500", {
                  "text-black": isActive,
                })
              }
            >
              <Icon />
              <span className="text-xs">{title}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <>
      <Toaster />
      <NetworkStatus />
      <div className="pb-20">
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </div>
      <BottomNav />
    </>
  );
}
