import type {
  AdminUser,
  StatCard,
  ActivityItem,
  ChartDataPoint,
  ContentSection,
  BlogPost,
  FAQItem,
  ServiceItem,
  SiteSettings,
} from '@/types/admin';

// ============ MOCK USERS ============

export const MOCK_USERS: (AdminUser & { password: string })[] = [
  {
    id: '1',
    email: 'admin@outai.com',
    password: 'admin123',
    fullName: 'Admin OUTAI',
    role: 'super_admin',
  },
  {
    id: '2',
    email: 'editor@outai.com',
    password: 'editor123',
    fullName: 'Content Editor',
    role: 'editor',
  },
];

// ============ DASHBOARD STATS ============

export const MOCK_STATS: StatCard[] = [
  { id: '1', label: 'Total Visitors', value: '12,847', change: '+14.2%', changeType: 'positive', icon: 'users' },
  { id: '2', label: 'Form Submissions', value: '342', change: '+8.1%', changeType: 'positive', icon: 'inbox' },
  { id: '3', label: 'Blog Posts', value: '7', change: '+2', changeType: 'positive', icon: 'file-text' },
  { id: '4', label: 'Active Services', value: '5', change: '0', changeType: 'neutral', icon: 'briefcase' },
];

// ============ ACTIVITY LOG ============

export const MOCK_ACTIVITY: ActivityItem[] = [
  { id: '1', user: 'Admin OUTAI', action: 'updated', target: 'Hero section title', timestamp: '2 minutes ago' },
  { id: '2', user: 'Content Editor', action: 'published', target: 'Blog: "Exploring Abidjan"', timestamp: '1 hour ago' },
  { id: '3', user: 'Admin OUTAI', action: 'added', target: 'New FAQ item', timestamp: '3 hours ago' },
  { id: '4', user: 'Admin OUTAI', action: 'changed', target: 'Primary brand color', timestamp: '5 hours ago' },
  { id: '5', user: 'Content Editor', action: 'edited', target: 'Contact section description', timestamp: 'Yesterday' },
];

// ============ CHART DATA ============

export const MOCK_CHART_DATA: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    visitors: Math.floor(300 + Math.random() * 400),
    pageViews: Math.floor(600 + Math.random() * 800),
  };
});

// ============ CONTENT SECTIONS ============

