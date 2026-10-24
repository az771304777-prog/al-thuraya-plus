import React, { useState } from 'react';
import { X, Wrench, ShieldCheck, Clock, MessageCircle, RefreshCw, CheckCircle, Smartphone, Laptop, Cpu, Radio } from 'lucide-react';
import { Currency } from '../types/store';
import { REPAIR_SERVICES } from '../data/products';
import { formatPrice } from '../utils/currency';

interface MaintenanceEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  initialMode?: 'repair' | 'flashing' | 'gtag' | 'tradein';
}

export const MaintenanceEstimator: React.FC<MaintenanceEstimatorProps> = ({
  isOpen,
  onClose,
  currency,
  initialMode = 'repair',
}) => {
  const [activeMode, setActiveMode] = useState<'repair' | 'flashing' | 'gtag' | 'tradein'>(initialMode);
  const [deviceType, setDeviceType] = useState<'phone' | 'laptop'>('phone');
  const [deviceBrand, setDeviceBrand] = useState('Apple');
  const [deviceModel, setDeviceModel] = useState('iPhone 15 Pro Max / 16 Pro');
  const [selectedIssueId, setSelectedIssueId] = useState(REPAIR_SERVICES[0].id);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  // Trade-in state
  const [tradeinCondition, setTradeinCondition] = useState<'excellent' | 'good' | 'fair'>('excellent');
  const [tradeinStorage, setTradeinStorage] = useState('256GB');

  if (!isOpen) return null;

  const selectedService =
    REPAIR_SERVICES.find((s) => s.id === selectedIssueId) || REPAIR_SERVICES[0];

  // Base trade-in values in Yemeni Rials (YER)
  const baseTradeinValues: Record<string, number> = {
    'Apple': 320000,
    'Samsung': 260000,
    'Dell': 300000,
    'ASUS': 280000,
    'Lenovo': 240000,
    'Xiaomi': 180000,
  };
  const conditionMultipliers = { excellent: 1.0, good: 0.8, fair: 0.6 };
  const estimatedTradeinValue = Math.round(
    (baseTradeinValues[deviceBrand] || 200000) * conditionMultipliers[tradeinCondition]
  );

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone) return;
    setIsBooked(true);
  };

  const handleWhatsAppBooking = () => {
    let modeText = 'طلب صيانة فورية';
    if (activeMode === 'flashing') modeText = 'خدمة برمجة وتفليش';
    if (activeMode === 'gtag') modeText = 'تفعيل جهاز G-TAG للتتبع';
    if (activeMode === 'tradein') modeText = 'تقييم واستبدال جهاز قديم';

    const text = encodeURIComponent(
      `مرحباً مهندس الصيانة في متجر الثريا بلاس (ذمار):\n` +
      `نوع الخدمة: ${modeText}\n` +
      `نوع الجهاز: ${deviceType === 'phone' ? 'هاتف ذكي' : 'لابتوب'}\n` +
      `الماركة والموديل: ${deviceBrand} - ${deviceModel}\n` +
      `الخدمة المطلوبة: ${selectedService.issue}\n` +
      `السعر التقديري: ${formatPrice(selectedService.estimatedPrice, 'YER')}\n` +
      `الاسم: ${customerName || 'عميل المتجر'}\n` +
      `رقم الجوال: ${customerPhone}\n\n` +
      `أود حجز موعد في المحل بذمار أو عبر التوصيل.`
    );

    window.open(`https://wa.me/967771304777?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 text-right">
      <div
        className="relative bg-[#101725] text-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#202B40] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Mode Switcher */}
        <div className="px-6 py-4 border-b border-[#202B40] bg-[#0C1320] flex items-center justify-between">
          <div className="flex items-center gap-1 p-1 bg-[#101725] rounded-xl border border-[#202B40] overflow-x-auto">
            <button
              onClick={() => {
                setActiveMode('repair');
                setIsBooked(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeMode === 'repair'
                  ? 'bg-gradient-to-r from-[#F0323A] to-[#B5121B] text-white shadow-md'
                  : 'text-[#97A0B3] hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>الصيانة</span>
            </button>

            <button
              onClick={() => {
                setActiveMode('flashing');
                setIsBooked(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeMode === 'flashing'
                  ? 'bg-gradient-to-r from-[#F0323A] to-[#B5121B] text-white shadow-md'
                  : 'text-[#97A0B3] hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>البرمجة والتفليش</span>
            </button>

            <button
              onClick={() => {
                setActiveMode('gtag');
                setIsBooked(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeMode === 'gtag'
                  ? 'bg-gradient-to-r from-[#F0323A] to-[#B5121B] text-white shadow-md'
                  : 'text-[#97A0B3] hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>G-TAG</span>
            </button>

            <button
              onClick={() => {
                setActiveMode('tradein');
                setIsBooked(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeMode === 'tradein'
                  ? 'bg-gradient-to-r from-[#F0323A] to-[#B5121B] text-white shadow-md'
                  : 'text-[#97A0B3] hover:text-white'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>الاستبدال</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isBooked ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white">تم استلام طلبك بنجاح!</h3>
            <p className="text-xs text-[#97A0B3] max-w-md mx-auto">
              سيتواصل معك مهندس الصيانة والبرمجة في متجر الثريا بلاس بذمار لتأكيد موعدك وتجهيز الأجهزة.
            </p>
            <div className="flex justify-center gap-3 pt-3">
              <button
                onClick={handleWhatsAppBooking}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>إرسال التفاصيل مباشرة عبر واتساب</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#0C1320] text-slate-300 rounded-xl text-xs font-bold border border-[#202B40] cursor-pointer hover:bg-[#131B2C]"
              >
                إغلاق
              </button>
            </div>
          </div>
        ) : activeMode === 'tradein' ? (
          /* Trade-In Form */
          <div className="p-6 space-y-5">
            <div className="p-3 bg-[#0C1320] border border-[#202B40] rounded-xl text-xs text-slate-300">
              💡 استبدل هاتفك أو لابتوبك القديم بآخر جديد من متجر الثريا بلاس مع تقييم فوري ونقل جميع بياناتك وصورك بأمان تام.
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">ماركة الجهاز القديم:</label>
                <select
                  value={deviceBrand}
                  onChange={(e) => setDeviceBrand(e.target.value)}
                  className="w-full bg-[#0C1320] border border-[#202B40] rounded-lg px-3 py-2 text-xs text-white"
                >
                  <option value="Apple">Apple iPhone / MacBook</option>
                  <option value="Samsung">Samsung Galaxy</option>
                  <option value="Dell">Dell Laptop</option>
                  <option value="ASUS">ASUS Laptop</option>
                  <option value="Lenovo">Lenovo Laptop</option>
                  <option value="Xiaomi">Xiaomi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">السعة التخزينية:</label>
                <select
                  value={tradeinStorage}
                  onChange={(e) => setTradeinStorage(e.target.value)}
                  className="w-full bg-[#0C1320] border border-[#202B40] rounded-lg px-3 py-2 text-xs text-white"
                >
                  <option value="128GB">128 جيجابايت</option>
                  <option value="256GB">256 جيجابايت</option>
                  <option value="512GB">512 جيجابايت</option>
                  <option value="1TB">1 تيرابايت</option>
                </select>
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">حالة الجهاز الفعلية:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTradeinCondition('excellent')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    tradeinCondition === 'excellent'
                      ? 'border-[#E5252C] bg-[#E5252C]/15 text-white font-bold'
                      : 'border-[#202B40] hover:bg-[#0C1320] text-slate-400'
                  }`}
                >
                  <div className="text-xs">ممتاز (نظيف جداً)</div>
                  <div className="text-[10px] text-slate-500 mt-1">بدون أي خدوش أو عيوب</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTradeinCondition('good')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    tradeinCondition === 'good'
                      ? 'border-[#E5252C] bg-[#E5252C]/15 text-white font-bold'
                      : 'border-[#202B40] hover:bg-[#0C1320] text-slate-400'
                  }`}
                >
                  <div className="text-xs">جيد جداً</div>
                  <div className="text-[10px] text-slate-500 mt-1">آثار استخدام عادية</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTradeinCondition('fair')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    tradeinCondition === 'fair'
                      ? 'border-[#E5252C] bg-[#E5252C]/15 text-white font-bold'
                      : 'border-[#202B40] hover:bg-[#0C1320] text-slate-400'
                  }`}
                >
                  <div className="text-xs">مقبول</div>
                  <div className="text-[10px] text-slate-500 mt-1">خدوش واضحة</div>
                </button>
              </div>
            </div>

            {/* Estimated Value */}
            <div className="p-4 bg-[#0C1320] text-white rounded-xl flex items-center justify-between border border-[#202B40]">
              <div>
                <span className="text-xs text-[#97A0B3]">القيمة التقديرية لجهازك القديم:</span>
                <div className="text-2xl font-black text-[#FF4753] tabular-nums font-mono">
                  {formatPrice(estimatedTradeinValue, currency)}
                </div>
              </div>
              <div className="text-left text-xs text-[#97A0B3]">
                يخصم مباشرة من قيمة أي جهاز جديد
              </div>
            </div>

            <button
              type="button"
              onClick={handleWhatsAppBooking}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال مواصفات الجهاز لتقييم فوري بالمتجر</span>
            </button>
          </div>
        ) : (
          /* Maintenance / Flashing / G-TAG Form */
          <form onSubmit={handleBooking} className="p-6 space-y-5">
            {/* Device Type and Brand */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  نوع الجهاز:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDeviceType('phone');
                      setSelectedIssueId(REPAIR_SERVICES[0].id);
                    }}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      deviceType === 'phone'
                        ? 'bg-[#E5252C]/15 border-[#E5252C] text-[#FF4753] font-bold'
                        : 'border-[#202B40] text-slate-400 hover:bg-[#0C1320]'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>هاتف ذكي</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDeviceType('laptop');
                      setSelectedIssueId(REPAIR_SERVICES[5].id);
                    }}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      deviceType === 'laptop'
                        ? 'bg-[#E5252C]/15 border-[#E5252C] text-[#FF4753] font-bold'
                        : 'border-[#202B40] text-slate-400 hover:bg-[#0C1320]'
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>لابتوب</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  الشركة المصنعة:
                </label>
                <select
                  value={deviceBrand}
                  onChange={(e) => setDeviceBrand(e.target.value)}
                  className="w-full bg-[#0C1320] border border-[#202B40] rounded-lg px-3 py-2 text-xs text-white cursor-pointer"
                >
                  <option value="Apple">Apple (آبل)</option>
                  <option value="Samsung">Samsung (سامسونج)</option>
                  <option value="Xiaomi">Xiaomi (شاومي)</option>
                  <option value="Dell">Dell (ديل)</option>
                  <option value="ASUS">ASUS (أسوس)</option>
                  <option value="Lenovo">Lenovo (لينوفو)</option>
                </select>
              </div>
            </div>

            {/* Model Input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                موديل الجهاز:
              </label>
              <input
                type="text"
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
                placeholder="مثال: iPhone 14 Pro Max أو Galaxy S23 Ultra أو Dell XPS"
                className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#E5252C]"
              />
            </div>

            {/* Issue Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                الخدمة المطلوبة:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {REPAIR_SERVICES.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedIssueId(srv.id)}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      selectedIssueId === srv.id
                        ? 'border-[#E5252C] bg-[#E5252C]/15 ring-1 ring-[#E5252C]'
                        : 'border-[#202B40] bg-[#0C1320] hover:border-slate-600'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{srv.issue}</div>
                    <div className="flex items-center justify-between text-[11px] text-[#97A0B3] mt-1.5 font-mono">
                      <span className="text-[#FF4753] font-bold">
                        {formatPrice(srv.estimatedPrice, currency)}
                      </span>
                      <span>{srv.duration}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Estimation Summary Box */}
            <div className="p-4 bg-[#0C1320] border border-[#202B40] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-[#97A0B3] font-semibold">التكلفة التقديرية للخدمة:</span>
                <div className="text-xl font-black text-[#FF4753] tabular-nums font-mono">
                  {formatPrice(selectedService.estimatedPrice, currency)}
                </div>
              </div>

              <div className="text-left text-xs space-y-1">
                <div className="flex items-center gap-1 text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{selectedService.warranty}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>المدة: {selectedService.duration}</span>
                </div>
              </div>
            </div>

            {/* Customer Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  الاسم:
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="اسمك الكريم"
                  className="w-full bg-[#0C1320] border border-[#202B40] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  رقم الهاتف للتواصل <span className="text-red-400">*</span>:
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="77x xxx xxx"
                  className="w-full bg-[#0C1320] border border-[#202B40] rounded-lg px-3 py-2 text-xs text-white focus:outline-none text-right font-mono"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 bg-[#101725] hover:bg-[#131B2C] border border-[#202B40] hover:border-[#E5252C] text-white font-bold text-xs rounded-xl cursor-pointer transition-colors"
              >
                تسجيل موعد بالمحل
              </button>
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>حجز فوري عبر واتساب المحل</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
