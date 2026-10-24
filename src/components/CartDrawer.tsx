import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowLeft, Tag, Truck, Check } from 'lucide-react';
import { CartItem, Currency } from '../types/store';
import { ProductVisual } from './ProductVisual';
import { formatPrice } from '../utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (discountAmount: number, promoApplied: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const discountAmount = Math.round(rawSubtotal * (discountPercent / 100));
  const freeShippingThreshold = 80000; // 80,000 YER
  const deliveryFee = rawSubtotal >= freeShippingThreshold || discountPercent === 100 ? 0 : 3000;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'THURAYA10' || clean === 'PLUS10' || clean === 'TECHNO10') {
      setDiscountPercent(10);
      setPromoMessage({ text: 'تم تطبيق كود خصم الثريا بلاس 10% بنجاح!', isError: false });
    } else {
      setDiscountPercent(0);
      setPromoMessage({ text: 'كود الخصم غير صالح أو منتهي الصلاحية', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-start animate-in fade-in duration-200 text-right">
      <div
        className="relative w-full max-w-md bg-[#101725] text-white h-full shadow-2xl flex flex-col justify-between border-l border-[#202B40]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#202B40] flex items-center justify-between bg-[#0C1320]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FF4753]" />
            <h2 className="text-base font-bold text-white">سلة التسوق</h2>
            <span className="text-xs text-[#97A0B3] font-mono tabular-nums">
              ({cartItems.reduce((acc, it) => acc + it.quantity, 0)} منتجات)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="px-5 py-3 bg-[#E5252C]/10 border-b border-[#E5252C]/20 text-xs">
          {rawSubtotal >= freeShippingThreshold ? (
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>مبروك! طلبيتك مؤهلة للتوصيل والشحن المجاني.</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between text-slate-300 mb-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#FF4753]" />
                  أضف بقيمة{' '}
                  <strong className="text-[#FF4753] tabular-nums font-mono">
                    {formatPrice(freeShippingThreshold - rawSubtotal, currency)}
                  </strong>{' '}
                  لشحن مجاني!
                </span>
                <span className="tabular-nums font-bold text-slate-300 font-mono">
                  {Math.round((rawSubtotal / freeShippingThreshold) * 100)}%
                </span>
              </div>
              <div className="w-full bg-[#0C1320] h-1.5 rounded-full overflow-hidden border border-[#202B40]">
                <div
                  className="bg-gradient-to-r from-[#F0323A] to-[#B5121B] h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
              <ShoppingBag className="w-16 h-16 stroke-1 text-slate-600" />
              <p className="text-sm font-semibold text-slate-200">سلة التسوق فارغة</p>
              <p className="text-xs text-[#97A0B3] max-w-xs">
                تصفح أحدث الهواتف الذكية واللابتوبات والإكسسوارات الأصلية وأضفها لسلتك الآن.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-[#E5252C] text-white text-xs font-bold rounded-xl hover:bg-[#F0323A] transition-colors cursor-pointer"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-[#0C1320] rounded-xl border border-[#202B40] flex items-center gap-3 relative"
              >
                {/* Visual Thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-[#0A0E17] border border-[#202B40] flex items-center justify-center shrink-0 overflow-hidden">
                  <ProductVisual
                    product={item.product}
                    selectedColorHex={item.selectedColor.hex}
                    size="sm"
                    className="h-full border-0 p-1"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-xs font-bold text-white truncate">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-red-400 transition-colors p-1 cursor-pointer"
                      title="حذف من السلة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#97A0B3] mt-0.5">
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20 inline-block"
                        style={{ backgroundColor: item.selectedColor.hex }}
                      />
                      {item.selectedColor.name}
                    </span>
                    <span>·</span>
                    <span>{item.selectedVariant.label}</span>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2 pt-1">
                    <div className="flex items-center border border-[#202B40] rounded-md bg-[#101725]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-slate-300 hover:bg-[#202B40] cursor-pointer font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-bold text-white tabular-nums font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-slate-300 hover:bg-[#202B40] cursor-pointer font-bold text-xs"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-xs font-bold text-[#FF4753] tabular-nums font-mono">
                      {formatPrice(item.unitPrice * item.quantity, currency)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Module */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#202B40] bg-[#0C1320] space-y-3">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="كود الخصم (جرب PLUS10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-[#101725] border border-[#202B40] focus:border-[#E5252C] rounded-lg pr-9 pl-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#E5252C] hover:bg-[#F0323A] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                تطبيق
              </button>
            </form>

            {promoMessage && (
              <div
                className={`text-xs font-semibold ${
                  promoMessage.isError ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {promoMessage.text}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-[#202B40]">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-semibold text-white tabular-nums font-mono">
                  {formatPrice(rawSubtotal, currency)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>خصم الكود ({discountPercent}%):</span>
                  <span className="tabular-nums font-mono">-{formatPrice(discountAmount, currency)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>رسوم التوصيل:</span>
                <span className="font-semibold tabular-nums font-mono">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400">توصيل مجاني</span>
                  ) : (
                    formatPrice(deliveryFee, currency)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-[#202B40]">
                <span>المجموع الكلي:</span>
                <span className="tabular-nums text-[#FF4753] font-mono">
                  {formatPrice(finalTotal, currency)}
                </span>
              </div>
            </div>

            {/* Checkout Trigger */}
            <button
              onClick={() => onProceedToCheckout(discountAmount, promoCode)}
              className="w-full py-3 bg-gradient-to-r from-[#F0323A] via-[#E5252C] to-[#B5121B] hover:brightness-110 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(229,37,44,0.35)] active:scale-95 cursor-pointer"
            >
              <span>متابعة إتمام الطلب والدفع</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
