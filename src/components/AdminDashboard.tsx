import React, { useState } from 'react';
import {
  Lock,
  Plus,
  Trash2,
  Edit3,
  Download,
  Upload,
  RotateCcw,
  Store,
  KeyRound,
  Eye,
  EyeOff,
  Package,
  Boxes,
  TrendingUp,
  AlertTriangle,
  Search,
  Check,
  X,
  ExternalLink,
} from 'lucide-react';
import { Product, ProductCategory } from '../types/store';
import { formatPrice } from '../utils/currency';

interface AdminDashboardProps {
  products: Product[];
  onSaveProducts: (products: Product[]) => void;
  onResetDefaultProducts: () => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onSaveProducts,
  onResetDefaultProducts,
  onExitAdmin,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('thuraya_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Password Management
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentPwdInput, setCurrentPwdInput] = useState('');
  const [newPwdInput, setNewPwdInput] = useState('');
  const [pwdChangeMessage, setPwdChangeMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Search & Filter in Admin
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Add / Edit Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formNameEn, setFormNameEn] = useState('');
  const [formBrand, setFormBrand] = useState('Apple');
  const [formCategory, setFormCategory] = useState<ProductCategory>('phones');
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(0);
  const [formStock, setFormStock] = useState<number>(10);
  const [formBadge, setFormBadge] = useState('');
  const [formWarranty, setFormWarranty] = useState('ضمان سنة كاملة مع فحص وبرمجة مجانية');
  const [formCustomImageUrl, setFormCustomImageUrl] = useState('');
  const [formVisualType, setFormVisualType] = useState<Product['visualType']>('iphone16');
  const [formSpecs, setFormSpecs] = useState<{ key: string; val: string }[]>([
    { key: 'المعالج', val: '' },
    { key: 'الشاشة', val: '' },
    { key: 'البطارية', val: '' },
    { key: 'الذاكرة', val: '' },
  ]);
  const [formFeaturesText, setFormFeaturesText] = useState('');

  // Feedback Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Get current stored password
  const getStoredPassword = (): string => {
    return localStorage.getItem('thuraya_admin_pwd') || 'admin123';
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = getStoredPassword();
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('thuraya_admin_auth', 'true');
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('كلمة المرور غير صحيحة، يرجى المحاولة مجدداً');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('thuraya_admin_auth');
  };

  // Change Password Handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const currentStored = getStoredPassword();
    if (currentPwdInput !== currentStored) {
      setPwdChangeMessage({ text: 'كلمة المرور الحالية غير صحيحة', isError: true });
      return;
    }
    if (newPwdInput.trim().length < 4) {
      setPwdChangeMessage({ text: 'كلمة المرور الجديدة يجب أن تكون 4 خانات على الأقل', isError: true });
      return;
    }

