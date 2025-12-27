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

// --- Types ---
type CampaignStatus = 'Sent' | 'Draft' | 'Scheduled';

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: CampaignStatus;
  sentCount: number;
  openCount: number;
  date: string;
}

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
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
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
function CampaignCard({ campaign }: { campaign: Campaign }) {
  const openRate =
    campaign.sentCount > 0
      ? ((campaign.openCount / campaign.sentCount) * 100).toFixed(1)
      : '0';

  return (
    <div className="bg-white border border-[#E9E4DB] rounded-4xl p-6 hover:shadow-sm transition-all group relative flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <StatusBadge status={campaign.status} />
          <button className="text-[#BAB3A9] hover:text-[#433F39] transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <h3 className="text-lg font-bold leading-tight group-hover:text-[#726D64] transition-colors">
          {campaign.name}
        </h3>
        <p className="text-sm text-[#8C867A] mt-2 line-clamp-1 italic">
          "{campaign.subject}"
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 p-4 bg-[#FAF9F6] rounded-2xl border border-[#F3EFE7]">
          <div>
            <p className="text-[10px] font-bold text-[#BAB3A9] uppercase tracking-tighter">
              Contacts
            </p>
            <p className="text-lg font-serif">
              {campaign.sentCount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#BAB3A9] uppercase tracking-tighter">
              Opens
            </p>
            <p className="text-lg font-serif">{openRate}%</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[#BAB3A9]">
          <Calendar size={14} />
          <span className="text-[11px] font-medium">{campaign.date}</span>
        </div>

        <div className="flex gap-2">
          <button className="p-2.5 cursor-pointer rounded-xl border border-[#E9E4DB] text-[#8C867A] hover:bg-[#FAF9F6] transition-colors flex items-center gap-2 group/btn">
            <Eye size={16} />
            <span className="text-xs font-bold">View More</span>
          </button>
          <button className="bg-[#433F39] cursor-pointer text-[#FAF9F6] p-2.5 rounded-xl hover:bg-[#2D2A26] transition-all">
            <RefreshCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

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
