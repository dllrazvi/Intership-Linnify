# 🚀 Intership-Linnify: Full-Stack Next.js Enterprise Dashboard

## Overview

This repository contains the full codebase of a **real-world web application** developed during my internship at **Linnify**. It leverages the power of **Next.js**, **React**, and **TypeScript**, featuring a modular architecture and extensible integration system.

The project covers **full-stack functionality**: from advanced UI components and custom React hooks, to authentication and analytics integrations.

---

## Technologies Used

- **Frontend Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI & Styling**: Tailwind CSS, ShadCN UI, Lucide Icons
- **Forms & Validation**: React Hook Form, Zod
- **Authentication**: NextAuth (OAuth with Google)
- **State Management**: React Context API
- **Utilities**: Custom hooks, API routes, dynamic routing
- **Infrastructure**: Docker, GitHub Actions, GCP (via environment configs)

---

##  Features

###  Auth & Access Control
-  Secure login using **Google OAuth** via NextAuth
-  Custom login page styled with Tailwind and UI components
-  Session and token management through global context

###  Dashboard with Dynamic UI
-  **Search bar with debounce** and live query sync via URL
-  **Employee table** with:
  - Avatar + role display
  - Sortable columns (name, email, etc.)
  - Filters and count badges
  - CTA buttons linking to external technical profiles
-  **Reusable components**: DataTable, SearchBar, FilterSchema

###  Real-Time Hooks & Utilities
-  `useEnterSubmit()` — Smart form submission with Enter key
-  `useCopyToClipboard()` — Clipboard interaction with feedback
-  `useAction()` — Abstracted logic for managing user actions via context

###  Analytics & Marketing Integrations
Located in `apps/web/src/integrations/`, the system supports:

| Tool                | Folder                    |
|---------------------|---------------------------|
| Facebook Pixel      | `integrations/facebook`   |
| Google Ads          | `integrations/google-ads` |
| Google Analytics    | `integrations/google-analytics` |
| Google Tag Manager  | `integrations/google-tag-manager` |
| Hotjar              | `integrations/hotjar`     |

Each is modularized, allowing dynamic injection based on environment or config.

---


---

##  Learning Project Included

The `Nextjs Course app/` folder contains my personal learning project created while studying from [nextjs.org/learn](https://nextjs.org/learn). This helped me build solid fundamentals in:

- Static & dynamic routing
- Data fetching (SSR & SSG)
- API routes and deployments

---

##  My Role & Contributions

During the internship, I contributed to:

-  UI development: Search, filtering, employee dashboard
-  Logic structuring: Context management, query schemas
-  API consumption and integration with backend
-  Secret/environment management (GCP)
-  Marketing tools integrations (Facebook, GTM, Hotjar)

This was part of a production-grade system used by a real company.

---

##  What I Learned

- Modular full-stack architecture with Next.js App Router
- Clean folder design and atomic components
- Strong typing with TypeScript + Zod
- Auth patterns (OAuth2, token, provider-based)
- Working in a real Agile dev environment

---


