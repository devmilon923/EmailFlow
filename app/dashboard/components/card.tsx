import { ShoppingCart, Sparkles } from 'lucide-react';
import React from 'react';
// --- Types ---
export interface TemplateMarketplaceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  isFree: boolean;
  image: string;
}
export default function TemplateCard({
  template,
}: {
  template: TemplateMarketplaceItem;
}) {
  return (
    <div className="group bg-white border border-[#E9E4DB] rounded-4xl overflow-hidden flex flex-col hover:shadow-sm transition-all duration-500">
      <div className="relative aspect-4/5 overflow-hidden bg-[#F3EFE7]">
        <img
          src={template.image}
          alt={template.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#433F39]">
            {template.category}
          </span>
          {template.isFree && (
            <span className="bg-[#433F39] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-white flex items-center gap-1">
              <Sparkles size={10} /> Free
            </span>
          )}
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-serif italic text-lg text-[#433F39]">
            {template.name}
          </h3>
          <p className="font-bold text-sm">
            {template.isFree ? '$0' : `$${template.price}`}
          </p>
        </div>
        <div className="flex gap-2">
          {template?.isFree ? (
            <button className="flex-1 cursor-pointer bg-[#433F39] text-[#FAF9F6] py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all">
              Add To List
            </button>
          ) : (
            <button className="flex-1 cursor-pointer bg-[#433F39] text-[#FAF9F6] py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all">
              Buy Now
            </button>
          )}
          <button className="p-3 border border-[#E9E4DB] rounded-xl cursor-pointer hover:bg-[#FAF9F6]">
            <ShoppingCart size={16} className="text-[#8C867A]" />
          </button>
        </div>
      </div>
    </div>
  );
}
