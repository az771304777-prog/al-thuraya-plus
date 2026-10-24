import React from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { ProductCategory } from '../types/store';

interface StoreFooterProps {
  onCategoryClick: (category: ProductCategory) => void;
  onOpenRepairModal: () => void;
  onOpenAdmin?: () => void;
}

export const StoreFooter: React.FC<StoreFooterProps> = ({
  onCategoryClick,
  onOpenRepairModal,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-[#101725] text-slate-300 pt-16 pb-12 border-t border-[#202B40] text-right mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#202B40]">
          {/* Brand & About Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F0323A] to-[#B5121B] text-white flex items-center justify-center font-black text-lg shadow-md">
                ★
              </span>
              <div>
                <span className="text-xl font-black text-white block">متجر الثريا بلاس</span>
                <span className="text-[9px] tracking-[3px] text-[#FF4753] font-bold uppercase block -mt-1">
                  AL-THURAYA PLUS
                </span>
              </div>
            </div>

            <p className="text-xs text-[#97A0B3] leading-relaxed">
              الثريا بلاس — متجرك المتكامل للهواتف الذكية وملحقاتها في ذمار. متوفر كل ما يحتاجه الهاتف من جوالات وإكسسوارات أصلية، حواسيب محمولة، مع خدمات الصيانة والبرمجة بأحدث الأجهزة والأدوات، بالإضافة إلى خدمات G-TAG وتوصيل لجميع المحافظات.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/share/1UnxwqDa6E/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#0C1320] border border-[#202B40] hover:border-[#E5252C] hover:bg-[#E5252C]/15 text-[#EDEFF4] flex items-center justify-center transition-colors"
                aria-label="فيسبوك"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
                </svg>
              </a>

              <a
                href="https://wa.me/967771304777"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#0C1320] border border-[#202B40] hover:border-emerald-500 hover:bg-emerald-500/15 text-emerald-400 flex items-center justify-center transition-colors"
                aria-label="واتساب"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">روابط سريعة</h4>
            <ul className="space-y-2 text-xs text-[#97A0B3]">
              <li>
                <button
                  onClick={() => onCategoryClick('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  جميع المنتجات
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategoryClick('phones')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  الهواتف الذكية الأصلية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategoryClick('laptops')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  الحواسيب المحمولة ولابتوبات
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategoryClick('audio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  السماعات والصوتيات
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategoryClick('chargers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  الشواحن والكابلات السريعة
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRepairModal}
                  className="text-[#FF4753] hover:underline font-bold cursor-pointer"
                >
                  خدمات الصيانة والبرمجة و G-TAG
                </button>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">السياسات والضمان</h4>
            <ul className="space-y-2 text-xs text-[#97A0B3]">
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  سياسة الخصوصية وأمان البيانات
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  سياسة الاستبدال والاسترجاع (فحص شامل)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  سياسة الشحن والتوصيل لجميع المحافظات
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  ضمان الصيانة وقطع الغيار الأصلية
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">تواصل معنا</h4>
            <ul className="space-y-3 text-xs text-[#97A0B3]">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF4753] shrink-0" />
                <a
                  href="tel:+967771304777"
                  className="font-bold text-white hover:underline font-mono"
                  dir="ltr"
                >
                  +967 771 304 777
                </a>
              </li>

              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>السبت إلى الخميس: 9:00 صباحاً - 10:00 مساءً</span>
              </li>

              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-white font-medium">
                  ذمار، خط الحسينية، جوار مستشفى الهلال
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0C1320] border border-[#202B40] text-emerald-400 font-bold text-xs">
                ✓ الدفع عند الاستلام متاح لجميع المحافظات
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#97A0B3] gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
            <span>&copy; {new Date().getFullYear()} متجر الثريا بلاس — جميع الحقوق محفوظة</span>
            <span className="hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span>⚡ برمجة وتطوير:</span>
              <strong className="text-white">عبدالرحمن عادل معوضة</strong>
              <a
                href="https://wa.me/967771304777"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF4753] hover:underline font-mono font-bold"
                dir="ltr"
              >
                +967 771 304 777
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400">اليمن — ذمار</span>
            {onOpenAdmin && (
              <>
                <span className="text-slate-600">|</span>
                <button
                  onClick={onOpenAdmin}
                  className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                  title="الدخول للوحة إدارة المنتجات والمخزون"
                >
                  <span>🔐 لوحة الإدارة</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
