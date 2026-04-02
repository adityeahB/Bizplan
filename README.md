# Business Plan Questionnaire SPA – Immigrant & Entrepreneur Edition

A fully responsive, GDPR-compliant web app that guides users through a structured business plan questionnaire (based on IAPMEI, ANIET, AIMMP). Supports 5 languages, local storage auto-save, and generates a bank‑ready PDF report.

## Features
- Multilingual (English, Portuguese, Hindi, Bengali, Urdu)
- No tracking cookies – only local storage for progress
- Progress indicator & stepper navigation
- Conditional questions (e.g., bank loan details)
- PDF generation with formal report structure
- Works offline after first load (PWA-ready)

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- i18next (i18n)
- pdfmake
- Context API for state

## Installation & Local Development
```bash
git clone <repo>
cd business-plan-app
npm install
npm run dev
