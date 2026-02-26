/**
 * CMS Context — React context that exposes localStorage CMS data to the
 * whole app. Components subscribe here instead of reading localStorage directly.
 * Re-renders automatically when admin saves changes (listens to 'cms-update').
 */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { ContentSection, BlogPost, FAQItem, ServiceItem, SiteSettings } from '@/types/admin';
import * as cms from '@/lib/cmsStore';

interface CmsContextValue {
  /** Content sections (hero, stats, services, contact, outaiWay) */
  contentSections: ContentSection[];
  /** Blog posts (published only for landing, all for admin) */
  blogPosts: BlogPost[];
  /** FAQ items (visible only for landing, all for admin) */
  faqItems: FAQItem[];
  /** Services (visible only for landing, all for admin) */
  services: ServiceItem[];
  /** Site settings */
  settings: SiteSettings;
  /** Image overrides map (key → base64 dataURL) */
  images: Record<string, string>;
  /** Force a refresh from localStorage */
  refresh: () => void;
}

const CmsContext = createContext<CmsContextValue | null>(null);

export function CmsProvider({ children }: { children: ReactNode }) {
  const load = useCallback(() => ({
    contentSections: cms.getContentSections(),
    blogPosts: cms.getBlogPosts(),
    faqItems: cms.getFAQItems(),
    services: cms.getServices(),
    settings: cms.getSettings(),
    images: cms.getImageMap(),
  }), []);

  const [data, setData] = useState(load);

  const refresh = useCallback(() => setData(load()), [load]);

  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener('cms-update', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('cms-update', handler);
      window.removeEventListener('storage', handler);
    };
  }, [refresh]);

  return (
    <CmsContext.Provider value={{ ...data, refresh }}>
      {children}
    </CmsContext.Provider>
  );
}

/** Hook to access the full CMS data */
export function useCms(): CmsContextValue {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error('useCms must be used within <CmsProvider>');
  return ctx;
}

/* ─── Convenience hooks for landing page components ─── */

/**
 * Get a single content section's field values for the active language.
 * Returns a record of { fieldKey: value }
 */
export function useSectionContent(sectionKey: string, lang: 'en' | 'fr' = 'en'): Record<string, string> {
  const { contentSections } = useCms();
  const section = contentSections.find((s) => s.sectionKey === sectionKey);
  if (!section) return {};
  const result: Record<string, string> = {};
  for (const f of section.fields) {
    result[f.key] = lang === 'en' ? f.valueEn : f.valueFr;
  }
  return result;
}

/** Get published blog posts only */
export function usePublishedBlogPosts(): BlogPost[] {
  const { blogPosts } = useCms();
  return blogPosts.filter((p) => p.status === 'published');
}

/** Get visible FAQ items only (sorted) */
export function useVisibleFAQItems(): FAQItem[] {
  const { faqItems } = useCms();
  return faqItems.filter((f) => f.isVisible).sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Get visible services only (sorted) */
export function useVisibleServices(): ServiceItem[] {
  const { services } = useCms();
  return services.filter((s) => s.isVisible).sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Get an overridden image or return the original src */
export function useCmsImage(imageKey: string, fallbackSrc: string): string {
  const { images } = useCms();
  return images[imageKey] || fallbackSrc;
}

/** Get site settings */
export function useSiteSettings(): SiteSettings {
  const { settings } = useCms();
  return settings;
}
