# GitHub Pages Static Export - Deployment Guide

This document outlines all changes made to convert the Next.js project to a fully static export compatible with GitHub Pages.

## ✅ Changes Made

### 1. **next.config.ts** - Static Export Configuration
- Added `output: "export"` for static HTML generation
- Configured `basePath` and `assetPrefix` for GitHub Pages (set via `NEXT_PUBLIC_BASE_PATH` env var)
- Set `images.unoptimized: true` (required for static export)
- Added `trailingSlash: true` for better GitHub Pages compatibility

### 2. **Converted Server Components to Client Components**
All pages that fetched data server-side have been converted to client-side fetching:

- **`app/page.tsx`** - Home page now uses `useEffect` to fetch featured properties
- **`app/properties/page.tsx`** - Properties listing uses `useSearchParams` and client-side fetching
- **`app/properties/[id]/page.tsx`** - Property detail page uses `useParams` and client-side fetching

### 3. **Admin Routes Exclusion**
- Created `scripts/build-static.js` - Build script that temporarily moves `/app/admin` out before build
- Admin routes are automatically excluded from static export
- Admin folder is restored after build completes

### 4. **Removed Dynamic Rendering**
- Removed `export const dynamic = "force-dynamic"` from `app/admin/reset/page.tsx`
- Removed `export const revalidate = 0` from admin pages
- All pages are now static-safe

## 📁 Files Modified

### Configuration Files
- ✅ `next.config.ts` - Added static export config
- ✅ `package.json` - Added `build:static` script

### Page Files (Converted to Client Components)
- ✅ `app/page.tsx`
- ✅ `app/properties/page.tsx`
- ✅ `app/properties/[id]/page.tsx`

### Admin Files (Excluded from Build)
- ✅ `app/admin/reset/page.tsx` - Removed dynamic exports

### New Build Scripts
- ✅ `scripts/build-static.js` - Main build script
- ✅ `scripts/exclude-admin.js` - Admin exclusion utility

## 🚀 Build & Deploy Commands

### Prerequisites
1. Set `NEXT_PUBLIC_BASE_PATH` environment variable:
   - For project pages: `/your-repo-name` (e.g., `/Realestate`)
   - For user/organization pages: leave empty or `/`

2. Set `NEXT_PUBLIC_API_URL` to your backend API URL (for client-side fetching)

### Build Command
```bash
cd frontend
npm run build:static
```

This will:
1. Move `/app/admin` to backup location
2. Build static export to `/out` directory
3. Restore `/app/admin` folder

### Output Structure
After build, you'll have:
```
frontend/
  out/
    index.html
    properties/
      index.html
      [id]/
        index.html (for each property)
    about/
      index.html
    contact/
      index.html
    _next/ (static assets)
```

## 📋 GitHub Pages Deployment Steps

### Option 1: Deploy from `out` directory (Recommended)

1. **Build the static site:**
   ```bash
   cd frontend
   npm run build:static
   ```

2. **Create a separate branch for GitHub Pages:**
   ```bash
   git checkout -b gh-pages
   git rm -rf .
   git clean -fxd
   cp -r frontend/out/* .
   git add .
   git commit -m "Deploy static site to GitHub Pages"
   git push origin gh-pages
   ```

3. **Configure GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
   - Save

### Option 2: Use GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      - name: Build static site
        run: |
          cd frontend
          npm run build:static
        env:
          NEXT_PUBLIC_BASE_PATH: /Realestate  # Change to your repo name
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/out
```

## ⚙️ Environment Variables

Create `.env.local` in `frontend/` directory:

```env
# GitHub Pages base path (empty for user pages, /repo-name for project pages)
NEXT_PUBLIC_BASE_PATH=/Realestate

# Backend API URL (must be publicly accessible)
NEXT_PUBLIC_API_URL=https://your-api-domain.com

# Optional: Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🔍 Verification Checklist

Before deploying, verify:

- [ ] `npm run build:static` completes without errors
- [ ] `/out` directory contains all public pages
- [ ] `/out` directory does NOT contain `/admin` routes
- [ ] All images load correctly (check `images.unoptimized` is true)
- [ ] Client-side API calls work (check `NEXT_PUBLIC_API_URL`)
- [ ] Base path is correctly set for your GitHub Pages URL

## 🐛 Troubleshooting

### Issue: 404 errors on GitHub Pages
**Solution:** Ensure `NEXT_PUBLIC_BASE_PATH` matches your repository name exactly (case-sensitive)

### Issue: Images not loading
**Solution:** Verify `images.unoptimized: true` in `next.config.ts`

### Issue: API calls failing
**Solution:** 
- Ensure `NEXT_PUBLIC_API_URL` is set correctly
- Backend must allow CORS from your GitHub Pages domain
- Use HTTPS URLs for production

### Issue: Admin routes still in build
**Solution:** Ensure `scripts/build-static.js` is running and successfully moving admin folder

## 📝 Notes

- **Admin routes are excluded** - They won't be accessible on GitHub Pages (by design)
- **Dynamic routes** - Property detail pages (`/properties/[id]`) are client-side rendered
- **No server-side features** - All data fetching happens client-side
- **API dependency** - The static site requires your backend API to be running and accessible

## 🎯 Final Build Output

After running `npm run build:static`, you should see:
```
✅ Static build completed successfully!
📁 Output directory: ./out
```

The `/out` directory is ready to deploy to GitHub Pages.

