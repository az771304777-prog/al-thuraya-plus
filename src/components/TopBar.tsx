import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Truck,
  Percent,
  ChevronDown,
  Wrench,
  Scale,
  X,
  Smartphone,
  Laptop,
  Headphones,
  Zap,
  BatteryCharging,
  Shield,
  Menu,
  Home,
  Package,
  Layers,
  PhoneCall,
  Compass,
  MessageCircle,
  Phone,
  MapPin,
  Lock,
} from 'lucide-react';
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
  onOpenAdmin?: () => void;
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
  onOpenAdmin,
}) => {
  // Mobile Drawer State
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(true);

  // Desktop Dropdown & Modals State
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [trackOrderId, setTrackOrderId] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);

  const categories = [
    { id: 'phones' as ProductCategory, name: 'الهواتف الذكية الأصلية', icon: Smartphone },
    { id: 'laptops' as ProductCategory, name: 'الحواسيب المحمولة ولابتوبات', icon: Laptop },
    { id: 'audio' as ProductCategory, name: 'السماعات والصوتيات', icon: Headphones },
    { id: 'chargers' as ProductCategory, name: 'الشواحن والكابلات السريعة', icon: Zap },
    { id: 'powerbanks' as ProductCategory, name: 'البطاريات المتنقلة (باور بانك)', icon: BatteryCharging },
    { id: 'cases' as ProductCategory, name: 'الأغطية وحماية الشاشات', icon: Shield },
  ];

  const handleCategoryClick = (catId: ProductCategory) => {
    onTabChange(catId);
    setIsMobileDrawerOpen(false);
    setIsDesktopDropdownOpen(false);
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (action: 'home' | 'all' | 'offers' | 'repair' | 'track' | 'contact') => {
    setIsMobileDrawerOpen(false);
    setIsDesktopDropdownOpen(false);

    if (action === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onTabChange('all');
    } else if (action === 'all') {
      onTabChange('all');
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'offers') {
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'repair') {
      onOpenRepairModal();
    } else if (action === 'track') {
      setIsTrackModalOpen(true);
    } else if (action === 'contact') {
      const el = document.querySelector('footer');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackOrderId.trim()) return;
    const cleanId = trackOrderId.trim().toUpperCase();
    setTrackResult(`طلب رقم (${cleanId}): جاري التجهيز والشحن عبر مندوب المتجر بمحافظة ذمار والمحافظات الأخرى.`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#101725] border-b border-[#202B40] shadow-xl text-[#EDEFF4]">
        {/* ---------------- 1. الشريط العلوي للإعلانات ---------------- */}
        <div className="bg-gradient-to-r from-[#B5121B] via-[#E5252C] to-[#C91820] text-white text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 font-medium">
              <Truck className="w-4 h-4 shrink-0" />
              <span>توصيل لجميع المحافظات • صيانة وبرمجة بأحدث الأجهزة • خدمات G-TAG</span>
            </div>

            <div className="flex items-center gap-4 font-mono" dir="ltr">
              <a
                href="tel:+967771304777"
                className="flex items-center gap-1.5 font-bold tracking-wider hover:underline"
              >
                +967 771 304 777
              </a>
              <span className="hidden sm:inline text-white/60">|</span>
              <span className="hidden sm:inline text-white/90 font-sans" dir="rtl">
                ذمار، خط الحسينية
              </span>
            </div>
          </div>
        </div>

        {/* ---------------- 2. الترويسة الرئيسية المتجاوبة (Responsive Navbar) ---------------- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* الجانب الأيمن: زر الثلاث شُرط (يظهر فقط على الموبايل والشاشات الصغيرة) + الشعار */}
          <div className="flex items-center gap-3">
            {/* زر الثلاث شُرط (Hamburger Menu Icon) - يظهر فقط على الجوال ويختفي على الديسكتوب */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-white/[0.06] hover:bg-[#E5252C]/20 border border-white/15 text-white flex items-center justify-center cursor-pointer transition-colors"
              aria-label="فتح القائمة الجانبية"
              title="القائمة"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* الشعار والاسم */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 group cursor-pointer text-right"
            >
              <img
                src="/assets/aistudio/favicon_io_0bfe3b54.png"
                alt="شعار متجر الثريا بلاس"
                className="w-10 h-10 rounded-xl object-contain bg-white p-0.5 shadow-[0_2px_12px_rgba(229,37,44,0.35)] border border-[#202B40] shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#FF4753] transition-colors leading-none">
                  الثريا بلاس
                </span>
                <span className="text-[9px] tracking-[2.5px] text-[#FF4753] font-bold uppercase mt-1">
                  AL-THURAYA PLUS
                </span>
              </div>
            </button>
          </div>

          {/* روابط الديسكتوب (مفرودة أفقياً تلقائياً على الشاشات الكبيرة وتختفي على الجوال) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold">
            {/* 1. الرئيسية */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#E5252C]/15 text-[#FF4753] font-bold'
                  : 'text-[#EDEFF4] hover:bg-[#E5252C]/10 hover:text-white'
              }`}
            >
              الرئيسية
            </button>

            {/* 2. جميع المنتجات */}
            <button
              onClick={() => handleNavClick('all')}
              className="px-3 py-2 rounded-xl text-[#EDEFF4] hover:bg-[#E5252C]/10 hover:text-white transition-all cursor-pointer"
            >
              جميع المنتجات
            </button>

            {/* 3. قائمة الأقسام المنسدلة */}
            <div
              className="relative"
              onMouseEnter={() => setIsDesktopDropdownOpen(true)}
              onMouseLeave={() => setIsDesktopDropdownOpen(false)}
            >
              <button
                onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
                className="px-3 py-2 rounded-xl text-[#EDEFF4] hover:bg-[#E5252C]/10 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>الأقسام</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isDesktopDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isDesktopDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-[#131B2C] border border-[#202B40] rounded-2xl p-2 shadow-2xl space-y-1 animate-in fade-in z-50">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
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

            {/* 4. العروض */}
            <button
              onClick={() => handleNavClick('offers')}
              className="px-3 py-2 rounded-xl text-[#FF4753] font-bold hover:bg-[#E5252C]/10 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Percent className="w-4 h-4" />
              <span>العروض</span>
            </button>

            {/* 5. الصيانة والبرمجة */}
            <button
              onClick={() => handleNavClick('repair')}
              className="px-3 py-2 rounded-xl text-[#EDEFF4] hover:bg-[#E5252C]/10 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-[#FF4753]" />
              <span>الصيانة والبرمجة</span>
            </button>

            {/* 6. تتبع طلبك */}
            <button
              onClick={() => handleNavClick('track')}
              className="px-3 py-2 rounded-xl text-[#EDEFF4] hover:bg-[#E5252C]/10 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>تتبع طلبك</span>
            </button>

            {/* 7. اتصل بنا */}
            <button
              onClick={() => handleNavClick('contact')}
              className="px-3 py-2 rounded-xl text-[#EDEFF4] hover:bg-[#E5252C]/10 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>اتصل بنا</span>
            </button>
          </nav>

          {/* الجانب الأيسر: أيقونات الإجراءات (البحث، العملة، المقارنة، والسلة) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* زر البحث */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md border border-white/15 text-[#EDEFF4] hover:text-white transition-all cursor-pointer"
              aria-label="البحث"
              title="بحث في المتجر"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* العملة */}
            <select
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as Currency)}
              aria-label="العملة"
              className="bg-white/[0.06] backdrop-blur-md border border-white/15 text-xs font-bold text-slate-200 py-2 px-2.5 rounded-xl cursor-pointer focus:ring-1 focus:ring-[#E5252C] focus:outline-none"
            >
              {Object.keys(CURRENCY_RATES).map((curr) => (
                <option key={curr} value={curr} className="bg-[#101725] text-white">
                  {CURRENCY_RATES[curr as Currency].symbol} ({curr})
                </option>
              ))}
            </select>

            {/* المقارنة */}
            {compareCount > 0 && (
              <button
                onClick={onOpenCompare}
                className="p-2 px-2.5 rounded-xl bg-white/[0.06] border border-white/15 hover:border-[#FF4753] text-[#EDEFF4] flex items-center gap-1.5 text-xs cursor-pointer transition-all"
                title="مقارنة الأجهزة"
              >
                <Scale className="w-4 h-4 text-[#FF4753]" />
                <span className="hidden sm:inline font-bold">مقارنة</span>
                <span className="w-4 h-4 bg-[#E5252C] text-white rounded-full text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {compareCount}
                </span>
              </button>
            )}

            {/* سلة التسوق */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 px-3 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 hover:border-[#FF4753]/60 text-white transition-all cursor-pointer flex items-center gap-2"
              aria-label="سلة التسوق"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="hidden md:inline text-xs font-bold">السلة</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-gradient-to-r from-[#F0323A] to-[#B5121B] text-white rounded-full text-[11px] font-black flex items-center justify-center shadow-[0_2px_10px_rgba(229,37,44,0.6)] border border-white/30 tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ---------------- 3. شريط البحث المنسدل ---------------- */}
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
      </header>

      {/* =========================================================================
          القائمة الجانبية المنسدلة لشاشات الجوال (Sidebar Drawer)
          تفتح بسلاسة عند الضغط على زر الثلاث شُرط
      ========================================================================= */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex text-right animate-in fade-in duration-200">
          {/* خلفية معتمة (Backdrop) */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          {/* اللوحة الجانبية المنزلقة */}
          <div className="relative mr-auto ml-0 w-full max-w-xs sm:max-w-sm bg-[#0F1626] border-l border-[#202B40] text-white shadow-2xl flex flex-col h-full z-10 overflow-hidden transform transition-transform duration-300 ease-out">
            {/* ترويسة القائمة الجانبية */}
            <div className="p-4 sm:p-5 border-b border-[#202B40] bg-[#101725] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/favicon_io_0bfe3b54.png"
                  alt="شعار متجر الثريا بلاس"
                  className="w-11 h-11 rounded-2xl object-contain bg-white p-1 shadow-lg border border-[#202B40]"
                />
                <div>
                  <h3 className="text-base font-black text-white">متجر الثريا بلاس</h3>
                  <p className="text-[10px] text-[#FF4753] font-bold uppercase tracking-wider">
                    AL-THURAYA PLUS
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-[#E5252C]/20 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="إغلاق القائمة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* قائمة الروابط في القائمة الجانبية */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1.5 text-xs">
              {/* 1. الرئيسية */}
              <button
                onClick={() => handleNavClick('home')}
                className="w-full text-right p-3 rounded-xl bg-[#101725] hover:bg-[#161F30] border border-[#202B40] flex items-center gap-3 text-white font-bold cursor-pointer transition-colors"
              >
                <Home className="w-4 h-4 text-[#FF4753]" />
                <span className="text-sm">الرئيسية</span>
              </button>

              {/* 2. جميع المنتجات */}
              <button
                onClick={() => handleNavClick('all')}
                className="w-full text-right p-3 rounded-xl bg-[#101725] hover:bg-[#161F30] border border-[#202B40] flex items-center gap-3 text-white font-bold cursor-pointer transition-colors"
              >
                <Package className="w-4 h-4 text-[#FF4753]" />
                <span className="text-sm">جميع المنتجات</span>
              </button>

              {/* 3. قائمة الأقسام المنسدلة (الأقسام الفرعية) */}
              <div className="bg-[#101725] rounded-xl border border-[#202B40] overflow-hidden">
                <button
                  onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                  className="w-full text-right p-3 flex items-center justify-between text-white font-bold cursor-pointer hover:bg-[#161F30] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 text-[#FF4753]" />
                    <span className="text-sm">قائمة الأقسام</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isMobileCategoriesOpen ? 'rotate-180 text-[#FF4753]' : ''
                    }`}
                  />
                </button>

                {isMobileCategoriesOpen && (
                  <div className="p-2 pt-0 space-y-1 border-t border-[#202B40]/60">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = activeTab === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryClick(cat.id)}
                          className={`w-full text-right px-3 py-2.5 rounded-lg flex items-center gap-2.5 text-xs font-semibold cursor-pointer transition-colors ${
                            isSelected
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

              {/* 4. العروض */}
              <button
                onClick={() => handleNavClick('offers')}
                className="w-full text-right p-3 rounded-xl bg-[#101725] hover:bg-[#161F30] border border-[#202B40] flex items-center gap-3 text-white font-bold cursor-pointer transition-colors"
              >
                <Percent className="w-4 h-4 text-[#FF4753]" />
                <span className="text-sm">العروض والتخفيضات</span>
              </button>

              {/* 5. الصيانة والبرمجة */}
              <button
                onClick={() => handleNavClick('repair')}
                className="w-full text-right p-3 rounded-xl bg-[#101725] hover:bg-[#161F30] border border-[#202B40] flex items-center gap-3 text-white font-bold cursor-pointer transition-colors"
              >
                <Wrench className="w-4 h-4 text-[#FF4753]" />
                <span className="text-sm">خدمات الصيانة والبرمجة</span>
              </button>

              {/* 6. تتبع طلبك */}
              <button
                onClick={() => handleNavClick('track')}
                className="w-full text-right p-3 rounded-xl bg-[#101725] hover:bg-[#161F30] border border-[#202B40] flex items-center gap-3 text-emerald-400 font-bold cursor-pointer transition-colors"
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white">تتبع طلبك</span>
              </button>

              {/* 7. اتصل بنا */}
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full text-right p-3 rounded-xl bg-[#101725] hover:bg-[#161F30] border border-[#202B40] flex items-center gap-3 text-amber-400 font-bold cursor-pointer transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-white">اتصل بنا</span>
              </button>

              {/* أزرار الاتصال السريع */}
              <div className="pt-3 space-y-2">
                <a
                  href="https://wa.me/967771304777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>تواصل فوري عبر واتساب</span>
                </a>

                <a
                  href="tel:+967771304777"
                  className="w-full py-2.5 px-3 bg-[#0C1320] hover:bg-[#141C2B] border border-[#202B40] text-slate-200 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors font-mono text-center"
                  dir="ltr"
                >
                  <Phone className="w-4 h-4 text-[#FF4753]" />
                  <span>+967 771 304 777</span>
                </a>
              </div>
            </div>

            {/* تذييل القائمة الجانبية */}
            <div className="p-4 border-t border-[#202B40] bg-[#101725] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>ذمار — خط الحسينية</span>
              </span>
              <button
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  if (onOpenAdmin) {
                    onOpenAdmin();
                  } else {
                    window.location.hash = '#admin';
                  }
                }}
                className="text-slate-500 hover:text-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>لوحة الإدارة</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          نافذة تتبع الطلب (Track Order Modal)
      ========================================================================= */}
      {isTrackModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#101725] border border-[#202B40] rounded-3xl p-6 max-w-md w-full text-right space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#202B40] pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-400" />
                <span>تتبع حالة طلبك</span>
              </h3>
              <button
                onClick={() => {
                  setIsTrackModalOpen(false);
                  setTrackResult(null);
                  setTrackOrderId('');
                }}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#97A0B3] leading-relaxed">
              أدخل رقم طلبك (مثل: <span className="font-mono text-white">THR-123456</span>) أو رقم هاتفك للاستعلام عن موعد وتفاصيل التوصيل.
            </p>

            <form onSubmit={handleTrackSubmit} className="space-y-3">
              <input
                type="text"
                required
                value={trackOrderId}
                onChange={(e) => setTrackOrderId(e.target.value)}
                placeholder="رقم الطلب أو رقم الهاتف..."
                className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#E5252C] hover:bg-[#F0323A] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
                >
                  فحص حالة الشحن
                </button>

                <a
                  href={`https://wa.me/967771304777?text=${encodeURIComponent(
                    `مرحباً متجر الثريا بلاس، أود الاستفسار عن حالة طلبي رقم: ${trackOrderId || '...'}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>عبر واتساب</span>
                </a>
              </div>
            </form>

            {trackResult && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs font-semibold animate-in fade-in">
                {trackResult}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
