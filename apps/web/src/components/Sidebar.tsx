"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PenTool, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Settings
} from "lucide-react";
import clsx from "clsx";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "AI Content", href: "/content", icon: PenTool },
  { name: "Sentiment", href: "/sentiment", icon: MessageSquare },
  { name: "Segmentation", href: "/segmentation", icon: Users },
  { name: "Campaigns", href: "/campaigns", icon: TrendingUp },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-950 border-r border-gray-800 text-white">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-800">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
          MarketNova
        </h1>
      </div>
      <nav className="flex flex-1 flex-col p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-indigo-600/10 text-indigo-400" 
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
              )}
            >
              <item.icon className={clsx("h-5 w-5", isActive ? "text-indigo-400" : "text-gray-500")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-900 hover:text-white transition-all">
          <Settings className="h-5 w-5 text-gray-500" />
          Settings
        </button>
      </div>
    </div>
  );
}
