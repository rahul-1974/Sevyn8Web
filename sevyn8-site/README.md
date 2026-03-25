# Sevyn8 Website

AI at Edge Platform — Intelligence at the Edge.

## Quick Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)

1. Push this folder to a GitHub repo:
   ```bash
   cd sevyn8-site
   git init
   git add .
   git commit -m "Sevyn8 website v1"
   git remote add origin https://github.com/YOUR_USERNAME/sevyn8-website.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click **"Add New Project"** → Import your `sevyn8-website` repo

4. Vercel auto-detects Vite. Just click **Deploy**. Done.

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. From this folder:
   ```bash
   cd sevyn8-site
   npm install
   vercel
   ```

3. Follow the prompts. First deploy gives you a preview URL. Then:
   ```bash
   vercel --prod
   ```

## Before Deploying

### 1. Add your Google Analytics ID

Open `src/App.jsx` and find `G-XXXXXXXXXX`. Replace with your actual GA4 Measurement ID:

```javascript
var id = "G-XXXXXXXXXX"; // ← Replace this
```

### 2. Custom Domain (after first deploy)

In Vercel dashboard → your project → **Settings** → **Domains** → Add `sevyn8.com` or your domain.

Then update DNS at your registrar:
- **A Record**: `76.76.21.21`
- **CNAME**: `cname.vercel-dns.com`

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Tech Stack

- React 18 + Vite 6
- Zero dependencies beyond React
- Fonts: Outfit Variable + DM Sans (loaded from CDN)
- Canvas animations for hero diagram
- Single-page app with client-side routing
