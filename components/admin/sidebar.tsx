"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth";
import {
  LayoutDashboard,
  Briefcase,
  Award,
  Code,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: Briefcase,
  },
  {
    label: "Certificates",
    href: "/admin/certificates",
    icon: Award,
  },
  {
    label: "Skills",
    href: "/admin/skills",
    icon: Code,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[#27272A] bg-[#09090B]">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#27272A] p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-white">
            <Code className="h-5 w-5 text-black" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest font-display-xl">
              myportfolio
            </h2>
            <p className="text-[10px] text-gray-500 font-label-sm uppercase tracking-wider">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-3 py-6">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded px-3 py-2.5 text-xs font-label-sm uppercase tracking-widest transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#09090B] font-bold"
                    : "text-zinc-400 hover:bg-[#141313] hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-[#27272A] p-3 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 rounded px-3 py-2.5 text-xs font-label-sm uppercase tracking-widest text-zinc-400 hover:bg-[#141313] hover:text-white transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Site
          </Link>
          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start gap-3 px-3 py-2.5 text-xs font-label-sm uppercase tracking-widest text-red-400 hover:bg-red-950/30 hover:text-red-300 rounded"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
}