export const MOCK_CONTENT_SECTIONS: ContentSection[] = [
  {
    id: '1',
    sectionKey: 'hero',
    title: 'Hero Section',
    fields: [
      { key: 'title', label: 'Title', type: 'text', valueEn: 'Move in comfort.', valueFr: 'Voyagez confortablement.' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', valueEn: 'Every journey counts.', valueFr: 'Chaque voyage compte.' },
      { key: 'description', label: 'Description', type: 'textarea', valueEn: 'Premium transportation services in Ivory Coast.', valueFr: 'Services de transport premium en Côte d\'Ivoire.' },
      { key: 'ctaText', label: 'CTA Button Text', type: 'text', valueEn: 'Get Started', valueFr: 'Commencer' },
    ],
  },
  {
    id: '2',
    sectionKey: 'stats',
    title: 'Stats Section',
    fields: [
      { key: 'stat1Value', label: 'Stat 1 Value', type: 'number', valueEn: '500+', valueFr: '500+' },
      { key: 'stat1Label', label: 'Stat 1 Label', type: 'text', valueEn: 'Successful Rides', valueFr: 'Courses Réussies' },
      { key: 'stat2Value', label: 'Stat 2 Value', type: 'number', valueEn: '300+', valueFr: '300+' },
      { key: 'stat2Label', label: 'Stat 2 Label', type: 'text', valueEn: 'Business Clients', valueFr: 'Clients Entreprise' },
    ],
  },
  {
    id: '3',
    sectionKey: 'services',
    title: 'Services Section',
    fields: [
      { key: 'tag', label: 'Section Tag', type: 'text', valueEn: 'Our Services', valueFr: 'Nos Services' },
      { key: 'title', label: 'Section Title', type: 'text', valueEn: 'What we offer', valueFr: 'Ce que nous offrons' },
      { key: 'description', label: 'Section Description', type: 'textarea', valueEn: 'Comprehensive transportation solutions.', valueFr: 'Solutions de transport complètes.' },
    ],
  },
  {
    id: '4',
    sectionKey: 'contact',
    title: 'Contact Section',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', valueEn: 'Get in Touch', valueFr: 'Contactez-nous' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', valueEn: 'We\'d love to hear from you', valueFr: 'Nous aimerions vous entendre' },
      { key: 'description', label: 'Description', type: 'textarea', valueEn: 'Reach out and we\'ll respond promptly.', valueFr: 'Contactez-nous et nous répondrons rapidement.' },
    ],
  },
  {
    id: '5',
    sectionKey: 'outaiWay',
    title: 'OUTAI Way Section',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', valueEn: 'The OUTAI Way', valueFr: 'La Méthode OUTAI' },
      { key: 'feature1Title', label: 'Feature 1 Title', type: 'text', valueEn: 'User Friendly', valueFr: 'Facile d\'utilisation' },
      { key: 'feature1Desc', label: 'Feature 1 Description', type: 'textarea', valueEn: 'Intuitive interface for seamless booking.', valueFr: 'Interface intuitive pour une réservation facile.' },
      { key: 'feature2Title', label: 'Feature 2 Title', type: 'text', valueEn: 'Competitive Rates', valueFr: 'Tarifs Compétitifs' },
      { key: 'feature2Desc', label: 'Feature 2 Description', type: 'textarea', valueEn: 'Best prices in the market.', valueFr: 'Les meilleurs prix du marché.' },
    ],
  },
];

// ============ BLOG POSTS ============

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    titleEn: 'Exploring the Heart of Abidjan',
    titleFr: 'Explorer le cœur d\'Abidjan',
    excerptEn: 'Discover the vibrant city of Abidjan through comfortable rides.',
    excerptFr: 'Découvrez la ville vibrante d\'Abidjan à travers des trajets confortables.',
    contentEn: 'Abidjan, the economic capital of Ivory Coast, is a city that never sleeps...',
    contentFr: 'Abidjan, la capitale économique de la Côte d\'Ivoire, est une ville qui ne dort jamais...',
    coverImageUrl: '/assets/blog/abidjan.jpg',
    isFeatured: true,
    status: 'published',
    publishedAt: '2026-01-15',
    author: 'Admin OUTAI',
    createdAt: '2026-01-14',
    updatedAt: '2026-01-15',
  },
  {
    id: '2',
    titleEn: 'Why Côte d\'Ivoire is the Next Big Travel Destination',
    titleFr: 'Pourquoi la Côte d\'Ivoire est la prochaine grande destination',
    excerptEn: 'From pristine beaches to bustling markets, discover it all.',
    excerptFr: 'Des plages vierges aux marchés animés, découvrez tout.',
    contentEn: 'Ivory Coast has been quietly building its reputation as a must-visit...',
    contentFr: 'La Côte d\'Ivoire a discrètement construit sa réputation...',
    coverImageUrl: '/assets/blog/cote-divoire.jpg',
    isFeatured: false,
    status: 'published',
    publishedAt: '2026-01-20',
    author: 'Content Editor',
    createdAt: '2026-01-19',
    updatedAt: '2026-01-20',
  },
  {
    id: '3',
    titleEn: 'OUTAI: Redefining Urban Mobility',
    titleFr: 'OUTAI: Redéfinir la Mobilité Urbaine',
    excerptEn: 'How we are changing transportation in West Africa.',
    excerptFr: 'Comment nous changeons le transport en Afrique de l\'Ouest.',
    contentEn: 'At OUTAI, we believe every journey should be an experience...',
    contentFr: 'Chez OUTAI, nous croyons que chaque voyage devrait être une expérience...',
    coverImageUrl: '',
    isFeatured: false,
    status: 'draft',
    publishedAt: '',
    author: 'Admin OUTAI',
    createdAt: '2026-02-01',
    updatedAt: '2026-02-01',
  },
];

