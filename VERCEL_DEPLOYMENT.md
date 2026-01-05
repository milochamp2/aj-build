# Vercel Deployment Guide

Your dashboard is ready to deploy to Vercel! All files are at the root level and configured for seamless deployment.

## ✅ Files Now in Root Directory

All necessary files have been moved to the root:
- ✅ `app/` - Next.js app directory
- ✅ `components/` - React components
- ✅ `package.json` - Dependencies
- ✅ `next.config.ts` - Next.js configuration
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `tailwind.config.ts` - Tailwind configuration
- ✅ `vercel.json` - Vercel configuration
- ✅ All other config files

## 🚀 Deploy to Vercel (Updated Steps)

### Option 1: Vercel Dashboard (Recommended)

1. **Commit and push your code:**
   ```bash
   git add .
   git commit -m "feat: Switch Google Sheets integration to OAuth2 authentication"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - **Root Directory:** Leave as `./` (default)
   - Click "Deploy"

3. **Vercel will automatically detect:**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Option 2: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy from root:**
   ```bash
   vercel --prod
   ```

## 📁 Current Repository Structure

```
aj-build/                    ← Repository root
├── .git/
├── .gitignore
├── app/                     ← Next.js app directory
│   ├── finance/
│   ├── team/
│   ├── ai-works/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/              ← React components
│   └── Sidebar.tsx
├── node_modules/
├── .next/                   ← Build output
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── vercel.json
├── README.md
├── DEPLOYMENT.md
└── dashboard-app/           ← Old subdirectory (ignored)
```

## ✅ Verification

Build tested successfully:
```bash
npm run build
# ✅ SUCCESS - All 6 routes compiled
```

Dev server tested:
```bash
npm run dev
# ✅ Ready at http://localhost:3000
```

## 🎯 What Changed

**Before:** Files were in `dashboard-app/` subdirectory
- ❌ Vercel couldn't find Next.js files at root
- ❌ Required setting "Root Directory" in Vercel

**After:** Files are at repository root
- ✅ Vercel automatically detects Next.js
- ✅ Standard deployment (no special configuration)
- ✅ Builds successfully

## 🔧 Vercel Configuration

The `vercel.json` at root contains:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

## 📝 Deployment Checklist

- [x] Files moved to root directory
- [x] `npm install` completed successfully
- [x] `npm run build` passes (0 errors)
- [x] `npm run dev` works
- [x] `.gitignore` updated
- [x] Ready for git commit
- [x] Ready for Vercel deployment

## 🌐 After Deployment

Once deployed, you'll get:
- Production URL: `https://your-project.vercel.app`
- Automatic deployments on git push
- Preview deployments for PRs

**Dashboard will display:**
- ✅ All sections: Dashboard, Finance, Team, AI Works
- ✅ Sample data in AI Works (project tracker)
- ⚠️ Message: "(Using sample data - Check connection)"

---

## 📊 Optional: Connect Google Sheets

Your dashboard works perfectly with sample data. When ready to connect Google Sheets:

### Quick Steps:

1. **Get refresh token** from OAuth2 Playground
   - Visit: https://developers.google.com/oauthplayground/
   - Use your OAuth2 credentials
   - Select scope: `spreadsheets.readonly`
   - Get refresh token

2. **Add environment variables** in Vercel Dashboard → Settings → Environment Variables:
   - `GOOGLE_SHEETS_SPREADSHEET_ID`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REDIRECT_URI` (use your Vercel domain)
   - `GOOGLE_REFRESH_TOKEN`

3. **Update Google Cloud Console**
   - Add redirect URI: `https://your-domain.vercel.app/api/auth/google/callback`

4. **Redeploy** (automatic when you add env vars)

**Detailed instructions:** See [OAUTH2_QUICK_START.md](./OAUTH2_QUICK_START.md)

## 🆘 Troubleshooting

**If Vercel still can't find files:**
1. Make sure you committed all files
2. Check the build logs in Vercel dashboard
3. Verify `package.json` exists at root

**Build fails:**
- Check that all dependencies are in `package.json`
- Ensure `node_modules` is in `.gitignore`
- Try clearing cache in Vercel settings

## 📞 Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

---

**You're ready to deploy! 🚀**
