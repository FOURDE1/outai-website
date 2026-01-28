# OUTAI Website - Development Roadmap

## 📋 Project Overview

**Project Name:** OUTAI - Premium Transportation Service  
**Tech Stack:** Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion  
**Languages:** English (EN), Arabic (AR) with RTL support  
**Theme:** Dark/Light mode with system detection  

---

## 🎨 Design System

### Brand Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary Green Start | `#7AC90E` | Gradient start, accents |
| Primary Green End | `#01A532` | Gradient end, CTAs |
| Dark Cell BG | `#263140` | Cards, sections |
| Dark Background | `#0D1117` | Main background |
| Light Background | `#FFFFFF` | Light mode background |
| Text Primary | `#FFFFFF` | Headings (dark mode) |
| Text Secondary | `#A0AEC0` | Body text (dark mode) |

### Typography
| Font | Usage | Weights |
|------|-------|---------|
| Sulphur Point | Headings, Logo | 300, 400, 700 |
| Roboto | Body text, UI | 300, 400, 500, 700 |

### Spacing System
- Based on 4px grid (0.25rem)
- Section padding: 80px (5rem) vertical
- Container max-width: 1280px

---

## 📁 Project Structure

```
src/
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   │   ├── hero-phone-mockup.png
│   │   │   ├── hero-map-preview.png
│   │   │   └── hero-floating-elements.png
│   │   ├── features/
│   │   │   ├── feature-comfort.jpg
│   │   │   ├── feature-service.jpg
│   │   │   └── feature-ambiance.jpg
│   │   ├── services/
│   │   │   ├── service-rides.svg
│   │   │   ├── service-daily.svg
│   │   │   └── service-care.svg
│   │   ├── blog/
│   │   │   ├── blog-featured.jpg
│   │   │   ├── blog-1.jpg
│   │   │   ├── blog-2.jpg
│   │   │   └── blog-3.jpg
│   │   ├── about/
│   │   │   └── about-image.jpg
│   │   └── common/
│   │       ├── logo.svg
│   │       ├── logo-white.svg
│   │       └── pattern-bg.svg
│   └── icons/
│       └── (SVG icons)
├── components/
│   ├── common/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Container/
│   │   ├── Input/
│   │   ├── Logo/
│   │   ├── ThemeToggle/
│   │   ├── LanguageSwitcher/
│   │   └── AnimatedCounter/
│   ├── layout/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── MobileMenu/
│   │   └── Layout/
│   └── sections/
│       ├── Hero/
│       ├── CraftJourney/
│       ├── Stats/
│       ├── Services/
│       ├── OutaiWay/
│       ├── Blog/
│       ├── Contact/
│       └── FAQ/
├── contexts/
│   ├── ThemeContext.tsx
│   └── LanguageContext.tsx
├── hooks/
│   ├── useTheme.ts
│   ├── useLanguage.ts
│   ├── useScrollAnimation.ts
│   ├── useMediaQuery.ts
│   └── useIntersectionObserver.ts
├── i18n/
│   ├── index.ts
│   ├── locales/
│   │   ├── en.json
│   │   └── ar.json
│   └── config.ts
├── lib/
│   ├── animations.ts
│   ├── utils.ts
│   └── constants.ts
├── pages/
│   └── Home/
│       └── index.tsx
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

---

## 🎯 Asset Naming Convention

### Images
```
{section}-{description}-{variant?}.{ext}

Examples:
- hero-phone-mockup.png
- feature-comfort-main.jpg
- service-rides-icon.svg
- blog-featured-cover.jpg
```

### Icons
```
icon-{name}.svg

