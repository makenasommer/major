# Major — Website

## Getting Started

```bash
npm install
npm run dev
```
Open http://localhost:3000

---

## Setting Up EmailJS (Demo & Contact forms)

EmailJS sends form submissions to your email — no backend needed, free tier is plenty.

**Step 1** — Create a free account at https://www.emailjs.com

**Step 2** — Add an Email Service
- Email Services → Add New Service → connect your Gmail
- Copy the Service ID

**Step 3** — Create two Email Templates

Demo template variables:
  {{first_name}}, {{last_name}}, {{university}}, {{email}}

Contact template variables:
  {{first_name}}, {{last_name}}, {{phone}}, {{email}}, {{reason}}

Copy each Template ID.

**Step 4** — Account → API Keys → copy your Public Key

**Step 5** — Open lib/emailjs.ts and fill in all four values.

---

## Adding Your Handwriting Vectors

Place SVG files in /public/vectors/. Each nav/footer word has a comment
showing exactly where to swap it in. Replace the text placeholder with:

  import Image from "next/image";
  <Image src="/vectors/shop.svg" alt="shop" width={40} height={14} />

Files needed: shop.svg, sell.svg, account.svg, major-logo.svg,
terms.svg, social.svg, demo.svg, talents.svg, contact.svg

---

## Pages

  /           Done — home screen (nav, logo, footer, popups)
  /terms      Done — full Terms & Privacy
  /account    Coming soon — Firebase auth (next session)
  /talents    Coming soon — add content when ready

---

## Deploy to Vercel (free)

1. Push to GitHub
2. vercel.com → Import repo → Deploy
   Your site goes live at a .vercel.app URL instantly.
