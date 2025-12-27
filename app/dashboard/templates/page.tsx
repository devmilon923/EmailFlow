'use client';
import { useState } from 'react';
import {
  Search,
  ShoppingCart,
  ChevronDown,
  ArrowUpDown,
  Check,
} from 'lucide-react';
import TemplateCard, { TemplateMarketplaceItem } from '../components/card';

const MARKETPLACE_DATA: TemplateMarketplaceItem[] = [
  {
    id: '1',
    name: 'Velvet Newsletter',
    category: 'Newsletter',
    price: 0,
    isFree: true,
    image:
      'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    name: 'Launch Pro Max',
    category: 'Product Launch',
    price: 24,
    isFree: false,
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    name: 'Midnight Sale',
    category: 'Marketing',
    price: 19,
    isFree: false,
    image:
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '4',
    name: 'Clean Order Confirmed',
    category: 'Transactional',
    price: 12,
    isFree: false,
    image:
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '5',
    name: 'SaaS Update v2',
    category: 'Product Launch',
    price: 29,
    isFree: false,
    image:
      'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '6',
    name: 'Minimal Blog Digest',
    category: 'Newsletter',
    price: 0,
    isFree: true,
    image:
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '7',
    name: 'Black Friday Noir',
    category: 'Marketing',
    price: 45,
    isFree: false,
    image:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '8',
    name: 'The Minimalist',
    category: 'Newsletter',
    price: 15,
    isFree: false,
    image:
      'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=400',
  },
];

export default function TemplateMarketplace() {
  const [activeSort, setActiveSort] = useState('Featured');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortOptions = ['Free', 'Price: Low to High', 'Price: High to Low'];

  return (
    <div className="min-h-screen w-full  text-[#433F39] py-6 md:py-12">
      <div className=" space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-serif italic tracking-tight">
              Template Gallery
            </h1>
            <p className="text-[#8C867A] text-sm font-medium">
              Boutique email layouts for premium brands.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BAB3A9]"
                size={16}
              />
              <input
                type="text"
                placeholder="Search..."
                className="bg-white border border-[#E9E4DB] rounded-full py-3 pl-12 pr-6 text-sm outline-none w-48 md:w-64"
              />
            </div>
            <button className="bg-white border border-[#E9E4DB] p-3 rounded-full relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-[#433F39] text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                2
              </span>
            </button>
          </div>
        </div>

        {/* Updated Filter & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-y border-[#E9E4DB] py-6">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {['All Styles', 'Marketing', 'Newsletter', 'Product Launch'].map(
              (cat, i) => (
                <button
                  key={cat}
                  className={`px-5 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest whitespace-nowrap transition-all ${i === 0 ? 'bg-[#433F39] text-white' : 'bg-white border border-[#E9E4DB] text-[#8C867A]'}`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-3 bg-white border border-[#E9E4DB] px-6 py-2.5 rounded-full text-[10px] uppercase font-bold tracking-widest text-[#433F39] hover:border-[#433F39] transition-all"
            >
              <ArrowUpDown size={14} /> Sort: {activeSort}{' '}
              <ChevronDown
                size={14}
                className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Sort Dropdown Menu */}
            {showSortDropdown && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-[#E9E4DB] rounded-3xl shadow-xl z-30 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setActiveSort(option);
                        setShowSortDropdown(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-[#FAF9F6] rounded-xl transition-colors group"
                    >
                      <span
                        className={
                          activeSort === option
                            ? 'text-[#433F39]'
                            : 'text-[#8C867A]'
                        }
                      >
                        {option}
                      </span>
                      {activeSort === option && (
                        <Check size={14} className="text-[#433F39]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {MARKETPLACE_DATA.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
}