    localStorage.setItem('thuraya_admin_pwd', newPwdInput.trim());
    setPwdChangeMessage({ text: 'تم تغيير كلمة المرور بنجاح!', isError: false });
    setTimeout(() => {
      setIsChangePasswordOpen(false);
      setCurrentPwdInput('');
      setNewPwdInput('');
      setPwdChangeMessage(null);
    }, 1500);
  };

  // Open modal for new product
  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setFormName('');
    setFormNameEn('');
    setFormBrand('Apple');
    setFormCategory('phones');
    setFormPrice(50000);
    setFormOriginalPrice(0);
    setFormStock(10);
    setFormBadge('');
    setFormWarranty('ضمان سنة كاملة مع فحص مجاني');
    setFormCustomImageUrl('');
    setFormVisualType('iphone16');
    setFormSpecs([
      { key: 'المعالج', val: '' },
      { key: 'الشاشة', val: '' },
      { key: 'البطارية', val: '' },
    ]);
    setFormFeaturesText('');
    setIsProductModalOpen(true);
  };

  // Open modal for editing existing product
  const handleOpenEditModal = (prod: Product) => {
    setEditingProductId(prod.id);
    setFormName(prod.name);
    setFormNameEn(prod.nameEn);
    setFormBrand(prod.brand);
    setFormCategory(prod.category);
    setFormPrice(prod.price);
    setFormOriginalPrice(prod.originalPrice || 0);
    setFormStock(prod.stock);
    setFormBadge(prod.badge || '');
    setFormWarranty(prod.warranty);
    setFormCustomImageUrl(prod.customImageUrl || '');
    setFormVisualType(prod.visualType);
    setFormSpecs(
      Object.entries(prod.specs).map(([key, val]) => ({ key, val }))
    );
    setFormFeaturesText(prod.features.join('\n'));
    setIsProductModalOpen(true);
  };

  // Save product (Add or Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || formPrice <= 0) {
      alert('يرجى ملء اسم المنتج والسعر بالشكل الصحيح');
      return;
    }

    const specsObj: Record<string, string> = {};
    formSpecs.forEach((s) => {
      if (s.key.trim() && s.val.trim()) {
        specsObj[s.key.trim()] = s.val.trim();
      }
    });

    const featuresList = formFeaturesText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingProductId) {
      // Update
      const updated = products.map((p) => {
        if (p.id === editingProductId) {
          return {
            ...p,
            name: formName,
            nameEn: formNameEn || formName,
            brand: formBrand,
            category: formCategory as any,
            price: Number(formPrice),
            originalPrice: formOriginalPrice > 0 ? Number(formOriginalPrice) : undefined,
            stock: Number(formStock),
            badge: formBadge || undefined,
            warranty: formWarranty,
            customImageUrl: formCustomImageUrl || undefined,
            visualType: formVisualType,
            specs: specsObj,
            features: featuresList.length > 0 ? featuresList : p.features,
          };
        }
        return p;
      });
      onSaveProducts(updated);
      showToast('تم تعديل المنتج بنجاح!');
    } else {
      // Create New
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: formName,
        nameEn: formNameEn || formName,
        brand: formBrand,
        category: formCategory as any,
        badge: formBadge || undefined,
        price: Number(formPrice),
        originalPrice: formOriginalPrice > 0 ? Number(formOriginalPrice) : undefined,
        rating: 5.0,
        reviewsCount: 1,
        stock: Number(formStock),
        colors: [
          { name: 'أسود', hex: '#1C1B1A', bgClass: 'bg-[#1C1B1A]' },
          { name: 'فضي', hex: '#CCCCCC', bgClass: 'bg-[#CCCCCC]' },
        ],
        variants: [{ label: 'السعة القياسية', priceDelta: 0 }],
        specs: specsObj,
        features: featuresList.length > 0 ? featuresList : ['ضمان معتمد', 'أصلي 100%'],
        warranty: formWarranty,
        customImageUrl: formCustomImageUrl || undefined,
        visualType: formVisualType,
      };
      onSaveProducts([newProduct, ...products]);
      showToast('تمت إضافة المنتج الجديد إلى المتجر بنجاح!');
    }

    setIsProductModalOpen(false);
  };

  // Delete product
  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من حذف المنتج: "${name}" من المتجر نهائياً؟`)) {
      const updated = products.filter((p) => p.id !== id);
      onSaveProducts(updated);
      showToast(`تم حذف "${name}" بنجاح.`);
    }
  };

  // Export JSON backup
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `thuraya-plus-products-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('تم تصدير ملف النسخة الاحتياطية بنجاح!');
  };

  // Import JSON backup
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id && parsed[0].price) {
          onSaveProducts(parsed);
          showToast(`تم استيراد ${parsed.length} منتج بنجاح!`);
        } else {
          alert('الملف المحدد غير متوافق مع هيكل منتجات المتجر');
        }
      } catch (err) {
        alert('حدث خطأ أثناء قراءة ملف JSON');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Filtered list in Admin
  const filteredList = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate Stats
  const totalValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  // ------------------- Login Gate -------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0E17] text-white flex items-center justify-center p-4 text-right">
        {/* Ambient Red Glow */}
        <div className="absolute top-1/3 w-96 h-96 bg-[#E5252C]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative bg-[#101725] border border-[#202B40] rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F0323A] to-[#B5121B] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#E5252C]/30">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black">لوحة تحكم الإدارة</h1>
            <p className="text-xs text-[#97A0B3]">
              متجر الثريا بلاس — أدخل كلمة مرور المسؤول للمتابعة
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                كلمة المرور السرية:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="أدخل كلمة المرور (الافتراضية: admin123)"
                  className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-xl px-4 py-3 text-sm text-white focus:outline-none pr-4 pl-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-300 font-semibold">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#F0323A] via-[#E5252C] to-[#B5121B] hover:brightness-110 text-white font-bold text-sm rounded-xl shadow-[0_4px_14px_rgba(229,37,44,0.35)] transition-all cursor-pointer"
            >
              تسجيل الدخول إلى لوحة التحكم
            </button>

            <button
              type="button"
              onClick={onExitAdmin}
              className="w-full py-2.5 bg-[#0C1320] hover:bg-[#131B2C] text-slate-400 hover:text-white font-semibold text-xs rounded-xl border border-[#202B40] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Store className="w-4 h-4" />
              <span>العودة للمتجر</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ------------------- Main Dashboard -------------------
  return (
    <div className="min-h-screen bg-[#0A0E17] text-white text-right p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="bg-[#101725] border border-[#202B40] rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F0323A] to-[#B5121B] text-white flex items-center justify-center font-black text-xl shadow-lg">
            ★
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>لوحة تحكم متجر الثريا بلاس</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                المسؤول
              </span>
            </h1>
            <p className="text-xs text-[#97A0B3] mt-0.5">
              إدارة المنتجات، الأسعار، المخزون، والنسخ الاحتياطي بالكامل
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-gradient-to-r from-[#F0323A] via-[#E5252C] to-[#B5121B] hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-[0_4px_14px_rgba(229,37,44,0.35)] flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة منتج جديد</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2.5 bg-[#0C1320] hover:bg-[#131B2C] border border-[#202B40] hover:border-[#E5252C] text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
            title="تصدير جميع المنتجات كملف JSON لحفظ نسخة احتياطية"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>تصدير (JSON)</span>
          </button>

          <label
            className="px-3.5 py-2.5 bg-[#0C1320] hover:bg-[#131B2C] border border-[#202B40] hover:border-[#E5252C] text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
            title="استيراد منتجات من ملف JSON"
          >
            <Upload className="w-4 h-4 text-blue-400" />
            <span>استيراد</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={() => setIsChangePasswordOpen(true)}
            className="p-2.5 bg-[#0C1320] hover:bg-[#131B2C] border border-[#202B40] text-slate-300 rounded-xl cursor-pointer"
            title="تغيير كلمة المرور"
          >
            <KeyRound className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={onExitAdmin}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Store className="w-4 h-4" />
            <span>العودة للمتجر</span>
          </button>
        </div>
      </header>

      {/* Stats KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#101725] border border-[#202B40] p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-[#97A0B3] font-semibold">إجمالي المنتجات</span>
            <div className="text-2xl font-black text-white font-mono tabular-nums mt-1">
              {products.length} منتج
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#101725] border border-[#202B40] p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-[#97A0B3] font-semibold">قيمة المخزون الإجمالية</span>
            <div className="text-xl font-black text-[#FF4753] font-mono tabular-nums mt-1">
              {formatPrice(totalValue, 'YER')}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#E5252C]/10 border border-[#E5252C]/20 text-[#FF4753] flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#101725] border border-[#202B40] p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-[#97A0B3] font-semibold">منتجات منخفضة المخزون</span>
            <div className="text-2xl font-black text-amber-400 font-mono tabular-nums mt-1">
              {lowStockCount} منتج
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-[#101725] border border-[#202B40] p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-[#97A0B3] font-semibold">حالة حفظ البيانات</span>
            <div className="text-sm font-bold text-emerald-400 mt-1">
              محفوظ تلقائياً في LocalStorage
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Boxes className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar in Admin */}
      <div className="bg-[#101725] border border-[#202B40] p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'phones', label: 'الهواتف' },
            { id: 'laptops', label: 'الحواسيب' },
            { id: 'audio', label: 'السماعات' },
            { id: 'chargers', label: 'الشواحن' },
            { id: 'powerbanks', label: 'البطاريات' },
            { id: 'cases', label: 'الأغطية' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#E5252C] text-white'
                  : 'bg-[#0C1320] text-[#97A0B3] hover:text-white border border-[#202B40]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن منتج بالاسم أو الماركة..."
            className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#101725] border border-[#202B40] rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-[#202B40] bg-[#0C1320] text-[#97A0B3] text-xs font-bold">
                <th className="p-4">المنتج</th>
                <th className="p-4">القسم</th>
                <th className="p-4">السعر الحالي (ر.ي)</th>
                <th className="p-4">المخزون</th>
                <th className="p-4">الضمان والمميزات</th>
                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202B40] text-xs">
              {filteredList.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#0C1320]/80 transition-colors">
                  {/* Name & Brand */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#0A0E17] border border-[#202B40] p-1 flex items-center justify-center shrink-0 overflow-hidden">
                        {prod.customImageUrl ? (
                          <img
                            src={prod.customImageUrl}
                            alt={prod.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-[10px] font-bold text-[#FF4753] uppercase font-mono">
                            {prod.brand}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm line-clamp-1">{prod.name}</div>
                        <div className="text-[#97A0B3] text-[11px] font-mono mt-0.5">
                          {prod.brand} · {prod.nameEn}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4 font-semibold text-slate-300">
                    <span className="px-2.5 py-1 rounded-md bg-[#0C1320] border border-[#202B40] text-[11px]">
                      {prod.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-4">
                    <div className="font-mono font-black text-[#FF4753] text-sm tabular-nums">
                      {formatPrice(prod.price, 'YER')}
                    </div>
                    {prod.originalPrice && (
                      <div className="text-[10px] text-slate-500 line-through font-mono">
                        {formatPrice(prod.originalPrice, 'YER')}
                      </div>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-md font-mono font-bold text-xs ${
                        prod.stock <= 5
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-[#0C1320] text-slate-200 border border-[#202B40]'
                      }`}
                    >
                      {prod.stock} قطع
                    </span>
                  </td>

                  {/* Specs & Features */}
                  <td className="p-4 text-slate-400 max-w-xs truncate">
                    <span>{prod.warranty}</span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenEditModal(prod)}
                        className="p-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 transition-colors cursor-pointer"
                        title="تعديل المنتج"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(prod.id, prod.name)}
                        className="p-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 transition-colors cursor-pointer"
                        title="حذف المنتج نهائياً"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Reset Default Products Button in Footer */}
        <div className="p-4 bg-[#0C1320] border-t border-[#202B40] flex items-center justify-between text-xs">
          <span className="text-[#97A0B3]">عرض {filteredList.length} من أصل {products.length} منتج</span>
          <button
            onClick={() => {
              if (confirm('هل تريد بالتأكيد استعادة قائمة المنتجات والأسعار الافتراضية الأصلية للمتجر؟')) {
                onResetDefaultProducts();
                showToast('تمت استعادة الكتالوج الافتراضي بنجاح');
              }
            }}
            className="text-slate-400 hover:text-red-400 flex items-center gap-1.5 cursor-pointer font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>استعادة الكتالوج الافتراضي للمحل</span>
          </button>
        </div>
      </div>

      {/* ----------------- Add / Edit Product Modal ----------------- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div
            className="relative bg-[#101725] text-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#202B40] overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-[#202B40] bg-[#0C1320] flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#FF4753]" />
                <span>{editingProductId ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد للمتجر'}</span>
              </h2>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    اسم المنتج (بالعربي) <span className="text-red-400">*</span>:
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="مثال: آيفون 16 برو ماكس أو لابتوب ديل XPS"
                    className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    الاسم بالإنجليزية (اختياري):
                  </label>
                  <input
                    type="text"
                    value={formNameEn}
                    onChange={(e) => setFormNameEn(e.target.value)}
                    placeholder="Example: iPhone 16 Pro Max"
                    className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">الشركة / الماركة:</label>
                  <input
                    type="text"
                    required
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    placeholder="Apple, Samsung, Dell, Anker..."
                    className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">القسم / التصنيف:</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-xl px-3 py-2 text-white focus:outline-none cursor-pointer"
                  >
                    <option value="phones">الهواتف الذكية</option>
                    <option value="laptops">الحواسيب واللابتوبات</option>
                    <option value="audio">السماعات والصوتيات</option>
                    <option value="chargers">الشواحن والكابلات</option>
                    <option value="powerbanks">البطاريات المتنقلة</option>
                    <option value="cases">الأغطية والحماية</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">الكمية بالمخزون:</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    السعر الحالي (بالريال اليمني ر.ي) <span className="text-red-400">*</span>:
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-xl px-3 py-2 text-[#FF4753] font-bold text-sm focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    السعر الأصلي قبل الخصم (اختياري لإظهار نسبة الخصم):
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    placeholder="0 إذا لا يوجد خصم"
                    className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-xl px-3 py-2 text-slate-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  رابط صورة مخصصة للمنتج (Custom Image URL - اختياري):
                </label>
                <input
                  type="url"
                  value={formCustomImageUrl}
                  onChange={(e) => setFormCustomImageUrl(e.target.value)}
                  placeholder="https://example.com/product-image.jpg"
                  className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-xl px-3 py-2 text-white focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  شارة مميزة (Badge):
                </label>
                <input
                  type="text"
                  value={formBadge}
                  onChange={(e) => setFormBadge(e.target.value)}
                  placeholder="مثال: الأكثر طلباً، خصم 15%، جديد..."
                  className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  الضمان المعتمد:
                </label>
                <input
                  type="text"
                  value={formWarranty}
                  onChange={(e) => setFormWarranty(e.target.value)}
                  className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              {/* Specs Builder */}
              <div className="space-y-2 pt-2 border-t border-[#202B40]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">المواصفات الفنية للمنتج:</span>
                  <button
                    type="button"
                    onClick={() => setFormSpecs([...formSpecs, { key: '', val: '' }])}
                    className="text-xs text-[#FF4753] hover:underline font-bold cursor-pointer"
                  >
                    + إضافة مواصفة
                  </button>
                </div>

                <div className="space-y-2">
                  {formSpecs.map((spec, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={spec.key}
                        onChange={(e) => {
                          const updated = [...formSpecs];
                          updated[idx].key = e.target.value;
                          setFormSpecs(updated);
                        }}
                        placeholder="المواصفة (مثل: المعالج أو الشاشة)"
                        className="w-1/3 bg-[#0C1320] border border-[#202B40] rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={spec.val}
                        onChange={(e) => {
                          const updated = [...formSpecs];
                          updated[idx].val = e.target.value;
                          setFormSpecs(updated);
                        }}
                        placeholder="القيمة (مثل: Snapdragon 8 Elite)"
                        className="flex-1 bg-[#0C1320] border border-[#202B40] rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setFormSpecs(formSpecs.filter((_, i) => i !== idx))}
                        className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div className="pt-2 border-t border-[#202B40]">
                <label className="block font-bold text-slate-200 mb-1">
                  المميزات الرئيسية (كل ميزة في سطر منفصل):
                </label>
                <textarea
                  rows={3}
                  value={formFeaturesText}
                  onChange={(e) => setFormFeaturesText(e.target.value)}
                  placeholder="مقاوم للماء IP68&#10;شحن سريع 100W&#10;شاشة OLED بتردد 120Hz"
                  className="w-full bg-[#0C1320] border border-[#202B40] focus:border-[#E5252C] rounded-xl p-3 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#202B40] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 bg-[#0C1320] hover:bg-[#131B2C] text-slate-300 rounded-xl font-bold border border-[#202B40] cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 bg-gradient-to-r from-[#F0323A] to-[#B5121B] hover:brightness-110 text-white font-bold rounded-xl shadow-lg cursor-pointer"
                >
                  {editingProductId ? 'حفظ التعديلات' : 'إضافة المنتج للمتجر'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- Change Password Modal ----------------- */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#101725] border border-[#202B40] rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#202B40] pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>تغيير كلمة مرور الإدارة</span>
              </h3>
              <button
                onClick={() => setIsChangePasswordOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  كلمة المرور الحالية:
                </label>
                <input
                  type="password"
                  required
                  value={currentPwdInput}
                  onChange={(e) => setCurrentPwdInput(e.target.value)}
                  placeholder="أدخل كلمة المرور الحالية"
                  className="w-full bg-[#0C1320] border border-[#202B40] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  كلمة المرور الجديدة:
                </label>
                <input
                  type="password"
                  required
                  value={newPwdInput}
                  onChange={(e) => setNewPwdInput(e.target.value)}
                  placeholder="كلمة مرور جديدة قوية"
                  className="w-full bg-[#0C1320] border border-[#202B40] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              {pwdChangeMessage && (
                <div
                  className={`p-2.5 rounded-lg text-xs font-semibold ${
                    pwdChangeMessage.isError ? 'bg-red-950/60 text-red-300' : 'bg-emerald-950/60 text-emerald-300'
                  }`}
                >
                  {pwdChangeMessage.text}
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="px-4 py-2 bg-[#0C1320] text-slate-400 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E5252C] hover:bg-[#F0323A] text-white font-bold rounded-lg cursor-pointer"
                >
                  حفظ كلمة المرور
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
