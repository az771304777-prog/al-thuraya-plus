import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MessageCircle, Banknote, Landmark } from 'lucide-react';
import { CartItem, Currency, Order } from '../types/store';
import { formatPrice } from '../utils/currency';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  discountAmount: number;
  promoCode: string;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  discountAmount,
  promoCode,
  onOrderSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('ذمار');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'tamara'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const deliveryFee = rawSubtotal >= 80000 ? 0 : 3000;
  const total = Math.max(0, rawSubtotal - discountAmount + deliveryFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `THR-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cartItems],
        customerName: name,
        phone,
        city,
        address,
        paymentMethod,
        subtotal: rawSubtotal,
        discount: discountAmount,
        deliveryFee,
        total,
        currency,
        date: new Date().toLocaleDateString('ar-YE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'confirmed',
      };

      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 700);
  };

  const handleWhatsAppInvoice = (order: Order) => {
    const itemsList = order.items
      .map(
        (it) =>
          `• ${it.product.name} (${it.selectedColor.name} - ${it.selectedVariant.label}) × ${it.quantity} = ${it.unitPrice * it.quantity} ر.ي`
      )
      .join('\n');

    const paymentLabel =
      order.paymentMethod === 'cod'
        ? 'الدفع عند الاستلام'
        : order.paymentMethod === 'card'
        ? 'حوالة عبر الكريمي / النجم'
        : 'محفظة جوال (فلوسك / جيب / كاش)';

    const msg = encodeURIComponent(
      `مرحباً متجر الثريا بلاس، أود تأكيد طلبي برقم (${order.id}):\n\n` +
      `👤 الاسم: ${order.customerName}\n` +
      `📞 رقم الهاتف: ${order.phone}\n` +
      `📍 المحافظة والعنوان: ${order.city} - ${order.address}\n` +
      `💳 طريقة الدفع: ${paymentLabel}\n\n` +
      `📦 المنتجات:\n${itemsList}\n\n` +
      `💰 الإجمالي المطلوب: ${order.total.toLocaleString('ar-SA')} ر.ي\n\n` +
      `يرجى تأكيد تجهيز الشحنة وموعد التوصيل.`
    );

    window.open(`https://wa.me/967771304777?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200 text-right">
      <div
        className="relative bg-[#101725] text-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#202B40] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#202B40] bg-[#0C1320]">
          <h2 className="text-base font-bold text-white">
            {confirmedOrder ? 'تم تأكيد طلبك بنجاح' : 'إتمام الطلب وتفاصيل التوصيل'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {confirmedOrder ? (
          /* Order Confirmation View */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs text-[#97A0B3] font-mono">رقم الطلب المرجعي</span>
              <h3 className="text-2xl font-black text-[#FF4753] font-mono tracking-wider">
                {confirmedOrder.id}
              </h3>
              <p className="text-sm font-semibold text-emerald-400 mt-1">
                تم استلام طلبك وجارٍ تجهيزه في متجر الثريا بلاس بذمار!
              </p>
            </div>

            <div className="bg-[#0C1320] border border-[#202B40] rounded-xl p-4 text-xs text-right space-y-2">
              <div className="flex justify-between border-b border-[#202B40] pb-2">
                <span className="text-[#97A0B3]">اسم العميل:</span>
                <span className="font-bold text-white">{confirmedOrder.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-[#202B40] pb-2">
                <span className="text-[#97A0B3]">رقم الهاتف:</span>
                <span className="font-bold text-white font-mono" dir="ltr">{confirmedOrder.phone}</span>
              </div>
              <div className="flex justify-between border-b border-[#202B40] pb-2">
                <span className="text-[#97A0B3]">عنوان الشحن:</span>
                <span className="font-bold text-white">
                  محافظة {confirmedOrder.city}، {confirmedOrder.address}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#202B40] pb-2">
                <span className="text-[#97A0B3]">طريقة الدفع:</span>
                <span className="font-bold text-emerald-400">
                  {confirmedOrder.paymentMethod === 'cod'
                    ? 'الدفع عند الاستلام'
                    : confirmedOrder.paymentMethod === 'card'
                    ? 'تحويل بنكي / صرافة'
                    : 'محفظة إلكترونية'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-1">
                <span>المبلغ الإجمالي:</span>
                <span className="text-[#FF4753] tabular-nums font-mono">
                  {formatPrice(confirmedOrder.total, currency)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => handleWhatsAppInvoice(confirmedOrder)}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>إرسال الفاتورة عبر واتساب للمتجر</span>
              </button>
              <button
                onClick={onClose}
                className="py-3 px-6 bg-[#0C1320] hover:bg-[#131B2C] text-slate-300 font-bold text-xs rounded-xl border border-[#202B40] cursor-pointer"
              >
                متابعة التسوق
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Customer Information */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF4753]">
                1. بيانات المستلم والشحن
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    الاسم الكامل <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اسم المستلم"
                    className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#E5252C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    رقم الجوال <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+967 77x xxx xxx"
                    className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#E5252C] text-right font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    المحافظة <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-lg px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="ذمار">ذمار (استلام فوري من المحل / توصيل)</option>
                    <option value="صنعاء">صنعاء (توصيل سريع)</option>
                    <option value="إب">إب</option>
                    <option value="تعز">تعز</option>
                    <option value="الحديدة">الحديدة</option>
                    <option value="عدن">عدن</option>
                    <option value="حضرموت">حضرموت</option>
                    <option value="محافظة أخرى">محافظة أخرى</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    العنوان التفصيلي / الحي والشارع <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="مثال: ذمار - خط الحسينية - جوار مستشفى الهلال"
                    className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#E5252C]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-3 border-t border-[#202B40]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF4753]">
                2. طريقة الدفع
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'cod'
                      ? 'border-[#E5252C] bg-[#E5252C]/15 ring-1 ring-[#E5252C]'
                      : 'border-[#202B40] hover:border-slate-600 bg-[#0C1320]'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-emerald-400 mb-2" />
                  <div>
                    <div className="text-xs font-bold text-white">الدفع عند الاستلام (COD)</div>
                    <div className="text-[10px] text-[#97A0B3] mt-0.5">ادفع نقداً عند استلام وفحص الجهاز</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'card'
                      ? 'border-[#E5252C] bg-[#E5252C]/15 ring-1 ring-[#E5252C]'
                      : 'border-[#202B40] hover:border-slate-600 bg-[#0C1320]'
                  }`}
                >
                  <Landmark className="w-4 h-4 text-[#FF4753] mb-2" />
                  <div>
                    <div className="text-xs font-bold text-white">حوالة الكريمي / النجم / فلوسك</div>
                    <div className="text-[10px] text-[#97A0B3] mt-0.5">إيداع أو تحويل عبر الصرافة أو المحفظة</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Summary & Submit */}
            <div className="pt-3 border-t border-[#202B40] bg-[#0C1320] -mx-6 -mb-6 p-6 space-y-3">
              <div className="flex justify-between items-center text-sm font-black text-white">
                <span>المبلغ الإجمالي:</span>
                <span className="text-xl text-[#FF4753] tabular-nums font-mono">
                  {formatPrice(total, currency)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-[#F0323A] via-[#E5252C] to-[#B5121B] hover:brightness-110 text-white font-bold text-sm rounded-xl shadow-[0_4px_14px_rgba(229,37,44,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>جارٍ تسجيل الطلب...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>تأكيد الطلب وشحن الأجهزة الآن</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
