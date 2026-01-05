# OAuth2 Quick Start Guide

## 🎯 Quick Reference for OAuth2 Setup

This is a condensed guide to get your Google Sheets connected using OAuth2.

---

## Step 1: Get OAuth2 Credentials (You Have These)

You already have the OAuth2 credentials JSON file. Extract these values:

```json
{
  "web": {
    "client_id": "YOUR_CLIENT_ID.apps.googleusercontent.com",
    "client_secret": "YOUR_CLIENT_SECRET",
    "redirect_uris": [...]
  }
}
```

---

## Step 2: Get Refresh Token (Easiest Method)

### Using Google OAuth2 Playground:

1. **Visit:** https://developers.google.com/oauthplayground/

2. **Configure OAuth2 Settings:**
   - Click the ⚙️ gear icon (top-right)
   - Check "Use your own OAuth credentials"
   - Enter your `client_id` and `client_secret`
   - Close settings

3. **Authorize APIs:**
   - In **Step 1** on the left:
     - Find "Google Sheets API v4"
     - Check: `https://www.googleapis.com/auth/spreadsheets.readonly`
   - Click "Authorize APIs" button
   - Sign in with your Google account
   - Click "Allow"

4. **Get Refresh Token:**
   - In **Step 2**:
     - Click "Exchange authorization code for tokens"
   - **Copy the `refresh_token` value** (starts with `1//`)
   - Save this token - you'll need it for environment variables

---

## Step 3: Deploy to Vercel

### 3.1: Update Google Cloud Console (Add Production Redirect URI)

1. Go to Google Cloud Console → APIs & Services → Credentials
2. Click on your OAuth2 Client ID
3. Under "Authorized redirect URIs", add:
   ```
   https://your-domain.vercel.app/api/auth/google/callback
   ```
4. Click **Save**

### 3.2: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add all 5 variables:

   **GOOGLE_SHEETS_SPREADSHEET_ID**
   - Value: Your spreadsheet ID from Google Sheets URL
   - Get it from: `https://docs.google.com/spreadsheets/d/`**`1A2B3C4D5E6F7G8H9I0J`**`/edit`

   **GOOGLE_CLIENT_ID**
   - Value: From your OAuth2 credentials JSON file
   - Example: `your_client_id.apps.googleusercontent.com`

   **GOOGLE_CLIENT_SECRET**
   - Value: From your OAuth2 credentials JSON file

   **GOOGLE_REDIRECT_URI**
   - Value: `https://your-domain.vercel.app/api/auth/google/callback`
   - Replace `your-domain` with your actual Vercel domain

   **GOOGLE_REFRESH_TOKEN**
   - Value: From OAuth2 Playground (Step 2)
   - Starts with `1//`

4. For each variable, select: **Production**, **Preview**, and **Development**

### 3.3: Deploy

```bash
git add .
git commit -m "feat: Add Google Sheets OAuth2 integration"
git push origin main
```

Vercel will auto-deploy! 🚀

### 3.4: Test on Vercel

1. Wait for deployment to complete
2. Visit: `https://your-domain.vercel.app/ai-works`

**Expected Results:**
- ✅ **With Google Sheets connected:** Your live data displays
- ⚠️ **Without Google Sheets:** Sample data displays with note "(Using sample data - Check connection)"

---

## 🔍 Troubleshooting

### "Failed to fetch data from Google Sheets" on Vercel

**Check in Vercel Dashboard:**
- ✅ All 5 environment variables are set correctly
- ✅ No extra spaces in variable values
- ✅ Refresh token is valid (starts with `1//`)
- ✅ Spreadsheet ID is correct
- ✅ Redirect URI matches your Vercel domain

**Check in Google Cloud Console:**
- ✅ Production redirect URI is added
- ✅ OAuth2 client is active
- ✅ Google Sheets API is enabled

### Refresh Token Expired

If the refresh token stops working:
1. Go back to OAuth2 Playground
2. Repeat Step 2 to get a new refresh token
3. Update Vercel environment variables
4. Redeploy (push a new commit or trigger redeploy in Vercel)

### Dashboard Shows Sample Data

This is normal if:
- You haven't added environment variables yet
- One or more environment variables are incorrect

To troubleshoot:
- Check Vercel Function Logs for specific error messages
- Verify all 5 environment variables in Vercel Settings
- Click "Refresh" button on the dashboard to retry connection

---

## 📚 Full Documentation

For complete setup instructions, see:
- [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) - Detailed setup guide
- [GOOGLE_SHEETS_INTEGRATION_SUMMARY.md](./GOOGLE_SHEETS_INTEGRATION_SUMMARY.md) - Integration overview

---

## ✅ Checklist

**To deploy without Google Sheets (using sample data):**
- [ ] Code pushed to git repository
- [ ] Connected to Vercel
- [ ] Deployed successfully

**To connect Google Sheets (when ready):**
- [ ] OAuth2 credentials extracted from JSON file
- [ ] Refresh token obtained from OAuth2 Playground
- [ ] Spreadsheet ID copied from Google Sheets URL
- [ ] Production redirect URI added to Google Cloud Console
- [ ] All 5 environment variables added to Vercel
- [ ] Redeployed (automatic when env vars are added)
- [ ] Tested on Vercel production URL

---

**🎉 You're done!** Your dashboard will now pull live data from Google Sheets.
