# 🛠️ OUTAI Admin Dashboard — Implementation Plan

> **Generated**: February 7, 2026
> **Scope**: Full admin dashboard at `/admin` with login, content management, theming, and site control
> **Stack**: React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion (existing)
> **Backend (future)**: AWS — Cognito (auth), API Gateway + Lambda (API), DynamoDB/RDS (DB), S3 + CloudFront (media)

---

## Table of Contents

1. [Overview & Goals](#1-overview--goals)
2. [Architecture](#2-architecture)
3. [Technology Stack](#3-technology-stack)
4. [Authentication System](#4-authentication-system)
5. [Dashboard Layout & Navigation](#5-dashboard-layout--navigation)
6. [Feature Modules](#6-feature-modules)
7. [File & Folder Structure](#7-file--folder-structure)
8. [Implementation Phases](#8-implementation-phases)
9. [AWS Backend Integration (Future)](#9-aws-backend-integration-future)
10. [Security Considerations](#10-security-considerations)

---

## 1. Overview & Goals

Build a professional admin dashboard accessible at `/admin` that provides full control over the OUTAI website content, styling, and configuration.

**Phase A (current)**: Frontend-only with mock data and local state — all UI, navigation, forms, and interactions fully functional.

**Phase B (future)**: Wire to AWS backend — Cognito for auth, API Gateway + Lambda for APIs, DynamoDB/RDS for data, S3 + CloudFront for media.

### Core Capabilities

| Feature | Description | Phase |
|---------|-------------|-------|
| **Authentication** | Login page with mock auth (→ AWS Cognito later) | A (mock) → B (real) |
| **Theme Control** | Live color picker for all brand colors, light/dark mode defaults | A |
| **Content Management** | Edit all text, headings, descriptions across all sections | A |
| **Media Management** | Upload/replace images with preview (→ S3 later) | A (UI) → B (S3) |
| **Blog Management** | CRUD for blog posts with rich text editor | A |
| **FAQ Management** | Add/edit/reorder/delete FAQ items | A |
| **Service Management** | Edit service cards, descriptions, ordering | A |
| **Settings** | SEO meta tags, language configuration | A |
| **Analytics** | Dashboard overview with mock visitor stats | A (mock) → B (real) |

---

## 2. Architecture

### Phase A — Frontend Only (Current)

```
┌──────────────────────────────────────────────────────────┐
│                      FRONTEND                             │
│                                                           │
│  ┌──────────┐   ┌──────────────┐   ┌──────────────────┐ │
│  │  Public   │   │    Admin     │   │   Shared         │ │
│  │  Website  │   │  Dashboard   │   │   Contexts &     │ │
│  │  (/, etc) │   │  (/admin/*)  │   │   Mock API Layer │ │
│  └─────┬────┘   └──────┬───────┘   └────────┬─────────┘ │
│        │               │                     │           │
│        └───────────┬───┘─────────────────────┘           │
│                    │                                      │
│             ┌──────▼──────┐                               │
│             │  Mock API   │  ← localStorage / in-memory   │
│             │  Service    │    state for all data          │
│             └─────────────┘                               │
└──────────────────────────────────────────────────────────┘
```

### Phase B — With AWS Backend (Future)

```
┌──────────────────────────────────────────────────────────┐
│                      FRONTEND                             │
│  (same as above, swap mock service → real API calls)      │
└────────────────────────┬─────────────────────────────────┘
                         │ HTTPS
┌────────────────────────▼─────────────────────────────────┐
│                       AWS                                 │
│                                                           │
│  ┌──────────┐  ┌──────────────┐  ┌────────┐  ┌────────┐ │
│  │ Cognito  │  │ API Gateway  │  │   S3   │  │ Cloud  │ │
│  │  (Auth)  │  │  + Lambda    │  │(Media) │  │ Front  │ │
│  └──────────┘  └──────┬───────┘  └────────┘  └────────┘ │
│                       │                                   │
│               ┌───────▼────────┐                          │
│               │  DynamoDB /    │                          │
│               │  RDS Postgres  │                          │
│               └────────────────┘                          │
└──────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **Code-split admin from public site** — Admin bundle lazy-loaded, never shipped to regular visitors
2. **API abstraction layer** — All data access goes through a service layer; swap mock → AWS with zero UI changes
3. **Optimistic updates** — Admin changes reflect instantly in the UI
4. **Mock-first development** — Full admin UX works without any backend

---

## 3. Technology Stack

### Frontend Dependencies (Phase A)

| Package | Purpose | Notes |
|---------|---------|-------|
| `react-hook-form` + `zod` + `@hookform/resolvers` | Form handling + validation | All admin forms |
| `recharts` | Analytics charts on dashboard overview | Lightweight charting |
| `react-colorful` | Color picker for theme control | 3KB, zero deps |
| Existing: `framer-motion` | Page transitions, toast animations | Already installed |
| Existing: `react-hot-toast` | Notifications | Already installed |
| Existing: `react-router-dom` | Admin routing | Already installed |
| Existing: `@headlessui/react` | Dropdowns, menus | Already installed |

### Future Dependencies (Phase B — AWS)

| Package | Purpose |
|---------|---------|
| `aws-amplify` or `@aws-sdk/client-*` | AWS Cognito auth, S3 uploads, API calls |
| `@tanstack/react-query` | Data fetching, caching, mutations against real API |
| `@tiptap/react` | Rich text editor for blog posts |
| `@dnd-kit/core` | Drag-and-drop reordering (FAQ, services) |

---

## 4. Authentication System

### 4.1 Login Flow (Phase A — Mock)

```
User visits /admin
        │
        ▼
┌─── Is authenticated? ───┐
│   (check local state)    │
│ NO                       │ YES
▼                          ▼
Show Login Page      Show Dashboard
  │
  ▼
Email + Password
  │
  ▼
Mock Auth Service
  │
  ├─ Matches mock credentials ──► Set auth state → Dashboard
  │
  └─ No match → Show Error
```

**Mock credentials** (hardcoded for dev):
- Email: `admin@outai.com` / Password: `admin123` → role: `super_admin`
- Email: `editor@outai.com` / Password: `editor123` → role: `editor`

### 4.2 Route Protection

```tsx
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin" element={<ProtectedRoute />}>
  <Route index element={<DashboardOverview />} />
  <Route path="content" element={<ContentManager />} />
  <Route path="blog" element={<BlogManager />} />
  <Route path="faq" element={<FAQManager />} />
  <Route path="services" element={<ServiceManager />} />
  <Route path="settings" element={<SettingsManager />} />
</Route>
```

### 4.3 Roles & Permissions

| Permission | Super Admin | Editor |
|------------|:-----------:|:------:|
| View Dashboard | ✅ | ✅ |
| Edit Content (text, FAQ, blog) | ✅ | ✅ |
| Upload Media | ✅ | ✅ |
| Change Theme Colors | ✅ | ❌ |
| Manage Users | ✅ | ❌ |
| Edit SEO/Settings | ✅ | ❌ |
| Delete Content | ✅ | ❌ |
| View Analytics | ✅ | ✅ |

---

## 5. Dashboard Layout & Navigation

### 5.1 Layout Structure

```
┌──────────────────────────────────────────────────────────┐
│  Top Bar: OUTAI Logo | Search | Notifications | Avatar ▼ │
├────────────┬─────────────────────────────────────────────┤
│            │                                             │
│  Sidebar   │            Main Content Area                │
│            │                                             │
│  📊 Overview│  ┌─────────────────────────────────────┐   │
│  📝 Content│  │                                     │   │
│  📰 Blog   │  │     Dynamic content based on         │   │
│  ❓ FAQ    │  │     selected sidebar item            │   │
│  🚗 Services│ │                                     │   │
│  ⚙️ Settings│ │                                     │   │
│            │  │                                     │   │
│            │  └─────────────────────────────────────┘   │
│            │                                             │
├────────────┴─────────────────────────────────────────────┤
│  Status Bar: Last saved · v0.1.0                         │
└──────────────────────────────────────────────────────────┘
```

### 5.2 Design System

- **Style**: Clean, minimal, professional — inspired by Vercel/Linear dashboards
- **Colors**: Neutral grays with OUTAI green accents, uses CSS variables
- **Typography**: Same as main site (Sulphur Point headings, Roboto body)
- **Dark/Light**: Admin inherits the app's ThemeContext
- **Animations**: Subtle Framer Motion transitions (page fade, sidebar slide)
- **Responsive**: Sidebar collapses to hamburger on mobile

---

## 6. Feature Modules

### 6.1 📊 Dashboard Overview

| Widget | Data (mock for now) |
|--------|---------------------|
| **Quick Stats Cards** | Total visitors, Form submissions, Active blog posts, Total services |
| **Recent Activity** | Timeline of recent edits (mock entries) |
| **Traffic Chart** | Line chart with mock 30-day data (recharts) |
| **Quick Actions** | Buttons: New Blog Post, Edit Hero, View Site |

### 6.2 📝 Content Manager

Organized by section with inline editing:

| Section | Editable Fields |
|---------|-----------------|
| **Hero** | Title, subtitle, description, CTA text |
| **Stats** | Stat1 value/label, Stat2 value/label |
| **Services** | Section tag, title, description |
| **OUTAI Way** | Section title, 5× feature (title, description) |
| **Contact** | Section title, subtitle, description, form labels |

Each section is a collapsible panel. Click "Edit" → fields become inputs → "Save" button.

### 6.3 📰 Blog Manager

| Feature | Description |
|---------|-------------|
| **Post List** | Table with title, status (draft/published), date, actions |
| **Create/Edit** | Form with title, excerpt, content (textarea for now, TipTap later), cover image URL |
| **Featured Toggle** | Mark one post as featured |
| **Status Toggle** | Draft / Published / Archived |
| **Multilingual** | EN/FR tabs for content fields |

### 6.4 ❓ FAQ Manager

| Feature | Description |
|---------|-------------|
| **List View** | All FAQ items with edit/delete buttons |
| **Add/Edit** | Question + Answer fields per language (EN/FR tabs) |
| **Reorder** | Move up/down buttons (drag-and-drop in Phase B) |
| **Delete** | With confirmation dialog |

### 6.5 🚗 Services Manager

| Feature | Description |
|---------|-------------|
| **Card List** | All service cards with edit/delete |
| **Edit Form** | Title, description, icon name, link, per language |
| **Visibility** | Toggle show/hide |
| **Reorder** | Move up/down buttons |
| **Add New** | Create new service cards |

### 6.6 ⚙️ Settings

| Setting | Type |
|---------|------|
| **Site Title** | Text input |
| **Meta Description** | Textarea |
| **Default Language** | Dropdown (EN/FR) |
| **Default Theme** | Toggle (Dark/Light) |
| **Maintenance Mode** | Toggle |

---

## 7. File & Folder Structure

```
src/
├── admin/                           # Admin module (lazy-loaded)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminLayout.tsx      # Sidebar + topbar + main area
│   │   │   ├── AdminSidebar.tsx     # Navigation sidebar
│   │   │   └── AdminTopbar.tsx      # Top bar with search + user menu
│   │   └── common/
│   │       ├── StatCard.tsx         # Dashboard stat card
│   │       ├── SectionEditor.tsx    # Collapsible content section editor
│   │       └── ConfirmDialog.tsx    # Delete confirmation modal
│   ├── pages/
│   │   ├── AdminLogin.tsx           # Login page
│   │   ├── DashboardOverview.tsx    # Main dashboard with stats
│   │   ├── ContentManager.tsx       # Section content editor
│   │   ├── BlogManager.tsx          # Blog CRUD
│   │   ├── FAQManager.tsx           # FAQ CRUD
│   │   ├── ServiceManager.tsx       # Service CRUD
│   │   └── SettingsManager.tsx      # Site settings
│   ├── contexts/
│   │   └── AuthContext.tsx          # Auth state (mock now → Cognito later)
│   ├── data/
│   │   └── mockData.ts             # All mock data for dashboard
│   ├── guards/
│   │   └── ProtectedRoute.tsx      # Auth guard component
│   └── index.ts                    # Admin barrel export
│
├── components/                      # Existing public site components
├── contexts/                        # Existing contexts (Theme, Language)
├── hooks/                           # Existing hooks
├── i18n/                            # Existing i18n
├── lib/                             # Existing utils
├── pages/                           # Existing pages (Home, LastMileB2B)
├── types/
│   ├── index.ts                     # Existing types
│   └── admin.ts                     # Admin-specific types
├── App.tsx                          # Updated with admin routes
└── main.tsx
```

---

## 8. Implementation Phases

### Phase A: Frontend Only (Current)

**A1 — Foundation (Auth + Layout)**
1. Create admin types (`types/admin.ts`)
2. Create mock data (`admin/data/mockData.ts`)
3. Build `AuthContext.tsx` with mock login/logout
4. Build `AdminLogin.tsx` with email/password form
5. Build `ProtectedRoute.tsx` with auth guard
6. Build `AdminLayout.tsx`, `AdminSidebar.tsx`, `AdminTopbar.tsx`
7. Add lazy-loaded `/admin/*` routes in `App.tsx`
8. Build `DashboardOverview.tsx` with stat cards + mock chart

**A2 — Content & Blog**
1. Build `ContentManager.tsx` with collapsible section editors
2. Build `BlogManager.tsx` with list/create/edit forms
3. Build `FAQManager.tsx` with add/edit/delete/reorder
4. Build `ServiceManager.tsx` with card editing
5. Build `SettingsManager.tsx` with site settings form

### Phase B: AWS Backend (Future)

**B1 — Authentication**
- Set up AWS Cognito user pool
- Replace mock auth with `aws-amplify` Auth
- Add real JWT token handling

**B2 — API + Database**
- Create API Gateway + Lambda functions for each resource
- Set up DynamoDB tables (or RDS if relational preferred)
- Install `@tanstack/react-query`, replace mock data with real API calls
- Migrate public site sections to read from API

**B3 — Media + Storage**
- Set up S3 bucket + CloudFront CDN
- Build real image upload with presigned URLs
- Add image optimization (Lambda@Edge or CloudFront Functions)

**B4 — Analytics + Polish**
- Set up CloudWatch / custom analytics table
- Wire real visitor stats to dashboard
- Add activity logging

---

## 9. AWS Backend Integration (Future)

When ready to add the backend, the AWS services map as follows:

| Admin Feature | AWS Service |
|---------------|-------------|
| Authentication | **Cognito** — User pools, JWT tokens, MFA |
| API Layer | **API Gateway** — REST/HTTP API with Lambda authorizers |
| Business Logic | **Lambda** — Node.js/Python handlers per resource |
| Database | **DynamoDB** (NoSQL) or **RDS PostgreSQL** (relational) |
| Media Storage | **S3** — Buckets for images with lifecycle policies |
| Media CDN | **CloudFront** — Global distribution for images |
| File Processing | **Lambda** — Image resize on upload trigger |
| Monitoring | **CloudWatch** — Logs, metrics, alarms |
| Infrastructure | **CDK** or **Terraform** — IaC for all resources |

### Database Tables (DynamoDB)

| Table | Partition Key | Sort Key | Purpose |
|-------|--------------|----------|---------|
| `SectionContent` | `sectionKey` | `fieldKey` | Hero, Stats, etc. text content |
| `BlogPosts` | `id` | `createdAt` | Blog post data |
| `FAQItems` | `id` | `sortOrder` | FAQ questions & answers |
| `Services` | `id` | `sortOrder` | Service cards |
| `SiteSettings` | `key` | — | Global settings |
| `Media` | `id` | `createdAt` | Uploaded file metadata |
| `ActivityLog` | `userId` | `createdAt` | Admin action history |

---

## 10. Security Considerations

| Concern | Phase A (Mock) | Phase B (AWS) |
|---------|---------------|--------------|
| **Auth** | Mock credentials, no real security | Cognito JWT with token refresh |
| **Route protection** | Client-side guard only | Cognito + API Gateway authorizers |
| **Data persistence** | In-memory / localStorage | DynamoDB with IAM policies |
| **File uploads** | URL input only | S3 presigned URLs, MIME validation |
| **XSS** | React auto-escapes | DOMPurify for rich text |
| **CSRF** | N/A (no backend) | Bearer tokens (CSRF-immune) |
| **Rate limiting** | N/A | API Gateway throttling |
| **Secrets** | No secrets in frontend | Cognito tokens, no AWS keys exposed |

---

## Summary

This admin dashboard is built **frontend-first**:

- **Phase A** delivers a fully functional admin UI with mock data — all pages, forms, interactions, and navigation work out of the box
- **Phase B** swaps the mock API service layer for real AWS calls — zero UI changes needed
- **Architecture** uses a clean service abstraction so the backend swap is seamless
- The admin bundle is **lazy-loaded** and never shipped to public site visitors

---

*End of Admin Dashboard Plan*
