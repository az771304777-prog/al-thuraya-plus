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
      className="bg-[#101725] hover:bg-[#131B2C] rounded-2xl border border-[#202B40] hover:border-[#E5252C]/70 hover:shadow-[0_8px_30px_rgba(229,37,44,0.2)] transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer group relative text-right"
    >
      {/* Top Media Area */}
      <div className="relative p-3 pb-0">
        {/* Discount Badge if available */}
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="absolute top-5 right-5 z-20 px-2.5 py-1 rounded-md text-[11px] font-black bg-gradient-to-r from-[#F0323A] to-[#B5121B] text-white shadow-md">
            خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}

        {/* Compare Quick Toggle with Glass Effect */}
        <button
          onClick={handleCompareClick}
          aria-label={isCompared ? 'إلغاء المقارنة' : 'أضف للمقارنة'}
          className={`absolute top-5 left-5 z-20 p-2 rounded-xl backdrop-blur-md border text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] ${
            isCompared
              ? 'bg-[#E5252C]/90 text-white border-[#FF4753] shadow-[0_0_15px_rgba(229,37,44,0.4)]'
              : 'bg-white/[0.08] text-slate-200 border-white/20 hover:text-white hover:bg-white/[0.15] hover:border-white/40'
          }`}
          title="مقارنة الجهاز"
        >
          <Scale className="w-3.5 h-3.5 text-[#FF4753] drop-shadow-[0_0_6px_rgba(255,71,83,0.5)]" />
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
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        {/* Category & Rating */}
        <div>
          <div className="flex items-center justify-between text-xs text-[#97A0B3] mb-1">
            <span className="font-semibold text-[#FF4753]">
              {categoryNames[product.category] || product.brand}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/[0.05] backdrop-blur-sm border border-white/10 text-amber-400 font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]" />
              <span className="tabular-nums font-mono font-bold text-slate-200">{product.rating}</span>
            </span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#FF4753] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Key Spec Line */}
          <p className="text-xs text-[#97A0B3] mt-1 line-clamp-1">
            {product.specs['المعالج'] || product.specs['القدرة'] || product.features[0]}
          </p>
        </div>

        {/* Color Swatches */}
        {product.colors.length > 1 && (
          <div
            className="flex items-center gap-1.5 pt-1"
            onClick={(e) => e.stopPropagation()}
          >
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                title={c.name}
                aria-label={c.name}
                className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                  selectedColor.name === c.name
                    ? 'ring-2 ring-[#E5252C] scale-125 border-white'
                    : 'border-[#202B40] hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <span className="text-[10px] text-slate-400 mr-1 truncate">
              {selectedColor?.name}
            </span>
          </div>
        )}

        {/* Price & Add to Cart Button with Glassmorphism */}
        <div className="pt-3 border-t border-[#202B40] flex items-center justify-between gap-2">
          {/* Glass Price Container */}
          <div className="relative px-3 py-1.5 rounded-xl bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent backdrop-blur-md border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:border-[#FF4753]/40 transition-colors">
            <div className="text-sm sm:text-base font-black text-[#FF4753] tabular-nums font-mono drop-shadow-[0_2px_8px_rgba(255,71,83,0.3)]">
              {formatPrice(product.price, currency)}
            </div>
            {product.originalPrice && (
              <div className="text-[10px] text-slate-400 line-through tabular-nums font-mono">
                {formatPrice(product.originalPrice, currency)}
              </div>
            )}
          </div>

          {/* Glass Accent Add to Cart Button */}
          <button
            onClick={handleQuickAdd}
            className={`px-3.5 py-2.5 text-xs font-bold rounded-xl flex items-center gap-1.5 backdrop-blur-md border border-white/20 transition-all duration-150 cursor-pointer active:scale-95 shadow-[0_4px_14px_rgba(229,37,44,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-[#F0323A] to-[#B5121B] hover:brightness-110 text-white hover:shadow-[0_4px_20px_rgba(229,37,44,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>تمت الإضافة</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
                <span>أضف للسلة</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
