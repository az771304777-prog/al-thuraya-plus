import React from 'react';
import { ShieldCheck, Truck, Wrench, RefreshCw, Headphones, Zap } from 'lucide-react';

export const StoreFeatures: React.FC = () => {
  return (
    <section className="py-12 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-right">
          {/* Feature 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4 hover:border-slate-200 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">أجهزة أصلية 100% معتمدة</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                جميع الهواتف والحواسيب مشمولة بضمان الوكلاء الرسميين لمدة سنتين كاملتين مع الفاتورة الضريبية.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4 hover:border-slate-200 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">شحن سريع وتوصيل آمن</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                توصيل في نفس اليوم لمدن الرياض وجدة، وشحن فوري لباقي مدن المملكة ودول الخليج خلال 24-48 ساعة.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4 hover:border-slate-200 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">مركز صيانة وترقية فوري</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                مهندسون معتمدون لإصلاح الشاشات، استبدال البطاريات وترقية لابتوبات الألعاب والمونتاج في أقل من ساعة.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4 hover:border-slate-200 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">استبدال وترقية الأجهزة</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                استبدل هاتفك أو لابتوبك القديم بأحدث موديل فورا مع تقييم عادل ونقل آمن لبياناتك وصورك.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
