# 🔍 OUTAI Website — Full Codebase Audit

> **Generated**: February 7, 2026
> **Scope**: Architecture, Security, Performance, Optimization, Code Quality, Accessibility
> **Project**: `outai-app` (React 19 + Vite 7 + TypeScript 5.9 + Tailwind CSS v4 + Framer Motion)

---

## Table of Contents

1. [Architecture Issues](#1-architecture-issues)
2. [Security Concerns](#2-security-concerns)
3. [Performance & Optimization](#3-performance--optimization)
4. [Code Quality & Dead Code](#4-code-quality--dead-code)
5. [Type System Issues](#5-type-system-issues)
6. [Accessibility (a11y)](#6-accessibility-a11y)
7. [Component-Level Issues](#7-component-level-issues)
8. [CSS & Styling Inconsistencies](#8-css--styling-inconsistencies)
9. [Recommendations Priority Matrix](#9-recommendations-priority-matrix)

---

## 1. Architecture Issues

### 1.1 🔴 No Error Boundary

**File**: `src/components/layout/Layout.tsx`

The `Layout` component wraps all page content (`<Header />`, `<main>`, `<Footer />`) but has **no React Error Boundary**. If any section component crashes, the entire app goes white with no fallback UI.

**Fix**: Add a `<ErrorBoundary>` wrapper around `{children}` with a user-friendly fallback.

---

### 1.2 🔴 Component Library Built But Never Used

The `src/components/common/` directory contains well-built reusable components that are **never imported anywhere**:

| Component | File | Status |
|-----------|------|--------|
| `Button` | `common/Button.tsx` | ❌ Never used — all buttons are raw `<button>` or `<motion.button>` |
| `Input` | `common/Input.tsx` | ❌ Never used — Contact & LastMileB2B build their own inputs |
| `Card` | `common/Card.tsx` | ❌ Never used — sections define their own card layouts |
| `AnimatedCounter` | `common/AnimatedCounter.tsx` | ❌ Never used — Stats builds its own counter |
| `LanguageSwitcher` | `common/LanguageSwitcher.tsx` | ❌ Never used — Header builds its own EN/FR pills |

**Impact**: Massive code duplication. Each section/page rebuilds form fields, cards, and buttons from scratch with different styles.

**Fix**: Refactor sections to use the shared component library, or remove unused components to reduce bundle size.

---

### 1.3 🟡 Anti-Pattern: setState Inside useMemo

**File**: `src/components/layout/Header.tsx`

```tsx
const shouldShowMobileMenu = useMemo(() => {
  if (!isMobile && isMobileMenuOpen) {
    queueMicrotask(() => setIsMobileMenuOpen(false)); // ← side effect in useMemo
    return false;
  }
  return isMobileMenuOpen;
}, [isMobile, isMobileMenuOpen]);
```

`useMemo` should be a pure computation. State updates should be in `useEffect`.

---

### 1.4 🟡 Inline `<style>` Tags in Components

**Files**: `Hero.tsx`, `Services.tsx`

Both components inject `<style>` tags for CSS keyframes and scrollbar hiding. This creates global CSS side effects and re-injects on every render.

**Fix**: Move to `index.css` or use Framer Motion animations instead.

---

### 1.5 🟡 No Lazy Loading for Pages

**File**: `src/App.tsx`

Both `Home` and `LastMileB2B` are eagerly imported:

```tsx
import { Home, LastMileB2B } from '@/pages';
```

**Fix**: Use `React.lazy()` with `Suspense` (the `Suspense` wrapper already exists but isn't utilized):

```tsx
const Home = lazy(() => import('@/pages/Home'));
const LastMileB2B = lazy(() => import('@/pages/LastMileB2B'));
```

---

### 1.6 🟡 Constants Defined But Not Used

**File**: `src/lib/constants.ts`

- `FAQ_ITEMS` constant with 7 i18n-ready items exists but `FAQ.tsx` ignores it and uses its own hardcoded array with 8 items.
- `STATS` constant exists but `Stats.tsx` hardcodes its own `500 +` and `300 +`.
- `FOOTER_LINKS` constant exists but `Footer.tsx` has its own completely different link structure.

---

### 1.7 🟡 Mixed Styling Approaches

The codebase uses THREE different styling methods inconsistently:

| Approach | Used In |
|----------|---------|
| Tailwind CSS classes | Header, common components |
| Inline `style={{}}` objects | All sections (Hero, CraftJourney, Stats, Services, etc.) |
| CSS variables via `var(--color-*)` | index.css, some Tailwind classes |

**Impact**: Inline styles can't respond to theme changes (no `[data-theme="light"]` selector), are harder to maintain, and fight CSS specificity.

---

## 2. Security Concerns

### 2.1 🔴 XSS Risk in i18n Configuration

**File**: `src/i18n/index.ts`

```tsx
interpolation: {
  escapeValue: false, // ← Disables HTML escaping
},
```

This is safe **only if** all translations are static JSON files. If translations are ever loaded from an API, CMS, or user input, this becomes an **XSS vulnerability**.

**Recommendation**: Add a comment documenting this risk. If moving to a CMS for the admin dashboard, re-enable escaping or sanitize inputs.

---

### 2.2 🟡 No Form Input Sanitization

**Files**: `Contact.tsx`, `LastMileB2B/index.tsx`

Both forms accept user input with no sanitization:
- No max-length limits on inputs
- No input validation beyond "required" checks
- Email validation uses a basic regex (`isValidEmail` in utils.ts) that accepts many invalid addresses
- No CSRF tokens
- No rate limiting

**Current risk**: Low (forms submit to nowhere), but these must be addressed before connecting to a real API.

---

### 2.3 🟡 Non-Cryptographic Random ID Generation

**File**: `src/lib/utils.ts`

```tsx
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
```

`Math.random()` is not cryptographically secure. Fine for DOM keys, but **must never be used** for auth tokens, session IDs, or any security-sensitive purpose.

---

### 2.4 ℹ️ Placeholder Auth Links

**File**: `Header.tsx`

`#signin` and `#signup` are anchor-only hrefs that navigate nowhere. These should be clearly marked as TODO or routed to an auth page.

---

## 3. Performance & Optimization

### 3.1 🔴 Massive Animation Bundle

**File**: `src/lib/animations.ts` (727 lines)

The animation file exports **70+ animation variants**, most of which are only used in 1-2 components. The Vite build shows `animations-BTNivdKg.js` at **119.57 kB** (39.52 kB gzip).

**Fix**: Split animations into per-section files, or use dynamic imports so unused variants are tree-shaken.

---

### 3.2 🟡 No Image Optimization

**Files**: All image assets in `src/assets/`

Build output shows unoptimized images:
- `ambiance-Blz5eNSf.jpg` — **786.94 kB**
- `blog-featured-ADUJ0ExG.jpg` — **846.57 kB**
- `logo-Dk1Qvg5Y.png` — **421.05 kB**

**Fix**:
- Convert to WebP/AVIF format
- Add responsive `srcset` with multiple sizes
- Use lazy loading (`loading="lazy"`) on below-fold images
- Consider a Vite image optimization plugin (e.g., `vite-plugin-image-optimizer`)

---

### 3.3 🟡 No Code Splitting Beyond Vendor

**File**: `vite.config.ts`

Manual chunks only separate `vendor`, `animations`, and `i18n`. Individual page components are bundled together in the main chunk.

**Fix**: Add route-based code splitting with `React.lazy()`.

---

### 3.4 🟡 Google Maps Iframe Always Loads

**File**: `Contact.tsx`

The Google Maps iframe loads immediately even if the section isn't visible. It adds ~500KB of external resources.

**Fix**: Use `IntersectionObserver` to lazy-load the iframe, or use `@react-google-maps/api` (already in dependencies but unused).

---

### 3.5 ℹ️ Unused Dependencies

**File**: `package.json`

- `@react-google-maps/api` — installed but never imported
- `@headlessui/react` — installed but never imported

These add to `node_modules` size and potential security surface area.

---

## 4. Code Quality & Dead Code

### 4.1 Dead Utility Functions

**File**: `src/lib/utils.ts`

These functions are exported but **never imported anywhere**:

| Function | Purpose |
|----------|---------|
| `formatCurrency()` | Currency formatting |
| `truncateText()` | Text truncation |
| `debounce()` | Debounce function |
| `throttle()` | Throttle function |
| `generateId()` | Random ID |
| `getImageUrl()` | Placeholder images (deprecated service) |
| `formatPhoneNumber()` | Phone formatting |
| `calculateReadingTime()` | Blog reading time |
| `getInitials()` | Avatar initials |
| `hexToRGBA()` | Color conversion |
| `capitalizeWords()` | String utils |
| `sleep()` | Async delay |
| `deepClone()` | Object cloning |

**Fix**: Remove unused functions or mark as `@internal` if planned for future use.

---

### 4.2 Dead Hooks

**File**: `src/hooks/`

| Hook | Status |
|------|--------|
| `useIntersectionObserver` | ❌ Never used |
| `useMediaQuery` (base) | Only used internally by derived hooks |
| `useScrollDirection` | ❌ Never used |
| `useScrollPosition` | ❌ Never used |
| `useDebounce` | ❌ Never used |
| `useLocalStorage` | ❌ Never used |
| `useClickOutside` | ❌ Never used |
| `useKeyPress` | ❌ Never used |
| `useWindowSize` | ❌ Never used |
| `useIsRTL` | ❌ Never used |
| `useBreakpoint` | ❌ Never used |

---

### 4.3 Dead Types

**File**: `src/types/index.ts`

Many interfaces/types are exported but never imported: `Feature`, `BlogPost`, `FAQItem`, `Stat`, `OutaiWayFeature`, `AnimationVariants`, `ButtonProps`, `InputProps`, `CardProps`, `ToastType`, `ToastOptions`, `LanguageContextType` (components define their own).

---

## 5. Type System Issues

### 5.1 🔴 Language Type Mismatch

**File**: `src/types/index.ts`

```typescript
export type Language = 'en' | 'ar'; // ← says Arabic
```

But `src/i18n/index.ts` configures **English + French**:

```typescript
export const languages = {
  en: { ... },
  fr: { ... }, // ← French, not Arabic
};
```

Arabic locale file (`ar.json`) exists but is not configured in i18n. The `Language` type doesn't include `'fr'`.

---

### 5.2 🟡 NavItem Interface Incomplete

**File**: `src/types/index.ts`

```typescript
export interface NavItem {
  id: string;
  labelKey: string;
  href: string;
  children?: NavItem[];
}
```

Missing `hasDropdown` field that the `NAV_ITEMS` constant uses. The constant uses `as const` so TypeScript infers it anyway, but the interface is misleading.

---

### 5.3 🟡 LanguageContextType Has Phantom Property

```typescript
export interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // ← Never implemented; t() comes from useTranslation()
}
```

---

## 6. Accessibility (a11y)

### 6.1 🔴 WCAG Violations

| Issue | File | Severity |
|-------|------|----------|
| Card with `onClick` but no `role="button"`, `tabIndex`, or `onKeyDown` | `Card.tsx` | Critical |
| Form inputs have no `<label>` linkage (`htmlFor`/`id`) | `Contact.tsx`, `LastMileB2B` | Critical |
| No `aria-expanded` on FAQ accordion items | `FAQ.tsx` | High |
| No `aria-label` on language switcher buttons | `Header.tsx` | Medium |
| No `aria-busy` on submit buttons during loading | `Contact.tsx`, `LastMileB2B` | Medium |
| No `aria-required` on required form fields | All forms | Medium |
| No skip-to-content link | `Layout.tsx` | Medium |
| AnimatedCounter has no `aria-live` | `AnimatedCounter.tsx` | Low |
| Missing `aria-label` on carousel scroll buttons | `Services.tsx` | Medium |

---

### 6.2 🟡 Missing Form Error Announcements

Form validation errors exist in state but are not connected to inputs via `aria-describedby`. Screen readers won't announce validation errors.

---

### 6.3 🟡 Color Contrast Issues

- `#9CA3AF` label text on `#1F2937` background — contrast ratio ~3.7:1 (fails WCAG AA for normal text, requires 4.5:1)
- `#D1D5DB` text on `#263140` — ratio ~5.8:1 (passes AA but borderline)
- Blog featured card: `#333333` date text on `#1F2937` — ratio ~1.3:1 (**completely unreadable**, confirmed bug)

---

## 7. Component-Level Issues

### 7.1 Hero.tsx
- Fixed `paddingTop: '120px'` to offset header — fragile if header height changes
- Phone mockup uses fixed `width: '380px'` — not responsive
- Inline `<style>` tag for `@keyframes float`

### 7.2 CraftJourney.tsx
- Three rows use percentage widths (`43%`, `48%`) with `flexShrink: 0` — won't stack on mobile
- Font families repeated inline on every element

### 7.3 Stats.tsx
- Ignores `STATS` constant from `constants.ts` — hardcodes `500 +` and `300 +`
- Left image container: fixed `width: '500px'` — not responsive
- `alt="OUTAI Statistics"` hardcoded English

### 7.4 Services.tsx
- Card width `340px` is fixed — cards overflow on small screens
- Inline `<style>` for `.hide-scrollbar`
- Scroll arrows lack `aria-label`

### 7.5 OutaiWay.tsx
- **Section heading is hardcoded English** despite i18n keys existing
- Main container: `width: '780px'` with absolute positioning — completely non-responsive
- Feature cards use pixel positions — breaks on all screens except desktop

### 7.6 Blog.tsx
- **All blog post data hardcoded in English** at top of file
- i18n keys exist in locale files but are not used for post content
- Featured card date: `color: '#333333'` on dark background = invisible text (bug)

### 7.7 Contact.tsx
- 🔴 **~18+ hardcoded English strings** despite all i18n keys existing
- Validation errors are hardcoded (`'Required'`) not using `t('errors.required')`
- No `<label>` elements on form inputs
- Google Maps iframe loads eagerly with hardcoded English params
- Fixed column widths: `604px` and `368px`

### 7.8 FAQ.tsx
- 🔴 **`useTranslation` is not even imported** — the only section with zero i18n
- Ignores `FAQ_ITEMS` constant entirely — uses local hardcoded array
- **All questions show the same hardcoded answer**
- Multiple typos: "saftey" → "safety", lowercase "i" throughout
- 8 items locally vs 7 in constants — out of sync
- No `aria-expanded` attribute on accordion items

### 7.9 Footer.tsx
- 🔴 **~40+ hardcoded English strings**, zero i18n
- Ignores `FOOTER_LINKS` constant from `constants.ts`
- All styles are inline `style={{}}` — zero CSS variables, zero theme support
- Not responsive — 5 columns with fixed `gap: '100px'`

### 7.10 LastMileB2B/index.tsx
- ✅ Uses `t()` for all visible text (best i18n compliance)
- 🔴 **~15 hardcoded hex colors** in inline styles — zero theming
- Doesn't use `Input` component from common — rebuilds all fields
- Mixes Tailwind responsive classes with inline styles (`!important` overrides)

---

## 8. CSS & Styling Inconsistencies

### 8.1 Theme Variables Defined But Largely Unused

`index.css` defines comprehensive CSS variables:
```css
:root {
  --color-bg-primary: #1F2937;
  --color-text-primary: #FFFFFF;
  /* ... 15+ variables */
}
[data-theme="light"] {
  --color-bg-primary: #FFFFFF;
  /* ... overrides */
}
```

But sections use hardcoded hex colors in inline styles, making the light theme variables pointless.

### 8.2 Missing Light Theme Variable

`--color-bg-hero` is set in `:root` but not in `[data-theme="light"]` — the hero section background has no light-mode override.

### 8.3 Font Family Repetition

Every section repeats `fontFamily: '"Roboto", sans-serif'` or `'"Inter", sans-serif'` in inline styles instead of using `var(--font-body)` / `var(--font-heading)`.

---

## 9. Recommendations Priority Matrix

| Priority | Category | Issue | Impact |
|:--------:|----------|-------|--------|
| 🔴 P0 | i18n | FAQ.tsx — zero i18n, wrong answers, typos | Users see broken English regardless of language |
| 🔴 P0 | i18n | Contact.tsx — 18+ hardcoded strings | Contact form unusable in French |
| 🔴 P0 | i18n | Footer.tsx — 40+ hardcoded strings | Footer unusable in French |
| 🔴 P0 | Theme | All sections use hardcoded hex colors | Light theme completely broken |
| 🔴 P0 | Bug | Blog featured date `#333333` on dark bg | Text invisible |
| 🔴 P0 | Bug | FAQ shows same answer for all questions | Broken functionality |
| 🔴 P0 | Types | `Language = 'en' \| 'ar'` but i18n uses `en`/`fr` | Type mismatch |
| 🟠 P1 | Architecture | No Error Boundary | Any crash = white screen |
| 🟠 P1 | a11y | No `<label>` on form inputs | Screen readers can't navigate forms |
| 🟠 P1 | a11y | Card onClick without keyboard support | WCAG violation |
| 🟠 P1 | Responsive | OutaiWay, Stats, CraftJourney not responsive | Broken on mobile/tablet |
| 🟠 P1 | Performance | 800KB+ unoptimized images | Slow page loads |
| 🟡 P2 | Architecture | Common components never used | Code duplication everywhere |
| 🟡 P2 | Dead Code | 30+ unused functions, hooks, types | Bundle bloat, confusion |
| 🟡 P2 | Performance | No lazy loading for routes/images | Unnecessary upfront load |
| 🟡 P2 | Security | `escapeValue: false` in i18n | XSS risk if CMS added |
| 🟡 P2 | Performance | Google Maps iframe eagerly loaded | 500KB+ wasted |
| ℹ️ P3 | Cleanup | Remove unused dependencies | Smaller node_modules |
| ℹ️ P3 | Cleanup | Consistent styling approach | Maintainability |
| ℹ️ P3 | DX | Inline `<style>` tags in components | Move to CSS file |

---

*End of Audit Report*
