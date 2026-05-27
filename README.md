<div align="center">

# 💸 KoinX — Tax Loss Harvesting Tool

### A responsive, real-time tax loss harvesting interface built for crypto investors

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<br />

[🌐 Live Demo](https://your-deployed-link.vercel.app/) · [🎬 Video Walkthrough](#) · [📝 Report Bug](https://github.com/yourusername/koinx-tax-harvesting/issues)

<br />

<img src="https://img.shields.io/badge/Status-Complete-brightgreen?style=flat-square" />
<img src="https://img.shields.io/badge/Responsive-Yes-blue?style=flat-square" />
<img src="https://img.shields.io/badge/Real--Time-Updates-orange?style=flat-square" />
<img src="https://img.shields.io/badge/Mock_APIs-Included-purple?style=flat-square" />

</div>

---

## 📸 Preview

| Pre Harvesting | After Harvesting |
|:---:|:---:|
| ![Pre Harvesting](screenshots/pre.png) | ![After Harvesting](screenshots/post.png) |

> *Select holdings from the table to see your tax savings update in real time*

---

## ✨ Features at a Glance

<table>
<tr>
<td width="50%">

### 🎯 Core Features
- 📊 **Capital Gains Cards** — Side-by-side pre/post harvesting comparison
- ☑️ **Selectable Holdings Table** — Checkbox per row + select-all in header
- ⚡ **Real-Time Recalculation** — After-harvesting card updates instantly on selection
- 💰 **Savings Banner** — Shows tax savings only when harvesting helps
- 📱 **Fully Responsive** — Works on desktop, tablet, and mobile

</td>
<td width="50%">

### 🚀 Bonus Features
- 🔄 **View All Toggle** — Show 5 rows by default, expand on demand
- 💀 **Skeleton Loaders** — Smooth loading states for all API calls
- ⚠️ **Error States** — Graceful error handling with user feedback
- 🖼️ **Logo Fallbacks** — Broken coin images replaced with a default SVG
- 🎨 **Color-coded Gains** — Green for profits, red for losses throughout

</td>
</tr>
</table>

---

## 🎯 Assignment Requirements — All Covered

| Requirement | Status | Implementation |
|:---|:---:|:---|
| **Capital Gains Cards (Pre & Post)** | ✅ | `CapitalGainsCard.tsx` — dark (pre) and blue (post) variants |
| **Holdings Table** | ✅ | `HoldingsTable.tsx` — all columns, sorted, with select-all |
| **Real-Time After-Harvesting Updates** | ✅ | `useHarvesting.ts` — `useMemo` recomputes on every selection change |
| **Savings Banner Condition** | ✅ | `SavingsBanner.tsx` — renders only when pre > post realised gains |
| **Mock APIs** | ✅ | `holdingsApi.ts` + `capitalGainsApi.ts` with simulated 600ms delay |
| **Mobile Responsive** | ✅ | Tailwind `sm:` breakpoints, overflow-x-auto on table |
| **Loader / Error States** | ✅ | Skeleton rows + red error banner |
| **View All Functionality** | ✅ | Toggle shows 5 rows by default, expands to full list |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|:---|:---|
| **React 18** | UI component library |
| **TypeScript 5** | Type safety across all components, hooks, and APIs |
| **Vite 5** | Fast dev server and optimised production builds |
| **Tailwind CSS 3** | Utility-first styling with responsive breakpoints |
| **Lucide React** | Clean, consistent icon set |
| **Mock Promises** | In-app API simulation (no backend required) |

---

## 📁 Project Structure

```
src/
├── api/
│   ├── holdingsApi.ts          ← Mock Holdings API (25 assets, 600ms delay)
│   └── capitalGainsApi.ts      ← Mock Capital Gains API (stcg + ltcg data)
│
├── components/
│   ├── CapitalGainsCard.tsx    ← Pre/Post harvesting comparison cards
│   ├── HoldingsTable.tsx       ← Selectable table with all columns
│   └── SavingsBanner.tsx       ← Conditional savings message
│
├── hooks/
│   └── useHarvesting.ts        ← All business logic (selection, recalculation)
│
├── types/
│   └── index.ts                ← TypeScript interfaces (Holding, CapitalGains, etc.)
│
├── App.tsx                     ← Root layout + KoinX navbar
└── main.tsx                    ← Entry point
```

---

## 🧠 Business Logic

### How After-Harvesting Recalculation Works

The core logic lives in `useHarvesting.ts` and recomputes via `useMemo` whenever the user's selection changes:

```
For each selected holding:
  if stcg.gain > 0  → add to stcg.profits
  if stcg.gain < 0  → add abs(gain) to stcg.losses
  if ltcg.gain > 0  → add to ltcg.profits
  if ltcg.gain < 0  → add abs(gain) to ltcg.losses

Net Short-Term  = stcg.profits  - stcg.losses
Net Long-Term   = ltcg.profits  - ltcg.losses
Realised Total  = Net Short-Term + Net Long-Term
```

The savings banner appears **only when** the pre-harvesting realised total is greater than the post-harvesting realised total.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** installed
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/koinx-tax-harvesting.git

# Navigate into the project
cd koinx-tax-harvesting

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
# Create an optimised build
npm run build

# Preview the production build locally
npm run preview
```

### Deploy to Vercel

```bash
npx vercel --prod
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments on every push.

---

## 📱 Responsive Design

| Screen | Layout | Notes |
|:---|:---|:---|
| **Desktop (1024px+)** | Cards side by side, full table | All columns visible |
| **Tablet (768px)** | Cards side by side, scrollable table | Slight compression |
| **Mobile (<768px)** | Cards stacked, horizontal table scroll | "Amount to Sell" hidden |

---

## 📋 Assumptions

| # | Assumption |
|:---|:---|
| 1 | Two **USDC** entries exist in the holdings data with different `coinName` values — they are treated as **separate, independent assets** |
| 2 | The unique key for each holding row is `coin + coinName` (not `coin` alone) |
| 3 | **"Amount to Sell"** is populated with the asset's `totalHolding` when the row is selected, and left blank otherwise |
| 4 | All monetary values are displayed in **INR (₹)** |
| 5 | Holdings are sorted in descending order by absolute value of combined gains `(|stcg.gain| + |ltcg.gain|)` |
| 6 | The After-Harvesting card mirrors the Pre-Harvesting card at initial load (no rows selected) |

---

## 🧪 Browser Support

| Browser | Status |
|:---|:---:|
| Chrome 90+ | ✅ |
| Firefox 90+ | ✅ |
| Safari 15+ | ✅ |
| Edge 90+ | ✅ |
| Mobile Chrome | ✅ |
| Mobile Safari | ✅ |

---

<div align="center">

Built with ❤️ using React, TypeScript, Vite & Tailwind CSS

⭐ **Star this repo if you found it helpful!** ⭐

</div>