# ManaTech — Product Requirements Document

## Original problem statement
> "so already we made some ui main webside right now you need to make modern dashboards ui should looks aswesome new ui models new graphs like that needed please follow that document and make it all pages what we need and also dont create backend just first we need frontend ui to show to client so please create frontend but show dummy data at all places right only frontend with all requirements needed glass efects new trend ui dashboard make it beacutiful with 3d animations because we need to impress the client"

Reference document: **Portfolio_Showcase_Master_Plan.pdf** — 15 phases / 50–70 screens covering Auth, Dashboards, CRM, HR, Inventory, Projects, Finance, Settings, Industry templates, Mobile mockups, SaaS pages.

## Architecture
- **Stack**: Next.js 16 (App Router), React 19, Tailwind v4, Framer Motion 12, Lucide
- **Routing**: `/` keeps existing marketing site (Hero, Services, Case Studies, About, Contact). `/showcase` is a new standalone portfolio area with its own layout (no marketing chrome).
- **Layout split**: `components/MarketingChrome.tsx` decides at runtime whether to render Navbar/Footer/BackgroundEffects (suppressed under `/showcase`).
- **Design system**: Dark glassmorphic — electric lime (`#b6ff3c`) / mint (`#6affe0`) / magenta accents on `#07070b`. Aurora-blob fixed background, animated grid texture, Instrument Serif display + JetBrains Mono body + Geist sans.
- **Charts**: Hand-built SVG components (`components/showcase/Charts.tsx`) — AreaChart, BarChart, DonutChart, RadialGauge, Heatmap, Funnel, MultiLineChart, Sparkline, AnimatedNumber. All animated via Framer Motion.
- **Shell**: `components/showcase/DashboardShell.tsx` — sidebar with grouped nav, workspace switcher, AI upgrade card, sticky topbar with search/notifications/avatar, page header with breadcrumbs and actions.
- **No backend** — pure frontend with realistic dummy data inline.

## Personas
- **The client** (prospect for ManaTech) — needs to be impressed in <30s.
- **Sales team @ ManaTech** — uses /showcase to walk clients through capabilities.

## What's implemented (Jan 2026)
**Showcase entry**
- `/showcase` — index landing with hero, stats strip, 12-card screen grid (each card has live mini-chart preview)

**Auth flows (4)**
- `/showcase/auth/login` — split-screen, SSO buttons, password show/hide, live revenue card mini-preview
- `/showcase/auth/register` — multi-field form, password strength meter, benefits column
- `/showcase/auth/forgot` — single-card flow with resend timer
- `/showcase/auth/otp` — 6-digit segmented input with auto-advance

**Dashboards (11)**
- `/showcase/executive` — 4 KPIs with sparklines, AI summary banner, revenue/forecast multi-line, donut split, NPS gauge, region bars, top performers, activity feed, cash position area
- `/showcase/analytics` — KPIs, multi-line traffic, funnel, heatmap (28×7), goal radial, top pages table, devices donut, geo bars
- `/showcase/crm` — pipeline kanban (5 stages), funnel, won-by-source donut, hot deals table with phone/email actions
- `/showcase/hr` — headcount KPIs, department donut, attendance heatmap, hiring pipeline list, eNPS gauge, leave requests, growth area
- `/showcase/inventory` — stock KPIs, movement bars, warehouse fill bars, top products table, critical low-stock alerts, vendor performance, category donut
- `/showcase/projects` — sprint health gauge, 4-column kanban with tagged cards, Gantt-style timeline, sprint stats
- `/showcase/finance` — P&L multi-line, expense donut, invoices table, cash flow forecast, tax summary
- `/showcase/users` — users table with MFA status, permission matrix (5 roles × 6 perms)
- `/showcase/employees` — grid/list toggle, employee cards with avatar + status dot + message actions
- `/showcase/settings` — 8-tab settings (Company / Branding / Security / Notifications / Integrations / Billing / Localization / Webhooks) with togglable rows, theme picker, color picker, plan card
- `/showcase/audit` — anomaly banner, 24h activity bars, live event stream with timestamp/user/action/severity chips

**Cross-cutting polish**
- Sidebar nav with active state glow + bordered indicator
- Workspace switcher dropdown
- Global topbar with Cmd-K search
- Marketing nav now has "Dashboards" entry linking to `/showcase`
- Every interactive element has `data-testid`
- All charts animate on enter (paths draw, bars grow, numbers count up)
- 3D hover tilt on key cards (`sc-tilt`), holographic ring on brand mark (`sc-ring`)

## Backlog (deferred from PDF master plan)
- P1: Industry-specific templates (School / Hospital / Real Estate / Logistics)
- P1: Mobile app mockups in device frames (Login, Dashboard, Profile, Notifications, Reports, Settings)
- P1: Public SaaS pages (Pricing tiers, Features, FAQ, Testimonials, Case studies, About, Contact)
- P2: Reset Password screen (MFA setup, QR code)
- P2: Light theme variant for dashboards
- P2: Real time data via websocket simulation
- P2: Reports module (PDF/CSV export UI)

## Mocked
- **Everything is dummy data.** No backend, no database, no auth. Login form submits nothing. This is intentional per the user's request: "only frontend with all requirements needed".

## Tech notes
- Dev server: `yarn dev -p 3000` (since `/etc/supervisor/conf.d/supervisord.conf` is read-only and points to `/app/frontend`, dev is started as a background process)
- `next.config.js` includes `allowedDevOrigins` for emergent preview domains
- TypeScript compiles cleanly via `npx tsc --noEmit`
- ESLint warnings about TS syntax are from a JS-only linter without TS parser; not actual code issues
