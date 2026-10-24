import React from 'react';
import { Search, X, ArrowUpDown } from 'lucide-react';
import { ProductCategory } from '../types/store';

interface FilterBarProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  brands: string[];
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  brands,
  totalResults,
}) => {
  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'جميع المنتجات' },
    { id: 'phones', label: 'الهواتف الذكية' },
    { id: 'laptops', label: 'الحواسيب واللابتوبات' },
    { id: 'audio', label: 'السماعات والصوتيات' },
    { id: 'chargers', label: 'الشواحن والكابلات' },
    { id: 'powerbanks', label: 'البطاريات المتنقلة' },
    { id: 'cases', label: 'الأغطية والحماية' },
  ];

  return (
    <div className="space-y-4 bg-[#101725] p-4 sm:p-6 rounded-2xl border border-[#202B40] shadow-xl text-right">
      {/* Category Tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-[#0C1320] rounded-xl overflow-x-auto border border-[#202B40]">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectCategory(c.id)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-gradient-to-r from-[#F0323A] to-[#B5121B] text-white shadow-md'
                  : 'text-[#97A0B3] hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-xs md:max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ابحث عن منتج بالاسم أو المواصفة..."
            className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-xl pr-10 pl-9 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#E5252C]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Brands and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#202B40] text-xs">
        {/* Brand Selector Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[#97A0B3] font-medium ml-1">العلامة:</span>
          <button
            onClick={() => onSelectBrand('all')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              selectedBrand === 'all'
                ? 'bg-[#E5252C] text-white font-bold'
                : 'bg-[#0C1320] text-[#97A0B3] hover:text-white border border-[#202B40]'
            }`}
          >
            الكل
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => onSelectBrand(brand)}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                selectedBrand === brand
                  ? 'bg-[#E5252C] text-white font-bold'
                  : 'bg-[#0C1320] text-[#97A0B3] hover:text-white border border-[#202B40]'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Sort & Counter */}
        <div className="flex items-center gap-4">
          <div className="text-[#97A0B3] font-mono tabular-nums">
            {totalResults} منتجات متوفرة
          </div>

          <div className="flex items-center gap-1.5 bg-[#0C1320] border border-[#202B40] px-3 py-1.5 rounded-lg text-slate-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#FF4753]" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent border-0 text-xs font-bold text-slate-200 cursor-pointer focus:outline-none"
            >
              <option value="featured" className="bg-[#101725] text-white">الأكثر تميزاً</option>
              <option value="price-asc" className="bg-[#101725] text-white">السعر: من الأقل للأعلى</option>
              <option value="price-desc" className="bg-[#101725] text-white">السعر: من الأعلى للأقل</option>
              <option value="rating" className="bg-[#101725] text-white">الأعلى تقييماً</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
