# Paula — Field Veterinarian App

A **functional** React demo of the Paula field-vet mobile app (Cairo3A Poultry
Intelligence platform, Stage 6). Not a clickable mockup — it's a real app with
live state, mock data, a navigation stack, offline queueing, bilingual EN/AR (RTL),
and localStorage persistence. Shown in an iPhone frame on desktop and full-screen
on phones.

## Run

```bash
cd paula-app
npm install
npm run dev        # http://localhost:5173
# or a production build:
npm run build && npm run preview   # http://localhost:4173
```

## What actually works

- **Cairo3A SSO sign-in** — tap *Sign in with Cairo3A* → branded identity-provider
  page (email `@cairo3apoultry.com` + password, show/hide, "keep me signed in") →
  authenticating → Home.
- **The whole visit flow builds real data:** pick farm/house (search + flock filter,
  or QR/NFC scan) → review Paula's prediction & lab results → select signs with
  severity → add lesion entries (organ → type picker → severity → count stepper) →
  attach photos (camera shutter increments, review grid deletes) → type a note →
  **the Summary is computed from what you entered** → Submit creates a real record.
- **Submit → it appears in Visit History and (if offline) the Offline Queue.** Sync
  Now moves queued → synced. Swipe/trash → confirm dialog → deletes.
- **Offline mode** (toggle in Settings, or the splash starts offline): banners, queued
  submissions, the no-connection screen, and "will queue vs will submit" all react.
- **Bilingual EN / Arabic with full RTL** — language toggle (Login / Settings)
  re-renders the whole app, mirrors layout, switches to the Cairo font, and renders
  Arabic-Indic numerals. Clinical terms are bilingual.
- **Bottom-tab navigation** (Home / Visits / Alerts / Settings) with a real push/pop
  back stack, modal sheets (lesion picker, history filter, delete confirm), toasts,
  empty/loading states, draft auto-resume, and notification deep-links to a house.
- **Persistence** — submissions, drafts, language, and settings survive reloads
  (localStorage). *Settings → Reset demo data* restores the seed.

## All 21+ screens

Splash · SSO sign-in · Home · Farm & House Selection · QR/NFC Scan · Visit Overview ·
In-House Signs · Post-Mortem Lesions · Photo Capture · Photo Review · Notes ·
Observation Summary · Submission Confirmation · Offline Queue · Visit History ·
Submission Detail · Paula Prediction · Last Test Results · Settings · Notifications ·
Error / No Connection · User Configuration & Assignment.

## Stack & structure

- **Vite + React 18**, **Zustand** (state + `persist`), no router lib — a small
  in-memory navigation stack (`src/nav/useNav.js`).
- Lightweight i18n (`src/i18n`), seed data (`src/data`), shared components
  (`src/components`), one file per screen group (`src/screens`).
- Fonts: **Poppins** (Latin) + **Cairo** (Arabic). Tokens in `src/styles`.

```
src/
  App.jsx                # shell: device frame, routing, scaling, dir
  store/useStore.js      # app state + actions (persisted)
  nav/useNav.js          # navigation stack / tabs / sheets
  i18n/                  # strings (en/ar) + useT hook
  data/                  # seed.js (farms, houses, predictions, labs…) + helpers
  components/            # Icon, ui primitives, Sheets, Toaster
  screens/               # auth, home, visit, observe, records, paula, system
  styles/                # tokens.css + app.css
```
