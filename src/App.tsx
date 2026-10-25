import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_PRODUCTS } from './data/products';
import { Product, ProductCategory, Currency, CartItem, ProductColor, ProductVariant, Order } from './types/store';
import { TopBar } from './components/TopBar';
import { HeroBanner } from './components/HeroBanner';
import { CategoriesAndServices } from './components/CategoriesAndServices';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { MaintenanceEstimator } from './components/MaintenanceEstimator';
import { StoreFooter } from './components/StoreFooter';
import { AdminDashboard } from './components/AdminDashboard';
import { Scale, Percent } from 'lucide-react';

export default function App() {
  // Products state loaded from localStorage or INITIAL_PRODUCTS
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('thuraya_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  const handleSaveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem('thuraya_products', JSON.stringify(newProducts));
    } catch (e) {
      console.error('Failed to persist products to localStorage', e);
    }
  };

  const handleResetDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    try {
      localStorage.setItem('thuraya_products', JSON.stringify(INITIAL_PRODUCTS));
    } catch (e) {
      console.error('Failed to reset products in localStorage', e);
    }
  };

  // Admin routing state
  const checkIsAdmin = () => {
    if (typeof window === 'undefined') return false;
    return (
      window.location.pathname.startsWith('/admin') ||
      window.location.hash === '#admin' ||
      window.location.search.includes('admin=true')
    );
  };

  const [isAdminView, setIsAdminView] = useState<boolean>(checkIsAdmin);

  useEffect(() => {
    const handleUrlChange = () => {
      setIsAdminView(checkIsAdmin());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    // Hidden keyboard shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'ش')) {
        e.preventDefault();
        setIsAdminView((prev) => {
          const next = !prev;
          if (next) {
            window.history.pushState(null, '', '#admin');
          } else {
            window.history.pushState(null, '', window.location.pathname.replace(/\/admin\/?$/, '') || '/');
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Sync theme customizer settings from localStorage to CSS variables
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('thuraya_theme_settings');
      if (savedTheme) {
        const parsed = JSON.parse(savedTheme);
        if (parsed.primaryColor) {
          document.documentElement.style.setProperty('--accent', parsed.primaryColor);
          document.documentElement.style.setProperty('--accent-2', parsed.primaryColor);
        }
      }
    } catch (e) {
      console.error('Error applying theme variables', e);
    }
  }, [isAdminView]);

  const handleOpenAdmin = () => {
    setIsAdminView(true);
    window.history.pushState(null, '', '#admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitAdmin = () => {
    setIsAdminView(false);
    if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname || '/');
    } else if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currency, setCurrency] = useState<Currency>('YER');

  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('thuraya_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('thuraya_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isRepairModalOpen, setIsRepairModalOpen] = useState(false);
  const [repairModalMode, setRepairModalMode] = useState<'repair' | 'flashing' | 'gtag' | 'tradein'>('repair');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Comparison list
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);

  // Checkout discounts
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoCode, setPromoCode] = useState('');

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand)));
    return list;
  }, [products]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.nameEn.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          Object.values(p.specs).some((spec) => spec.toLowerCase().includes(query))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, selectedBrand, searchQuery, sortBy]);

  // Discounted offers list
  const discountedOffers = useMemo(() => {
    return products.filter((p) => p.originalPrice && p.originalPrice > p.price);
  }, [products]);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    color?: ProductColor,
    variant?: ProductVariant,
    quantity: number = 1
  ) => {
    const chosenColor = color || product.colors[0];
    const chosenVariant = variant || product.variants[0];
    const unitPrice = product.price + (chosenVariant?.priceDelta || 0);
    const cartItemId = `${product.id}-${chosenColor.name}-${chosenVariant?.label || 'default'}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedColor: chosenColor,
          selectedVariant: chosenVariant,
          quantity,
          unitPrice,
        },
      ];
    });
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Compare operations
  const handleToggleCompare = (product: Product) => {
    setComparedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert('يمكنك مقارنة 3 أجهزة كحد أقصى');
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveCompareProduct = (id: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleProceedToCheckout = (discount: number, promo: string) => {
    setDiscountAmount(discount);
    setPromoCode(promo);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: Order) => {
    setCartItems([]);
    try {
      const existing = JSON.parse(localStorage.getItem('thuraya_orders') || '[]');
      const updated = [order, ...existing];
      localStorage.setItem('thuraya_orders', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save order to thuraya_orders', e);
    }
  };

  const openServiceModal = (mode: 'repair' | 'flashing' | 'gtag' | 'tradein' = 'repair') => {
    setRepairModalMode(mode);
    setIsRepairModalOpen(true);
  };

  // Featured spotlights for hero
  const featuredPhone = products.find((p) => p.id === 'phone-iphone-16-pro-max') || products[0];
  const featuredLaptop = products.find((p) => p.id === 'laptop-macbook-pro-16-m4') || products[4];

  // If in Admin Dashboard mode
  if (isAdminView) {
    return (
      <AdminDashboard
        products={products}
        onSaveProducts={handleSaveProducts}
        onResetDefaultProducts={handleResetDefaultProducts}
        onExitAdmin={handleExitAdmin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E17] text-[#EDEFF4] flex flex-col text-right font-sans antialiased selection:bg-[#E5252C] selection:text-white">
      {/* 1. Header with Red Topbar, Brand, and Navigation */}
      <TopBar
        activeTab={selectedCategory}
        onTabChange={(cat) => setSelectedCategory(cat)}
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        compareCount={comparedProducts.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        currentCurrency={currency}
        onCurrencyChange={(c) => setCurrency(c)}
        onOpenRepairModal={() => openServiceModal('repair')}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* 2. Hero Section and Features Strip */}
      <HeroBanner
        featuredPhone={featuredPhone}
        featuredLaptop={featuredLaptop}
        onExploreCategory={(cat) => setSelectedCategory(cat as ProductCategory)}
        onSelectProduct={(prod) => setSelectedProductForDetail(prod)}
        onOpenRepair={() => openServiceModal('repair')}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-12">
        {/* 3. Section: Categories & In-Store Services (matching the reference site) */}
        <CategoriesAndServices
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenRepair={(mode) => openServiceModal(mode || 'repair')}
        />

        {/* 4. Section: Products Catalog Header & Filter Bar */}
        <div id="products-section" className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-[#202B40] pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#E5252C] rounded-full inline-block"></span>
              <span>أحدث المنتجات المتوفرة في المتجر</span>
            </h2>
            <span className="text-xs text-[#97A0B3] font-mono">
              {filteredProducts.length} جهاز وإكسسوار
            </span>
          </div>

          <FilterBar
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            selectedBrand={selectedBrand}
            onSelectBrand={(b) => setSelectedBrand(b)}
            searchQuery={searchQuery}
            onSearchChange={(q) => setSearchQuery(q)}
            sortBy={sortBy}
            onSortChange={(s) => setSortBy(s)}
            brands={brands}
            totalResults={filteredProducts.length}
          />

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-[#101725] rounded-2xl border border-[#202B40] p-12 text-center space-y-3">
              <p className="text-base font-bold text-white">لم يتم العثور على منتجات مطابقة</p>
              <p className="text-xs text-[#97A0B3]">
                جرب تغيير خيارات البحث أو اختر تصنيفاً آخر.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setSearchQuery('');
                }}
                className="mt-3 px-5 py-2.5 bg-[#E5252C] hover:bg-[#F0323A] text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                عرض كافة المنتجات
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  onAddToCart={(prod, col) => handleAddToCart(prod, col)}
                  onSelectProduct={(prod) => setSelectedProductForDetail(prod)}
                  isCompared={comparedProducts.some((p) => p.id === product.id)}
                  onToggleCompare={handleToggleCompare}
                />
              ))}
            </div>
          )}
        </div>

        {/* 5. Section: العروض والتخفيضات (Offers & Discounts) */}
        {discountedOffers.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-[#202B40]">
            <div className="flex items-center justify-between border-b border-[#202B40] pb-3">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Percent className="w-5 h-5 text-[#FF4753]" />
                <span className="text-[#FF4753]">العروض والتخفيضات الحصرية</span>
              </h2>
              <span className="text-xs text-[#97A0B3]">أسعار مخفضة لفترة محدودة</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {discountedOffers.map((product) => (
                <ProductCard
                  key={`offer-${product.id}`}
                  product={product}
                  currency={currency}
                  onAddToCart={(prod, col) => handleAddToCart(prod, col)}
                  onSelectProduct={(prod) => setSelectedProductForDetail(prod)}
                  isCompared={comparedProducts.some((p) => p.id === product.id)}
                  onToggleCompare={handleToggleCompare}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* 6. Footer (with exact contact, address in Dhamar, and credits) */}
      <StoreFooter
        onCategoryClick={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('products-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenRepairModal={() => openServiceModal('repair')}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Sticky Bottom Comparison Floating Bar */}
      {comparedProducts.length > 0 && (
        <div className="fixed bottom-6 left-6 z-40 bg-[#101725] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#E5252C] flex items-center gap-3">
          <Scale className="w-5 h-5 text-[#FF4753]" />
          <div className="text-xs">
            <span className="font-bold">مقارنة الأجهزة: </span>
            <span className="text-slate-300 font-mono tabular-nums">
              ({comparedProducts.length} أجهزة)
            </span>
          </div>
          <button
            onClick={() => setIsCompareOpen(true)}
            className="px-3.5 py-1.5 bg-gradient-to-r from-[#F0323A] to-[#B5121B] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-md"
          >
            فتح المقارنة
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        currency={currency}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={(prod, col, vari, qty) => handleAddToCart(prod, col, vari, qty)}
        isCompared={
          selectedProductForDetail
            ? comparedProducts.some((p) => p.id === selectedProductForDetail.id)
            : false
        }
        onToggleCompare={handleToggleCompare}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        currency={currency}
        discountAmount={discountAmount}
        promoCode={promoCode}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Comparison Modal */}
      <ComparisonDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedProducts={comparedProducts}
        onRemoveProduct={handleRemoveCompareProduct}
        onClearAll={() => setComparedProducts([])}
        onAddToCart={(prod) => handleAddToCart(prod)}
        currency={currency}
      />

      {/* Maintenance & Services Modal */}
      <MaintenanceEstimator
        isOpen={isRepairModalOpen}
        onClose={() => setIsRepairModalOpen(false)}
        currency={currency}
        initialMode={repairModalMode}
      />
    </div>
  );
}
