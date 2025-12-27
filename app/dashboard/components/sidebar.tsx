'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Library,
  LogOut,
  Mail,
  Settings,
  Users,
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

function NavItem({ icon, label, href }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all  ${
        isActive
          ? 'bg-white shadow-sm border border-[#E9E4DB] font-bold text-[#433F39]'
          : 'text-[#8C867A] hover:bg-white/50 hover:text-[#433F39]'
      }`}
    >
      {icon}
      <span className="text-sm tracking-wide">{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#F3EFE7] border-r border-[#E9E4DB] flex flex-col sticky top-0 h-screen">
      <div className="p-8 border-b border-[#E9E4DB]">
        <h1 className="text-2xl font-serif italic tracking-tight flex items-center gap-2">
          <Mail className="w-6 h-6 text-[#8C867A]" /> EmailFlow
        </h1>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        <NavItem
          icon={<LayoutDashboard size={18} />}
          label="Overview"
          href="/dashboard"
        />
        <NavItem
          icon={<Mail size={18} />}
          label="Campaigns"
          href="/dashboard/campaigns"
        />
        <NavItem
          icon={<Library size={18} />}
          label="Templates"
          href="/dashboard/templates"
        />
        <NavItem
          icon={<Users size={18} />}
          label="Recipients"
          href="/dashboard/recipients"
        />
        <NavItem
          icon={<Settings size={18} />}
          label="Settings"
          href="/dashboard/settings"
        />
      </nav>

      <div className="p-6 border-t border-[#E9E4DB]">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-[#8C867A] hover:text-red-600 transition-colors">
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
