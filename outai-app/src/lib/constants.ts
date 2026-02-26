// Navigation items
export const NAV_ITEMS = [
  { id: 'home', labelKey: 'nav.home', href: '/', hasDropdown: false },
  { id: 'services', labelKey: 'nav.services', href: '#services', hasDropdown: false },
  { id: 'contact', labelKey: 'nav.contact', href: '#contact', hasDropdown: false },
  { id: 'blog', labelKey: 'nav.blog', href: '#blog', hasDropdown: false },
  { id: 'business', labelKey: 'nav.business', href: '/last-mile-b2b', hasDropdown: true },
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

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
