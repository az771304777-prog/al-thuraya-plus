import React, { useState } from 'react';
import { ShoppingBag, Star, Check, Scale } from 'lucide-react';
import { Product, Currency, ProductColor } from '../types/store';
import { ProductVisual } from './ProductVisual';
import { formatPrice } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onAddToCart: (product: Product, color: ProductColor) => void;
  onSelectProduct: (product: Product) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onAddToCart,
  onSelectProduct,
  isCompared,
  onToggleCompare,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleCompare(product);
  };

  const categoryNames: Record<string, string> = {
    phones: 'الهواتف الذكية',
    laptops: 'الحواسيب واللابتوبات',
    audio: 'السماعات والصوتيات',
    chargers: 'الشواحن والكابلات',
    powerbanks: 'البطاريات المتنقلة',
    cases: 'الأغطية والحماية',
  };

  return (
    <article
      onClick={() => onSelectProduct(product)}
      className="bg-[#101725] hover:bg-[#131B2C] rounded-xl sm:rounded-2xl border border-[#202B40] hover:border-[#E5252C]/70 hover:shadow-[0_8px_30px_rgba(229,37,44,0.2)] transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer group relative text-right"
    >
      {/* Top Media Area */}
      <div className="relative p-2 sm:p-3 pb-0">
        {/* Discount Badge if available */}
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded text-[9px] sm:text-[11px] font-black bg-gradient-to-r from-[#F0323A] to-[#B5121B] text-white shadow-md">
            خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}

        {/* Compare Quick Toggle with Glass Effect */}
        <button
          onClick={handleCompareClick}
          aria-label={isCompared ? 'إلغاء المقارنة' : 'أضف للمقارنة'}
          className={`absolute top-3 left-3 sm:top-5 sm:left-5 z-20 p-1.5 sm:p-2 rounded-lg sm:rounded-xl backdrop-blur-md border text-xs transition-all duration-200 cursor-pointer flex items-center gap-1 sm:gap-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] ${
            isCompared
              ? 'bg-[#E5252C]/90 text-white border-[#FF4753] shadow-[0_0_15px_rgba(229,37,44,0.4)]'
              : 'bg-white/[0.08] text-slate-200 border-white/20 hover:text-white hover:bg-white/[0.15] hover:border-white/40'
          }`}
          title="مقارنة الجهاز"
        >
          <Scale className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF4753] drop-shadow-[0_0_6px_rgba(255,71,83,0.5)]" />
          <span className="text-[10px] hidden sm:inline font-bold">{isCompared ? 'مقارن' : 'مقارنة'}</span>
        </button>

        {/* Visual Render with dynamic color */}
        <ProductVisual
          product={product}
          selectedColorHex={selectedColor?.hex}
          size="md"
          className="border-[#202B40] bg-[#0A0E17]"
        />
      </div>

      {/* Content & Details */}
      <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        {/* Category & Rating */}
        <div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#97A0B3] mb-1 gap-1">
            <span className="font-semibold text-[#FF4753] truncate">
              {categoryNames[product.category] || product.brand}
            </span>
            <span className="flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 rounded sm:rounded-lg bg-white/[0.05] backdrop-blur-sm border border-white/10 text-amber-400 font-medium shrink-0">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]" />
              <span className="tabular-nums font-mono font-bold text-slate-200 text-[10px] sm:text-xs">{product.rating}</span>
            </span>
          </div>

          {/* Product Title */}
          <h3 className="text-xs sm:text-base font-bold text-white group-hover:text-[#FF4753] transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Key Spec Line */}
          <p className="text-[10px] sm:text-xs text-[#97A0B3] mt-0.5 sm:mt-1 line-clamp-1">
            {product.specs['المعالج'] || product.specs['القدرة'] || product.features[0]}
          </p>
        </div>

        {/* Color Swatches */}
        {product.colors.length > 1 && (
          <div
            className="flex items-center gap-1 pt-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            {product.colors.slice(0, 4).map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                title={c.name}
                aria-label={c.name}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border transition-transform cursor-pointer shrink-0 ${
                  selectedColor.name === c.name
                    ? 'ring-1.5 sm:ring-2 ring-[#E5252C] scale-110 sm:scale-125 border-white'
                    : 'border-[#202B40] hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <span className="text-[9px] sm:text-[10px] text-slate-400 mr-1 truncate">
              {selectedColor?.name}
            </span>
          </div>
        )}

        {/* Price & Add to Cart Button with Glassmorphism */}
        <div className="pt-2 sm:pt-3 border-t border-[#202B40] flex items-center justify-between gap-1 sm:gap-2">
          {/* Glass Price Container */}
          <div className="min-w-0 flex-1 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent backdrop-blur-md border border-white/15 shadow-sm group-hover:border-[#FF4753]/40 transition-colors">
            <div className="text-[11px] sm:text-base font-black text-[#FF4753] tabular-nums font-mono truncate leading-tight">
              {formatPrice(product.price, currency)}
            </div>
            {product.originalPrice && (
              <div className="text-[8px] sm:text-[10px] text-slate-400 line-through tabular-nums font-mono truncate">
                {formatPrice(product.originalPrice, currency)}
              </div>
            )}
          </div>

          {/* Glass Accent Add to Cart Button */}
          <button
            onClick={handleQuickAdd}
            className={`px-2 sm:px-3.5 py-1.5 sm:py-2.5 text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl flex items-center justify-center gap-1 sm:gap-1.5 backdrop-blur-md border border-white/20 transition-all duration-150 cursor-pointer active:scale-95 shrink-0 shadow-[0_4px_14px_rgba(229,37,44,0.35)] ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-[#F0323A] to-[#B5121B] hover:brightness-110 text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden xs:inline sm:inline">تمت</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
                <span className="hidden sm:inline">أضف للسلة</span>
                <span className="inline sm:hidden">شراء</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
