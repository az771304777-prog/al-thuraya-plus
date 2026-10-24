import React, { useState, useEffect, useMemo } from 'react';
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
  Menu,
  ChevronDown,
  ShoppingBag,
  Users,
  Truck,
  Tag,
  MessageSquare,
  Settings,
  LogOut,
  CheckCircle2,
  XCircle,
  Clock,
  Palette,
  Phone,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  DollarSign,
  Printer,
  Copy,
  ChevronRight,
  Shield,
  HelpCircle,
  Smartphone,
  Laptop,
  Headphones,
  Zap,
} from 'lucide-react';
import { Product, ProductCategory, Order, OrderStatus } from '../types/store';
import { formatPrice } from '../utils/currency';

interface AdminDashboardProps {
  products: Product[];
  onSaveProducts: (products: Product[]) => void;
  onResetDefaultProducts: () => void;
  onExitAdmin: () => void;
}

// ----------------- Default Initial Orders for Seeding -----------------
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'THR-784120',
    customerName: 'محمد أحمد القاضي',
    phone: '771234567',
    city: 'ذمار',
    address: 'شارع صنعاء، جوار المستشفى العام',
    paymentMethod: 'cod',
    subtotal: 785000,
    discount: 15000,
    deliveryFee: 0,
    total: 770000,
    currency: 'YER',
    date: '2025-05-12 14:30',
    status: 'new',
    items: [
      {
        id: 'item-1',
        product: {
          id: 'phone-iphone-16-pro-max',
          name: 'آيفون 16 برو ماكس (iPhone 16 Pro Max)',
          nameEn: 'iPhone 16 Pro Max',
          brand: 'Apple',
          category: 'phones',
          price: 785000,
          rating: 4.9,
          reviewsCount: 38,
          stock: 4,
          colors: [{ name: 'تيتانيوم صحراوي', hex: '#C2B6A6', bgClass: 'bg-[#C2B6A6]' }],
          variants: [{ label: '256GB', priceDelta: 0 }],
          specs: { الذاكرة: '256GB', المعالج: 'Apple A18 Pro' },
          features: ['كاميرا احترافية', 'تيتانيوم خفيف'],
          warranty: 'ضمان سنة كاملة',
          visualType: 'iphone16',
        },
        selectedColor: { name: 'تيتانيوم صحراوي', hex: '#C2B6A6', bgClass: 'bg-[#C2B6A6]' },
        selectedVariant: { label: '256GB', priceDelta: 0 },
        quantity: 1,
        unitPrice: 785000,
      },
    ],
  },
  {
    id: 'THR-652391',
    customerName: 'خالد عبدالله الحميري',
    phone: '775896321',
    city: 'ذمار',
    address: 'خط الحسينية، خلف سوق الفواكه',
    paymentMethod: 'cod',
    subtotal: 540000,
    discount: 0,
    deliveryFee: 0,
    total: 540000,
    currency: 'YER',
    date: '2025-05-12 11:15',
    status: 'processing',
    items: [
      {
        id: 'item-2',
        product: {
          id: 'phone-s25-ultra',
          name: 'سامسونج جالاكسي S25 الترا (Galaxy S25 Ultra)',
          nameEn: 'Galaxy S25 Ultra',
          brand: 'Samsung',
          category: 'phones',
          price: 540000,
          rating: 4.8,
          reviewsCount: 29,
          stock: 3,
          colors: [{ name: 'رمادي تيتانيوم', hex: '#777A7E', bgClass: 'bg-[#777A7E]' }],
          variants: [{ label: '512GB', priceDelta: 0 }],
          specs: { الذاكرة: '512GB', الكاميرا: '200MP' },
          features: ['قلم S-Pen مدمج', 'Galaxy AI'],
          warranty: 'ضمان سنتين',
          visualType: 's25ultra',
        },
        selectedColor: { name: 'رمادي تيتانيوم', hex: '#777A7E', bgClass: 'bg-[#777A7E]' },
        selectedVariant: { label: '512GB', priceDelta: 0 },
        quantity: 1,
        unitPrice: 540000,
      },
    ],
  },
  {
    id: 'THR-529104',
    customerName: 'ياسر علي الورقي',
    phone: '773147852',
    city: 'صنعاء',
    address: 'شارع حدة، برج نزار',
    paymentMethod: 'card',
    subtotal: 920000,
    discount: 20000,
    deliveryFee: 3000,
    total: 903000,
    currency: 'YER',
    date: '2025-05-11 16:45',
    status: 'shipping',
    items: [
      {
        id: 'item-3',
        product: {
          id: 'laptop-macbook-pro-16-m4',
          name: 'أبل ماك بوك برو 16 (MacBook Pro 16 M4 Pro)',
          nameEn: 'MacBook Pro 16 M4 Pro',
          brand: 'Apple',
          category: 'laptops',
          price: 920000,
          rating: 5.0,
          reviewsCount: 14,
          stock: 2,
          colors: [{ name: 'أسود فضائي', hex: '#2E3033', bgClass: 'bg-[#2E3033]' }],
          variants: [{ label: '18GB RAM | 512GB SSD', priceDelta: 0 }],
          specs: { المعالج: 'Apple M4 Pro', الرام: '18GB' },
          features: ['شاشة Liquid Retina XDR', 'بطارية تدوم 22 ساعة'],
          warranty: 'ضمان دولي سنتين',
          visualType: 'macbook',
        },
        selectedColor: { name: 'أسود فضائي', hex: '#2E3033', bgClass: 'bg-[#2E3033]' },
        selectedVariant: { label: '18GB RAM | 512GB SSD', priceDelta: 0 },
        quantity: 1,
        unitPrice: 920000,
      },
    ],
  },
  {
    id: 'THR-418932',
    customerName: 'فاطمة محمد الصايدي',
    phone: '778965412',
    city: 'ذمار',
    address: 'الشارع العام، عمارة القدس',
    paymentMethod: 'cod',
    subtotal: 135000,
    discount: 5000,
    deliveryFee: 0,
    total: 130000,
    currency: 'YER',
    date: '2025-05-10 18:20',
    status: 'delivered',
    items: [
      {
        id: 'item-4',
        product: {
          id: 'audio-airpods-pro-2',
          name: 'أبل إيربودز برو الجيل الثاني (AirPods Pro 2 Type-C)',
          nameEn: 'AirPods Pro 2 USB-C',
          brand: 'Apple',
          category: 'audio',
          price: 135000,
          rating: 4.9,
          reviewsCount: 42,
          stock: 6,
          colors: [{ name: 'أبيض ناصع', hex: '#FFFFFF', bgClass: 'bg-white' }],
          variants: [{ label: 'منفذ USB-C MagSafe', priceDelta: 0 }],
          specs: { العزل: 'عزل ضوضاء مضاعف 2x', المنفذ: 'USB-C' },
          features: ['صوت مكاني مخصص', 'علبة شحن مع مكبر صوت'],
          warranty: 'ضمان سنة',
          visualType: 'airpods',
        },
        selectedColor: { name: 'أبيض ناصع', hex: '#FFFFFF', bgClass: 'bg-white' },
        selectedVariant: { label: 'منفذ USB-C MagSafe', priceDelta: 0 },
        quantity: 1,
        unitPrice: 135000,
      },
    ],
  },
  {
    id: 'THR-387410',
    customerName: 'عمار صالح الذاهبي',
    phone: '772159843',
    city: 'إب',
    address: 'الدائري الغربي، قرب الجامعة',
    paymentMethod: 'cod',
    subtotal: 48000,
    discount: 0,
    deliveryFee: 3000,
    total: 51000,
    currency: 'YER',
    date: '2025-05-09 20:00',
    status: 'delivered',
    items: [
      {
        id: 'item-5',
        product: {
          id: 'charger-anker-prime-100w',
          name: 'شاحن أنكر برايم 100 واط GaN سريع (Anker Prime 100W)',
          nameEn: 'Anker Prime 100W GaN',
          brand: 'Anker',
          category: 'chargers',
          price: 48000,
          rating: 4.8,
          reviewsCount: 50,
          stock: 12,
          colors: [{ name: 'أسود فحمي', hex: '#262626', bgClass: 'bg-[#262626]' }],
          variants: [{ label: '3 منافذ (2x USB-C + 1x USB-A)', priceDelta: 0 }],
          specs: { القوة: '100W GaN', المنافذ: '3 منافذ' },
          features: ['شحن سريع لـ 3 أجهزة معاً', 'حماية فائقة من الحرارة'],
          warranty: 'ضمان 18 شهر',
          visualType: 'charger_gan',
        },
        selectedColor: { name: 'أسود فحمي', hex: '#262626', bgClass: 'bg-[#262626]' },
        selectedVariant: { label: '3 منافذ (2x USB-C + 1x USB-A)', priceDelta: 0 },
        quantity: 1,
        unitPrice: 48000,
      },
    ],
  },
  {
    id: 'THR-296541',
    customerName: 'هشام قائد العنسي',
    phone: '774852963',
    city: 'ذمار',
    address: 'شارع المعلمين',
    paymentMethod: 'cod',
    subtotal: 62000,
    discount: 0,
    deliveryFee: 0,
    total: 62000,
    currency: 'YER',
    date: '2025-05-08 13:10',
    status: 'cancelled',
    items: [],
  },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onSaveProducts,
  onResetDefaultProducts,
  onExitAdmin,
}) => {
  // ---------------- Authentication State ----------------
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('thuraya_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // ---------------- Sidebar Navigation Active Tab ----------------
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile drawer toggle

  // Lock body scroll when mobile sidebar drawer is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  // ---------------- Orders State ----------------
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('thuraya_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading orders', e);
    }
    return INITIAL_DEMO_ORDERS;
  });

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    try {
      localStorage.setItem('thuraya_orders', JSON.stringify(newOrders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  };

  // ---------------- Products Search & Filter State ----------------
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

  // ---------------- Modal States ----------------
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // ---------------- Product Form Fields ----------------
  const [formName, setFormName] = useState('');
  const [formNameEn, setFormNameEn] = useState('');
  const [formBrand, setFormBrand] = useState('Apple');
  const [formCategory, setFormCategory] = useState<ProductCategory>('phones');
  const [formPrice, setFormPrice] = useState<number>(50000);
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

  // ---------------- Password Change State ----------------
  const [currentPwdInput, setCurrentPwdInput] = useState('');
  const [newPwdInput, setNewPwdInput] = useState('');
  const [confirmPwdInput, setConfirmPwdInput] = useState('');
  const [pwdMessage, setPwdMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // ---------------- Theme Customizer State ----------------
  const [themeSettings, setThemeSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('thuraya_theme_settings');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      primaryColor: '#E5252C',
      topbarGradient: 'crimson',
      headlineColor: '#101725',
      roundedStyle: 'rounded-2xl',
      fontFamily: 'Tajawal',
    };
  });

  // ---------------- Toast Notification ----------------
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Password Helpers
  const getStoredPassword = (): string => {
    return localStorage.getItem('thuraya_admin_pwd') || 'admin123';
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === getStoredPassword()) {
      setIsAuthenticated(true);
      sessionStorage.setItem('thuraya_admin_auth', 'true');
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('كلمة المرور غير صحيحة، يرجى إعادة المحاولة.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('thuraya_admin_auth');
    showToast('تم تسجيل الخروج بنجاح وإغلاق الجلسة.');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPwdInput !== getStoredPassword()) {
      setPwdMessage({ text: 'كلمة المرور الحالية غير مطابقة', isError: true });
      return;
    }
    if (newPwdInput.trim().length < 4) {
      setPwdMessage({ text: 'كلمة المرور الجديدة يجب ألا تقل عن 4 خانات', isError: true });
      return;
    }
    if (newPwdInput !== confirmPwdInput) {
      setPwdMessage({ text: 'كلمة المرور الجديدة وتأكيدها غير متطابقين', isError: true });
      return;
    }

    localStorage.setItem('thuraya_admin_pwd', newPwdInput.trim());
    setPwdMessage({ text: 'تم تغيير كلمة مرور الإدارة بنجاح!', isError: false });
    setCurrentPwdInput('');
    setNewPwdInput('');
    setConfirmPwdInput('');
    setTimeout(() => setPwdMessage(null), 3000);
  };

  // ---------------- Calculations for KPI Stats ----------------
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 3);
  const outOfStockProducts = products.filter((p) => p.stock === 0);
  const totalOrders = orders.length;

  const nonCancelledOrders = orders.filter((o) => o.status !== 'cancelled');
  const activeOrdersValue = nonCancelledOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  const deliveredOrders = orders.filter((o) => o.status === 'delivered');
  const deliveredOrdersValue = deliveredOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  const newOrdersCount = orders.filter((o) => o.status === 'new' || o.status === 'confirmed').length;

  // Status distributions
  const statusCounts = useMemo(() => {
    const counts = {
      new: 0,
      processing: 0,
      shipping: 0,
      delivered: 0,
      cancelled: 0,
    };
    orders.forEach((o) => {
      if (o.status === 'new' || o.status === 'confirmed') counts.new++;
      else if (o.status === 'processing') counts.processing++;
      else if (o.status === 'shipping' || o.status === 'shipped') counts.shipping++;
      else if (o.status === 'delivered') counts.delivered++;
      else if (o.status === 'cancelled') counts.cancelled++;
    });
    return counts;
  }, [orders]);

  // Update Order Status
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    saveOrders(updated);
    showToast(`تم تحديث حالة الطلب (${orderId}) بنجاح`);
  };

  // Quick Restock Function
  const handleQuickRestock = (productId: string, addQty: number) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        const next = Math.max(0, p.stock + addQty);
        return { ...p, stock: next };
      }
      return p;
    });
    onSaveProducts(updated);
    showToast(`تم تحديث مخزون المنتج.`);
  };

  // Product Add / Edit Modal Handlers
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
    setFormWarranty('ضمان سنة كاملة مع فحص وبرمجة مجانية');
    setFormCustomImageUrl('');
    setFormVisualType('iphone16');
    setFormSpecs([
      { key: 'المعالج', val: '' },
      { key: 'الشاشة', val: '' },
      { key: 'البطارية', val: '' },
      { key: 'الذاكرة', val: '' },
    ]);
    setFormFeaturesText('');
    setIsProductModalOpen(true);
  };

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
    setFormSpecs(Object.entries(prod.specs).map(([key, val]) => ({ key, val })));
    setFormFeaturesText(prod.features.join('\n'));
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || formPrice <= 0) {
      alert('يرجى ملء اسم المنتج والسعر بشكل صحيح');
      return;
    }

    const specsObj: Record<string, string> = {};
    formSpecs.forEach((s) => {
      if (s.key.trim() && s.val.trim()) specsObj[s.key.trim()] = s.val.trim();
    });

    const featuresList = formFeaturesText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingProductId) {
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
      showToast('تم تحديث بيانات المنتج بنجاح!');
    } else {
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

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من حذف المنتج: "${name}" من المتجر نهائياً؟`)) {
      onSaveProducts(products.filter((p) => p.id !== id));
      showToast(`تم حذف "${name}" بنجاح.`);
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const data = {
      products,
      orders,
      themeSettings,
      exportedAt: new Date().toISOString(),
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `thuraya-plus-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('تم تصدير ملف النسخة الاحتياطية بنجاح!');
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.products && Array.isArray(parsed.products)) {
          onSaveProducts(parsed.products);
          if (parsed.orders && Array.isArray(parsed.orders)) saveOrders(parsed.orders);
          showToast(`تم استيراد ${parsed.products.length} منتج بنجاح!`);
        } else if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
          onSaveProducts(parsed);
          showToast(`تم استيراد ${parsed.length} منتج بنجاح!`);
        } else {
          alert('الملف المحدد لا يتطابق مع هيكل بيانات متجر الثريا بلاس.');
        }
      } catch (err) {
        alert('حدث خطأ أثناء قراءة ملف النسخة الاحتياطية.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Theme Save Handler
  const handleSaveTheme = (newSettings: typeof themeSettings) => {
    setThemeSettings(newSettings);
    try {
      localStorage.setItem('thuraya_theme_settings', JSON.stringify(newSettings));
      if (newSettings.primaryColor) {
        document.documentElement.style.setProperty('--accent', newSettings.primaryColor);
        document.documentElement.style.setProperty('--accent-2', newSettings.primaryColor);
      }
      showToast('تم حفظ ألوان وهوية المتجر بنجاح!');
    } catch {}
  };

  // Filtered Products in Admin Products Tab
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = productCategoryFilter === 'all' || p.category === productCategoryFilter;
      const matchSearch =
        !productSearch.trim() ||
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.brand.toLowerCase().includes(productSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, productCategoryFilter, productSearch]);

  // ---------------- 14 Admin Navigation Items ----------------
  const navigationItems = [
    { id: 'overview', label: 'الرئيسية', icon: Store, badge: null },
    { id: 'products', label: 'المنتجات', icon: Package, badge: products.length },
    { id: 'categories', label: 'الأقسام والتصنيفات', icon: Layers, badge: null },
    { id: 'inventory', label: 'المخزون وحركات المخزون', icon: Boxes, badge: lowStockProducts.length > 0 ? lowStockProducts.length : null },
    { id: 'orders', label: 'الطلبات والمبيعات', icon: ShoppingBag, badge: newOrdersCount > 0 ? newOrdersCount : null, isRedBadge: true },
    { id: 'promos', label: 'العروض والتخفيضات', icon: Tag, badge: null },
    { id: 'customers', label: 'العملاء وقائمة الاتصال', icon: Users, badge: null },
    { id: 'shipping', label: 'الشحن والتوصيل', icon: Truck, badge: null },
    { id: 'banners', label: 'البنرات ومحتوى الصفحة', icon: Sparkles, badge: null },
    { id: 'store_content', label: 'محتوى المتجر والسياسات', icon: Shield, badge: null },
    { id: 'messages', label: 'رسائل واستفسارات العملاء', icon: MessageSquare, badge: null },
    { id: 'settings', label: 'إعدادات المتجر والهوية', icon: Settings, badge: null },
    { id: 'account', label: 'حساب الإدارة وكلمة المرور', icon: KeyRound, badge: null },
  ];

  // =========================================================================
  // Screen 1: Unauthenticated Login Gate
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center p-4 text-right selection:bg-[#E5252C] selection:text-white relative overflow-hidden font-sans">
        {/* Soft decorative background circles */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-red-100/60 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-xl space-y-6">
          <div className="text-center space-y-3">
            <div className="relative w-20 h-20 mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-white p-1.5 shadow-md border border-slate-200 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/aistudio/favicon_io_0bfe3b54.png"
                  alt="شعار متجر الثريا بلاس"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-[#E5252C] text-white flex items-center justify-center shadow-md">
                <Lock className="w-3.5 h-3.5" />
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">لوحة تحكم الإدارة</h1>
              <p className="text-xs text-slate-500 mt-1">
                متجر الثريا بلاس — نظام إدارة المتجر والمبيعات
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                كلمة المرور السرية للإدارة:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="أدخل كلمة المرور..."
                  autoFocus
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#E5252C] rounded-xl pr-4 pl-10 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E5252C]/20 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={showPassword ? 'إخفاء' : 'إظهار'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#F0323A] to-[#B5121B] hover:from-[#E5252C] hover:to-[#9F0E16] text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/20 cursor-pointer transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>دخول لوحة التحكم</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>كلمة المرور الافتراضية: admin123</span>
            <button
              onClick={onExitAdmin}
              className="text-[#E5252C] hover:underline font-bold cursor-pointer"
            >
              العودة للمتجر
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // Screen 2: Professional Light Theme Admin Dashboard
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 text-right flex flex-col font-sans selection:bg-[#E5252C] selection:text-white">
      {/* ---------------- Toast Notification ---------------- */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ---------------- Admin Top Navigation Bar ---------------- */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-xs px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Right side: Hamburger (☰) + Store Identity (Strictly Single Line, whitespace-nowrap) */}
        <div className="flex flex-row items-center gap-2 sm:gap-3 shrink-0 whitespace-nowrap">
          {/* Hamburger Menu (☰) */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors shrink-0"
            title="القائمة الجانبية للإدارة"
            aria-label="القائمة الجانبية"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Clean horizontal single-line brand container */}
          <div className="flex flex-row items-center gap-2 shrink-0 whitespace-nowrap">
            <img
              src="/assets/aistudio/favicon_io_0bfe3b54.png"
              alt="شعار المتجر"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-contain bg-white p-0.5 border border-slate-200 shadow-xs shrink-0"
            />
            <span className="font-black text-slate-900 text-sm sm:text-base whitespace-nowrap">
              الثريا بلاس
            </span>
            <span className="hidden sm:inline bg-rose-100 text-[#E5252C] text-[10px] font-extrabold px-2 py-0.5 rounded-md whitespace-nowrap">
              لوحة الإدارة
            </span>
          </div>
        </div>

        {/* Left side: Quick actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Add Product Shortcut on md+ */}
          <button
            onClick={handleOpenAddModal}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 bg-[#E5252C] hover:bg-[#C91820] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة منتج</span>
          </button>

          {/* Backup Data button on sm+ */}
          <button
            onClick={handleExportJSON}
            className="hidden sm:flex p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors"
            title="تصدير نسخة احتياطية (JSON)"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Exit to Storefront Button */}
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors whitespace-nowrap"
            title="عرض المتجر"
          >
            <Store className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="hidden sm:inline">عرض المتجر</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl cursor-pointer transition-colors whitespace-nowrap"
            title="تسجيل الخروج وقفل اللوحة"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">خروج</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          Mobile Sidebar Drawer (Full-Screen Dark Theme Overlay, Starts at Top: 0)
      ========================================================================= */}
      {/* 1. Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. Mobile Drawer Panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 h-screen max-h-screen w-72 sm:w-80 bg-[#0F1626] border-l border-[#202B40] text-slate-200 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#202B40] bg-[#0A0E17] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/favicon_io_0bfe3b54.png"
              alt="شعار متجر الثريا بلاس"
              className="w-10 h-10 rounded-2xl object-contain bg-white p-1 border border-[#202B40] shadow-md shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-sm font-black text-white whitespace-nowrap">
                إدارة الثريا بلاس
              </span>
              <span className="text-[10px] text-[#FF4753] font-bold tracking-wider">
                AL-THURAYA PLUS
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="إغلاق القائمة"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Menu Items */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-1.5">
          <div className="px-3 py-1.5 text-[11px] font-black text-slate-400 tracking-wider">
            أقسام الإدارة
          </div>

          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={`m-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-right px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#F0323A] to-[#B5121B] text-white font-black shadow-lg shadow-red-600/30'
                    : 'text-slate-300 hover:bg-[#162033] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== null && item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      item.isRedBadge
                        ? 'bg-red-500 text-white animate-pulse shadow-xs'
                        : isActive
                        ? 'bg-black/30 text-white'
                        : 'bg-[#1C283E] text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Drawer Bottom Actions: Well spaced, full width, no overlap */}
        <div className="p-4 border-t border-[#202B40] bg-[#0A0E17] space-y-2.5 pb-8 shrink-0">
          <button
            onClick={() => {
              handleOpenAddModal();
              setIsSidebarOpen(false);
            }}
            className="w-full py-2.5 px-3 bg-[#E5252C] hover:bg-[#C91820] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة منتج جديد</span>
          </button>

          <button
            onClick={onExitAdmin}
            className="w-full py-2.5 px-3 bg-[#131D30] hover:bg-[#1C2A44] border border-[#202B40] text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Store className="w-4 h-4 text-emerald-400" />
            <span>عرض المتجر</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 bg-red-950/40 hover:bg-red-950/70 border border-red-800/40 text-red-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* ---------------- Main Layout (Desktop Sidebar + Content) ---------------- */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Permanent Dark Sidebar */}
        <aside className="hidden lg:flex w-72 bg-[#0F1626] border-l border-[#202B40] text-slate-200 flex-col justify-between shrink-0 h-full">
          <div className="flex-1 overflow-y-auto p-3.5 space-y-1.5">
            <div className="px-3 py-1.5 text-[11px] font-black text-slate-400 tracking-wider">
              أقسام الإدارة
            </div>

            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={`d-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-right px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F0323A] to-[#B5121B] text-white font-black shadow-lg shadow-red-600/30'
                      : 'text-slate-300 hover:bg-[#162033] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== null && item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        item.isRedBadge
                          ? 'bg-red-500 text-white animate-pulse shadow-xs'
                          : isActive
                          ? 'bg-black/30 text-white'
                          : 'bg-[#1C283E] text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-[#202B40] bg-[#0A0E17] space-y-2.5 pb-6 shrink-0">
            <button
              onClick={handleOpenAddModal}
              className="w-full py-2.5 px-3 bg-[#E5252C] hover:bg-[#C91820] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة منتج جديد</span>
            </button>

            <button
              onClick={onExitAdmin}
              className="w-full py-2.5 px-3 bg-[#131D30] hover:bg-[#1C2A44] border border-[#202B40] text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Store className="w-4 h-4 text-emerald-400" />
              <span>عرض المتجر</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full py-2 px-3 bg-red-950/40 hover:bg-red-950/70 border border-red-800/40 text-red-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </aside>

        {/* =========================================================================
            Main Admin Content Area
        ========================================================================= */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* ---------------- 1. TAB: OVERVIEW (الرئيسية) ---------------- */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Header Title & Subtitle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">نظرة عامة على المتجر</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    إحصائيات المبيعات، المخزون، والطلبات المباشرة
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenAddModal}
                    className="px-4 py-2 bg-[#E5252C] hover:bg-[#C91820] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة منتج</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 text-indigo-600" />
                    <span>الطلبات ({orders.length})</span>
                  </button>
                </div>
              </div>

              {/* ---------------- Six Top KPI Statistics Cards ---------------- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {/* 1. إجمالي المنتجات */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">إجمالي المنتجات</span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Package className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-2xl font-black text-slate-900">{totalProducts}</span>
                    <p className="text-[11px] text-slate-400 mt-1">منتج متوفر في المتجر</p>
                  </div>
                </div>

                {/* 2. منخفضة المخزون */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">منخفضة المخزون</span>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-2xl font-black text-amber-600">{lowStockProducts.length}</span>
                    <p className="text-[11px] text-slate-400 mt-1">أقل من 4 قطع متاحة</p>
                  </div>
                </div>

                {/* 3. منتجات نافذة */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">منتجات نافذة</span>
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                      <XCircle className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-2xl font-black text-rose-600">{outOfStockProducts.length}</span>
                    <p className="text-[11px] text-slate-400 mt-1">نفذت من المخزن تماماً</p>
                  </div>
                </div>

                {/* 4. إجمالي الطلبات */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">إجمالي الطلبات</span>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-2xl font-black text-slate-900">{totalOrders}</span>
                    <p className="text-[11px] text-indigo-600 font-bold mt-1">
                      {newOrdersCount} طلب جديد يحتاج معالجة
                    </p>
                  </div>
                </div>

                {/* 5. قيمة الطلبات غير الملغاة بريال يمني */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">قيمة الطلبات النشطة</span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-xl font-black text-emerald-600">
                      {activeOrdersValue.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold mr-1">ر.ي</span>
                    <p className="text-[11px] text-slate-400 mt-1">الطلبات المؤكدة والجارية</p>
                  </div>
                </div>

                {/* 6. قيمة الطلبات المسلّمة */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">الطلبات المسلّمة</span>
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-xl font-black text-teal-600">
                      {deliveredOrdersValue.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-teal-700 font-bold mr-1">ر.ي</span>
                    <p className="text-[11px] text-slate-400 mt-1">المبالغ المحصلة فعلياً</p>
                  </div>
                </div>
              </div>

              {/* ---------------- Progress Bars & Analytics Section ---------------- */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. مؤشر الطلبات حسب الحالة */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#E5252C]"></span>
                      <span>مؤشر الطلبات حسب الحالة</span>
                    </h2>
                    <span className="text-xs text-slate-400 font-medium">
                      إجمالي {orders.length} طلب
                    </span>
                  </div>

                  {/* Multi-segment Progress Bar */}
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
                    <div
                      style={{ width: `${(statusCounts.new / (orders.length || 1)) * 100}%` }}
                      className="bg-blue-500"
                      title={`جديد: ${statusCounts.new}`}
                    />
                    <div
                      style={{ width: `${(statusCounts.processing / (orders.length || 1)) * 100}%` }}
                      className="bg-amber-500"
                      title={`قيد التجهيز: ${statusCounts.processing}`}
                    />
                    <div
                      style={{ width: `${(statusCounts.shipping / (orders.length || 1)) * 100}%` }}
                      className="bg-indigo-500"
                      title={`قيد التوصيل: ${statusCounts.shipping}`}
                    />
                    <div
                      style={{ width: `${(statusCounts.delivered / (orders.length || 1)) * 100}%` }}
                      className="bg-emerald-500"
                      title={`مسلّم: ${statusCounts.delivered}`}
                    />
                    <div
                      style={{ width: `${(statusCounts.cancelled / (orders.length || 1)) * 100}%` }}
                      className="bg-rose-500"
                      title={`ملغي: ${statusCounts.cancelled}`}
                    />
                  </div>

                  {/* Status pills legend */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-center">
                      <span className="block text-[11px] font-bold text-blue-700">جديد</span>
                      <span className="text-base font-black text-blue-800">{statusCounts.new}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100 text-center">
                      <span className="block text-[11px] font-bold text-amber-700">تجهيز</span>
                      <span className="text-base font-black text-amber-800">{statusCounts.processing}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-center">
                      <span className="block text-[11px] font-bold text-indigo-700">توصيل</span>
                      <span className="text-base font-black text-indigo-800">{statusCounts.shipping}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-center">
                      <span className="block text-[11px] font-bold text-emerald-700">مسلّم</span>
                      <span className="text-base font-black text-emerald-800">{statusCounts.delivered}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-100 text-center">
                      <span className="block text-[11px] font-bold text-rose-700">ملغي</span>
                      <span className="text-base font-black text-rose-800">{statusCounts.cancelled}</span>
                    </div>
                  </div>
                </div>

                {/* 2. مؤشر مبيعات آخر 7 أيام */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span>مؤشر مبيعات آخر 7 أيام</span>
                    </h2>
                    <span className="text-xs text-slate-400 font-medium">مبيعات أسبوعية</span>
                  </div>

                  {/* 7 Days Bar Chart Display */}
                  <div className="flex items-end justify-between gap-2 h-28 pt-4 px-2 border-b border-slate-100">
                    {[
                      { day: 'السبت', val: 785000, height: '75%', orders: 2 },
                      { day: 'الأحد', val: 540000, height: '55%', orders: 1 },
                      { day: 'الإثنين', val: 920000, height: '90%', orders: 3 },
                      { day: 'الثلاثاء', val: 320000, height: '35%', orders: 1 },
                      { day: 'الأربعاء', val: 650000, height: '65%', orders: 2 },
                      { day: 'الخميس', val: 980000, height: '100%', orders: 4 },
                      { day: 'اليوم', val: 770000, height: '80%', orders: 2 },
                    ].map((item, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <div
                          style={{ height: item.height }}
                          className="w-full max-w-[28px] bg-gradient-to-t from-red-500 to-rose-400 rounded-t-lg group-hover:from-red-600 group-hover:to-rose-500 transition-all relative cursor-pointer"
                        >
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-1.5 rounded font-mono whitespace-nowrap z-20 pointer-events-none">
                            {(item.val / 1000).toFixed(0)}k ر.ي
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-800 transition-colors">
                          {item.day}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>أعلى مبيعات: الخميس (980,000 ر.ي)</span>
                    <span className="font-bold text-emerald-600">متوسط: 709,000 ر.ي / يوم</span>
                  </div>
                </div>
              </div>

              {/* ---------------- Split Section: Recent Orders & Low Stock Alert ---------------- */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* 1. جدول أحدث الطلبات (2 Columns on XL) */}
                <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-indigo-600" />
                        <span>أحدث الطلبات</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        آخر الطلبات الواردة من عملاء المتجر
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-[#E5252C] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>عرض كافة الطلبات</span>
                      <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                    </button>
                  </div>

                  {/* Orders Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                        <tr>
                          <th className="py-3 px-4">رقم الطلب</th>
                          <th className="py-3 px-4">اسم العميل</th>
                          <th className="py-3 px-4">الهاتف</th>
                          <th className="py-3 px-4">الإجمالي</th>
                          <th className="py-3 px-4">حالة الطلب</th>
                          <th className="py-3 px-4 text-center">إجراء</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.slice(0, 5).map((order) => {
                          const statusBadges: Record<string, { label: string; bg: string; text: string }> = {
                            new: { label: 'جديد', bg: 'bg-blue-50', text: 'text-blue-700' },
                            confirmed: { label: 'مؤكد', bg: 'bg-blue-50', text: 'text-blue-700' },
                            processing: { label: 'قيد التجهيز', bg: 'bg-amber-50', text: 'text-amber-700' },
                            shipping: { label: 'قيد التوصيل', bg: 'bg-indigo-50', text: 'text-indigo-700' },
                            shipped: { label: 'تم الشحن', bg: 'bg-indigo-50', text: 'text-indigo-700' },
                            delivered: { label: 'تم التسليم', bg: 'bg-emerald-50', text: 'text-emerald-700' },
                            cancelled: { label: 'ملغي', bg: 'bg-rose-50', text: 'text-rose-700' },
                          };
                          const badge = statusBadges[order.status] || {
                            label: order.status,
                            bg: 'bg-slate-50',
                            text: 'text-slate-700',
                          };

                          return (
                            <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3 px-4 font-mono font-bold text-slate-800">
                                {order.id}
                              </td>
                              <td className="py-3 px-4 font-semibold text-slate-900">
                                {order.customerName}
                              </td>
                              <td className="py-3 px-4 font-mono text-slate-600">
                                <a
                                  href={`tel:${order.phone}`}
                                  className="hover:text-[#E5252C] transition-colors"
                                >
                                  {order.phone}
                                </a>
                              </td>
                              <td className="py-3 px-4 font-bold text-slate-900 font-mono">
                                {order.total.toLocaleString()} ر.ي
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${badge.bg} ${badge.text}`}
                                >
                                  {badge.label}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <button
                                  onClick={() => setViewingOrder(order)}
                                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
                                >
                                  التفاصيل
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. بطاقة قائمة "منخفض المخزون" (1 Column on XL) */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <h2 className="text-sm font-black text-slate-900">قائمة منخفض المخزون</h2>
                      </div>
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                        {lowStockProducts.length + outOfStockProducts.length} تنبيه
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 mt-2 space-y-1">
                      {[...outOfStockProducts, ...lowStockProducts].slice(0, 5).map((prod) => (
                        <div key={prod.id} className="py-2.5 flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-slate-900 truncate">{prod.name}</p>
                            <span className="text-[10px] text-slate-400 font-mono">{prod.brand}</span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {prod.stock === 0 ? (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-red-100 text-red-700">
                                0 متاح (نافذ)
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-100 text-amber-700">
                                {prod.stock} متاح
                              </span>
                            )}

                            {/* Inline Stock Increment (+5) */}
                            <button
                              onClick={() => handleQuickRestock(prod.id, 5)}
                              className="p-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 text-[10px] font-bold cursor-pointer"
                              title="إضافة 5 قطع للمخزون"
                            >
                              +5
                            </button>
                          </div>
                        </div>
                      ))}

                      {lowStockProducts.length === 0 && outOfStockProducts.length === 0 && (
                        <div className="py-6 text-center text-xs text-slate-400 font-medium">
                          جميع المنتجات متوفرة بمخزون ممتاز!
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <button
                      onClick={handleOpenAddModal}
                      className="w-full py-2.5 bg-[#E5252C] hover:bg-[#C91820] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة منتج جديد</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('orders')}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-indigo-600" />
                      <span>الطلبات الجديدة ({newOrdersCount})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- 2. TAB: PRODUCTS (المنتجات) ---------------- */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">إدارة المنتجات</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    إضافة، تعديل، وحذف منتجات المتجر وضبط الأسعار والمخزون
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenAddModal}
                    className="px-4 py-2 bg-[#E5252C] hover:bg-[#C91820] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة منتج جديد</span>
                  </button>

                  <button
                    onClick={handleExportJSON}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>تصدير JSON</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="ابحث عن منتج بالاسم أو العلامة..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#E5252C] rounded-xl pr-10 pl-4 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl cursor-pointer focus:outline-none"
                  >
                    <option value="all">كافة الأقسام</option>
                    <option value="phones">الهواتف الذكية</option>
                    <option value="laptops">الحواسيب واللابتوبات</option>
                    <option value="audio">السماعات والصوتيات</option>
                    <option value="chargers">الشواحن والكابلات</option>
                    <option value="powerbanks">البطاريات المتنقلة</option>
                    <option value="cases">الأغطية والحماية</option>
                  </select>

                  <span className="text-xs text-slate-400 font-medium">
                    ({filteredProducts.length} منتج)
                  </span>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                      <tr>
                        <th className="py-3.5 px-4">المنتج</th>
                        <th className="py-3.5 px-4">القسم</th>
                        <th className="py-3.5 px-4">العلامة</th>
                        <th className="py-3.5 px-4">السعر الأساسي</th>
                        <th className="py-3.5 px-4">المخزون</th>
                        <th className="py-3.5 px-4 text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                                {p.customImageUrl ? (
                                  <img
                                    src={p.customImageUrl}
                                    alt={p.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Package className="w-5 h-5 text-slate-400" />
                                )}
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 block">{p.name}</span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {p.nameEn}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 font-medium">
                            {p.category === 'phones'
                              ? 'الهواتف'
                              : p.category === 'laptops'
                              ? 'اللابتوبات'
                              : p.category === 'audio'
                              ? 'السماعات'
                              : p.category === 'chargers'
                              ? 'الشواحن'
                              : p.category}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-700">{p.brand}</td>
                          <td className="py-3.5 px-4 font-black text-slate-900 font-mono">
                            {p.price.toLocaleString()} ر.ي
                          </td>
                          <td className="py-3.5 px-4">
                            {p.stock === 0 ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-700">
                                نافذ (0)
                              </span>
                            ) : p.stock <= 3 ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-700">
                                متبقي {p.stock}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-700">
                                {p.stock} قطعة
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleOpenEditModal(p)}
                                className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer"
                                title="تعديل المنتج"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                                title="حذف المنتج"
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
              </div>
            </div>
          )}

          {/* ---------------- 3. TAB: CATEGORIES (الأقسام) ---------------- */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900">أقسام وتصنيفات المتجر</h1>
                <p className="text-xs text-slate-500 mt-1">
                  إدارة الأقسام المعروضة في شريط التصفح والصفحة الرئيسية
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: 'phones', name: 'الهواتف الذكية الأصلية', count: products.filter(p => p.category === 'phones').length, icon: Smartphone },
                  { id: 'laptops', name: 'الحواسيب واللابتوبات المحمولة', count: products.filter(p => p.category === 'laptops').length, icon: Laptop },
                  { id: 'audio', name: 'السماعات ومكبرات الصوت', count: products.filter(p => p.category === 'audio').length, icon: Headphones },
                  { id: 'chargers', name: 'الشواحن والكابلات السريعة GaN', count: products.filter(p => p.category === 'chargers').length, icon: Zap },
                  { id: 'powerbanks', name: 'البطاريات المتنقلة (باور بانك)', count: products.filter(p => p.category === 'powerbanks').length, icon: Boxes },
                  { id: 'cases', name: 'الأغطية وحماية الشاشات', count: products.filter(p => p.category === 'cases').length, icon: Shield },
                ].map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div key={cat.id} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-red-50 text-[#E5252C] flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm">{cat.name}</h3>
                          <span className="text-xs text-slate-400 font-mono">{cat.count} منتج متوفر</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold rounded-full">
                        مفعل
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ---------------- 4. TAB: INVENTORY (المخزون وحركات المخزون) ---------------- */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900">المخزون وحركات المستودع</h1>
                <p className="text-xs text-slate-500 mt-1">
                  مراقبة المخزون المتاح، الوارد والصادر، وتعديل الكميات فورياً
                </p>
              </div>

              {/* Inventory summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <span className="text-xs font-bold text-slate-400">إجمالي وحدات المخزن</span>
                  <div className="text-2xl font-black text-slate-900 mt-2">
                    {products.reduce((acc, p) => acc + p.stock, 0)} قطعة
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <span className="text-xs font-bold text-slate-400">القيمة التقديرية للبضاعة</span>
                  <div className="text-2xl font-black text-emerald-600 font-mono mt-2">
                    {products.reduce((acc, p) => acc + p.price * p.stock, 0).toLocaleString()} ر.ي
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <span className="text-xs font-bold text-slate-400">منتجات بحاجة لإعادة طلب</span>
                  <div className="text-2xl font-black text-amber-600 mt-2">
                    {lowStockProducts.length + outOfStockProducts.length} منتج
                  </div>
                </div>
              </div>

              {/* Inventory table */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">قائمة المخزون وإجراءات التوريد السريع</span>
                  <span className="text-xs text-slate-400">اضغط +5 أو +10 لزيادة المخزون مباشرة</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">اسم المنتج</th>
                        <th className="py-3 px-4">القسم</th>
                        <th className="py-3 px-4">الكمية الحالية</th>
                        <th className="py-3 px-4">الحالة</th>
                        <th className="py-3 px-4 text-center">تعديل المخزون</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                          <td className="py-3 px-4 text-slate-500">{p.category}</td>
                          <td className="py-3 px-4 font-mono font-black text-slate-900">{p.stock}</td>
                          <td className="py-3 px-4">
                            {p.stock === 0 ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">نافذ</span>
                            ) : p.stock <= 3 ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">حرج</span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">متوفر</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => handleQuickRestock(p.id, -1)}
                                className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                              >
                                -1
                              </button>
                              <button
                                onClick={() => handleQuickRestock(p.id, 1)}
                                className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                              >
                                +1
                              </button>
                              <button
                                onClick={() => handleQuickRestock(p.id, 5)}
                                className="px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs cursor-pointer"
                              >
                                +5
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- 5. TAB: ORDERS (الطلبات) ---------------- */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">إدارة طلبات المتجر</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    متابعة وتحديث حالة الشحن والتسليم للعملاء
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">
                    إجمالي الطلبات: <span className="font-mono text-slate-900">{orders.length}</span>
                  </span>
                </div>
              </div>

              {/* Orders Full Table */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                      <tr>
                        <th className="py-3.5 px-4">رقم الطلب</th>
                        <th className="py-3.5 px-4">العميل</th>
                        <th className="py-3.5 px-4">الهاتف</th>
                        <th className="py-3.5 px-4">المحافظة والعنوان</th>
                        <th className="py-3.5 px-4">المبلغ الإجمالي</th>
                        <th className="py-3.5 px-4">التاريخ</th>
                        <th className="py-3.5 px-4">تغيير الحالة</th>
                        <th className="py-3.5 px-4 text-center">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                            {order.id}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            {order.customerName}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-600">
                            <a
                              href={`https://wa.me/967${order.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-600 hover:underline inline-flex items-center gap-1"
                            >
                              <span>{order.phone}</span>
                            </a>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            <span className="font-bold text-slate-800">{order.city}</span> — {order.address}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-black text-slate-900">
                            {order.total.toLocaleString()} ر.ي
                          </td>
                          <td className="py-3.5 px-4 text-[11px] text-slate-400 font-mono">
                            {order.date}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 py-1.5 px-2 rounded-lg cursor-pointer focus:outline-none"
                            >
                              <option value="new">جديد</option>
                              <option value="processing">قيد التجهيز</option>
                              <option value="shipping">قيد التوصيل</option>
                              <option value="delivered">تم التسليم</option>
                              <option value="cancelled">ملغي</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => setViewingOrder(order)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs cursor-pointer transition-colors"
                            >
                              التفاصيل
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- 6. TAB: PROMOS (العروض والتخفيضات) ---------------- */}
          {activeTab === 'promos' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900">العروض وأكواد الخصم</h1>
                <p className="text-xs text-slate-500 mt-1">
                  إدارة التخفيضات الموسمية وكوبونات الخصم للعملاء
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-base text-[#E5252C] bg-red-50 px-3 py-1 rounded-lg">
                      THURAYA2025
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      نشط
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    خصم 5% لجميع الطلبات التي تتجاوز 100,000 ر.ي
                  </p>
                  <div className="text-[11px] text-slate-400 font-mono">
                    صالح حتى: 31 ديسمبر 2025
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-base text-[#E5252C] bg-red-50 px-3 py-1 rounded-lg">
                      DHAMAR10
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      نشط
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    توصيل مجاني فوري داخل محافظة ذمار لطلبات الهواتف
                  </p>
                  <div className="text-[11px] text-slate-400 font-mono">
                    صالح للعملاء الجدد
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- 7. TAB: CUSTOMERS (العملاء) ---------------- */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900">سجل العملاء</h1>
                <p className="text-xs text-slate-500 mt-1">
                  قائمة العملاء الذين قاموا بالطلب والتواصل عبر المتجر
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                    <tr>
                      <th className="py-3.5 px-4">اسم العميل</th>
                      <th className="py-3.5 px-4">رقم الهاتف</th>
                      <th className="py-3.5 px-4">المحافظة</th>
                      <th className="py-3.5 px-4">العنوان</th>
                      <th className="py-3.5 px-4 text-center">تواصل سريع</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((o) => (
                      <tr key={`cust-${o.id}`} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{o.customerName}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">{o.phone}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">{o.city}</td>
                        <td className="py-3.5 px-4 text-slate-500">{o.address}</td>
                        <td className="py-3.5 px-4 text-center">
                          <a
                            href={`https://wa.me/967${o.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg text-xs inline-flex items-center gap-1 transition-colors"
                          >
                            <span>واتساب</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ---------------- 8. TAB: SHIPPING (الشحن والتوصيل) ---------------- */}
          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900">إعدادات الشحن والتوصيل</h1>
                <p className="text-xs text-slate-500 mt-1">
                  تسعيرة التوصيل ومندوبي الشحن لكافة محافظات الجمهورية
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { city: 'ذمار (المدينة)', fee: 'مجاني للطلبات فوق 50,000 ر.ي (أو 1,500 ر.ي)', time: 'خلال 2-4 ساعات' },
                  { city: 'صنعاء وأمانة العاصمة', fee: '3,000 ر.ي (مجاني فوق 80,000 ر.ي)', time: 'خلال 24 ساعة' },
                  { city: 'إب والتعزية', fee: '3,500 ر.ي', time: 'خلال 24-48 ساعة' },
                  { city: 'عدن والمحافظات الجنوبية', fee: '5,000 ر.ي', time: 'خلال 48 ساعة' },
                  { city: 'الحديدة والمحافظات الساحلية', fee: '4,000 ر.ي', time: 'خلال 48 ساعة' },
                ].map((s, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#E5252C]" />
                      <h3 className="font-bold text-slate-900 text-sm">{s.city}</h3>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">رسوم التوصيل: {s.fee}</p>
                    <span className="text-[11px] text-slate-400 block font-mono">مدة الوصول: {s.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- 9. TAB: BANNERS (البنرات ومحتوى الصفحة) ---------------- */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900">البنرات ومحتوى الترويج</h1>
                <p className="text-xs text-slate-500 mt-1">
                  التحكم في البنرات الإعلانية في الترويسة وأعلى المتجر
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">البنر العلوي الإعلاني</h3>
                <input
                  type="text"
                  defaultValue="توصيل لجميع المحافظات • صيانة وبرمجة بأحدث الأجهزة • خدمات G-TAG"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800"
                />
                <button
                  onClick={() => showToast('تم تحديث نص البنر العلوي بنجاح!')}
                  className="px-4 py-2 bg-[#E5252C] hover:bg-[#C91820] text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  حفظ نص البنر
                </button>
              </div>
            </div>
          )}

          {/* ---------------- 10. TAB: STORE CONTENT (محتوى المتجر) ---------------- */}
          {activeTab === 'store_content' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900">محتوى المتجر والسياسات</h1>
                <p className="text-xs text-slate-500 mt-1">
                  عناوين المحل، سياسة الضمان والاسترجاع، وأرقام خدمة العملاء
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">اسم المتجر الرسمي:</label>
                    <input
                      type="text"
                      defaultValue="متجر الثريا بلاس (Al-Thuraya Plus)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">العنوان الفعلي:</label>
                    <input
                      type="text"
                      defaultValue="اليمن — ذمار — خط الحسينية"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">هاتف المتجر / واتساب:</label>
                    <input
                      type="text"
                      defaultValue="+967 771 304 777"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">شروط الضمان:</label>
                    <input
                      type="text"
                      defaultValue="ضمان سنة كاملة مع فحص وبرمجة مجانية لكافة الأجهزة الأصلية"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>
                </div>

                <button
                  onClick={() => showToast('تم حفظ بيانات المتجر بنجاح!')}
                  className="px-4 py-2 bg-[#E5252C] hover:bg-[#C91820] text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  تحديث البيانات
                </button>
              </div>
            </div>
          )}

          {/* ---------------- 11. TAB: MESSAGES (رسائل العملاء) ---------------- */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900">رسائل واستفسارات العملاء</h1>
                <p className="text-xs text-slate-500 mt-1">
                  طلبات الصيانة، عروض استبدال الأجهزة، والاستفسارات
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'عبدالكريم الأنسي', phone: '771239874', msg: 'أرغب في فحص بطارية هاتف آيفون 14 برو ماكس وتغيير الشاشة', time: 'منذ ساعتين' },
                  { name: 'مختار الجبلي', phone: '775512398', msg: 'هل متوفر لابتوب ماك بوك M4 برو سعة 512GB باللون الأسود في فرع ذمار؟', time: 'منذ 5 ساعات' },
                ].map((m, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{m.name}</span>
                        <span className="text-[11px] font-mono text-slate-400">({m.phone})</span>
                        <span className="text-[10px] text-slate-400">{m.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{m.msg}</p>
                    </div>

                    <a
                      href={`https://wa.me/967${m.phone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl text-xs inline-flex items-center justify-center gap-1.5 transition-colors shrink-0"
                    >
                      <span>الرد عبر واتساب</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- 12. TAB: SETTINGS & THEME CUSTOMIZER (إعدادات المتجر والهوية) ---------------- */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-black text-slate-900">إعدادات المتجر وهوية الألوان</h1>
                <p className="text-xs text-slate-500 mt-1">
                  التحكم في الألوان الأساسية، مظهر الشريط العلوي، والنسخ الاحتياطي
                </p>
              </div>

              {/* Theme Customizer Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Palette className="w-5 h-5 text-[#E5252C]" />
                  <div>
                    <h2 className="text-base font-black text-slate-900">
                      التحكم بألوان وهوية المتجر (Theme Customizer)
                    </h2>
                    <p className="text-xs text-slate-400">
                      اختر اللون المميز لعلامة المتجر، ألوان الأزرار والعناوين
                    </p>
                  </div>
                </div>

                {/* Preset Palettes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-3">
                    لوحات الألوان الجاهزة:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                      { name: 'أحمر ثريا كلاسيكي', hex: '#E5252C', bg: 'bg-[#E5252C]' },
                      { name: 'أزرق ملكي تقني', hex: '#2563EB', bg: 'bg-[#2563EB]' },
                      { name: 'أخضر زمردي فخم', hex: '#059669', bg: 'bg-[#059669]' },
                      { name: 'ذهبي عنبري', hex: '#D97706', bg: 'bg-[#D97706]' },
                      { name: 'بنفسجي احترافي', hex: '#7C3AED', bg: 'bg-[#7C3AED]' },
                    ].map((palette) => (
                      <button
                        key={palette.hex}
                        onClick={() =>
                          handleSaveTheme({ ...themeSettings, primaryColor: palette.hex })
                        }
                        className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between h-20 ${
                          themeSettings.primaryColor === palette.hex
                            ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-900/10'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`w-5 h-5 rounded-full ${palette.bg} shadow-xs`}></span>
                          {themeSettings.primaryColor === palette.hex && (
                            <Check className="w-4 h-4 text-slate-900" />
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-slate-700">{palette.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Color Picker */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      تحديد لون مخصص (Hex Code):
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={themeSettings.primaryColor}
                        onChange={(e) =>
                          setThemeSettings({ ...themeSettings, primaryColor: e.target.value })
                        }
                        className="w-12 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5 bg-white"
                      />
                      <input
                        type="text"
                        value={themeSettings.primaryColor}
                        onChange={(e) =>
                          setThemeSettings({ ...themeSettings, primaryColor: e.target.value })
                        }
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-mono text-xs font-bold text-slate-900 uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      نمط تدرج الشريط العلوي (Topbar Gradient):
                    </label>
                    <select
                      value={themeSettings.topbarGradient}
                      onChange={(e) =>
                        setThemeSettings({ ...themeSettings, topbarGradient: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-800"
                    >
                      <option value="crimson">تدرج أحمر ثريا بلاس (الافتراضي)</option>
                      <option value="dark">داكن ليلي أنيق (Dark Slate)</option>
                      <option value="primary">متطابق مع اللون المختار</option>
                    </select>
                  </div>
                </div>

                {/* Preview Box */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <span className="text-[11px] font-bold text-slate-500">معاينة مباشرة للزر والألوان:</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      style={{ backgroundColor: themeSettings.primaryColor }}
                      className="px-4 py-2 text-white font-bold text-xs rounded-xl shadow-xs"
                    >
                      زر رئيسي للشراء
                    </button>
                    <span
                      style={{ color: themeSettings.primaryColor }}
                      className="font-black text-sm"
                    >
                      نص رئيسي ملوّن: 785,000 ر.ي
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleSaveTheme(themeSettings)}
                    className="px-5 py-2.5 bg-[#E5252C] hover:bg-[#C91820] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
                  >
                    حفظ الألوان والإعدادات
                  </button>

                  <button
                    onClick={() => {
                      const defaults = {
                        primaryColor: '#E5252C',
                        topbarGradient: 'crimson',
                        headlineColor: '#101725',
                        roundedStyle: 'rounded-2xl',
                        fontFamily: 'Tajawal',
                      };
                      handleSaveTheme(defaults);
                    }}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                  >
                    استعادة الإعدادات الافتراضية
                  </button>
                </div>
              </div>

              {/* Data Backup & Restore Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">النسخ الاحتياطي واستعادة البيانات</h3>
                <p className="text-xs text-slate-500">
                  يمكنك تحميل ملف بيانات المتجر بالكامل (المنتجات، الطلبات، الإعدادات) واسترجاعها في أي وقت.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleExportJSON}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-2"
                  >
                    <Download className="w-4 h-4 text-emerald-600" />
                    <span>تصدير ملف النسخة الاحتياطية (JSON)</span>
                  </button>

                  <label className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-2">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span>استيراد نسخة سابقة</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJSON}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={() => {
                      if (confirm('هل أنت متأكد من استعادة منتجات المتجر الافتراضية؟')) {
                        onResetDefaultProducts();
                        showToast('تمت استعادة المنتجات الافتراضية.');
                      }
                    }}
                    className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-2 mr-auto"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>إعادة ضبط المنتجات الافتراضية</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- 13. TAB: ACCOUNT & PASSWORD (حساب الإدارة وكلمة المرور) ---------------- */}
          {activeTab === 'account' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h1 className="text-2xl font-black text-slate-900">حساب الإدارة وكلمة المرور</h1>
                <p className="text-xs text-slate-500 mt-1">
                  تعديل كلمة مرور لوحة التحكم لتأمين الوصول لبيانات المتجر
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E5252C] flex items-center justify-center">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">تغيير كلمة المرور السرية</h3>
                    <span className="text-xs text-slate-400">تستخدم للولوج إلى /admin</span>
                  </div>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      كلمة المرور الحالية:
                    </label>
                    <input
                      type="password"
                      required
                      value={currentPwdInput}
                      onChange={(e) => setCurrentPwdInput(e.target.value)}
                      placeholder="أدخل كلمة المرور الحالية..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#E5252C] rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      كلمة المرور الجديدة:
                    </label>
                    <input
                      type="password"
                      required
                      value={newPwdInput}
                      onChange={(e) => setNewPwdInput(e.target.value)}
                      placeholder="أدخل كلمة المرور الجديدة (4 خانات فأكثر)..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#E5252C] rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      تأكيد كلمة المرور الجديدة:
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPwdInput}
                      onChange={(e) => setConfirmPwdInput(e.target.value)}
                      placeholder="أعد إدخال كلمة المرور الجديدة..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#E5252C] rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono focus:outline-none"
                    />
                  </div>

                  {pwdMessage && (
                    <div
                      className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                        pwdMessage.isError
                          ? 'bg-red-50 border border-red-200 text-red-700'
                          : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                      }`}
                    >
                      {pwdMessage.isError ? (
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      )}
                      <span>{pwdMessage.text}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#E5252C] hover:bg-[#C91820] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
                  >
                    حفظ كلمة المرور الجديدة
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          Add / Edit Product Modal
      ========================================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-right shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#E5252C]" />
                <span>{editingProductId ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد'}</span>
              </h2>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">اسم المنتج بالعربية: *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="مثال: آيفون 16 برو ماكس 256GB"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#E5252C]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">الاسم بالإنجليزية:</label>
                  <input
                    type="text"
                    value={formNameEn}
                    onChange={(e) => setFormNameEn(e.target.value)}
                    placeholder="iPhone 16 Pro Max 256GB"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#E5252C]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">القسم / التصنيف:</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ProductCategory)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:outline-none cursor-pointer"
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
                  <label className="block font-bold text-slate-700 mb-1">العلامة التجارية (Brand):</label>
                  <input
                    type="text"
                    required
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    placeholder="Apple, Samsung, Anker, Dell..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">السعر بالريال اليمني (YER): *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">السعر قبل الخصم (اختياري):</label>
                  <input
                    type="number"
                    min={0}
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">الكمية المتوفرة بالمخزون: *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">شارة خاصة (Badge اختياري):</label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="الأكثر طلباً، تخفيض حصري..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">رابط صورة المنتج (URL):</label>
                <input
                  type="url"
                  value={formCustomImageUrl}
                  onChange={(e) => setFormCustomImageUrl(e.target.value)}
                  placeholder="https://example.com/image.png (اتركه فارغاً لاستخدام المظهر التلقائي)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">الضمان:</label>
                <input
                  type="text"
                  value={formWarranty}
                  onChange={(e) => setFormWarranty(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#E5252C] hover:bg-[#C91820] text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  {editingProductId ? 'حفظ التعديلات' : 'إضافة المنتج'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          Order Detail Modal
      ========================================================================= */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-right shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  تفاصيل الطلب: <span className="font-mono text-[#E5252C]">{viewingOrder.id}</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">{viewingOrder.date}</span>
              </div>
              <button
                onClick={() => setViewingOrder(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">اسم العميل:</span>
                  <span className="font-bold text-slate-900">{viewingOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">رقم الهاتف:</span>
                  <span className="font-bold font-mono text-slate-900">{viewingOrder.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">العنوان:</span>
                  <span className="font-bold text-slate-900">{viewingOrder.city} — {viewingOrder.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">طريقة الدفع:</span>
                  <span className="font-bold text-slate-900">
                    {viewingOrder.paymentMethod === 'cod' ? 'الدفع عند الاستلام' : 'بطاقة إلكترونية'}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <span className="font-bold text-slate-700 block">المنتجات المطلوبة:</span>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                  {viewingOrder.items.map((it, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900">{it.product.name}</p>
                        <span className="text-[10px] text-slate-400">
                          {it.selectedColor?.name} • {it.selectedVariant?.label} × {it.quantity}
                        </span>
                      </div>
                      <span className="font-bold font-mono text-slate-900">
                        {(it.unitPrice * it.quantity).toLocaleString()} ر.ي
                      </span>
                    </div>
                  ))}
                  {viewingOrder.items.length === 0 && (
                    <div className="p-3 text-center text-slate-400">طلب مباشر مسجل عبر الهاتف</div>
                  )}
                </div>
              </div>

              {/* Total Summary */}
              <div className="pt-2 flex justify-between items-center text-sm font-black border-t border-slate-100">
                <span>المبلغ الإجمالي:</span>
                <span className="text-emerald-600 font-mono">{viewingOrder.total.toLocaleString()} ر.ي</span>
              </div>
            </div>

            <div className="pt-3 flex gap-2">
              <a
                href={`https://wa.me/967${viewingOrder.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>مراسلة العميل واتساب</span>
              </a>
              <button
                onClick={() => setViewingOrder(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
