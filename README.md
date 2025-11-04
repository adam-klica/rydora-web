# Rydora Web - Landing Page

A modern, responsive landing page for the Rydora mobile app built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **Fully Responsive Design** - Works seamlessly on all devices
- **Modern UI/UX** - Clean, professional design matching Rydora brand colors
- **Smooth Animations** - Scroll-triggered animations and transitions
- **SEO Optimized** - Meta tags and structured content
- **Fast Performance** - Built with Next.js for optimal loading times

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
rydora-web/
├── app/
│   ├── page.tsx          # Main landing page
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles with brand colors
├── public/
│   └── images/           # App images and assets
└── package.json
```

## Brand Colors

The landing page uses Rydora's official brand colors:

- **Primary**: `#254D70` (Dark Blue)
- **Primary Light**: `#567AFD` (Light Blue)
- **Secondary**: `#FF6B9D` (Pink)
- **Background**: `#F9FAFB` (Light Gray)
- **Text**: `#0F172A` (Dark Gray)
- **Subtext**: `#64748B` (Medium Gray)

## Sections

1. **Hero Section** - Main headline with call-to-action
2. **Features** - 8 key features of the app
3. **Visual Showcase** - App preview images
4. **Why Rydora** - Benefits and value propositions
5. **Target Audience** - Who the app is for
6. **Download Section** - App store download buttons
7. **Footer** - Links and copyright

## Customization

To customize the landing page:

1. Edit `app/page.tsx` to modify content and sections
2. Update `app/layout.tsx` to change metadata and SEO
3. Modify `app/globals.css` to adjust colors and styling
4. Replace images in `public/images/` with your own

## Deployment

The site is ready to deploy to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any platform supporting Node.js

## License

Copyright © 2024 Rydora. All rights reserved.
