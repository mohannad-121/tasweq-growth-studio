# Tasweq Premium Frontend

## Goal

Build a complete bilingual Arabic/English social media growth marketplace with a distinctive premium identity, responsive RTL/LTR behavior, local editable content, and no backend services.

## Experience

- Establish a dark, editorial Tasweq design system led by muted yellow, with restrained blue, purple, and turquoise accents.
- Create a sticky floating navigation, memorable layered growth visual, platform selector, interactive service marketplace, differentiated platform stories, editorial trust area, process path, ecosystem visualization, testimonials, FAQ, contact, cinematic closing section, and rich footer.
- Make mobile layouts intentionally composed from 320px upward, with polished navigation and full-screen assistant behavior.

## Interactive Features

- Switch languages with full direction changes across layout, spacing, arrows, and typography.
- Filter pricing by platform and service category from one shared local data source.
- Open an accessible order-preview dialog with a coming-soon state and contact option.
- Provide a local Tasweq Assistant with quick actions, keyword/intent matching, typing feedback, and answers sourced from the same pricing, platform, FAQ, and company files.
- Add restrained entrance, floating, counter, tab, accordion, dialog, and navigation motion with reduced-motion support.

## Content Architecture

- Keep company details, translations, platforms, services/pricing, FAQs, testimonials, and product facts in focused TypeScript data/config files.
- Use reusable sections and visual components instead of a monolithic page.
- Keep all order, support, and payment-dependent actions frontend-only and clearly marked as unavailable or configurable placeholders.

## Technical Details

- Preserve TanStack Start routing and Vite/Tailwind v4 foundations.
- Add Motion for React and AI Elements chat primitives; compose the assistant from those primitives rather than custom chat foundations.
- Add route-specific bilingual SEO metadata, semantic landmarks, keyboard interactions, accessible labels, focus states, and stable responsive dimensions.
- Verify build diagnostics plus desktop, mobile, English, Arabic, pricing, dialog, navigation, FAQ, and assistant interactions in the live preview.
