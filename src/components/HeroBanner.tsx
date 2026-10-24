import React from 'react';
import { Truck, Wrench, ShieldCheck, MessageCircle, ArrowLeft, Sparkles, Laptop, Smartphone } from 'lucide-react';
import { Product } from '../types/store';
import { ProductVisual } from './ProductVisual';

interface HeroBannerProps {
  featuredPhone: Product;
  featuredLaptop: Product;
  onExploreCategory: (category: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenRepair: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredPhone,
  featuredLaptop,
  onExploreCategory,
  onSelectProduct,
  onOpenRepair,
}) => {
  return (
    <div className="relative">
      {/* ---------------- 1. البطل Hero ---------------- */}
      <section className="relative overflow-hidden bg-[#0A0E17] text-white py-14 md:py-20 border-b border-[#202B40]">
        {/* Ambient Crimson Glow matching Al-Thuraya Plus */}
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-[#E5252C]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#0F1626] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text & Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF4753] bg-[#E5252C]/10 border border-[#E5252C]/30 px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>متجر الثريا بلاس — ذمار وكل محافظات اليمن</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                كل ما يحتاجه هاتفك ولابتوبك في مكان واحد
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                هواتف ذكية وإكسسوارات أصلية، حواسيب محمولة احترافية، مع خدمات الصيانة والبرمجة بأحدث الأجهزة والأدوات، بالإضافة إلى خدمات G-TAG — وتوصيل لجميع المحافظات.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onExploreCategory('phones')}
                  className="px-7 py-3.5 bg-gradient-to-r from-[#F0323A] via-[#E5252C] to-[#B5121B] hover:brightness-110 text-white font-bold text-sm rounded-xl shadow-[0_4px_20px_rgba(229,37,44,0.35)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>تسوق الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onExploreCategory('laptops')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-xl border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Laptop className="w-4 h-4 text-[#FF4753]" />
                  <span>تصفح اللابتوبات</span>
                </button>

                <button
                  onClick={onOpenRepair}
                  className="px-6 py-3.5 bg-[#101725] hover:bg-[#131B2C] text-[#FF4753] font-bold text-sm rounded-xl border border-[#202B40] hover:border-[#E5252C] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  <span>خدمات الصيانة والبرمجة</span>
                </button>
              </div>
            </div>

            {/* Interactive Spotlight Card (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {featuredPhone && (
                <div
                  onClick={() => onSelectProduct(featuredPhone)}
                  className="bg-[#101725] hover:bg-[#131B2C] border border-[#202B40] hover:border-[#E5252C]/60 rounded-2xl p-4 transition-all duration-300 cursor-pointer shadow-2xl relative group overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#FF4753] flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" />
                      الأحدث في المتجر
                    </span>
                    <span className="text-xs text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
                      عرض المواصفات <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    </span>
                  </div>

                  <div className="h-44 sm:h-48 overflow-hidden rounded-xl bg-[#0A0E17] border border-[#202B40] mb-3 flex items-center justify-center">
                    <ProductVisual product={featuredPhone} size="sm" />
                  </div>

                  <div className="flex items-center justify-between text-right">
                    <div>
                      <h2 className="text-sm font-bold text-white group-hover:text-[#FF4753] transition-colors">
                        {featuredPhone.name}
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {featuredPhone.specs['المعالج']} · {featuredPhone.specs['الشاشة']?.split(' ')[0]} بوصة
                      </p>
                    </div>
                    {/* Glass Price Badge */}
                    <div className="text-left font-mono font-black text-[#FF4753] tabular-nums px-3 py-1.5 rounded-xl bg-gradient-to-br from-white/[0.09] via-white/[0.03] to-transparent backdrop-blur-md border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] drop-shadow-[0_2px_8px_rgba(255,71,83,0.35)]">
                      {featuredPhone.price.toLocaleString('ar-SA')} ر.ي
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 2. شريط الميزات (Features Strip) ---------------- */}
      <section className="bg-[#101725] border-b border-[#202B40] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-white text-center">
            {/* Feature 1 */}
            <div className="flex items-center justify-center gap-2.5 p-2.5 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-md border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-white/30 transition-all">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E5252C]/20 to-transparent border border-white/20 flex items-center justify-center shadow-inner">
                <Truck className="w-4 h-4 text-[#FF4753] drop-shadow-[0_0_6px_rgba(255,71,83,0.5)]" />
              </div>
              <span>توصيل لجميع المحافظات</span>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center justify-center gap-2.5 p-2.5 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-md border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-white/30 transition-all">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E5252C]/20 to-transparent border border-white/20 flex items-center justify-center shadow-inner">
                <Wrench className="w-4 h-4 text-[#FF4753] drop-shadow-[0_0_6px_rgba(255,71,83,0.5)]" />
              </div>
              <span>صيانة وبرمجة احترافية</span>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center justify-center gap-2.5 p-2.5 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-md border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-white/30 transition-all">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E5252C]/20 to-transparent border border-white/20 flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-4 h-4 text-[#FF4753] drop-shadow-[0_0_6px_rgba(255,71,83,0.5)]" />
              </div>
              <span>الدفع عند الاستلام</span>
            </div>

            {/* Feature 4 */}
            <a
              href="https://wa.me/967771304777"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 p-2.5 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-md border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-emerald-500/50 hover:bg-emerald-500/[0.08] transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/20 to-transparent border border-white/20 flex items-center justify-center shadow-inner">
                <MessageCircle className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
              </div>
              <span>دعم مباشر عبر واتساب</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
