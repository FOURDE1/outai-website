# OUTAI Website - Image Assets Configuration Guide

## 📁 Image Storage Structure

All images should be placed in the `src/assets/images/` directory following this structure:

```
src/assets/images/
├── hero/
│   ├── phone-mockup.png          # Main phone device mockup (transparent PNG)
│   ├── phone-screen.png          # App screenshot for phone screen
│   ├── map-preview.png           # Map preview background
│   └── floating-elements.png     # Decorative floating elements
│
├── features/
│   ├── comfort.jpg               # Refined Comfort feature image
│   ├── service.jpg               # Seamless Service feature image
│   └── ambiance.jpg              # Curated Ambiance feature image
│
├── services/
│   ├── rides-icon.svg            # Rides service icon
│   ├── rental-icon.svg           # Daily Renting service icon
│   └── care-icon.svg             # Care service icon
│
├── blog/
│   ├── featured.jpg              # Featured blog post large image
│   ├── post-1.jpg                # Blog post 1 thumbnail
│   ├── post-2.jpg                # Blog post 2 thumbnail
│   └── post-3.jpg                # Blog post 3 thumbnail
│
├── icons/
│   ├── user-friendly.svg         # OUTAI Way - User friendly icon
│   ├── competitive-rates.svg     # OUTAI Way - Competitive rates icon
│   ├── secure-rides.svg          # OUTAI Way - Secure rides icon
│   ├── comfortable.svg           # OUTAI Way - Comfortable icon
│   └── reliable-drivers.svg      # OUTAI Way - Reliable drivers icon
│
└── common/
    ├── logo.svg                  # Main logo (for header)
    ├── logo-white.svg            # White version of logo
    ├── logo-icon.svg             # Logo icon only
    ├── app-store.svg             # App Store badge
    ├── play-store.svg            # Google Play badge
    └── pattern-bg.svg            # Decorative background pattern
```

---

## 🖼️ Image Specifications

### Hero Section Images

| Image | Dimensions | Format | Notes |
|-------|-----------|--------|-------|
| phone-mockup.png | 400×800px | PNG | Transparent background, device frame |
| phone-screen.png | 360×760px | PNG/JPG | App screenshot to display on phone |
| map-preview.png | 1200×800px | PNG | Semi-transparent map background |
| floating-elements.png | Various | PNG | UI elements (pins, cards) - transparent |

### Feature Images (Craft Your Journey)

| Image | Dimensions | Format | Notes |
|-------|-----------|--------|-------|
| comfort.jpg | 600×400px | JPG | Premium car interior, warm tones |
| service.jpg | 600×400px | JPG | Driver helping passenger |
| ambiance.jpg | 600×400px | JPG | Night city ride, ambient lighting |

### Blog Images

| Image | Dimensions | Format | Notes |
|-------|-----------|--------|-------|
| featured.jpg | 800×500px | JPG | High quality hero image |
| post-1/2/3.jpg | 400×300px | JPG | Thumbnail images |

### Icons (SVG)

| Icon | Size | Colors |
|------|------|--------|
| Service icons | 64×64px | Use currentColor for theming |
| OUTAI Way icons | 48×48px | Gradient: #7AC90E → #01A532 |
| Common icons | 24×24px | currentColor |

---

## 📝 How to Add Images

### Step 1: Export from Figma

1. Select the image layer in Figma
2. Right-click → Export
3. Choose format:
   - **SVG** for icons and logos
   - **PNG @2x** for mockups and transparent images
   - **JPG @2x** for photos (80% quality)

### Step 2: Optimize Images

Use these tools to optimize before adding:
- **SVG**: [SVGO](https://jakearchibald.github.io/svgomg/) or SVGOMG
- **PNG/JPG**: [Squoosh](https://squoosh.app/) or TinyPNG
- Convert to **WebP** for better compression

### Step 3: Import in Components

```tsx
// Import the image
import phoneMockup from '@/assets/images/hero/phone-mockup.png';

// Use in JSX
<img 
  src={phoneMockup} 
  alt="OUTAI App Preview"
  className="w-full h-auto"
  loading="lazy"
/>
```

### Step 4: For Background Images

```tsx
// In Tailwind
<div 
  className="bg-cover bg-center"
  style={{ backgroundImage: `url(${mapPreview})` }}
>
```

---

## 🎨 Image Style Guidelines

### Photography Style
- **Mood**: Premium, professional, trustworthy
- **Colors**: Rich greens, dark backgrounds, golden accents
- **Subjects**: Modern vehicles, urban environments, satisfied passengers
- **Quality**: High resolution, properly lit, minimal noise

### Icon Style
- **Weight**: 2px stroke for outline icons
- **Corners**: Rounded (4px radius)
- **Style**: Linear/outline for consistency
- **Colors**: Single color using `currentColor` for theme support

### Logo Usage
- Use `logo.svg` for dark backgrounds
- Use `logo-white.svg` for light backgrounds or colored backgrounds
- Minimum size: 120px width
- Always maintain aspect ratio

---

## 🔧 Vite Image Configuration

The project is configured to handle images automatically:

```typescript
// vite.config.ts - already configured
export default defineConfig({
  // Images < 4KB are inlined as base64
  build: {
    assetsInlineLimit: 4096,
  }
});
```

---

## 📱 Responsive Images

For responsive images, create multiple sizes:

```
hero/
├── phone-mockup.png         # Default (400×800)
├── phone-mockup@2x.png      # Retina (800×1600)
└── phone-mockup-mobile.png  # Mobile (300×600)
```

Use in component:
```tsx
<img
  src={phoneMockup}
  srcSet={`${phoneMockupMobile} 300w, ${phoneMockup} 400w, ${phoneMockup2x} 800w`}
  sizes="(max-width: 640px) 300px, 400px"
  alt="OUTAI App"
/>
```

---

## ✅ Image Checklist

Before adding images, verify:

- [ ] Image is optimized (compressed)
- [ ] Correct dimensions for its purpose
- [ ] Transparent background where needed
- [ ] Follows naming convention
- [ ] Alt text is descriptive
- [ ] Loading is lazy for below-fold images
- [ ] Retina versions available for key images

---

## 🎯 Quick Reference: Where Each Image Goes

| Component | Image Location | Variable |
|-----------|---------------|----------|
| Hero.tsx | `hero/phone-mockup.png` | `phoneMockup` |
| Hero.tsx | `hero/phone-screen.png` | `phoneScreen` |
| CraftJourney.tsx | `features/comfort.jpg` | `featureComfort` |
| CraftJourney.tsx | `features/service.jpg` | `featureService` |
| CraftJourney.tsx | `features/ambiance.jpg` | `featureAmbiance` |
| Services.tsx | `services/*.svg` | Icons inline or imported |
| Blog.tsx | `blog/featured.jpg` | `blogFeatured` |
| Blog.tsx | `blog/post-*.jpg` | `blogPost1`, `blogPost2` |
| Header.tsx | Logo component handles | - |
| Footer.tsx | Logo component + badges | `appStore`, `playStore` |

---

*Last Updated: January 27, 2026*
