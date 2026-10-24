import React from 'react';
import { X, Scale, Trash2, ShoppingBag } from 'lucide-react';
import { Product, Currency } from '../types/store';
import { ProductVisual } from './ProductVisual';
import { formatPrice } from '../utils/currency';

interface ComparisonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
  onAddToCart: (product: Product) => void;
  currency: Currency;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  onRemoveProduct,
  onClearAll,
  onAddToCart,
  currency,
}) => {
  if (!isOpen) return null;

  const allSpecKeys = Array.from(
    new Set(comparedProducts.flatMap((p) => Object.keys(p.specs)))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 text-right">
      <div
        className="relative bg-[#101725] text-white w-full max-w-5xl rounded-2xl shadow-2xl border border-[#202B40] overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#202B40] bg-[#0C1320]">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#FF4753]" />
            <h2 className="text-base font-bold text-white">
              مقارنة المواصفات والأسعار المباشرة ({comparedProducts.length} أجهزة)
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {comparedProducts.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-red-400 hover:text-red-300 font-semibold cursor-pointer"
              >
                مسح الكل
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {comparedProducts.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <Scale className="w-12 h-12 stroke-1 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-200">لا توجد أجهزة مضافة للمقارنة</p>
            <p className="text-xs text-[#97A0B3]">
              اضغط على زر "مقارنة" الموجود في بطاقة أي هاتف أو لابتوب لعرض المواصفات وجهاً لوجه.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto p-6">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-[#202B40]">
                  <th className="p-3 text-xs font-bold text-[#97A0B3] w-36">الجهاز</th>
                  {comparedProducts.map((prod) => (
                    <th key={prod.id} className="p-3 min-w-[220px]">
                      <div className="relative bg-[#0C1320] border border-[#202B40] rounded-xl p-3 flex flex-col justify-between">
                        <button
                          onClick={() => onRemoveProduct(prod.id)}
                          className="absolute top-2 left-2 text-slate-400 hover:text-red-400 cursor-pointer p-1"
                          title="حذف من المقارنة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="h-32 mb-2 flex items-center justify-center">
                          <ProductVisual product={prod} size="sm" className="h-28 border-0 bg-transparent" />
                        </div>

                        <div className="text-xs font-bold text-white line-clamp-1 mb-1">
                          {prod.name}
                        </div>

                        <div className="text-sm font-black text-[#FF4753] tabular-nums mb-2 font-mono">
                          {formatPrice(prod.price, currency)}
                        </div>

                        <button
                          onClick={() => onAddToCart(prod)}
                          className="w-full py-1.5 px-2 bg-gradient-to-r from-[#F0323A] to-[#B5121B] hover:brightness-110 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>أضف للسلة</span>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#202B40] text-xs">
                <tr className="hover:bg-[#0C1320]/60">
                  <td className="p-3 font-bold text-[#97A0B3]">الشركة المصنعة</td>
                  {comparedProducts.map((prod) => (
                    <td key={prod.id} className="p-3 font-semibold text-white">
                      {prod.brand}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-[#0C1320]/60">
                  <td className="p-3 font-bold text-[#97A0B3]">التقييم</td>
                  {comparedProducts.map((prod) => (
                    <td key={prod.id} className="p-3 font-semibold text-amber-400 tabular-nums">
                      ⭐ {prod.rating} / 5.0
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-[#0C1320]/60">
                  <td className="p-3 font-bold text-[#97A0B3]">الضمان المعتمد</td>
                  {comparedProducts.map((prod) => (
                    <td key={prod.id} className="p-3 text-emerald-400 font-semibold">
                      {prod.warranty}
                    </td>
                  ))}
                </tr>

                {allSpecKeys.map((specKey) => (
                  <tr key={specKey} className="hover:bg-[#0C1320]/60">
                    <td className="p-3 font-bold text-[#97A0B3]">{specKey}</td>
                    {comparedProducts.map((prod) => (
                      <td key={prod.id} className="p-3 text-slate-300 font-medium">
                        {prod.specs[specKey] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
