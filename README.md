## KoinX Tax Loss Harvesting Tool

### Live Demo
[link here]

### Setup Instructions
```bash
npm install
npm run dev
```

### Screenshots
[add after deploy]

### Tech Stack
React, TypeScript, Vite, Tailwind CSS

### Assumptions
- Two USDC entries exist in holdings (different coinName) - treated as separate assets
- Unique row key = coin + coinName
- "Amount to Sell" = totalHolding of the asset
- Gains shown in INR (₹)
