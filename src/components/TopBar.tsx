import React, { useState } from 'react';
import { ShoppingBag, Search, Phone, Truck, Percent, ChevronDown, Wrench, Scale, X, Smartphone, Laptop, Headphones, Zap, BatteryCharging, Shield } from 'lucide-react';
import { Currency, ProductCategory } from '../types/store';
import { CURRENCY_RATES } from '../utils/currency';

interface TopBarProps {
  activeTab: ProductCategory;
  onTabChange: (tab: ProductCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  compareCount: number;
  onOpenCompare: () => void;
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onOpenRepairModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onTabChange,
  cartCount,
  onOpenCart,
  compareCount,
  onOpenCompare,
  currentCurrency,
  onCurrencyChange,
  onOpenRepairModal,
  searchQuery,
  onSearchChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'phones', name: 'الهواتف الذكية', icon: Smartphone },
    { id: 'laptops', name: 'الحواسيب المحمولة ولابتوبات', icon: Laptop },
    { id: 'audio', name: 'السماعات والصوتيات', icon: Headphones },
    { id: 'chargers', name: 'الشواحن والكابلات', icon: Zap },
    { id: 'powerbanks', name: 'البطاريات المتنقلة', icon: BatteryCharging },
    { id: 'cases', name: 'الأغطية والحماية', icon: Shield },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#101725] border-b border-[#202B40] shadow-xl text-[#EDEFF4]">
      {/* ---------------- 1. الشريط العلوي الأحمر (Top Bar) ---------------- */}
      <div className="bg-gradient-to-r from-[#B5121B] via-[#E5252C] to-[#C91820] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 font-medium">
            <Truck className="w-4 h-4 shrink-0" />
            <span>توصيل لجميع المحافظات • صيانة وبرمجة بأحدث الأجهزة • خدمات G-TAG</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+967771304777"
              className="flex items-center gap-1.5 font-bold tracking-wider hover:underline"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+967 771 304 777</span>
            </a>
          </div>
        </div>
      </div>