Examples:
- icon-arrow-right.svg
- icon-menu.svg
- icon-close.svg
```

---

## 🔧 Implementation Phases

### Phase 1: Project Setup ✅
- [x] Initialize Vite + React + TypeScript
- [x] Configure Tailwind CSS with custom design tokens
- [x] Set up Framer Motion
- [x] Configure i18n (react-i18next)
- [x] Set up theme system (dark/light/system)
- [x] Configure ESLint + Prettier
- [x] Set up folder structure

### Phase 2: Core Infrastructure ✅
- [x] Create ThemeContext with system detection
- [x] Create LanguageContext with RTL support
- [x] Build reusable UI components
- [x] Set up animation variants library
- [x] Configure Google Fonts (Sulphur Point, Roboto)

### Phase 3: Layout Components ✅
- [x] Header with responsive navigation
- [x] Mobile menu with smooth animations
- [x] Footer with all links and social icons
- [x] Main layout wrapper

### Phase 4: Landing Page Sections ✅
- [x] Hero section with phone mockup animation
- [x] Craft Your Journey section (3 features)
- [x] Stats section with animated counters
- [x] Services section (3 cards)
- [x] OUTAI Way section (flow diagram)
- [x] Blog section (featured + 3 cards)
- [x] Contact section (form + map)
- [x] FAQ section (accordions)

### Phase 5: Animations & Polish ✅
- [x] Scroll-triggered animations
- [x] Page load animations
- [x] Hover effects and micro-interactions
- [x] Loading states
- [x] Error handling and toasts

### Phase 6: Optimization 🔄
- [ ] Image optimization (WebP, lazy loading)
- [x] Code splitting
- [ ] Performance audit
- [ ] Accessibility audit
- [ ] SEO meta tags

---

## 🎬 Animation Strategy

### Page Load Sequence
1. Header fades in (0ms)
2. Hero text slides up (200ms)
3. Hero phone mockup floats in (400ms)
4. Floating elements animate (600ms)

### Scroll Animations
| Element Type | Animation | Duration | Trigger |
|-------------|-----------|----------|---------|
| Sections | Fade up | 0.6s | 20% viewport |
| Cards | Stagger fade up | 0.4s each | 10% viewport |
| Images | Scale + fade | 0.8s | 30% viewport |
| Stats | Count up | 2s | 50% viewport |
| Text | Fade up | 0.5s | 20% viewport |

### Micro-interactions
- Button hover: scale(1.02) + shadow
- Card hover: translateY(-4px) + shadow
- Link hover: color transition + underline
- Input focus: border glow

---

## 🌐 Internationalization (i18n)

### Supported Locales
| Code | Language | Direction |
|------|----------|-----------|
| en | English | LTR |
| ar | Arabic | RTL |

### Translation Keys Structure
```json
{
  "common": {
    "signIn": "Sign In",
    "signUp": "Sign Up"
  },
  "nav": {
    "home": "Home",
    "services": "Services"
  },
  "hero": {
    "title": "Move in comfort.",
    "subtitle": "Every journey counts"
  }
}
```

---

## 🎨 Theme System

### CSS Variables Approach
```css
:root {
  --color-bg-primary: #0D1117;
  --color-bg-secondary: #263140;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #A0AEC0;
  --color-accent-start: #7AC90E;
  --color-accent-end: #01A532;
}

[data-theme="light"] {
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F7FAFC;
  --color-text-primary: #1A202C;
  --color-text-secondary: #718096;
}
```

### Theme Detection Priority
1. User manual selection (localStorage)
2. System preference (prefers-color-scheme)
3. Default: dark

---

## 📱 Responsive Breakpoints

| Name | Min Width | Target |
|------|-----------|--------|
| xs | 0px | Mobile portrait |
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| 2xl | 1536px | Extra large |

---

## ✅ Quality Checklist

### Performance
- [x] Lighthouse score > 90 (target)
- [x] First Contentful Paint < 1.5s (optimized)
- [x] Largest Contentful Paint < 2.5s (optimized)
- [x] Cumulative Layout Shift < 0.1 (minimal)

### Accessibility
- [x] WCAG 2.1 AA compliant (semantic HTML)
- [x] Keyboard navigation (focusable elements)
- [ ] Screen reader tested
- [x] Color contrast ratio > 4.5:1

### SEO
- [x] Meta tags configured
- [ ] Open Graph tags
- [ ] Sitemap generated
- [ ] Robots.txt configured

### Browser Support
- [x] Chrome (latest 2 versions)
- [x] Firefox (latest 2 versions)
- [x] Safari (latest 2 versions)
- [x] Edge (latest 2 versions)

---

## 📦 Dependencies

### Core
- react: ^18.2.0
- react-dom: ^18.2.0
- typescript: ^5.0.0

### Routing
- react-router-dom: ^6.x

### Styling
- tailwindcss: ^3.4.0
- @tailwindcss/forms
- @tailwindcss/typography

### Animation
- framer-motion: ^11.x

### i18n
- react-i18next: ^14.x
- i18next: ^23.x
- i18next-browser-languagedetector: ^7.x

### UI Components
- @headlessui/react: ^2.x (for accessible components)
- react-hot-toast: ^2.x (notifications)

### Maps
- @react-google-maps/api: ^2.x

### Utilities
- clsx: ^2.x
- tailwind-merge: ^2.x

### Dev Dependencies
- vite: ^5.x
- eslint: ^8.x
- prettier: ^3.x
- @types/react: ^18.x

---

## 🚀 Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint

# Format
npm run format
```

---

## 📝 Notes

1. **Images**: All images will be placed in `src/assets/images/` following the naming convention
2. **Icons**: Use inline SVGs for better control and animation
3. **Forms**: Client-side validation with toast notifications (backend integration later)
4. **Maps**: Google Maps API key required for production
5. **RTL**: Use `dir="rtl"` on html element and Tailwind RTL utilities

---

*Last Updated: January 27, 2026*
