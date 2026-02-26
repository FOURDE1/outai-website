# OUTAI Website — Animation & Motion Plan

> **Generated for:** Full landing page animation enhancement  
> **Framework:** Framer Motion 12.29 + CSS Keyframes  
> **Constraint:** Zero breaking changes to CMS, i18n, theme, routing, or business logic  
> **Performance:** `once: true` viewport triggers, spring-based easing, GPU-accelerated transforms only

---

## 1. Header / Navbar

| Enhancement | Technique | Details |
|---|---|---|
| **Glassmorphism on scroll** | `isScrolled` state → `backdrop-filter: blur(12px)` | Smooth background transition from transparent to frosted glass when user scrolls past 50px |
| **Desktop nav link hover** | `motion.a` with `whileHover` | Underline slides in from left (`scaleX: 0→1`), text color transitions to green |
| **Logo subtle entrance** | `motion.div` wrapper | Fade in with slight scale from 0.8→1 on page load |
| **Auth buttons hover** | `motion.a` with `whileHover` | Scale up + green glow shadow on hover |
| **Header shrink** | `isScrolled` conditional height | Height reduces from 90px to 70px smoothly |

---

## 2. Hero Section

| Enhancement | Technique | Details |
|---|---|---|
| **Interactive phone demo** | Custom `PhoneDemo` component | Replaces static `<img>` with a phone frame containing cycling demo screens |
| **Cycling demo screens** | `AnimatePresence` + auto-interval | 4 colored placeholder screens auto-cycle every 3s with crossfade |
| **5-click download prompt** | Click counter + modal | After 5 taps on phone, modal slides up with App Store / Play Store buttons |
| **Green ellipse breathing** | `animate` loop | Continuous subtle scale pulse 1→1.06→1 with opacity shift |
| **CTA shimmer effect** | CSS `background-position` animation | Gradient highlight sweeps across button every 3s |
| **Heading character reveal** | Stagger per-word | Words appear one by one with spring animation |

---

## 3. CraftJourney Section ⭐ (Figma Requirement)

| Enhancement | Technique | Details |
|---|---|---|
| **Green gradient hover box** | `motion.div` with `onHoverStart/End` | A green gradient box hidden by default. On hover over the row, it expands from behind the image toward the text side, stays ~2s, then animates out. |
| **Box animation** | `width: 0→100%`, `opacity: 0→1` | Box starts collapsed behind image, expands rightward (or leftward for row 2) to span the full row |
| **Auto-dismiss** | `setTimeout` 2000ms → reverse animation | After 2 seconds visible, box smoothly collapses back |
| **Row stagger entrance** | Each row gets increasing `delay` | Row 1: 0s, Row 2: 0.2s, Row 3: 0.4s |
| **Text line-by-line** | Title and description fade in separately | Title first, then description with 0.15s delay |

---

## 4. Stats Section

| Enhancement | Technique | Details |
|---|---|---|
| **Count-up numbers** | Custom `useCountUp` hook | Numbers animate from 0 to target value when in viewport |
| **Decorative ellipse entrance** | `motion.div` with scale + blur | Yellow ellipse scales from 0 with blur, green ellipse follows with 0.3s delay |
| **Ellipse breathing pulse** | `animate` loop | Subtle scale oscillation `1→1.05→1` infinite |
| **Stat items stagger** | Increased stagger delay | Each stat bounces in with spring physics |

---

## 5. Services Section

| Enhancement | Technique | Details |
|---|---|---|
| **Section header stagger** | Tag → Title → Description sequential | Each line fades in with 0.15s stagger |
| **Scroll arrows hover** | `motion.button` with `whileHover` | Scale 1.3 + color change to green on hover |
| **Card icon spin on hover** | `whileHover: rotate: 360` on icon container | Full rotation when hovering card |
| **Divider line animation** | `scaleX: 0→1` | Line draws in from center when card appears |

---

## 6. OutaiWay Section

| Enhancement | Technique | Details |
|---|---|---|
| **Arrows SVG draw-in** | `opacity: 0→1` with delayed entrance | Arrows graphic fades in after cards start appearing |
| **Card stagger by position** | Top pair → Middle pair → Bottom single | Sequential reveal with 0.2s gaps between pairs |
| **Glow pulse on idle** | `animate` loop on glow div | Subtle glow intensity oscillation when not hovered |

---

## 7. Blog Section

| Enhancement | Technique | Details |
|---|---|---|
| **Featured Read More** | Convert `<a>` to `motion.a` | Add `whileHover: { x: 5 }` + arrow animation (matching SmallBlogCard) |
| **Cards stagger** | `staggerChildren` on container | Featured card first, then two small cards with 0.15s stagger |
| **Image parallax on hover** | `whileHover: { y: -5 }` on image | Subtle upward shift creating depth |

---

## 8. Contact Section ⚠️ (Weakest — Major Enhancement)

| Enhancement | Technique | Details |
|---|---|---|
| **Form fields stagger entrance** | Each input fades in sequentially | 0.1s delay per field from top to bottom |
| **Input focus glow** | CSS `box-shadow` transition | Green glow border on focus (`0 0 0 2px rgba(1, 165, 50, 0.3)`) |
| **Contact info stagger** | Location → Email → Phone → Hours | Each item slides in with icon + text |
| **Map entrance** | `clipPath` reveal | Map reveals from center outward with circular clip |
| **Icon animations** | `whileInView` on each icon | Icons scale in with spring bounce |
| **Submit button enhanced** | Gradient shimmer + stronger hover | Shimmer sweep on load, stronger scale on hover |
| **Success state** | Checkmark animation | Green check draws in SVG path on form success |

---

## 9. FAQ Section

| Enhancement | Technique | Details |
|---|---|---|
| **Header text stagger** | Tag → Title → Subtitle sequential | Each line fades in with 0.1s stagger |
| **Plus icon hover color** | `whileHover` color change | Turns green on button hover even before click |
| **Answer text fade-in** | Additional delay on answer content | Text fades in 0.15s after container expands |
| **Column stagger** | Left column first, right 0.2s later | Creates diagonal reveal pattern |

---

## 10. Footer

| Enhancement | Technique | Details |
|---|---|---|
| **Column stagger entrance** | Logo → Columns 1 → 2 → 3 | Sequential reveal left to right |
| **Bottom bar slide up** | `fadeInUp` with delay | Bottom bar with contact info enters after main content |
| **Social icons bounce** | `staggerChildren` with spring | Icons pop in one by one with bounce |

---

## Performance Notes

- All scroll animations use `once: true` — fire only on first view
- Only `transform` and `opacity` are animated (GPU-composited)
- No `layout` animations on large containers (avoids reflow)
- Spring physics preferred over duration-based for natural feel
- `will-change: transform` applied sparingly via Framer Motion's internal handling
- Phone demo screens are lightweight colored divs, not heavy images

---

## Implementation Priority

1. **CraftJourney green box** (Figma-mandated)
2. **Hero interactive phone** (User-specified)
3. **Contact section** (Weakest — biggest impact)
4. **Header glassmorphism** (First thing users see)
5. **Stats count-up** (High visual impact)
6. **All remaining sections** (Refinement pass)
7. **Build verification**
