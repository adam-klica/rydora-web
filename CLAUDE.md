# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server at localhost:3000
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Architecture

This is the **public web frontend** for the Rydora mobile app (car enthusiast social platform). It serves:
- Marketing landing page (`/`)
- Public-facing content pages (garages, cars, events, clubs, posts)
- Legal/policy pages

### Tech Stack
- Next.js 16 with App Router
- React 19, TypeScript
- Tailwind CSS v4
- Framer Motion for animations

### Project Structure
- `app/page.tsx` - Landing page with Hero, Features, Gallery, Download sections
- `app/components/` - Shared UI components (Header, Footer, DownloadModal, etc.)
- `app/garages/[garageId]/` - Public garage view with nested car details
- `app/events/[eventId]/`, `app/clubs/[clubId]/`, `app/p/[postId]/` - Dynamic content pages
- `app/*-policy/`, `app/eula/`, etc. - Legal pages using PolicyLayout/PolicyContent

### Data Flow
- All data fetched client-side from `https://rydora.me/api/` endpoints
- Images served from Supabase storage (`oyydkivlbjkxzuspwqsk.supabase.co`) and `media.rydora.me`
- Use native `<img>` tags for external HTTPS URLs (not Next.js Image component) to avoid URL transformation issues

### Styling Pattern
- Inline styles using `React.CSSProperties` objects
- Responsive overrides via `<style jsx>` blocks with media queries
- Brand colors: Primary `#254D70`, Accent `#667eea`/`#764ba2` gradient

### Common Patterns
- Client components use `"use client"` directive
- Dynamic pages include device detection for iOS/Android app store redirects
- SEO meta tags updated client-side via DOM manipulation in useEffect
