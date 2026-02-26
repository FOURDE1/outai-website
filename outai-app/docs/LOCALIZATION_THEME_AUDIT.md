# 🌍 Localization & Theme Audit — OUTAI Website

> **Generated**: February 7, 2026
> **Scope**: All hardcoded strings (EN/FR), theme/dark-light mode compliance
> **Project**: `outai-app`

---

## Table of Contents

1. [Localization Status Summary](#1-localization-status-summary)
2. [Per-File Hardcoded String Inventory](#2-per-file-hardcoded-string-inventory)
3. [Type System / Language Config Mismatch](#3-type-system--language-config-mismatch)
4. [Theme / Dark-Light Mode Audit](#4-theme--dark-light-mode-audit)
5. [Per-File Hardcoded Color Inventory](#5-per-file-hardcoded-color-inventory)
6. [Missing CSS Variable Overrides](#6-missing-css-variable-overrides)
7. [Fix Plan](#7-fix-plan)

---

## 1. Localization Status Summary

| File | i18n Status | Hardcoded EN Strings | Uses `t()` |
|------|:-----------:|:--------------------:|:----------:|
| `Hero.tsx` | ✅ Mostly OK | 1 (`alt` text) | ✅ Yes |
| `CraftJourney.tsx` | ✅ Fully OK | 0 | ✅ Yes |
| `Stats.tsx` | 🟡 Partial | 3 (`alt`, stat numbers) | ✅ Yes |
| `Services.tsx` | ✅ Fully OK | 0 | ✅ Yes |
| `OutaiWay.tsx` | 🔴 Broken | 1 (section heading parts) | 🟡 Partial |
| `Blog.tsx` | 🔴 Broken | ~11 (all post data hardcoded) | 🟡 Partial |
| `Contact.tsx` | 🔴 **Critical** | ~18+ (headings, placeholders, labels, validation, button) | Has `t()` imported but barely uses it |
| `FAQ.tsx` | 🔴 **Critical** | ~12+ (tag, titles, ALL questions, ALL answers) | ❌ `useTranslation` NOT imported |
| `Footer.tsx` | 🔴 **Critical** | ~40+ (ALL column headers, ALL links, address, copyright, phone) | ❌ `useTranslation` NOT imported |
| `Header.tsx` | 🟡 Partial | 4 (`EN`, `FR` button labels) | ✅ Uses `t()` for nav |
| `ThemeToggle.tsx` | 🟡 Partial | 3 (`Light`, `Dark`, `System` tooltips) | ❌ No `t()` |
| `LastMileB2B/index.tsx` | ✅ **Best** | 0 | ✅ Fully i18n |

**Total Hardcoded English Strings**: ~90+

---

## 2. Per-File Hardcoded String Inventory

### 2.1 🔴 FAQ.tsx — ZERO i18n (12+ strings)

`useTranslation` is **not even imported**. Everything is hardcoded English:

| String | Location |
|--------|----------|
| `"FREQUENTLY ASKED QUESTIONS"` | Section tag (line ~96) |
| `"Got questions? Find quick answers!"` | Title (line ~107) |
| `"Simplifying your OUTAI experience."` | Subtitle (line ~119) |
| `"How do i Book A ride with OUTAI App?"` | Q1 (contains typo: lowercase "i") |
| `"How can i track my OUTAI ride?"` | Q2 |
| `"What type of vehicles are available on OUTAI App?"` | Q3 |
| `"How do you ensure passenger saftey?"` | Q4 (typo: "saftey" → "safety") |
| `"Can i Schedule a ride in advance"` | Q5 (missing `?`, lowercase "i") |
| `"What if i need to cancel booking?"` | Q6 |
| `"How do i pay for my ride?"` | Q7 |
| `"Is OUTAI App available for corporate accounts?"` | Q8 |
| `"Simply download our app, create an account..."` | **Same answer for ALL questions** |

**i18n keys EXIST** in both `en.json` and `fr.json` under `faq.sectionTag`, `faq.sectionTitle`, `faq.sectionSubtitle`, and `faq.questions.q1-q7`.

---

### 2.2 🔴 Footer.tsx — ZERO i18n (40+ strings)

`useTranslation` is **not imported**. Every label and link is hardcoded:

**Column Headers:**
| String | i18n key available |
|--------|--------------------|
| `"Product"` | ❌ No matching key (footer keys use "Company", "Help", "Resources") |
| `"Features"` | `footer.features` ✅ |
| `"Solutions"` | ❌ No matching key |
| `"Resources"` | `footer.resources` ✅ |
| `"Company"` | `footer.company` ✅ |

**Link Labels (30+ hardcoded):**
`Watch demo`, `Pricing`, `Paid vs Free`, `Accessibility`, `Change log`, `Status`, `Channels`, `Search`, `App & Integrations`, `Security`, `Enterprise Key`, `Customer service`, `Sales`, `Project management`, `Marketing`, `Media`, `Help Center`, `What's new`, `Resource library`, `Community`, `Events`, `About us`, `News`, `Media Kit`, `Career`, `Contact us`

> ⚠️ These link categories (Product, Features, Solutions) **don't match** the `FOOTER_LINKS` constant in `constants.ts` which uses (Company, Help, Resources, etc.) or the i18n keys.

**Bottom Bar:**
| String |
|--------|
| `"Copyright © {year} All rights reserved \| OUTAI software design and programming company"` |
| `"Boulevard de Marseille, Zone 4C, Marcory, Abidjan, Côte d'Ivoire"` |
| `"contact@outai.com"` |
| `"(123) 456-7890"` |

---

### 2.3 🔴 Contact.tsx — i18n imported but barely used (18+ strings)

`useTranslation` is imported and `t()` is available, but most visible text ignores it:

| Hardcoded String | Available i18n Key |
|------------------|--------------------|
| `"Reach Out to OUTAI,"` | `contact.sectionTitle` ✅ |
| `"We're Here to Help!"` | `contact.sectionSubtitle` ✅ |
| `"Got a question or need assistance?..."` | `contact.sectionDescription` ✅ |
| `"Our Office"` | `contact.office.title` ✅ |
| `"Location"` | `contact.location` ✅ |
| `"Contact info"` | ❌ Key needed |
| `"Boulevard de Marseille, Zone 4C, Marcory, Abidjan, Côte d'Ivoire"` | ❌ Key needed |
| `"Customercare@outai.com"` | ❌ Factual data (could be kept) |
| `"+27 16 1538525"` | ❌ Factual data |
| `"Sat - Thu: 7am - 4:30pm"` | ❌ Key needed |
| `"Contact Us"` (form title) | `contact.formTitle` ✅ |
| `"If you have any queries..."` (form desc) | `contact.formDescription` ✅ |
| `"Enter your full name"` (placeholder) | `contact.namePlaceholder` ✅ |
| `"Enter a valid email address"` (placeholder) | `contact.emailPlaceholder` ✅ |
| `"Write a message..."` (placeholder) | `contact.messagePlaceholder` ✅ |
| `"Submit"` / `"Sending..."` (button) | `common.submit` / `common.loading` ✅ |
| `"Required"` (validation errors x3) | `errors.required` ✅ |
| `"Invalid email"` (validation) | `errors.invalidEmail` ✅ |
| `"OUTAI Office Location"` (iframe title) | ❌ Key needed |

---

### 2.4 🔴 Blog.tsx — All post data hardcoded (11 strings)

Blog post data is defined as a local array at the top of the file:

| Hardcoded String | i18n Key Available |
|------------------|--------------------|
| `"Apr 20, 2024"` (featured date) | ❌ No key |
| `"Top 5 reasons why to choose OUTAI..."` (featured title) | `blog.featured.title` ✅ |
| `"Discover why OUTAI..."` (featured excerpt) | `blog.featured.excerpt` ✅ |
| `"Apr 12, 2024"` (post1 date) | ❌ No key |
| `"Discover Abidjan with OUTAI..."` (post1 title) | `blog.posts.post1.title` ✅ |
| `"Discover North Africa..."` (post1 excerpt) | `blog.posts.post1.excerpt` ✅ |
| `"Mar 28, 2024"` (post2 date) | ❌ No key |
| `"Discover Cote d'Ivoire..."` (post2 title) | `blog.posts.post2.title` ✅ |
| `"Discover Cote d'Ivoire..."` (post2 excerpt) | `blog.posts.post2.excerpt` ✅ |
| `"OUTAI"` in section title | Part of `blog.sectionTitle` |
| `"Blog"` in section title | Part of `blog.sectionTitle` |

---

### 2.5 🟡 OutaiWay.tsx — Partial i18n (1 string)

Section heading is partially hardcoded:
```tsx
Feature the {t('outaiWay.sectionTitleHighlight')} Way
//            ↑ uses t()                          ↑ hardcoded "Way"
```
The word `"Way"` at the end is hardcoded. The i18n key `outaiWay.sectionTitleEnd` exists with value `"Way"` in en.json.

---

### 2.6 🟡 Stats.tsx — Partial (3 strings)

| String | Note |
|--------|------|
| `alt="OUTAI Statistics"` | Image alt text — should use `t()` |
| `"500 +"` | Stat number display — acceptable as-is, or use `STATS` constant |
| `"300 +"` | Stat number display |

---

### 2.7 🟡 Header.tsx — Language labels (4 strings)

| String | Note |
|--------|------|
| `"EN"` | Language button label |
| `"FR"` | Language button label |
| `"EN"` (mobile) | Duplicate |
| `"FR"` (mobile) | Duplicate |

---

### 2.8 🟡 ThemeToggle.tsx — Tooltip strings (3 strings)

| String | i18n Key Available |
|--------|--------------------|
| `"Light"` | `common.light` ✅ |
| `"Dark"` | `common.dark` ✅ |
| `"System"` | `common.system` ✅ |

---

## 3. Type System / Language Config Mismatch

### 🔴 Critical Bug

**`src/types/index.ts`** defines:
```typescript
export type Language = 'en' | 'ar';  // Arabic
```

**`src/i18n/index.ts`** configures:
```typescript
export const languages = {
  en: { nativeName: 'English', dir: 'ltr' },
  fr: { nativeName: 'Français', dir: 'ltr' },  // French
};
```

**Problems:**
1. The `Language` type says `'ar'` (Arabic) but the app uses `'fr'` (French)
2. `ar.json` locale file exists but is NOT loaded in `i18n/index.ts`
3. The `LanguageContext.tsx` uses the `Language` type from types/index.ts — so changing language to French would cause a type error
4. Header only shows EN/FR buttons but the type says EN/AR

**Fix Required:**
- Change `Language` type to `'en' | 'fr'`
- OR add French to the type AND configure Arabic in i18n if Arabic support is intended

---

## 4. Theme / Dark-Light Mode Audit

### 4.1 CSS Variables Defined

`index.css` provides comprehensive theme variables:

| Variable | Dark (`:root`) | Light (`[data-theme="light"]`) |
|----------|---------------|-------------------------------|
| `--color-bg-primary` | `#1F2937` | `#FFFFFF` |
| `--color-bg-secondary` | `#1F2937` | `#F7FAFC` |
| `--color-bg-tertiary` | `#161B22` | `#EDF2F7` |
| `--color-bg-header` | `#1F2937` | `#FFFFFF` |
| `--color-bg-cell` | `#25303F` | `#F1F5F9` |
| `--color-bg-hero` | `#263140` | ❌ **MISSING** |
| `--color-text-primary` | `#FFFFFF` | `#111827` |
| `--color-text-secondary` | `#A0AEC0` | `#4A5568` |
| `--color-text-muted` | `#718096` | `#718096` |
| `--color-border` | `#2D3748` | `#E2E8F0` |

### 4.2 The Core Problem

**NONE of the section components use these CSS variables.** Every single component uses hardcoded hex inline styles:

```tsx
// What components DO (broken theme):
style={{ backgroundColor: '#1F2937', color: '#FFFFFF' }}

// What components SHOULD DO:
style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
```

**Result**: Switching to light theme changes only the `<body>` background. All section backgrounds, text colors, card backgrounds, and borders remain dark-mode colors.

### 4.3 Theme Toggle Status

- `ThemeContext.tsx`: ✅ Works correctly (sets `data-theme` attribute)
- `ThemeToggle.tsx`: ✅ UI works (Light/Dark/System buttons)
- `Header.tsx`: ✅ Includes `ThemeToggle` in desktop and mobile nav
- **All Sections**: ❌ Ignore theme completely — hardcode dark-mode hex values

---

## 5. Per-File Hardcoded Color Inventory

### Total: ~120+ hardcoded hex colors across all files

### 5.1 Contact.tsx (~15 hardcoded colors)

| Color | Should Be | Used For |
|-------|-----------|----------|
| `#1F2937` | `var(--color-bg-primary)` | Section background |
| `#FFFFFF` (x8) | `var(--color-text-primary)` | All text colors |
| `#25303F` | `var(--color-bg-cell)` | Input backgrounds |
| `#6B7280` | `var(--color-border)` | Input borders |
| `#007EFF` | *(new var needed)* | Email link color |
| `#01A532` | `var(--color-primary)` | Submit button |
| `#374151` | `var(--color-border)` | Toast border |

### 5.2 FAQ.tsx (~5 hardcoded colors)

| Color | Should Be |
|-------|-----------|
| `#263140` | `var(--color-bg-hero)` |
| `#FFFFFF` (x3) | `var(--color-text-primary)` |
| `#7AC90E` | `var(--color-primary-start)` |

### 5.3 Footer.tsx (~5 hardcoded colors)

| Color | Should Be |
|-------|-----------|
| `#1F2937` | `var(--color-bg-primary)` |
| `#FFFFFF` (x5) | `var(--color-text-primary)` |
| `#9CA3AF` (x5) | `var(--color-text-secondary)` |

### 5.4 Blog.tsx (~14 hardcoded colors)

| Color | Should Be | Note |
|-------|-----------|------|
| `#263140` | `var(--color-bg-hero)` | Section bg |
| `#1F2937` (x2) | `var(--color-bg-primary)` | Card bg |
| `#FFFFFF` (x7) | `var(--color-text-primary)` | Text |
| `#01A532` | `var(--color-primary)` | "OUTAI" in title |
| `#333333` | ❌ **BUG** | Date text (invisible on dark bg) |

### 5.5 Hero.tsx (~5 hardcoded colors)

| Color | Should Be |
|-------|-----------|
| `#263140` | `var(--color-bg-hero)` |
| `#ffffff` | `var(--color-text-primary)` |
| `#9CA3AF` | `var(--color-text-secondary)` |

### 5.6 CraftJourney.tsx (~10 hardcoded colors)

| Color | Should Be |
|-------|-----------|
| `#1F2937` | `var(--color-bg-primary)` |
| `#FFFFFF` (x8) | `var(--color-text-primary)` |
| `#01A532` | `var(--color-primary)` |

### 5.7 Stats.tsx (~10 hardcoded colors)

| Color | Should Be |
|-------|-----------|
| `#263140` | `var(--color-bg-hero)` |
| `#FFFFFF` (x4) | `var(--color-text-primary)` |
| `#01A532` | `var(--color-primary)` |
| `#7AC90E` | `var(--color-primary-start)` |
| `#FADF23` | *(accent — keep or new var)* |

### 5.8 Services.tsx (~12 hardcoded colors)

| Color | Should Be |
|-------|-----------|
| `#1F2937` | `var(--color-bg-primary)` |
| `#374151` | `var(--color-border)` |
| `#FFFFFF` (x4) | `var(--color-text-primary)` |
| `#9CA3AF` (x3) | `var(--color-text-secondary)` |
| `#4B5563` | `var(--color-border)` |

### 5.9 OutaiWay.tsx (~9 hardcoded colors + rgba glows)

| Color | Should Be |
|-------|-----------|
| `#1F2937` (x2) | `var(--color-bg-primary)` |
| `#FFFFFF` (x2) | `var(--color-text-primary)` |
| `#01A532` | `var(--color-primary)` |
| `#FADF23`, `#DA33FF`, `#2FE297`, `#FF9232`, `#07BA3C` | Feature accent colors (keep hardcoded) |

### 5.10 Header.tsx (~5 hardcoded colors)

| Color | Should Be |
|-------|-----------|
| `#1E2A36` | `var(--color-bg-secondary)` or new var |
| `#01A532` (x4) | `var(--color-primary)` |

### 5.11 LastMileB2B/index.tsx (~15 hardcoded colors)

| Color | Should Be |
|-------|-----------|
| `#1F2937` | `var(--color-bg-primary)` |
| `#263140` (x3) | `var(--color-bg-cell)` / `var(--color-bg-hero)` |
| `#FFFFFF` (x5) | `var(--color-text-primary)` |
| `#01A532` | `var(--color-primary)` |
| `#4B5563` | `var(--color-border)` |
| `#9CA3AF` | `var(--color-text-secondary)` |

---

## 6. Missing CSS Variable Overrides

### In `[data-theme="light"]` block:

| Variable | Dark Value | Light Override |
|----------|-----------|----------------|
| `--color-bg-hero` | `#263140` | ❌ **MISSING** — needs `#F8FAFC` or similar |
| `--color-primary` | `#01A532` | ❌ MISSING (same in both — OK if intentional) |
| `--color-primary-start` | `#7AC90E` | ❌ MISSING (same in both — OK if intentional) |
| `--color-link` | *(not defined)* | ❌ Need new variable for link colors |
| `--color-accent-*` | *(not defined)* | ❌ Feature card accent colors need variables |

---

## 7. Fix Plan

### Phase 1: Critical i18n Fixes (Immediate)

1. **Fix `types/index.ts`**: Change `Language = 'en' | 'ar'` → `Language = 'en' | 'fr'`
2. **Fix `FAQ.tsx`**: Import `useTranslation`, replace all hardcoded strings with `t('faq.*')` keys, use unique answers per question from locale files
3. **Fix `Footer.tsx`**: Import `useTranslation`, align link structure with i18n keys in `en.json`/`fr.json`, replace all hardcoded strings
4. **Fix `Contact.tsx`**: Replace 18+ hardcoded strings with existing `t('contact.*')` keys
5. **Fix `Blog.tsx`**: Move post data to use `t('blog.posts.*')` and `t('blog.featured.*')` keys

### Phase 2: Partial i18n Fixes

6. **Fix `OutaiWay.tsx`**: Use `t('outaiWay.sectionTitleEnd')` for the "Way" text
7. **Fix `Stats.tsx`**: Add i18n key for image alt text
8. **Fix `ThemeToggle.tsx`**: Use `t('common.light')`, `t('common.dark')`, `t('common.system')`
9. **Add missing i18n keys**: `contact.contactInfo`, `contact.hours`, `contact.iframeTitle`, blog dates

### Phase 3: Theme Compliance (All Files)

10. **Replace ALL hardcoded hex colors** with `var(--color-*)` CSS variables in every section
11. **Add missing light-mode overrides** in `index.css` (`--color-bg-hero`)
12. **Test light theme** end-to-end after all replacements
13. **Add new CSS variables** for any colors not yet defined (link blue, feature accents)

### Phase 4: Structural Alignment

14. **Align `Footer.tsx` links** with `FOOTER_LINKS` constant OR update the constant to match Figma
15. **Align `FAQ.tsx` data** with `FAQ_ITEMS` constant from `constants.ts`
16. **Configure Arabic** in `i18n/index.ts` if `ar.json` is intended to be used, or remove `ar.json`

---

*End of Localization & Theme Audit*
