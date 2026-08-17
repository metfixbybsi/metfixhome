# Sanity CMS setup for MetFix

## Project

- **Project ID:** `etg9lezr`
- **Organization ID:** `onRojAIyY`
- **Dataset:** `production`
- **Hosted Studio:** https://metfix.sanity.studio

## What editors can change

### Home Page (singleton — mirrors page order)

1. **Hero** — headline (+ gold phrase), subtext, stat line, CTAs  
2. **Problem Quote** — quote, source text + link  
3. **Locked sections note** — response block + free course panel are not editable (note for editors)  
4. **Playbook CTA** — eyebrow, headline (+ gold), button  
5. **Specialty Tracks** — section intro only; cards come from Courses with “Show on Home”  
6. **Affiliation** — copy, price, benefits, buttons  
7. **Foundations** — copy, button, video embed URLs  
8. **Why MetFix Is Different** — copy + founders photo upload  
9. **Resource Library** — intro copy, category tags, large featured resource (link + photo or video), exactly 3 secondary resources, CTAs  
10. **The Gap** — copy, list, closing quote  
11. **Testimonials** — section label; quotes under **Testimonials**  
12. **Global Network** — copy + max 8 featured locations  
13. **MetFix Weekly** — copy only (signup form not editable)  
14. **FAQ** — section headline; Q&As under **FAQs**

### Become an Affiliate (singleton — mirrors page order)

1. **Hero** — headline (+ gold), subtext, CTAs, stats  
2. **What It Means** — copy, price, and **Membership Includes** checklist (add/edit/remove freely)  
3. **What You Get** — intro + benefit boxes (**max 10**; tip: 6 looks balanced)  
4. **Who Qualifies** — copy, CTAs, checklist items (**max 5**; tip: 3–4 looks best)  
5. **The Process** — intro + numbered steps (**max 5**; numbers auto from order)  
6. **Quote from the Network** — quote + attribution  
7. **Application** — section copy, **button text**, and **application URL** (also used by Apply buttons)

### Courses

Full `/classes` fields **plus** Home Preview fields (show on home, label, preview text, sort).

### Site Settings

- **Navigation Bar** — labels, URLs, and “open in new tab” for each top-nav link (Studio includes plain-language help for internal vs external links and `target=_blank`)
- **Copyright Text** for footers

## CORS (required for the live/local site to read content)

In [API → CORS](https://www.sanity.io/manage/project/etg9lezr/api#cors) add:

- `http://localhost:3000`
- `https://metfix.org`
- `https://www.metfix.org` (if used)

## Seed current site content

```bash
# .env must include SANITY_API_WRITE_TOKEN=sk...
npm run sanity:seed
```

Seeds Home Page, Become an Affiliate, Courses (with home previews), Testimonials, FAQs, and Site Settings (keeps existing copyright if already set).

## Deploy / run Studio

```bash
npm run sanity          # local studio
npm run sanity:deploy   # publish https://metfix.sanity.studio
```

After schema changes, redeploy the studio so teammates see new fields.
