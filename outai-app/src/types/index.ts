// Theme Types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Language Types
export type Language = 'en' | 'fr';
export type Direction = 'ltr' | 'rtl';

// Navigation Types
export interface NavItem {
  id: string;
  labelKey: string;
  href: string;
  hasDropdown?: boolean;
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

// Button Types (used by Button component)
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
