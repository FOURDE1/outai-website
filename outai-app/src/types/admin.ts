// ============ AUTH ============

export type AdminRole = 'super_admin' | 'editor';

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  avatarUrl?: string;
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// ============ DASHBOARD ============

export interface StatCard {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface ChartDataPoint {
  date: string;
  visitors: number;
  pageViews: number;
}

// ============ CONTENT ============

export interface ContentField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number';
  valueEn: string;
  valueFr: string;
}

export interface ContentSection {
  id: string;
  sectionKey: string;
  title: string;
  fields: ContentField[];
}

// ============ BLOG ============

export type BlogStatus = 'draft' | 'published' | 'archived';

export interface BlogPost {
  id: string;
  titleEn: string;
  titleFr: string;
  excerptEn: string;
  excerptFr: string;
  contentEn: string;
  contentFr: string;
  coverImageUrl: string;
  isFeatured: boolean;
  status: BlogStatus;
  publishedAt: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

// ============ FAQ ============

export interface FAQItem {
  id: string;
  questionEn: string;
  questionFr: string;
  answerEn: string;
  answerFr: string;
  sortOrder: number;
  isVisible: boolean;
}

// ============ SERVICES ============

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  iconName: string;
  linkHref: string;
  sortOrder: number;
  isVisible: boolean;
}

// ============ SETTINGS ============

export interface SiteSettings {
  siteTitle: string;
  metaDescription: string;
  defaultLanguage: 'en' | 'fr';
  defaultTheme: 'dark' | 'light';
  maintenanceMode: boolean;
}

// ============ SIDEBAR NAV ============

export interface AdminNavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  requiredRole?: AdminRole;
}
