import { Product, RepairOption } from '../types/store';

export const INITIAL_PRODUCTS: Product[] = [
  // ===================== الهواتف الذكية =====================
  {
    id: 'phone-iphone-16-pro-max',
    name: 'آبل آيفون 16 برو ماكس (تيتانيوم)',
    nameEn: 'Apple iPhone 16 Pro Max Titanium',
    brand: 'Apple',
    category: 'phones',
    badge: 'الأحدث وموصى به',
    price: 680000,
    originalPrice: 720000,
    rating: 4.9,
    reviewsCount: 142,
    stock: 8,
    colors: [
      { name: 'تيتانيوم صحراوي (Desert)', hex: '#C2A385', bgClass: 'bg-[#C2A385]' },
      { name: 'تيتانيوم طبيعي (Natural)', hex: '#9E978E', bgClass: 'bg-[#9E978E]' },
      { name: 'تيتانيوم أسود (Black)', hex: '#2B2B2C', bgClass: 'bg-[#2B2B2C]' },
      { name: 'تيتانيوم أبيض (White)', hex: '#EBEAE5', bgClass: 'bg-[#EBEAE5]' },
    ],
    variants: [
      { label: '256 جيجابايت', priceDelta: 0, specsSummary: 'ذاكرة تخزين 256GB' },
      { label: '512 جيجابايت', priceDelta: 85000, specsSummary: 'ذاكرة تخزين 512GB' },
      { label: '1 تيرابايت', priceDelta: 160000, specsSummary: 'ذاكرة تخزين 1TB' },
    ],
    specs: {
      'المعالج': 'Apple A18 Pro (3nm ثوري)',
      'الشاشة': '6.9 بوصة Super Retina XDR OLED بتردد 120Hz ProMotion',
      'الكاميرا الخلفية': 'كاميرا ثلاثية 48MP فيوجن + 48MP زاوية عريضة + 12MP تقريب بصري 5x',
      'الكاميرا الأمامية': '12MP TrueDepth مع دعم 4K Dolby Vision',
      'البطارية': 'حتى 33 ساعة تشغيل فيديو مع شحن سريع 25W MagSafe',
      'مقاومة الماء': 'معيار IP68 حتى عمق 6 أمتار لمدة 30 دقيقة',
      'الوزن': '227 جرام بإطار تيتانيوم مصقول',
      'نظام التشغيل': 'iOS 18 مع دعم ذكاء آبل التوليدي Apple Intelligence'
    },
    features: [
      'زر التحكم في الكاميرا Camera Control الجديد كلياً',
      'شاشة عملاقة وأطراف هي الأنحف في تاريخ هواتف آبل',
      'تصوير سينمائي بدقة 4K بمعدل 120 إطاراً في الثانية بتنسيق Dolby Vision',
      'هيكل تيتانيوم من الدرجة 5 فائق الصلابة وخفة الوزن'
    ],
    warranty: 'ضمان سنة كاملة مع فحص وبرمجة مجانية من الثريا بلاس',
    isFeatured: true,
    visualType: 'iphone16',
  },
  {
    id: 'phone-galaxy-s25-ultra',
    name: 'سامسونج جالاكسي S25 الترا 5G',
    nameEn: 'Samsung Galaxy S25 Ultra 5G',
    brand: 'Samsung',
    category: 'phones',
    badge: 'الأقوى في التصوير والذكاء',
    price: 640000,
    originalPrice: 690000,
    rating: 4.9,
    reviewsCount: 118,
    stock: 7,
    colors: [
      { name: 'تيتانيوم رمادي', hex: '#65676B', bgClass: 'bg-[#65676B]' },
      { name: 'تيتانيوم أسود فاحم', hex: '#1E1E20', bgClass: 'bg-[#1E1E20]' },
      { name: 'تيتانيوم فضي لامع', hex: '#D6D8DC', bgClass: 'bg-[#D6D8DC]' },
      { name: 'تيتانيوم أزرق محيطي', hex: '#445E7A', bgClass: 'bg-[#445E7A]' },
    ],
    variants: [
      { label: '256 جيجابايت / 12GB رام', priceDelta: 0 },
      { label: '512 جيجابايت / 16GB رام', priceDelta: 70000 },
      { label: '1 تيرابايت / 16GB رام', priceDelta: 150000 },
    ],
    specs: {
      'المعالج': 'Snapdragon 8 Elite فور جالاكسي (3nm)',
      'الشاشة': '6.86 بوصة Dynamic AMOLED 2X مسطحة بدقة QHD+ وسطوع 2600 شمعة',
      'الكاميرا الخلفية': 'مستشعر رئيسي 200MP + كاميرا 50MP بيريسكوب 5x + 50MP تقريب 3x + 50MP زاوية واسعة',
      'القلم': 'قلم S-Pen مدمج فائق الدقة',
      'البطارية': '5000 مللي أمبير مع شحن سلكي سريع 45W وشحن لاسلكي',
      'نظام التشغيل': 'One UI 7 مبني على Android 15 مع دعم تحديثات 7 سنوات',
      'الوزن': '219 جرام'
    },
    features: [
      'قلم S-Pen متطور مدمج في هيكل الهاتف',
      'زجاج Corning Gorilla Armor المقاوم للانعكاسات بنسبة 75%',
      'منظومة Galaxy AI المتقدمة للترجمة وتعديل الصور المباشر',
      'أداء ألعاب جبار بفضل غرفة التبريد البخاري الموسعة'
    ],
    warranty: 'ضمان سنة معتمد مع برمجة وتفعيل الشريحة مجاناً',
    isFeatured: true,
    visualType: 's25ultra',
  },
  {
    id: 'phone-pixel-9-pro-xl',
    name: 'جوجل بيكسل 9 برو XL',
    nameEn: 'Google Pixel 9 Pro XL',
    brand: 'Google',
    category: 'phones',
    badge: 'تجربة أندرويد الخام',
    price: 560000,
    originalPrice: 610000,
    rating: 4.8,
    reviewsCount: 64,
    stock: 5,
    colors: [
      { name: 'سبج أسود (Obsidian)', hex: '#232528', bgClass: 'bg-[#232528]' },
      { name: 'خزفي (Porcelain)', hex: '#EAE6DF', bgClass: 'bg-[#EAE6DF]' },
      { name: 'بندقي (Hazel)', hex: '#727976', bgClass: 'bg-[#727976]' },
    ],
    variants: [
      { label: '128 جيجابايت / 16GB رام', priceDelta: 0 },
      { label: '256 جيجابايت / 16GB رام', priceDelta: 45000 },
      { label: '512 جيجابايت / 16GB رام', priceDelta: 95000 },
    ],
    specs: {
      'المعالج': 'Google Tensor G4 مع شريحة الأمان Titan M2',
      'الشاشة': '6.8 بوصة Super Actua OLED بدقة 1344x2992 وسطوع 3000 شمعة',
      'الكاميرا الخلفية': '50MP رئيسية + 48MP زاوية عريضة + 48MP تقريب 5x',
      'الذاكرة العشوائية': '16 جيجابايت RAM مخصصة للذكاء الاصطناعي',
      'البطارية': '5060 مللي أمبير مع شحن فائق السرعة',
      'نظام التشغيل': 'Android 15 مع دعم تحديثات أمنية ونظامية لمدة 7 سنوات'
    },
    features: [
      'أفضل معالجة صور فوتوغرافية وميزة Add Me المبتكرة',
      'شاشة Super Actua ساطعة بوضوح استثنائي تحت أشعة الشمس المباشرة',
      'مساعد الذكاء الاصطناعي التوليدي وميزة Pixel Screenshots الذكية'
    ],
    warranty: 'ضمان سنة شامل السوفتوير والهاردوير',
    isFeatured: false,
    visualType: 'pixel9',
  },
  {
    id: 'phone-xiaomi-15-ultra',
    name: 'شاومي 15 الترا لايكا إيديشن',
    nameEn: 'Xiaomi 15 Ultra Leica Edition',
    brand: 'Xiaomi',
    category: 'phones',
    badge: 'عملاق عدسات لايكا',
    price: 520000,
    originalPrice: 570000,
    rating: 4.8,
    reviewsCount: 53,
    stock: 5,
    colors: [
      { name: 'أسود جلدي كلاسيكي', hex: '#1C1B1A', bgClass: 'bg-[#1C1B1A]' },
      { name: 'فضي تيتانيوم', hex: '#CCCCCC', bgClass: 'bg-[#CCCCCC]' },
    ],
    variants: [
      { label: '512 جيجابايت / 16GB رام', priceDelta: 0 },
      { label: '1 تيرابايت / 16GB رام', priceDelta: 75000 },
    ],
    specs: {
      'المعالج': 'Qualcomm Snapdragon 8 Elite',
      'الشاشة': '6.73 بوصة LTPO AMOLED بدقة 2K ومعدل 120Hz',
      'الكاميرا الخلفية': 'مستشعر 1 بوصة 50MP + 200MP بيريسكوب تيليفوتو + 50MP تيليفوتو عائم + 50MP زاوية واسعة',
      'الشحن': 'شحن سلكي 90W وشحن لاسلكي 80W',
      'البطارية': '5400 مللي أمبير عالية الكثافة'
    },
    features: [
      'مستشعر كاميرا 1 بوصة احترافي بعدسات Leica Summilux',
      'شحن كامل للبطارية في 35 دقيقة',
      'مقاومة تامة للغبار والماء معيار IP68'
    ],
    warranty: 'ضمان سنة من متجر الثريا بلاس',
    isFeatured: false,
    visualType: 'xiaomi15',
  },

  // ===================== الحواسيب المحمولة ولابتوبات =====================
  {
    id: 'laptop-macbook-pro-16-m4',
    name: 'آبل ماك بوك برو 16 إنش M4 برو',
    nameEn: 'Apple MacBook Pro 16" M4 Pro',
    brand: 'Apple',
    category: 'laptops',
    badge: 'الأقوى للمبدعين والمبرمجين',
    price: 1350000,
    originalPrice: 1450000,
    rating: 5.0,
    reviewsCount: 89,
    stock: 4,
    colors: [
      { name: 'أسود فضائي (Space Black)', hex: '#26282B', bgClass: 'bg-[#26282B]' },
      { name: 'فضي أنيق (Silver)', hex: '#E1E3E5', bgClass: 'bg-[#E1E3E5]' },
    ],
    variants: [
      { label: '24GB موحدة / 512GB SSD', priceDelta: 0 },
      { label: '48GB موحدة / 1TB SSD', priceDelta: 240000 },
    ],
    specs: {
      'المعالج': 'Apple M4 Pro (14 نويات وحدة معالجة مركزية + 20 نواة رسومات)',
      'الشاشة': '16.2 إنش Liquid Retina XDR بتردد 120Hz ProMotion وسطوع 1600 شمعة',
      'البطارية': 'حتى 24 ساعة من العمل المتواصل دون شاحن',
      'المنافذ': '3x Thunderbolt 5، HDMI 2.1، قارئ بطاقات SDXC، منفذ MagSafe 3',
      'الوزن': '2.14 كجم بهيكل ألمنيوم صلب'
    },
    features: [
      'شريحة M4 Pro الخارقة لأصعب مهام المونتاج والبرمجة',
      'عمر بطارية استثنائي يصل إلى 24 ساعة',
      'لوحة مفاتيح Magic Keyboard مريحة مع قارئ بصمة Touch ID'
    ],
    warranty: 'ضمان أبل الدولي مع فحص وضمان الثريا بلاس',
    isFeatured: true,
    visualType: 'macbook',
  },
  {
    id: 'laptop-dell-xps-16',
    name: 'ديل XPS 16 فائق النحافة (Core Ultra 9)',
    nameEn: 'Dell XPS 16 9640 Core Ultra 9',
    brand: 'Dell',
    category: 'laptops',
    badge: 'تصميم أيقوني وشاشة OLED',
    price: 1180000,
    originalPrice: 1260000,
    rating: 4.8,
    reviewsCount: 42,
    stock: 5,
    colors: [
      { name: 'بلاتيني فضي (Platinum)', hex: '#D8D9DD', bgClass: 'bg-[#D8D9DD]' },
      { name: 'جرافيت داكن (Graphite)', hex: '#33363B', bgClass: 'bg-[#33363B]' },
    ],
    variants: [
      { label: '32GB RAM / 1TB SSD / RTX 4070', priceDelta: 0 },
      { label: '64GB RAM / 2TB SSD / RTX 4070', priceDelta: 190000 },
    ],
    specs: {
      'المعالج': 'Intel Core Ultra 9 185H (16 نواة، تررد 5.1GHz)',
      'كرت الشاشة': 'NVIDIA GeForce RTX 4070 سعة 8GB GDDR6',
      'الشاشة': '16.3 بوصة OLED لمس بدقة 4K+ بتردد 120Hz',
      'الذاكرة والتخزين': '32 جيجابايت LPDDR5x + 1 تيرابايت NVMe PCIe Gen 4'
    },
    features: [
      'شاشة 4K OLED مبهرة مع تاتش باد لمسي مخفي',
      'هيكل ألمنيوم وزجاج غوريلا جلاس فائق الفخامة',
      'معالجة ذكاء اصطناعي NPU مدمجة'
    ],
    warranty: 'ضمان سنة كاملة مع صيانة معتمدة',
    isFeatured: false,
    visualType: 'xps16',
  },
  {
    id: 'laptop-rog-zephyrus-g16',
    name: 'أسوس روج زيفيروس G16 للألعاب وصناع المحتوى',
    nameEn: 'ASUS ROG Zephyrus G16 OLED Gaming',
    brand: 'ASUS',
    category: 'laptops',
    badge: 'وحش الألعاب والنحافة',
    price: 1150000,
    originalPrice: 1230000,
    rating: 4.9,
    reviewsCount: 71,
    stock: 3,
    colors: [
      { name: 'رمادي خسوفي مع شريط Slash Lighting', hex: '#2A2C31', bgClass: 'bg-[#2A2C31]' },
      { name: 'أبيض بلاتيني ناصع', hex: '#ECEEF2', bgClass: 'bg-[#ECEEF2]' },
    ],
    variants: [
      { label: '32GB RAM / 1TB SSD / RTX 4080', priceDelta: 0 },
    ],
    specs: {
      'المعالج': 'Intel Core Ultra 9 185H',
      'كرت الشاشة': 'NVIDIA GeForce RTX 4080 سعة 12GB TGP 115W',
      'الشاشة': '16 بوصة OLED بدقة 2.5K بتردد 240Hz وزمن استجابة 0.2ms',
      'السماكة والوزن': 'سماكة 1.49 سم فقط ووزن 1.85 كجم'
    },
    features: [
      'شاشة OLED 240Hz فائقة النعومة',
      'شريط إضاءة تفاعلي Slash Lighting على ظهر الجهاز',
      'نظام تبريد بمعدن سائل وغرفة بخار'
    ],
    warranty: 'ضمان سنة صيانة واستبدال',
    isFeatured: false,
    visualType: 'rogzephyrus',
  },

  // ===================== السماعات والصوتيات =====================
  {
    id: 'audio-airpods-pro-2-usbc',
    name: 'سماعة AirPods Pro 2 بمنفذ USB-C',
    nameEn: 'Apple AirPods Pro 2nd Gen USB-C',
    brand: 'Apple',
    category: 'audio',
    badge: 'خصم 10%',
    price: 89000,
    originalPrice: 99000,
    rating: 4.9,
    reviewsCount: 420,
    stock: 15,
    colors: [
      { name: 'أبيض لامع أبل', hex: '#FFFFFF', bgClass: 'bg-white' },
    ],
    variants: [
      { label: 'العلبة القياسية المغناطيسية', priceDelta: 0 },
      { label: 'مع غطاء حماية أصلي سيليكون', priceDelta: 5000 },
    ],
    specs: {
      'الشريحة': 'Apple H2 لمعالجة الصوت الفائقة',
      'العزل': 'عزل نشط للضوضاء ANC مضاعف بمرتين',
      'المنافذ': 'منفذ USB-C مع دعم Find My ومكبر صوت في العلبة',
      'البطارية': 'حتى 30 ساعة استماع مع العلبة'
    },
    features: [
      'نمط الشفافية المتكيفة وعزل الضوضاء النشط',
      'صوت مكاني مخصص يحيط بك من جميع الاتجاهات',
      'مقاومة الغبار ورذاذ الماء بمعيار IP54'
    ],
    warranty: 'ضمان أصلي من الثريا بلاس',
    isFeatured: true,
    visualType: 'airpods',
  },
  {
    id: 'audio-jbl-tune-520bt',
    name: 'سماعة JBL Tune 520BT بلوتوث أصلية',
    nameEn: 'JBL Tune 520BT Wireless On-Ear Headphones',
    brand: 'JBL',
    category: 'audio',
    badge: 'خصم 11%',
    price: 25000,
    originalPrice: 28000,
    rating: 4.8,
    reviewsCount: 160,
    stock: 22,
    colors: [
      { name: 'أسود مطفي', hex: '#1C1C1E', bgClass: 'bg-[#1C1C1E]' },
      { name: 'أزرق داكن', hex: '#213349', bgClass: 'bg-[#213349]' },
      { name: 'أبيض نقي', hex: '#F0F0F0', bgClass: 'bg-white' },
    ],
    variants: [
      { label: 'العلبة الأصلية كاملة', priceDelta: 0 },
    ],
    specs: {
      'البطارية': 'تصل إلى 57 ساعة من التشغيل المتواصل',
      'الشحن السريع': 'شحن لمدة 5 دقائق يعطيك 3 ساعات تشغيل إضافية',
      'الصوت': 'صوت JBL Pure Bass الشهير بنقاء فائق',
      'البلوتوث': 'إصدار Bluetooth 5.3 مع اتصال متعدد الأجهزة'
    },
    features: [
      'تصميم مريح وخفيف الوزن وقابل للطي لسهولة الحمل',
      'ميكروفون عالي الوضوح لإجراء المكالمات بوضوح',
      'تطبيق JBL Headphones لتخصيص درجات الصوت'
    ],
    warranty: 'ضمان سنة ضد عيوب التصنيع',
    isFeatured: true,
    visualType: 'airpods',
  },

  // ===================== الشواحن والكابلات =====================
  {
    id: 'chargers-anker-prime-100w-gan',
    name: 'شاحن أنكر برايم 100 واط GaN ثلاثي المنافذ',
    nameEn: 'Anker Prime 100W GaN Fast Charger',
    brand: 'Anker',
    category: 'chargers',
    badge: 'الأكثر طلباً',
    price: 36000,
    originalPrice: 42000,
    rating: 4.9,
    reviewsCount: 340,
    stock: 25,
    colors: [
      { name: 'رمادي فضائي', hex: '#373A40', bgClass: 'bg-[#373A40]' },
      { name: 'أبيض ناصع', hex: '#F5F5F7', bgClass: 'bg-[#F5F5F7]' },
    ],
    variants: [
      { label: 'شاحن جداري منفصل', priceDelta: 0 },
      { label: 'مع كابل أنكر 140 واط الأصلي', priceDelta: 8000 },
    ],
    specs: {
      'القدرة': '100 واط تقنية GaNPrime',
      'المنافذ': 'منفذين USB-C + منفذ USB-A',
      'التوافق': 'شحن هواتف آيفون وسامسونج ولابتوبات الماك وديل'
    },
    features: [
      'يشحن هاتفين ولابتوب في نفس الوقت بكفاءة تامة',
      'حجم مدمج وأمان مضاعف مع شريحة حماية من السخونة'
    ],
    warranty: 'ضمان استبدال فوري من الثريا بلاس',
    isFeatured: true,
    visualType: 'charger_gan',
  },
  {
    id: 'chargers-braided-cable-240w',
    name: 'كابل تايب سي فائق السرعة 240 واط مع شاشة واط LED',
    nameEn: '240W Fast Charging Braided Type-C Cable with Wattage Screen',
    brand: 'Ugreen',
    category: 'chargers',
    badge: 'شاشة واط ذكية',
    price: 8500,
    originalPrice: 11000,
    rating: 4.9,
    reviewsCount: 290,
    stock: 40,
    colors: [
      { name: 'أسود مضفر', hex: '#262626', bgClass: 'bg-[#262626]' },
    ],
    variants: [
      { label: 'طول 1.2 متر', priceDelta: 0 },
      { label: 'طول 2.0 متر', priceDelta: 2000 },
    ],
    specs: {
      'القدرة': 'شحن فائق السرعة حتى 240 واط بأحدث معيار PD 3.1',
      'الشاشة': 'شاشة LED حية تعرض واط الشحن الفعلي لحظياً',
      'المتانة': 'نسيج نايلون مضفر فائق التحمل ضد القطع'
    },
    features: [
      'رؤية قوة شحن هاتفك الفعلية بالواط على الشاشة',
      'متوافق مع جميع الهواتف والحواسيب'
    ],
    warranty: 'ضمان استبدال',
    isFeatured: false,
    visualType: 'braided_cable',
  },

  // ===================== البطاريات المتنقلة =====================
  {
    id: 'powerbanks-magsafe-10k',
    name: 'بطارية شحن ماج سيف لاسلكية 10,000 مللي أمبير مع ستاند',
    nameEn: 'Magnetic MagSafe 10,000mAh Power Bank with Stand',
    brand: 'Baseus',
    category: 'powerbanks',
    badge: 'مثالي للسفر',
    price: 24000,
    originalPrice: 29000,
    rating: 4.8,
    reviewsCount: 215,
    stock: 28,
    colors: [
      { name: 'تيتانيوم أسود', hex: '#1F2022', bgClass: 'bg-[#1F2022]' },
      { name: 'أبيض ثلجي', hex: '#EBEBEB', bgClass: 'bg-[#EBEBEB]' },
    ],
    variants: [
      { label: 'سعة 10,000 مللي أمبير', priceDelta: 0 },
      { label: 'سعة 20,000 مللي أمبير', priceDelta: 9000 },
    ],
    specs: {
      'السعة': '10,000 مللي أمبير ليثيوم بوليمر آمنة',
      'الشحن اللاسلكي': 'قوة مغناطيسية قوية 15W MagSafe',
      'الشحن السلكي': 'منفذ تايب سي 20W PD',
      'الستاند': 'حامل معدني مدمج قابل للطي'
    },
    features: [
      'مغناطيس N52 قوي يلتصق بظهر الهاتف بإحكام',
      'مشاهدة الفيديو أثناء شحن الهاتف عبر الستاند المدمج'
    ],
    warranty: 'ضمان سنة استبدال فوري',
    isFeatured: true,
    visualType: 'powerbank',
  },

  // ===================== الأغطية والحماية =====================
  {
    id: 'cases-glass-screen-protector-kit',
    name: 'بكج حماية شاشة زجاجي نانو مقاوم للصدمات والكسر 9H',
    nameEn: 'Ultra-Tough 9H Nano Tempered Glass Screen Protector Kit',
    brand: 'OrbitShield',
    category: 'cases',
    badge: 'حماية شاملة 9H',
    price: 7000,
    originalPrice: 9500,
    rating: 4.7,
    reviewsCount: 180,
    stock: 65,
    colors: [
      { name: 'شفاف فائق النقاوة HD', hex: '#F0F8FF', bgClass: 'bg-white' },
      { name: 'خصوصية لقافة (Privacy)', hex: '#333333', bgClass: 'bg-zinc-800' },
    ],
    variants: [
      { label: 'شاشة شفافة HD مع إطار التركيب', priceDelta: 0 },
      { label: 'شاشة حماية خصوصية لقافة', priceDelta: 2500 },
    ],
    specs: {
      'الصلابة': 'معيار صلابة 9H المقاوم للخدوش والمفاتيح والصدمات',
      'الطلاء': 'طبقة طلاء مانعة لبصمات الأصابع بنسبة 99%',
      'التركيب': 'تركيب سهل وخالي تماماً من الفقاعات'
    },
    features: [
      'تركيب مجاني في المحل مع كل عملية شراء',
      'حواف منحنية ناعمة 2.5D مريحة للأصابع'
    ],
    warranty: 'ضمان ضد الكسر عند التركيب',
    isFeatured: false,
    visualType: 'screen_protector',
  },
  {
    id: 'cases-laptop-stand-ergonomic',
    name: 'قاعدة وحامل لابتوب ألمنيوم مريح قابل للدوران 360 درجة',
    nameEn: 'Ergonomic 360 Rotating Aluminum Laptop Stand',
    brand: 'Al-Thuraya',
    category: 'cases',
    badge: 'تصميم مكتبي فاخر',
    price: 18000,
    originalPrice: 22000,
    rating: 4.8,
    reviewsCount: 168,
    stock: 35,
    colors: [
      { name: 'فضي معدني', hex: '#D2D3D5', bgClass: 'bg-[#D2D3D5]' },
      { name: 'رمادي فضائي مطفي', hex: '#4B4D52', bgClass: 'bg-[#4B4D52]' },
    ],
    variants: [
      { label: 'مقاس موحد لجميع الأجهزة (10 - 17 إنش)', priceDelta: 0 },
    ],
    specs: {
      'المادة': 'ألمنيوم طائرات مؤكسد فائق المتانة',
      'الدوران': 'قاعدة دوارة 360 درجة',
      'التبريد': 'فتحات تهوية مجوفة لتبريد المعالج'
    },
    features: [
      'تعديل الارتفاع والزاوية بحرية لحماية الرقبة والظهر',
      'وسادات سيليكون مانعة للانزلاق تحمي الجهاز'
    ],
    warranty: 'ضمان سنتين',
    isFeatured: false,
    visualType: 'laptop_stand',
  }
];

