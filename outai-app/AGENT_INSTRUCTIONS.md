# OUTAI Website - Agent Instructions

## Project Overview

This is the OUTAI premium transportation service landing page built with:
- **Vite 5.x** + **React 18** + **TypeScript 5**
- **Tailwind CSS 4** with custom theme configuration
- **Framer Motion 11.x** for animations
- **react-i18next** for internationalization (English/Arabic)
- **Headless UI** for accessible components

---

## Project Structure

```
outai-app/
├── public/                     # Static assets
│   └── favicon.svg            # Site favicon
├── src/
│   ├── assets/                # Image assets (add your images here)
│   ├── components/
│   │   ├── common/            # Reusable UI components
│   │   │   ├── Button.tsx     # Primary/secondary/outline buttons
│   │   │   ├── Input.tsx      # Form inputs and textareas
│   │   │   ├── Card.tsx       # Card with variants and animations
│   │   │   ├── Container.tsx  # Layout containers and sections
│   │   │   ├── AnimatedCounter.tsx  # Scroll-triggered number counter
│   │   │   ├── Logo.tsx       # OUTAI logo component
│   │   │   ├── LanguageSwitcher.tsx # EN/AR language dropdown
│   │   │   └── ThemeToggle.tsx # Dark/light/system theme toggle
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx     # Site header with nav
│   │   │   ├── Footer.tsx     # Site footer
│   │   │   └── Layout.tsx     # Main layout wrapper
│   │   └── sections/          # Page sections
│   │       ├── Hero.tsx       # Hero section with phone mockup
│   │       ├── CraftJourney.tsx # Features section
│   │       ├── Stats.tsx      # Statistics with counters
│   │       ├── Services.tsx   # Services cards
│   │       ├── OutaiWay.tsx   # OUTAI Way feature diagram
│   │       ├── Blog.tsx       # Blog posts section
│   │       ├── FAQ.tsx        # FAQ accordion
│   │       └── Contact.tsx    # Contact form and info
│   ├── contexts/              # React contexts
│   │   ├── ThemeContext.tsx   # Dark/light theme management
│   │   └── LanguageContext.tsx # Language/RTL management
│   ├── hooks/                 # Custom React hooks
│   │   ├── useMediaQuery.ts   # Responsive breakpoint hooks
│   │   ├── useIntersectionObserver.ts # Scroll animations
│   │   └── useScroll.ts       # Scroll position hooks
│   ├── i18n/                  # Internationalization
│   │   ├── index.ts           # i18next configuration
│   │   └── locales/           # Translation files
│   │       ├── en.json        # English translations
│   │       └── ar.json        # Arabic translations
│   ├── lib/                   # Utility libraries
│   │   ├── utils.ts           # Helper functions (cn, validation)
│   │   ├── animations.ts      # Framer Motion variants
│   │   └── constants.ts       # App constants and data
│   ├── pages/                 # Page components
│   │   └── Home/
│   │       └── index.tsx      # Home page (assembles sections)
│   ├── types/                 # TypeScript types
│   │   └── index.ts           # All type definitions
│   ├── App.tsx                # Main app with routing
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles and CSS variables
├── index.html                 # HTML template
├── vite.config.ts             # Vite configuration
├── tailwind.config.ts         # Tailwind configuration (auto-generated)
└── package.json               # Dependencies and scripts
```

---

## Design System

### Brand Colors

```css
--color-primary-start: #7AC90E   /* Primary gradient start (lime green) */
--color-primary-end: #01A532     /* Primary gradient end (green) */
--color-bg-primary: #0D1117      /* Dark theme background */
--color-bg-secondary: #263140    /* Dark theme card/cell background */
```

### Typography

- **Headings**: Sulphur Point (font-heading)
- **Body**: Roboto (font-body)

### Tailwind Classes

Use these custom classes defined in the project:

```css
/* Gradients */
.gradient-text         /* Primary gradient text */
.gradient-bg           /* Primary gradient background */
.gradient-border       /* Animated gradient border */

/* Glass effect */
.glass-effect          /* Frosted glass with blur */

/* Animations */
.animate-float         /* Floating animation */
.animate-pulse-glow    /* Pulsing glow effect */
.animate-slide-up      /* Slide up entrance */
```

---

## Key Coding Patterns

### 1. Using CSS Variables with Tailwind

Always use CSS variable syntax for theme colors:

```tsx
// ✅ Correct
className="text-[var(--color-text-primary)] bg-[var(--color-bg-secondary)]"

// ❌ Avoid hardcoded colors for theme colors
className="text-white bg-gray-800"
```

### 2. Animations with Framer Motion

Import animation variants from `@/lib/animations`:

```tsx
import { fadeInUp, staggerContainer, viewportSettings } from '@/lib/animations';

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={viewportSettings}
  variants={fadeInUp}
>
  {/* Content */}
</motion.div>
```

