import React from 'react';
import { Smartphone, Laptop, Headphones, Zap, BatteryCharging, Shield, Wrench, Cpu, Radio, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ProductCategory } from '../types/store';

interface CategoriesAndServicesProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenRepair: (mode?: 'repair' | 'flashing' | 'gtag') => void;
}

export const CategoriesAndServices: React.FC<CategoriesAndServicesProps> = ({
  onSelectCategory,
  onOpenRepair,
}) => {
  const categoryCards = [
    {
      id: 'phones',
      name: 'الهواتف الذكية',
      count: '6 منتجات',
      icon: Smartphone,
      gradient: 'from-blue-600/30 to-[#E5252C]/30',
      description: 'آيفون، سامسونج، شاومي، بيكسل',
    },
    {
      id: 'laptops',
      name: 'الحواسيب واللابتوبات',
      count: '4 منتجات',
      icon: Laptop,
      gradient: 'from-purple-600/30 to-[#E5252C]/30',
      description: 'ماك بوك، ديل، أسوس، ثينك باد',
    },
    {
      id: 'audio',
      name: 'السماعات والصوتيات',
      count: '4 منتجات',
      icon: Headphones,
      gradient: 'from-emerald-600/30 to-blue-600/30',
      description: 'AirPods Pro، JBL، سماعات بلوتوث',
    },
    {
      id: 'chargers',
      name: 'الشواحن والكابلات',
      count: '5 منتجات',
      icon: Zap,
      gradient: 'from-amber-600/30 to-[#E5252C]/30',
      description: 'شواحن GaN، كابلات 240W فائقة السرعة',
    },
    {
      id: 'powerbanks',
      name: 'البطاريات المتنقلة',
      count: '2 منتجات',
      icon: BatteryCharging,
      gradient: 'from-[#E5252C]/30 to-purple-600/30',
      description: 'ماج سيف 10K و 20K مع ستاند مدمج',
    },
    {
      id: 'cases',
      name: 'الأغطية والحماية',
      count: '4 منتجات',
      icon: Shield,
      gradient: 'from-cyan-600/30 to-blue-600/30',
      description: 'شاشات حماية 9H، كفرات مضادة للصدمات',
    },
  ];

  return (
    <div className="space-y-12">
      {/* ---------------- 1. قسم: تسوق حسب القسم ---------------- */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#202B40] pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[#E5252C] rounded-full inline-block"></span>
            <span>تسوق حسب القسم</span>
          </h2>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-bold text-[#FF4753] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>عرض كافة الأقسام</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as ProductCategory)}
                className="group p-4 bg-[#101725] hover:bg-[#131B2C] border border-[#202B40] hover:border-[#E5252C] rounded-2xl flex flex-col justify-between text-right transition-all duration-200 cursor-pointer shadow-lg relative overflow-hidden"
              >
                {/* Glow backdrop on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />

                <div className="relative z-10 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/[0.14] via-white/[0.05] to-transparent backdrop-blur-md border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] flex items-center justify-center text-[#FF4753] group-hover:scale-110 group-hover:border-[#FF4753]/60 transition-all">
                    <Icon className="w-6 h-6 drop-shadow-[0_2px_8px_rgba(255,71,83,0.4)]" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#FF4753] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-[#97A0B3] mt-0.5">{cat.count}</p>
                  </div>
                </div>

                <div className="relative z-10 pt-3 border-t border-[#202B40]/60 flex items-center justify-between text-[10px] text-[#97A0B3] group-hover:text-white transition-colors">
                  <span>تصفح</span>
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ---------------- 2. قسم: خدماتنا داخل المتجر ---------------- */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#202B40] pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[#E5252C] rounded-full inline-block"></span>
            <span className="text-[#FF4753]">خدماتنا داخل المتجر</span>
          </h2>
          <button
            onClick={() => onOpenRepair()}
            className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <span>كل الخدمات وحجز موعد</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Service 1: Maintenance */}
          <div
            onClick={() => onOpenRepair('repair')}
            className="p-6 bg-[#101725] hover:bg-[#131B2C] border border-[#202B40] hover:border-[#E5252C] rounded-2xl transition-all cursor-pointer shadow-xl group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E5252C]/25 via-white/[0.08] to-transparent backdrop-blur-lg border border-white/20 shadow-[0_8px_24px_rgba(229,37,44,0.3),inset_0_1px_1px_rgba(255,255,255,0.35)] flex items-center justify-center text-[#FF4753] group-hover:scale-105 transition-transform">
                <Wrench className="w-7 h-7 drop-shadow-[0_2px_8px_rgba(255,71,83,0.4)]" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#FF4753] transition-colors">
                خدمات الصيانة الاحترافية
              </h3>
              <p className="text-xs text-[#97A0B3] leading-relaxed">
                صيانة فورية بأحدث الأجهزة والأدوات: شاشات أصلية، بطاريات جديدة، أعطال الشحن والدوائر، وتنظيف لابتوبات وتغيير المعجون الحراري.
              </p>
            </div>

            <div className="pt-4 border-t border-[#202B40] flex items-center justify-between text-xs text-[#FF4753] font-bold">
              <span>طلب صيانة فورية</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Service 2: Software & Flashing */}
          <div
            onClick={() => onOpenRepair('flashing')}
            className="p-6 bg-[#101725] hover:bg-[#131B2C] border border-[#202B40] hover:border-[#E5252C] rounded-2xl transition-all cursor-pointer shadow-xl group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E5252C]/25 via-white/[0.08] to-transparent backdrop-blur-lg border border-white/20 shadow-[0_8px_24px_rgba(229,37,44,0.3),inset_0_1px_1px_rgba(255,255,255,0.35)] flex items-center justify-center text-[#FF4753] group-hover:scale-105 transition-transform">
                <Cpu className="w-7 h-7 drop-shadow-[0_2px_8px_rgba(255,71,83,0.4)]" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#FF4753] transition-colors">
                خدمات البرمجة وتفليش الأنظمة
              </h3>
              <p className="text-xs text-[#97A0B3] leading-relaxed">
                تفليش وتحديث أحدث رومات أندرويد و iOS، فك الحسابات المغلقة، حل مشاكل التعليق والريستارت، ونقل البيانات بين الأجهزة بأمان تام.
              </p>
            </div>

            <div className="pt-4 border-t border-[#202B40] flex items-center justify-between text-xs text-[#FF4753] font-bold">
              <span>حجز استشارة سوفتوير</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Service 3: G-TAG Tracking Devices */}
          <div
            onClick={() => onOpenRepair('gtag')}
            className="p-6 bg-[#101725] hover:bg-[#131B2C] border border-[#202B40] hover:border-[#E5252C] rounded-2xl transition-all cursor-pointer shadow-xl group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E5252C]/25 via-white/[0.08] to-transparent backdrop-blur-lg border border-white/20 shadow-[0_8px_24px_rgba(229,37,44,0.3),inset_0_1px_1px_rgba(255,255,255,0.35)] flex items-center justify-center text-[#FF4753] group-hover:scale-105 transition-transform">
                <Radio className="w-7 h-7 drop-shadow-[0_2px_8px_rgba(255,71,83,0.4)]" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#FF4753] transition-colors">
                خدمات G-TAG والتتبع الذكي
              </h3>
              <p className="text-xs text-[#97A0B3] leading-relaxed">
                أجهزة التتبع الذكية G-TAG وملحقاتها، ربطها بهاتفك وتفعيلها لحماية حقيبتك، لابتوبك، سيارتك أو مقتنياتك الثمينة بكل دقة.
              </p>
            </div>

            <div className="pt-4 border-t border-[#202B40] flex items-center justify-between text-xs text-[#FF4753] font-bold">
              <span>تفاصيل وتفعيل G-TAG</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 3. بنر العروض الترويجية (Promo Banner) ---------------- */}
      <section className="relative overflow-hidden rounded-2xl border border-[#202B40] bg-gradient-to-r from-[#B5121B] via-[#E5252C] to-[#0F1626] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-right">
          <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-black/30 px-3 py-1 rounded-md inline-block">
            عروض خاصة بذمار وبكافة المحافظات
          </span>
          <h3 className="text-xl sm:text-2xl font-black">
            وفر حتى 20% عند شراء باقة الهاتف مع الشاحن وسماعات الرأس!
          </h3>
          <p className="text-xs sm:text-sm text-slate-100 max-w-xl">
            شواحن أصلية، كابلات شحن معتمدة، وحماية زجاجية مركبة مجاناً لجميع الأجهزة المشتراة من المتجر.
          </p>
        </div>

        <button
          onClick={() => onSelectCategory('all')}
          className="px-6 py-3 bg-white hover:bg-slate-100 text-[#B5121B] font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer whitespace-nowrap shrink-0"
        >
          استفد من العرض الآن
        </button>
      </section>
    </div>
  );
};
