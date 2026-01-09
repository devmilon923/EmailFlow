import { Calendar, Eye, MoreHorizontal, RefreshCcw } from 'lucide-react';
// --- Types ---
export type CampaignStatus = 'Sent' | 'Draft' | 'Scheduled';
export interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: CampaignStatus;
  sentCount: number;
  openCount: number;
  date: string;
}
export default function CampaignCard({ campaign }: { campaign: Campaign }) {
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
