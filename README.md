# Sundrops Montessori - Modern Website Prototype

A modern Next.js prototype reimagining the [Sundrops Montessori](https://sundropsmontessori.com) website, replacing the WordPress/Divi stack with a fast, accessible, and maintainable codebase.

## Tech Stack

- **Framework**: Next.js 16 with App Router + Turbopack
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with HSL color variables + dark mode
- **UI**: Radix UI primitives + CVA (class-variance-authority)
- **Animations**: Framer Motion (page transitions, scroll reveals, hover effects)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Theme**: next-themes (system/light/dark)

## Features

- All original WordPress URL paths preserved for SEO continuity
- 5 program pages (Infant through Middle School)
- 3 campus pages (Bridge, Daniel Island, Palmetto)
- Interactive school calendar with event filtering
- Site-wide fuzzy search (Cmd+K / Ctrl+K)
- Contact and tour request forms with Zod validation
- Responsive design (mobile, tablet, desktop)
- Full dark mode support
- Custom 404 page
- Dynamic sitemap and robots.txt
- Framer Motion animations throughout

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server (Turbopack)
pnpm dev

# Run type checking + linting + formatting
pnpm check

# Production build
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
app/                  # Next.js App Router pages (WordPress URL paths)
components/
  ui/                 # shadcn/ui base components
  home/               # Homepage sections
  programs/           # Program page shared components
  campus/             # Campus page shared components
  forms/              # Form components (contact, tour request)
  calendar/           # Calendar components
lib/
  data/               # Static TypeScript data layer
  utils.ts            # cn() helper (clsx + tailwind-merge)
public/images/        # Self-contained images (downloaded from WordPress)
```

## Scripts

| Command       | Description                     |
| ------------- | ------------------------------- |
| `pnpm dev`    | Start dev server with Turbopack |
| `pnpm build`  | Production build                |
| `pnpm start`  | Start production server         |
| `pnpm check`  | TypeScript + ESLint + Prettier  |
| `pnpm lint`   | ESLint only                     |
| `pnpm format` | Prettier format                 |

## Deployment

Vercel-ready. Connect the repo and deploy with zero configuration.

---

Built by Tim Rines
