# Vercel Deployment with OAuth2

## 🚀 Quick Deploy Guide

This guide covers deploying the dashboard with OAuth2 authentication to Vercel.

---

## 📋 Pre-Deployment Checklist

### 1. Supabase Setup

- [ ] Create Supabase project at https://supabase.com
- [ ] Run SQL to create `oauth_tokens` table (see OAUTH_SETUP.md)
- [ ] Copy Project URL
- [ ] Copy Anon Key
- [ ] Copy Service Role Key

### 2. Google Cloud Setup

- [ ] Create OAuth2 credentials at https://console.cloud.google.com
- [ ] Enable Google Sheets API
- [ ] Configure OAuth consent screen
- [ ] Copy Client ID
- [ ] Copy Client Secret

### 3. Generate Encryption Key

Run this command to generate a secure 32-character key:

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

Or use any random 32-character string.

---

## 🌐 Vercel Deployment Steps

### Step 1: Push Code to Git

```bash
git add .
git commit -m "feat: Implement OAuth2 flow with dashboard-core package"
git push origin main
```

### Step 2: Import to Vercel

1. Go to https://vercel.com/new
2. Import your repository
3. Click "Deploy" (don't add env vars yet)
4. Wait for initial deployment
5. Note your Vercel domain: `https://your-project-name.vercel.app`

### Step 3: Update Google Cloud Redirect URI

1. Go to https://console.cloud.google.com
2. Navigate to: APIs & Services → Credentials
3. Click your OAuth2 Client ID
4. Under "Authorized redirect URIs", add:
   ```
   https://your-project-name.vercel.app/api/oauth/google/callback
   ```
5. Click "Save"

### Step 4: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add these 8 variables:

#### Supabase Variables

| Name | Value | From |
|------|-------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xyz.supabase.co` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | Supabase → Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` | Supabase → Settings → API → service_role |

#### Encryption

| Name | Value | From |
|------|-------|------|
| `TOKEN_ENCRYPTION_KEY` | `abc123...` (32 chars) | Generated in Step 3 |

#### Google OAuth2

| Name | Value | From |
|------|-------|------|
| `GOOGLE_CLIENT_ID` | `123.apps.googleusercontent.com` | Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | `GOCSPX-...` | Google Cloud Console |

#### Redirect URIs

| Name | Value | Note |
|------|-------|------|
| `GOOGLE_REDIRECT_URI` | `https://your-project-name.vercel.app/api/oauth/google/callback` | Use your actual domain |
| `NEXT_PUBLIC_APP_URL` | `https://your-project-name.vercel.app` | Use your actual domain |

**Important:**
- For each variable, check: **Production**, **Preview**, and **Development**
- Click "Save" after adding each variable

### Step 5: Redeploy

After adding all environment variables:

1. Go to "Deployments" tab
2. Click the three dots (•••) on the latest deployment
3. Click "Redeploy"
4. Wait for deployment to complete

---

## ✅ Testing Your Deployment

### Test the Settings Page

1. Visit: `https://your-project-name.vercel.app/settings`
2. You should see:
   - ✅ "API Connections" section
   - ✅ "Google Sheets" card
   - ✅ "Not Connected" status
   - ✅ "Connect Google Sheets" button

### Test OAuth Flow

1. Click "Connect Google Sheets"
2. Should redirect to Google OAuth consent screen
3. Sign in with your Google account
4. Grant permissions:
   - View your Google Sheets
   - View your email address
5. Should redirect back to Settings with:
   - ✅ "Google Sheets connected successfully!" message
   - ✅ "Connected" status with green checkmark
   - ✅ Your email displayed

### Test Spreadsheet Connection

1. In Settings, enter your Google Sheets spreadsheet ID
   - Find it in URL: `docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
2. Click "Save"
3. Navigate to "AI Works" section
4. Should see:
   - ✅ Your real data from Google Sheets
   - ✅ No "Using sample data" message

---

## 🔍 Troubleshooting

### Error: "Redirect URI mismatch"

**Problem:** OAuth redirect URI doesn't match Google Cloud Console

**Fix:**
1. Check your Vercel domain is correct
2. In Google Cloud Console → Credentials → OAuth2 Client
3. Verify redirect URI is exactly: `https://your-domain.vercel.app/api/oauth/google/callback`
4. No trailing slash!
5. Update `GOOGLE_REDIRECT_URI` in Vercel if needed
6. Redeploy

### Error: "Failed to connect to Google Sheets"

**Problem:** Missing or incorrect environment variables

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Verify all 8 variables are present
3. Check for typos or extra spaces
4. Verify Supabase keys are correct
5. Verify Google Client ID and Secret are correct
6. Redeploy after fixing

### Settings page shows error

**Problem:** Supabase credentials incorrect

**Fix:**
1. Go to Supabase dashboard
2. Settings → API
3. Verify:
   - Project URL matches `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key matches `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key matches `SUPABASE_SERVICE_ROLE_KEY`
4. Update in Vercel if needed
5. Redeploy

### "No OAuth tokens found"

**Problem:** User hasn't completed OAuth flow, or tokens not saved

**Fix:**
1. Check Supabase `oauth_tokens` table exists
2. Verify table has correct structure (see OAUTH_SETUP.md)
3. Check `TOKEN_ENCRYPTION_KEY` is exactly 32 characters
4. Re-connect in Settings page
5. Check Vercel Function Logs for errors

### AI Works shows sample data

**This is normal if:**
- You haven't connected Google Sheets yet
- You haven't entered spreadsheet ID

**To fix:**
1. Go to Settings
2. Connect Google Sheets
3. Enter spreadsheet ID
4. Click Save
5. Refresh AI Works page

---

## 📊 Vercel Function Logs

To debug issues:

1. Go to Vercel dashboard
2. Click on your deployment
3. Click "Functions" tab
4. Find relevant function:
   - `/api/oauth/google`
   - `/api/oauth/google/callback`
   - `/api/sheets`
5. Click "View Logs"
6. Check for error messages

---

## 🔐 Security Best Practices

### Environment Variables

- ✅ Never commit `.env.local` to git
- ✅ Use different encryption keys for dev/prod
- ✅ Rotate service role key periodically
- ✅ Only grant minimum required OAuth scopes

### Google Cloud Console

- ✅ Restrict OAuth consent screen to test users during development
- ✅ Only add necessary redirect URIs
- ✅ Monitor OAuth usage in Google Cloud Console
- ✅ Set up budget alerts

### Supabase

- ✅ Enable Row Level Security on all tables
- ✅ Only service role can access `oauth_tokens` table
- ✅ Monitor database usage
- ✅ Set up backup policy

---

## 📱 Post-Deployment

### For End Users

Share these instructions with your users:

1. **Connect Google Sheets:**
   - Go to Settings page
   - Click "Connect Google Sheets"
   - Sign in and grant permissions

2. **Configure Spreadsheet:**
   - Enter your spreadsheet ID
   - Click "Save"

3. **View Data:**
   - Navigate to "AI Works" section
   - Your data will be displayed

### Disconnect Instructions

If users need to disconnect:

1. Go to Settings
2. Click "Disconnect" button
3. Confirm disconnection
4. Can reconnect anytime

---

## 🎯 Summary

Your OAuth2-enabled dashboard is now deployed on Vercel! 🎉

**What works:**
- ✅ Secure OAuth2 flow
- ✅ Per-user Google Sheets connections
- ✅ Encrypted token storage in Supabase
- ✅ Automatic token refresh
- ✅ User-friendly Settings UI

**Next steps:**
1. Test all functionality
2. Share Settings URL with users
3. Monitor Vercel Function Logs
4. Check Supabase usage

---

## 📚 Related Documentation

- **OAUTH_SETUP.md** - Complete OAuth setup guide
- **OAUTH_IMPLEMENTATION_SUMMARY.md** - Technical implementation details
- **.env.local.example** - Environment variable template

---

**Need help?** Check the troubleshooting section or review the implementation summary.
