import React from 'react';
import { Users, Key, Plus, ArrowUpRight, Inbox } from 'lucide-react';
import Link from 'next/link';

// --- Types ---
interface Campaign {
  id: string;
  name: string;
  date: string;
  status: 'Delivered' | 'Draft' | 'Sending';
  recipients: number;
  openRate: string;
}

interface Stat {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
}

// --- Dummy Data ---
const DUMMY_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'Winter Collection Blast',
    date: 'Dec 24, 2025',
    status: 'Delivered',
    recipients: 1240,
    openRate: '24.2%',
  },
  {
    id: '2',
    name: 'Weekly Newsletter #48',
    date: 'Dec 20, 2025',
    status: 'Delivered',
    recipients: 1180,
    openRate: '19.5%',
  },
  {
    id: '3',
    name: 'Product Feedback Loop',
    date: '---',
    status: 'Draft',
    recipients: 0,
    openRate: '0%',
  },
];

export default function Dashboard() {
  const isConfigured = false; // Mock state for the App Password requirement

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] flex text-[#433F39] font-sans">
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white/50 backdrop-blur-md border-b border-[#E9E4DB]  flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#BAB3A9]">
            <span>System Status:</span>
            <span className="flex items-center gap-1.5 text-green-600">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />{' '}
              Online
            </span>
          </div>
          <Link
            href={'/dashboard/campaigns/create'}
            className="bg-[#433F39] text-[#FAF9F6] px-6 py-2.5 rounded-full text-xs font-medium hover:bg-[#2D2A26] transition-all flex items-center gap-2"
          >
            <Plus size={16} /> New Campaign
          </Link>
        </header>

        <div className="py-10 space-y-8  mx-auto">
          {/* Requirement: Google App Password Warning */}
          {!isConfigured && (
            <div className="bg-[#FDFCFB] border border-[#E9E4DB] p-8 rounded-4xl flex items-center justify-between shadow-sm">
              <div className="flex gap-6 items-center">
                <div className="w-14 h-14 bg-[#FAF9F6] border border-[#E9E4DB] rounded-2xl flex items-center justify-center text-[#8C867A]">
                  <Key size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    Google App Password Required
                  </h3>
                  <p className="text-[#8C867A] text-sm mt-1">
                    Configure your credentials in settings to enable bulk
                    sending.
                  </p>
                </div>
              </div>
              <button className="bg-[#433F39] cursor-pointer text-[#FAF9F6] px-6 py-2 rounded-full text-xs font-bold hover:shadow-lg transition-all">
                Setup Now
              </button>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard
              label="Total Sent"
              value="2,420"
              subtext="Last 30 days"
              icon={<Inbox size={20} />}
            />
            <StatCard
              label="Avg Open Rate"
              value="22.4%"
              subtext="+2.1% trend"
              icon={<ArrowUpRight size={20} />}
            />
            <StatCard
              label="Active Lists"
              value="12"
              subtext="3,102 contacts"
              icon={<Users size={20} />}
            />
          </div>

          {/* Campaigns Table */}
          <div className="bg-white/60 rounded-4xl border border-[#E9E4DB] overflow-hidden">
            <div className="p-8 border-b border-[#E9E4DB]">
              <h3 className="text-xl font-bold font-serif text-[#433F39]">
                Recent Campaigns
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#F3EFE7]/50 text-[#8C867A] text-[10px] uppercase tracking-widest border-b border-[#E9E4DB]">
                    <th className="px-8 py-4 font-bold">Name</th>
                    <th className="px-8 py-4 font-bold">Status</th>
                    <th className="px-8 py-4 font-bold">Recipients</th>
                    <th className="px-8 py-4 font-bold">Engagement</th>
                    <th className="px-8 py-4 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E4DB]">
                  {DUMMY_CAMPAIGNS.map((campaign) => (
                    <tr
                      key={campaign.id}
                      className="hover:bg-white/40 transition-colors group"
                    >
                      <td className="px-8 py-5 font-medium text-sm">
                        {campaign.name}
                      </td>
                      <td className="px-8 py-5">
                        <span
                          className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter ${
                            campaign.status === 'Delivered'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm text-[#8C867A]">
                        {campaign.recipients.toLocaleString()}
                      </td>
                      <td className="px-8 py-5 text-sm font-semibold">
                        {campaign.openRate}
                      </td>
                      <td className="px-8 py-5 text-xs text-[#BAB3A9]">
                        {campaign.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Sub-components ---
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
        active
          ? 'bg-white shadow-sm border border-[#E9E4DB] font-bold text-[#433F39]'
          : 'text-[#8C867A] hover:bg-white/50 hover:text-[#433F39]'
      }`}
    >
      {icon}
      <span className="text-sm tracking-wide">{label}</span>
    </button>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
}

function StatCard({ label, value, subtext, icon }: StatCardProps) {
  return (
    <div className="bg-white border border-[#E9E4DB] p-8 rounded-4xl shadow-sm relative group hover:border-[#C2BBAF] transition-colors">
      <div className="absolute top-8 right-8 text-[#E9E4DB] group-hover:text-[#BAB3A9] transition-colors">
        {icon}
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#BAB3A9] mb-4">
        {label}
      </p>
      <p className="text-4xl font-serif text-[#433F39]">{value}</p>
      <p className="text-xs text-[#8C867A] mt-2 italic">{subtext}</p>
    </div>
  );
}
