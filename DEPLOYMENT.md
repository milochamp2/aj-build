# Deployment Guide

## Deploying to Vercel

This guide will help you deploy your Modern Dashboard to Vercel for testing and production use.

### Prerequisites

- A Vercel account (free tier available at [vercel.com](https://vercel.com))
- Git repository (GitHub, GitLab, or Bitbucket)
- Your dashboard code pushed to the repository

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Modern Dashboard"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will automatically detect Next.js settings

3. **Configure Project (if needed)**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (or `./dashboard-app` if in a monorepo)
   - Build Command: `npm run build` (auto-configured)
   - Output Directory: `.next` (auto-configured)

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your dashboard will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**

   For preview deployment:
   ```bash
   cd dashboard-app
   vercel
   ```

   For production deployment:
   ```bash
   cd dashboard-app
   vercel --prod
   ```

4. **Follow the prompts**
   - Set up and deploy? Yes
   - Which scope? Select your account
   - Link to existing project? No (first time)
   - Project name? Accept default or enter custom name
   - Directory? Accept default (./)

### Post-Deployment

After deployment, you'll receive:
- **Preview URL**: `https://your-project-<random>.vercel.app`
- **Production URL**: `https://your-project.vercel.app`

### Continuous Deployment

Once connected to Git, Vercel will automatically:
- Deploy every push to `main` branch → Production
- Deploy every PR → Preview deployment
- Run builds and tests before deployment

### Environment Variables (Optional)

If you need to add environment variables:

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add your variables:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_APP_NAME`
   - etc.

### Custom Domain (Optional)

1. Go to project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Wait for DNS propagation (usually < 1 hour)

### Troubleshooting

**Build Fails:**
- Check build logs in Vercel dashboard
- Ensure `npm run build` works locally
- Check Node.js version compatibility

**Runtime Errors:**
- Check function logs in Vercel dashboard
- Verify environment variables are set
- Test locally with `npm run build && npm start`

**Styling Issues:**
- Clear browser cache
- Check if CSS files are being loaded
- Verify Tailwind CSS configuration

### Performance Optimization

Vercel automatically optimizes:
- ✓ Image optimization
- ✓ Code splitting
- ✓ Edge caching
- ✓ Gzip compression
- ✓ Static page generation

### Monitoring

Access analytics in Vercel dashboard:
- Page views and visitors
- Web Vitals (Core Web Vitals)
- Function invocations
- Bandwidth usage

### Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

## Testing Your Deployment

After deployment, test all features:

1. Navigate to your deployed URL
2. Check all dashboard sections:
   - Dashboard home
   - Finance page (verify charts render)
   - Team page (verify tables and charts)
   - AI Works page (verify all visualizations)
3. Test responsive design on mobile
4. Check browser console for errors
5. Test navigation between pages

## Updating Your Deployment

Simply push to your Git repository:

```bash
git add .
git commit -m "Update dashboard features"
git push origin main
```

Vercel will automatically rebuild and redeploy.

## Rolling Back

If you need to roll back:

1. Go to Vercel dashboard
2. Navigate to "Deployments"
3. Find a previous successful deployment
4. Click "Promote to Production"

---

**Happy Deploying! 🚀**