      {/* ---------------- 2. الترويسة الرئيسية (Header Main) ---------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand / Logo lockup */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onTabChange('all')}
            className="flex flex-col items-center group cursor-pointer text-right"
          >
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F0323A] to-[#B5121B] text-white flex items-center justify-center font-black text-lg shadow-[0_2px_10px_rgba(229,37,44,0.4)]">
                ★
              </span>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#FF4753] transition-colors">
                الثريا بلاس
              </span>
            </div>
            <span className="text-[9px] tracking-[3px] text-[#FF4753] font-bold uppercase -mt-0.5">
              AL-THURAYA PLUS
            </span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
          <button
            onClick={() => onTabChange('all')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#E5252C]/15 text-[#FF4753]'
                : 'text-[#EDEFF4] hover:bg-[#E5252C]/10 hover:text-white'
            }`}
          >
            الرئيسية
          </button>

          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-3 py-2 rounded-xl text-[#EDEFF4] hover:bg-[#E5252C]/10 hover:text-white flex items-center gap-1 transition-all cursor-pointer"
            >
              <span>الأقسام</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-64 bg-[#131B2C] border border-[#202B40] rounded-2xl p-2 shadow-2xl space-y-1 animate-in fade-in z-50">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onTabChange(cat.id as ProductCategory);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-right px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                        activeTab === cat.id
                          ? 'bg-[#E5252C] text-white'
                          : 'text-slate-300 hover:bg-[#E5252C]/15 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#FF4753]" />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={() => onTabChange('laptops')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'laptops'
                ? 'bg-[#E5252C]/15 text-[#FF4753]'
                : 'text-[#EDEFF4] hover:bg-[#E5252C]/10 hover:text-white'
            }`}
          >
            الحواسيب واللابتوبات
          </button>

          <button
            onClick={onOpenRepairModal}
            className="px-3 py-2 rounded-xl text-[#EDEFF4] hover:bg-[#E5252C]/10 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Wrench className="w-4 h-4 text-[#FF4753]" />
            <span>الصيانة والبرمجة</span>
          </button>

          <button
            onClick={() => onTabChange('all')}
            className="px-3 py-2 rounded-xl text-[#FF4753] font-bold hover:bg-[#E5252C]/10 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Percent className="w-4 h-4" />
            <span>العروض والتخفيضات</span>
          </button>
        </nav>

        {/* Action Controls with Glassmorphic Style */}
        <div className="flex items-center gap-2.5">
          {/* Search Toggle Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md border border-white/15 shadow-[0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] text-[#EDEFF4] hover:text-white transition-all cursor-pointer"
            aria-label="البحث عن منتج"
          >
            <Search className="w-4 h-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
          </button>

          {/* Currency Switcher */}
          <select
            value={currentCurrency}
            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
            aria-label="العملة"
            className="bg-white/[0.06] backdrop-blur-md border border-white/15 shadow-[0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] text-xs font-bold text-slate-200 py-2 px-2.5 rounded-xl cursor-pointer focus:ring-1 focus:ring-[#E5252C] focus:outline-none transition-colors"
          >
            {Object.keys(CURRENCY_RATES).map((curr) => (
              <option key={curr} value={curr} className="bg-[#101725] text-white">
                {CURRENCY_RATES[curr as Currency].symbol} ({curr})
              </option>
            ))}
          </select>

          {/* Compare Button */}
          {compareCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="p-2 px-2.5 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/15 hover:border-[#FF4753] shadow-[0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] text-[#EDEFF4] flex items-center gap-1.5 text-xs cursor-pointer transition-all"
              title="مقارنة الأجهزة"
            >
              <Scale className="w-4 h-4 text-[#FF4753] drop-shadow-[0_0_4px_rgba(255,71,83,0.5)]" />
              <span className="hidden sm:inline font-bold">مقارنة</span>
              <span className="w-4 h-4 bg-[#E5252C] text-white rounded-full text-[10px] font-bold flex items-center justify-center tabular-nums">
                {compareCount}
              </span>
            </button>
          )}

          {/* Cart Button with Glass Container and Signature Red Badge */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 px-3 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] backdrop-blur-md border border-white/15 hover:border-[#FF4753]/60 shadow-[0_4px_14px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)] text-white transition-all cursor-pointer flex items-center gap-2"
            aria-label="سلة التسوق"
          >
            <ShoppingBag className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
            <span className="hidden md:inline text-xs font-bold">السلة</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-gradient-to-r from-[#F0323A] to-[#B5121B] text-white rounded-full text-[11px] font-black flex items-center justify-center shadow-[0_2px_10px_rgba(229,37,44,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/30 tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ---------------- 3. شريط البحث المنبثق (Search Bar) ---------------- */}
      {isSearchOpen && (
        <div className="border-t border-[#202B40] bg-[#0C1320] py-3 px-4 animate-in slide-in-from-top-2">
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="ابحث عن هاتف، لابتوب، شاحن، سماعة أو قطعة صيانة..."
                className="w-full bg-[#101725] border border-[#202B40] focus:border-[#E5252C] rounded-xl pr-10 pl-9 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#E5252C]"
                autoFocus
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
            <button
              onClick={() => setIsSearchOpen(false)}
              className="px-4 py-2.5 bg-[#E5252C] hover:bg-[#F0323A] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Mobile Categories Scroll Bar */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2 px-4 border-t border-[#202B40] bg-[#0C1320] text-xs">
        <button
          onClick={() => onTabChange('all')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold cursor-pointer ${
            activeTab === 'all' ? 'bg-[#E5252C] text-white' : 'text-slate-300 hover:text-white'
          }`}
        >
          الكل
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => onTabChange(c.id as ProductCategory)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium cursor-pointer ${
              activeTab === c.id ? 'bg-[#E5252C] text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {c.name}
          </button>
        ))}
        <button
          onClick={onOpenRepairModal}
          className="px-3 py-1.5 rounded-lg whitespace-nowrap text-[#FF4753] font-bold cursor-pointer"
        >
          الصيانة والبرمجة
        </button>
      </div>
    </header>
  );
};