// ============ FAQ ITEMS ============

export const MOCK_FAQ_ITEMS: FAQItem[] = [
  { id: '1', questionEn: 'How do I book a ride?', questionFr: 'Comment réserver un trajet ?', answerEn: 'You can book a ride through our mobile app or by calling our hotline.', answerFr: 'Vous pouvez réserver un trajet via notre application mobile ou en appelant notre ligne.', sortOrder: 1, isVisible: true },
  { id: '2', questionEn: 'What areas do you cover?', questionFr: 'Quelles zones couvrez-vous ?', answerEn: 'We currently operate across Abidjan and surrounding areas.', answerFr: 'Nous opérons actuellement dans tout Abidjan et ses environs.', sortOrder: 2, isVisible: true },
  { id: '3', questionEn: 'What payment methods do you accept?', questionFr: 'Quels modes de paiement acceptez-vous ?', answerEn: 'We accept cash, mobile money, and credit/debit cards.', answerFr: 'Nous acceptons les espèces, le mobile money et les cartes bancaires.', sortOrder: 3, isVisible: true },
  { id: '4', questionEn: 'How can I become a captain?', questionFr: 'Comment devenir capitaine ?', answerEn: 'Visit our office or apply online through the driver section.', answerFr: 'Visitez notre bureau ou postulez en ligne via la section conducteur.', sortOrder: 4, isVisible: true },
  { id: '5', questionEn: 'Is there a minimum fare?', questionFr: 'Y a-t-il un tarif minimum ?', answerEn: 'Yes, a minimum fare applies depending on your zone.', answerFr: 'Oui, un tarif minimum s\'applique selon votre zone.', sortOrder: 5, isVisible: true },
];

// ============ SERVICES ============

export const MOCK_SERVICES: ServiceItem[] = [
  { id: '1', titleEn: 'Rides', titleFr: 'Courses', descriptionEn: 'Premium ride-hailing service.', descriptionFr: 'Service de VTC premium.', iconName: 'car', linkHref: '#rides', sortOrder: 1, isVisible: true },
  { id: '2', titleEn: 'Daily Booking', titleFr: 'Réservation Quotidienne', descriptionEn: 'Book your driver for the day.', descriptionFr: 'Réservez votre chauffeur pour la journée.', iconName: 'calendar', linkHref: '#daily-booking', sortOrder: 2, isVisible: true },
  { id: '3', titleEn: 'Cabs', titleFr: 'Taxis', descriptionEn: 'Traditional taxi services.', descriptionFr: 'Services de taxi traditionnels.', iconName: 'cab', linkHref: '#cabs', sortOrder: 3, isVisible: true },
  { id: '4', titleEn: 'Winch', titleFr: 'Remorquage', descriptionEn: 'Emergency towing services.', descriptionFr: 'Services de remorquage d\'urgence.', iconName: 'winch', linkHref: '#winch', sortOrder: 4, isVisible: true },
  { id: '5', titleEn: 'Last Mile Delivery', titleFr: 'Livraison Dernier Kilomètre', descriptionEn: 'B2B last mile delivery solutions.', descriptionFr: 'Solutions de livraison B2B dernier kilomètre.', iconName: 'delivery', linkHref: '#last-mile', sortOrder: 5, isVisible: true },
];

// ============ SITE SETTINGS ============

export const MOCK_SETTINGS: SiteSettings = {
  siteTitle: 'OUTAI - Premium Transportation',
  metaDescription: 'Move in comfort. Every journey counts.',
  defaultLanguage: 'en',
  defaultTheme: 'dark',
  maintenanceMode: false,
};
