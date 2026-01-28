// Theme Types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Language Types
export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Navigation Types
export interface NavItem {
  id: string;
  labelKey: string;
  href: string;
  children?: NavItem[];
}

// Service Types
export interface Service {
  id: string;
  iconName: string;
  titleKey: string;
  descriptionKey: string;
  link: string;
}

// Feature Types
export interface Feature {
  id: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  titleKey: string;
  excerptKey: string;
  image: string;
  date: string;
  category: string;
  slug: string;
  featured?: boolean;
}

// FAQ Types
export interface FAQItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Stats Types
export interface Stat {
  id: string;
  value: number;
  suffix: string;
  labelKey: string;
}

// OUTAI Way Feature Types
export interface OutaiWayFeature {
  id: string;
  titleKey: string;
  descriptionKey: string;
  position: 'top-left' | 'top-right' | 'center' | 'bottom-left' | 'bottom-right';
}

// Location Types
export interface OfficeLocation {
  id: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Animation Variants
export interface AnimationVariants {
  hidden: object;
  visible: object;
  exit?: object;
}

// Button Types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

// Input Types
export interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Card Types
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

// Toast Types
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  type: ToastType;
  message: string;
  duration?: number;
}
