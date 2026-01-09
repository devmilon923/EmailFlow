'use client';
import React, { useState } from 'react';
import {
  Mail,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  BarChart2,
  Calendar,
  ArrowRight,
  ChevronDown,
  RecycleIcon,
  RefreshCcw,
} from 'lucide-react';
import Link from 'next/link';
import CampaignCard, {
  Campaign,
  CampaignStatus,
} from '../components/campaignCard';

// --- Dummy Data ---
const CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'Summer Solstice Sale',
    subject: 'Your 20% discount is waiting...',
    status: 'Sent',
    sentCount: 1240,
    openCount: 412,
    date: 'Oct 12, 2025',
  },
  {
    id: '2',
    name: 'Product Update - Q4',
    subject: 'New features are here!',
    status: 'Sent',
    sentCount: 3100,
    openCount: 890,
    date: 'Nov 05, 2025',
  },
  {
    id: '3',
    name: 'Re-engagement Email',
    subject: 'We miss you!',
    status: 'Draft',
    sentCount: 0,
    openCount: 0,
    date: '---',
  },
];

export default function CampaignSection() {
  const [filter, setFilter] = useState<CampaignStatus | 'All'>('All');

  return (
    <div className="min-h-screen w-full  text-[#433F39]">
      {/* Header Area */}
      <div className="py-8 md:py-12 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-serif italic tracking-tight">
              Campaigns
            </h1>
            <p className="text-[#8C867A] text-sm mt-1">
              Manage and track your email broadcasts.
            </p>
          </div>
          <Link
            href={'/dashboard/campaigns/create'}
            className="bg-[#433F39] cursor-pointer text-[#FAF9F6] px-8 py-3 rounded-full text-xs font-medium hover:bg-[#2D2A26] transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            + Create New
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BAB3A9]"
              size={18}
            />
            <input
              type="text"
              placeholder="Search campaigns..."
              className="w-full bg-white border border-[#E9E4DB] rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-1 focus:ring-[#C2BBAF] transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {['All', 'Sent', 'Draft', 'Scheduled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-5 py-2.5 cursor-pointer rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  filter === status
                    ? 'bg-[#E9E4DB] text-[#433F39]'
                    : 'text-[#BAB3A9] hover:text-[#726D64]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Cards Grid */}
      <div className="py-8 md:py-12 pt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CAMPAIGNS.filter((c) => filter === 'All' || c.status === filter).map(
          (campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          )
        )}
      </div>
    </div>
  );
}

// --- Card Component ---

function StatusBadge({ status }: { status: CampaignStatus }) {
  const styles = {
    Sent: 'bg-green-50 text-green-700 border-green-100',
    Draft: 'bg-gray-50 text-gray-500 border-gray-100',
    Scheduled: 'bg-blue-50 text-blue-700 border-blue-100',
  };

  return (
    <span
      className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${styles[status]}`}
    >
      {status}
    </span>
  );
}
