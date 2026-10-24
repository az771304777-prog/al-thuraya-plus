import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, RotateCcw, ShoppingBag, Check, MessageCircle, Scale } from 'lucide-react';
import { Product, Currency, ProductColor, ProductVariant } from '../types/store';
import { ProductVisual } from './ProductVisual';
import { formatPrice } from '../utils/currency';

interface ProductDetailModalProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, variant: ProductVariant, quantity: number) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  isCompared,
  onToggleCompare,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'warranty'>('specs');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const finalUnitPrice = product.price + (selectedVariant?.priceDelta || 0);
  const totalCalculatedPrice = finalUnitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedVariant, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `السلام عليكم، أود طلب الجهاز التالي من متجر الثريا بلاس:\n` +
      `الجهاز: ${product.name} (${product.nameEn})\n` +
      `اللون: ${selectedColor.name}\n` +
      `المواصفات: ${selectedVariant.label}\n` +
      `الكمية: ${quantity}\n` +
      `السعر الإجمالي: ${formatPrice(totalCalculatedPrice, 'YER')}\n` +
      `العنوان: ذمار / محافظة: ...\n` +
      `يرجى تأكيد التوافر وطريقة الشحن والتوصيل.`
    );
    window.open(`https://wa.me/967771304777?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-start sm:items-center justify-center p-3 pt-5 sm:p-4 md:p-6 animate-in fade-in duration-200 text-right">
      <div
        className="relative bg-[#101725] text-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#202B40] overflow-hidden max-h-[85vh] sm:max-h-[90vh] flex flex-col my-auto sm:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#202B40] bg-[#0C1320] shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#97A0B3]">
            <span>{product.brand}</span>
            <span>·</span>
            <span className="text-[#FF4753] font-bold">{product.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(product)}
              className={`p-2 rounded-lg border text-xs cursor-pointer flex items-center gap-1.5 transition-colors ${
                isCompared
                  ? 'bg-[#E5252C] text-white border-[#E5252C]'
                  : 'bg-[#101725] text-slate-300 border-[#202B40] hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? 'تمت الإضافة للمقارنة' : 'أضف للمقارنة'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Gallery / Visual Column (5 cols) */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="rounded-2xl overflow-hidden border border-[#202B40] bg-[#0A0E17]">
              <ProductVisual
                product={product}
                selectedColorHex={selectedColor.hex}
                size="lg"
                className="border-0 bg-transparent"
              />
            </div>

            {/* Color Swatches Selection */}
            <div>
              <div className="text-xs font-semibold text-slate-300 mb-2">
                اختر اللون:{' '}
                <span className="text-[#FF4753] font-bold">{selectedColor.name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-2 transition-all cursor-pointer ${
                      selectedColor.name === c.name
                        ? 'border-[#E5252C] bg-[#E5252C]/20 ring-1 ring-[#E5252C] font-semibold text-white'
                        : 'border-[#202B40] bg-[#0C1320] hover:bg-[#101725] text-slate-300'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Guarantees with Glass Effect */}
            <div className="p-3.5 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-md rounded-2xl border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#E5252C]/20 border border-white/15 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#FF4753] drop-shadow-[0_0_6px_rgba(255,71,83,0.5)]" />
                </div>
                <span>{product.warranty}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-white/15 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                </div>
                <span>توصيل لجميع المحافظات والدفع عند الاستلام</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-white/15 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-4 h-4 text-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.5)]" />
                </div>
                <span>فحص وبرمجة مجانية وتأكيد سلامة الجهاز</span>
              </div>
            </div>
          </div>

          {/* Contiguous Purchase Module (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs mb-1">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.06] backdrop-blur-md border border-white/15 text-amber-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]" />
                  <span className="font-bold tabular-nums font-mono text-white">{product.rating}</span>
                </div>
                <span className="text-slate-400">({product.reviewsCount} تقييم حقيقي)</span>
                <span className="mr-auto px-2.5 py-0.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px] backdrop-blur-sm">
                  متوفر في المخزون بذمار
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {product.name}
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{product.nameEn}</p>

              {/* Glass Price Calculation Box */}
              <div className="mt-4 p-5 bg-gradient-to-br from-white/[0.1] via-white/[0.03] to-transparent backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.25)] flex items-baseline justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#FF4753] tabular-nums font-mono drop-shadow-[0_2px_10px_rgba(255,71,83,0.4)]">
                    {formatPrice(finalUnitPrice, currency)}
                  </div>
                  {product.originalPrice && (
                    <div className="text-xs text-slate-400 line-through tabular-nums font-mono">
                      {formatPrice(product.originalPrice + (selectedVariant?.priceDelta || 0), currency)}
                    </div>
                  )}
                </div>
                <div className="text-left text-xs text-slate-300">
                  السعر شامل الفحص والضمان
                  <p className="text-emerald-400 font-medium mt-0.5 flex items-center gap-1 justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    الدفع عند الاستلام متاح
                  </p>
                </div>
              </div>

              {/* Variant Selector */}
              {product.variants.length > 0 && (
                <div className="mt-5 space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    اختر السعة / المواصفة:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.label}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                          selectedVariant.label === v.label
                            ? 'border-[#E5252C] bg-[#E5252C]/15 ring-1 ring-[#E5252C]'
                            : 'border-[#202B40] hover:border-slate-600 bg-[#0C1320]'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">{v.label}</div>
                        {v.priceDelta > 0 ? (
                          <div className="text-[11px] text-[#FF4753] font-semibold mt-0.5 tabular-nums">
                            +{formatPrice(v.priceDelta, currency)}
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-400 mt-0.5">السعر الأساسي</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-bold text-slate-300">الكمية:</span>
                <div className="flex items-center border border-[#202B40] rounded-lg bg-[#0C1320] overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-1.5 text-slate-300 hover:bg-[#101725] disabled:opacity-30 cursor-pointer font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-white tabular-nums min-w-[2.5rem] text-center font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="px-3 py-1.5 text-slate-300 hover:bg-[#101725] disabled:opacity-30 cursor-pointer font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add To Cart & WhatsApp */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 shadow-md ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-[#F0323A] to-[#B5121B] hover:brightness-110 text-white shadow-[0_4px_14px_rgba(229,37,44,0.35)]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>تمت الإضافة للسلة بنجاح!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>أضف إلى السلة ({formatPrice(totalCalculatedPrice, currency)})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="py-3.5 px-5 bg-[#0C1320] hover:bg-[#131B2C] text-emerald-400 border border-emerald-500/40 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                  title="طلب مباشر وسريع عبر واتساب متجر الثريا بلاس"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>طلب مباشر عبر واتساب</span>
                </button>
              </div>
            </div>

            {/* Tabs for Technical Specs */}
            <div className="pt-4 border-t border-[#202B40]">
              <div className="flex border-b border-[#202B40] gap-4 text-xs font-bold text-slate-400 mb-3">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'specs'
                      ? 'border-[#E5252C] text-[#FF4753]'
                      : 'border-transparent hover:text-white'
                  }`}
                >
                  المواصفات الفنية
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`pb-2 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'features'
                      ? 'border-[#E5252C] text-[#FF4753]'
                      : 'border-transparent hover:text-white'
                  }`}
                >
                  المميزات والضمان
                </button>
              </div>

              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-2.5 bg-[#0C1320] rounded-lg border border-[#202B40] flex flex-col"
                    >
                      <span className="text-[#97A0B3] text-[10px]">{key}</span>
                      <span className="text-white font-semibold mt-0.5">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'features' && (
                <ul className="space-y-2 text-xs text-slate-300">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#FF4753] font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