export const REPAIR_SERVICES: RepairOption[] = [
  { id: 'screen-phone', issue: 'تغيير شاشات هواتف أصلية (آيفون، سامسونج، شاومي)', estimatedPrice: 45000, duration: '40 دقيقة', warranty: 'ضمان فحص ولمس' },
  { id: 'battery-phone', issue: 'استبدال بطارية هاتف أصلية نسبة صحة 100%', estimatedPrice: 22000, duration: '30 دقيقة', warranty: 'ضمان 6 أشهر' },
  { id: 'port-phone', issue: 'إصلاح منفذ الشحن والميكروفونات والسماعات', estimatedPrice: 15000, duration: '30 دقيقة', warranty: 'ضمان 3 أشهر' },
  { id: 'flashing-software', issue: 'خدمات البرمجة وتفليش الأنظمة وفك الحسابات وتحديث السوفتوير', estimatedPrice: 12000, duration: '30 دقيقة', warranty: 'ضمان استقرار النظام' },
  { id: 'gtag-setup', issue: 'برمجة وتفعيل أجهزة التتبع الذكية G-TAG', estimatedPrice: 8000, duration: '15 دقيقة', warranty: 'دعم فني كامل' },
  { id: 'laptop-thermal', issue: 'صيانة لابتوبات: تنظيف شامل وتغيير المعجون الحراري وترقية RAM / SSD', estimatedPrice: 28000, duration: 'ساعة واحدة', warranty: 'ضمان أداء وتبريد' },
];
