/**
 * CMS Store — localStorage-based persistence layer.
 * All admin edits are saved here and the landing page reads from here.
 * When a backend is added later, replace the get/set functions with API calls.
 */

import type { ContentSection, BlogPost, FAQItem, ServiceItem, SiteSettings } from '@/types/admin';
import {
  MOCK_CONTENT_SECTIONS,
  MOCK_BLOG_POSTS,
  MOCK_FAQ_ITEMS,
  MOCK_SERVICES,
  MOCK_SETTINGS,
} from '@/admin/data/mockData';

const KEYS = {
  content: 'outai_cms_content',
  blog: 'outai_cms_blog',
  faq: 'outai_cms_faq',
  services: 'outai_cms_services',
  settings: 'outai_cms_settings',
  images: 'outai_cms_images', // key → base64 map
} as const;

/* ─────────────────── helpers ─────────────────── */

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

/* ─────────────────── Content Sections ─────────────────── */

export function getContentSections(): ContentSection[] {
  return read<ContentSection[]>(KEYS.content, MOCK_CONTENT_SECTIONS);
}

export function saveContentSections(sections: ContentSection[]): void {
  write(KEYS.content, sections);
  window.dispatchEvent(new Event('cms-update'));
}

export function updateContentSection(sectionId: string, fields: ContentSection['fields']): void {
  const sections = getContentSections();
  const updated = sections.map((s) => (s.id === sectionId ? { ...s, fields } : s));
  saveContentSections(updated);
}

/* ─────────────────── Blog ─────────────────── */

export function getBlogPosts(): BlogPost[] {
  return read<BlogPost[]>(KEYS.blog, MOCK_BLOG_POSTS);
}

export function saveBlogPosts(posts: BlogPost[]): void {
  write(KEYS.blog, posts);
  window.dispatchEvent(new Event('cms-update'));
}

/* ─────────────────── FAQ ─────────────────── */

export function getFAQItems(): FAQItem[] {
  return read<FAQItem[]>(KEYS.faq, MOCK_FAQ_ITEMS);
}

export function saveFAQItems(items: FAQItem[]): void {
  write(KEYS.faq, items);
  window.dispatchEvent(new Event('cms-update'));
}

/* ─────────────────── Services ─────────────────── */

export function getServices(): ServiceItem[] {
  return read<ServiceItem[]>(KEYS.services, MOCK_SERVICES);
}

export function saveServices(items: ServiceItem[]): void {
  write(KEYS.services, items);
  window.dispatchEvent(new Event('cms-update'));
}

/* ─────────────────── Settings ─────────────────── */

export function getSettings(): SiteSettings {
  return read<SiteSettings>(KEYS.settings, MOCK_SETTINGS);
}

export function saveSettings(settings: SiteSettings): void {
  write(KEYS.settings, settings);
  window.dispatchEvent(new Event('cms-update'));
}

/* ─────────────────── Images (base64) ─────────────────── */

export function getImageMap(): Record<string, string> {
  return read<Record<string, string>>(KEYS.images, {});
}

export function saveImage(imageKey: string, base64: string): void {
  const map = getImageMap();
  map[imageKey] = base64;
  write(KEYS.images, map);
  window.dispatchEvent(new Event('cms-update'));
}

export function getImage(imageKey: string): string | null {
  return getImageMap()[imageKey] ?? null;
}

export function deleteImage(imageKey: string): void {
  const map = getImageMap();
  delete map[imageKey];
  write(KEYS.images, map);
  window.dispatchEvent(new Event('cms-update'));
}

/** Convert a File to a base64 data-URL string */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ─────────────────── Reset ─────────────────── */

export function resetAllCmsData(): void {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  window.dispatchEvent(new Event('cms-update'));
}
