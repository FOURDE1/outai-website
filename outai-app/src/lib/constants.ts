// Navigation items
export const NAV_ITEMS = [
  { id: 'home', labelKey: 'nav.home', href: '/', hasDropdown: false },
  { id: 'services', labelKey: 'nav.services', href: '#services', hasDropdown: false },
  { id: 'contact', labelKey: 'nav.contact', href: '#contact', hasDropdown: false },
  { id: 'blog', labelKey: 'nav.blog', href: '#blog', hasDropdown: false },
  { id: 'business', labelKey: 'nav.business', href: '#business', hasDropdown: true },
] as const;

// Stats data
export const STATS = [
  { id: 'rides', value: 500, suffix: '+', labelKey: 'stats.successfulRides' },
  { id: 'clients', value: 300, suffix: '+', labelKey: 'stats.businessClients' },
] as const;

// Services data
export const SERVICES = [
  {
    id: 'rides',
    iconName: 'car',
    titleKey: 'services.rides.title',
    descriptionKey: 'services.rides.description',
    link: '#rides',
  },
  {
    id: 'daily-booking',
    iconName: 'calendar',
    titleKey: 'services.dailyBooking.title',
    descriptionKey: 'services.dailyBooking.description',
    link: '#daily-booking',
  },
  {
    id: 'cabs',
    iconName: 'cab',
    titleKey: 'services.cabs.title',
    descriptionKey: 'services.cabs.description',
    link: '#cabs',
  },
  {
    id: 'winch',
    iconName: 'winch',
    titleKey: 'services.winch.title',
    descriptionKey: 'services.winch.description',
    link: '#winch',
  },
  {
    id: 'last-mile',
    iconName: 'delivery',
    titleKey: 'services.lastMile.title',
    descriptionKey: 'services.lastMile.description',
    link: '#last-mile',
  },
] as const;

// OUTAI Way features
export const OUTAI_WAY_FEATURES = [
  {
    id: 'user-friendly',
    titleKey: 'outaiWay.userFriendly.title',
    descriptionKey: 'outaiWay.userFriendly.description',
    position: 'top-left' as const,
  },
  {
    id: 'competitive-rates',
    titleKey: 'outaiWay.competitiveRates.title',
    descriptionKey: 'outaiWay.competitiveRates.description',
    position: 'top-right' as const,
  },
  {
    id: 'awesome-services',
    titleKey: 'outaiWay.awesomeServices.title',
    descriptionKey: 'outaiWay.awesomeServices.description',
    position: 'bottom-left' as const,
  },
  {
    id: 'professional-captains',
    titleKey: 'outaiWay.professionalCaptains.title',
    descriptionKey: 'outaiWay.professionalCaptains.description',
    position: 'bottom-right' as const,
  },
  {
    id: 'around-the-clock',
    titleKey: 'outaiWay.aroundTheClock.title',
    descriptionKey: 'outaiWay.aroundTheClock.description',
    position: 'center' as const,
  },
] as const;

// FAQ items
export const FAQ_ITEMS = [
  { id: 'q1', questionKey: 'faq.questions.q1.question', answerKey: 'faq.questions.q1.answer' },
  { id: 'q2', questionKey: 'faq.questions.q2.question', answerKey: 'faq.questions.q2.answer' },
  { id: 'q3', questionKey: 'faq.questions.q3.question', answerKey: 'faq.questions.q3.answer' },
  { id: 'q4', questionKey: 'faq.questions.q4.question', answerKey: 'faq.questions.q4.answer' },
  { id: 'q5', questionKey: 'faq.questions.q5.question', answerKey: 'faq.questions.q5.answer' },
  { id: 'q6', questionKey: 'faq.questions.q6.question', answerKey: 'faq.questions.q6.answer' },
  { id: 'q7', questionKey: 'faq.questions.q7.question', answerKey: 'faq.questions.q7.answer' },
] as const;

// Office locations
export const OFFICE_LOCATIONS = [
  {
    id: 'ivory-coast',
    city: 'Abidjan',
    country: 'Ivory Coast',
    address: '6 Souissons de Marseille, Zone 42, Marcory, Abidjan, Côte d\'Ivoire',
    phone: '+225 000 000 000',
    email: 'contact@outai.com',
    coordinates: {
      lat: 5.3364,
      lng: -4.0267,
    },
  },
] as const;

// Social links
export const SOCIAL_LINKS = [
  { id: 'facebook', name: 'Facebook', url: 'https://facebook.com/outai', icon: 'facebook' },
  { id: 'twitter', name: 'Twitter', url: 'https://twitter.com/outai', icon: 'twitter' },
  { id: 'instagram', name: 'Instagram', url: 'https://instagram.com/outai', icon: 'instagram' },
  { id: 'linkedin', name: 'LinkedIn', url: 'https://linkedin.com/company/outai', icon: 'linkedin' },
] as const;

// Footer links
export const FOOTER_LINKS = {
  company: [
    { id: 'about', labelKey: 'footer.about', href: '#about' },
    { id: 'features', labelKey: 'footer.features', href: '#features' },
    { id: 'works', labelKey: 'footer.works', href: '#works' },
    { id: 'career', labelKey: 'footer.career', href: '#career' },
  ],
  help: [
    { id: 'support', labelKey: 'footer.support', href: '#support' },
    { id: 'delivery', labelKey: 'footer.deliveryDetails', href: '#delivery' },
    { id: 'terms', labelKey: 'footer.terms', href: '#terms' },
    { id: 'privacy', labelKey: 'footer.privacy', href: '#privacy' },
  ],
  resources: [
    { id: 'ebooks', labelKey: 'footer.freeEbooks', href: '#ebooks' },
    { id: 'blog', labelKey: 'footer.howToBlog', href: '#blog' },
  ],
} as const;

// Brand colors (for JavaScript usage)
export const BRAND_COLORS = {
  primaryStart: '#7AC90E',
  primaryEnd: '#01A532',
  darkBg: '#0D1117',
  darkCell: '#263140',
  darkTertiary: '#1A1F26',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0AEC0',
  textMuted: '#718096',
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Animation durations (in ms)
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 800,
} as const;

// Z-index scale
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const;

// Google Maps config
export const GOOGLE_MAPS_CONFIG = {
  defaultCenter: { lat: 5.3364, lng: -4.0267 }, // Abidjan
  defaultZoom: 14,
  styles: [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [{ color: '#263140' }],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#A0AEC0' }],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#0D1117' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#0D1117' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#1A1F26' }],
    },
  ],
} as const;