### 3. Internationalization

Use `useTranslation` hook and translation keys:

```tsx
import { useTranslation } from 'react-i18next';

function Component() {
  const { t } = useTranslation();
  return <h1>{t('hero.title')}</h1>;
}
```

Translation keys are in `src/i18n/locales/en.json` and `ar.json`.

### 4. Theme-Aware Components

Access theme context for conditional styling:

```tsx
import { useTheme } from '@/contexts';

function Component() {
  const { theme, isDark } = useTheme();
  return <div className={isDark ? 'bg-dark' : 'bg-light'} />;
}
```

### 5. RTL Support

The LanguageContext automatically adds `dir="rtl"` to HTML when Arabic is selected. Use Tailwind's RTL utilities:

```tsx
// Spacing that respects text direction
className="ml-4 rtl:mr-4 rtl:ml-0"
// Or use logical properties
className="ms-4"  // margin-start (works for LTR and RTL)
```

### 6. Section Component Pattern

Follow this pattern for new sections:

```tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Section, SectionHeader } from '@/components/common';
import { fadeInUp, viewportSettings } from '@/lib/animations';

export function NewSection() {
  const { t } = useTranslation();

  return (
    <Section id="section-id" background="default">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={fadeInUp}
      >
        <SectionHeader
          title={t('section.title')}
          subtitle={t('section.subtitle')}
        />
        {/* Section content */}
      </motion.div>
    </Section>
  );
}
```

---

## Important Files to Know

### Adding New Translations

Edit both files when adding new text:
- `src/i18n/locales/en.json` (English)
- `src/i18n/locales/ar.json` (Arabic)

### Animation Variants

All Framer Motion variants are in `src/lib/animations.ts`:
- `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`
- `scaleIn`, `rotateIn`
- `staggerContainer`, `staggerItem`
- `cardHover`, `buttonPress`
- `floatAnimation`, `pulseAnimation`

### Constants & Data

Static data is in `src/lib/constants.ts`:
- `NAV_ITEMS` - Navigation menu items
- `STATS` - Statistics data
- `SERVICES` - Services list
- `OUTAI_WAY_FEATURES` - Feature list
- `FAQ_ITEMS` - FAQ questions and answers
- `OFFICE_LOCATIONS` - Office addresses

---

## Adding Images

1. Place images in `src/assets/` folder
2. Import and use in components:

```tsx
import heroImage from '@/assets/hero-phone-mockup.png';

<img src={heroImage} alt="OUTAI App" />
```

### Image Naming Convention

```
{section}-{description}-{variant?}.{ext}
```

Examples:
- `hero-phone-mockup.png`
- `feature-comfort-main.jpg`
- `service-rides-icon.svg`
- `blog-post-1-thumb.jpg`

---

## Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

---

## Deployment Notes

### Environment Variables

Create `.env` files for environment-specific config:

```env
# .env.production
VITE_API_URL=https://api.outai.com
VITE_GOOGLE_MAPS_KEY=your-api-key
```

### Build Output

Production build outputs to `dist/` folder. The build is optimized with:
- Code splitting for vendor, animations, and i18n chunks
- Tree shaking for unused code
- Asset optimization

---

## Common Tasks

### Add a New Section

1. Create component in `src/components/sections/NewSection.tsx`
2. Export from `src/components/sections/index.ts`
3. Add to `src/pages/Home/index.tsx`
4. Add translations to `en.json` and `ar.json`

### Add a New Language

1. Create `src/i18n/locales/{lang}.json`
2. Update `src/i18n/index.ts` to include new language
3. Add to `AVAILABLE_LANGUAGES` in `LanguageContext.tsx`

### Modify Theme Colors

Edit CSS variables in `src/index.css`:
- `:root` for dark theme (default)
- `[data-theme="light"]` for light theme

### Add Custom Animation

1. Add variant to `src/lib/animations.ts`
2. Export and use in components

---

## Notes for Future Development

1. **Form Backend**: The contact form currently shows a success toast. Integrate with your API by modifying the `handleSubmit` function in `Contact.tsx`.

2. **Google Maps**: Replace the map placeholder in `Contact.tsx` with actual Google Maps integration using `@react-google-maps/api`.

3. **Blog Content**: Blog data is static. Connect to a CMS or API to fetch dynamic content.

4. **SEO**: Add `react-helmet-async` for dynamic meta tags per page.

5. **Analytics**: Add Google Analytics or similar tracking in production.

---

## Style Guidelines

- Use Tailwind classes with CSS variables for theme colors
- Use `cn()` utility for conditional class merging
- Keep components focused and single-purpose
- Use TypeScript strict mode
- Follow React best practices (hooks rules, key props, etc.)
- Maintain RTL compatibility for all layouts
- Test in both light and dark themes
- Test in both English and Arabic languages
