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

## Step 3: Set Up Environment Variables

Create `.env.local` file in your project root:

```bash
# Spreadsheet ID (from your Google Sheets URL)
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here

# OAuth2 Client ID (from credentials JSON)
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com

# OAuth2 Client Secret (from credentials JSON)
GOOGLE_CLIENT_SECRET=your_client_secret_here

# OAuth2 Redirect URI
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Refresh Token (from OAuth2 Playground)
GOOGLE_REFRESH_TOKEN=1//your_refresh_token_here
```

### How to get Spreadsheet ID:

From your Google Sheets URL:
```
https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit
                                      ^^^^^^^^^^^^^^^^^^^
                                      This is your ID
```

---

## Step 4: Test Locally

```bash
npm run dev
```

Visit: http://localhost:3000/ai-works

✅ **Success:** You should see your Google Sheets data
❌ **Still showing sample data?** Check console for errors

---

## Step 5: Deploy to Vercel

### 5.1: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add all 5 variables:
   - `GOOGLE_SHEETS_SPREADSHEET_ID`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REDIRECT_URI` → **Use:** `https://your-domain.vercel.app/api/auth/google/callback`
   - `GOOGLE_REFRESH_TOKEN`

4. Select: **Production**, **Preview**, and **Development**

### 5.2: Update Google Cloud Console

1. Go to Google Cloud Console → APIs & Services → Credentials
2. Click on your OAuth2 Client ID
3. Under "Authorized redirect URIs", add:
   ```
   https://your-domain.vercel.app/api/auth/google/callback
   ```
4. Click **Save**

### 5.3: Deploy

```bash
git add .
git commit -m "feat: Add Google Sheets OAuth2 integration"
git push origin main
```

Vercel will auto-deploy! 🚀

---

## 🔍 Troubleshooting

### "Failed to fetch data from Google Sheets"

**Check:**
- ✅ All 5 environment variables are set
- ✅ Refresh token is valid
- ✅ Spreadsheet ID is correct
- ✅ Your Google account has access to the spreadsheet

### Refresh Token Expired

If the refresh token stops working:
1. Go back to OAuth2 Playground
2. Repeat Step 2 to get a new refresh token
3. Update `.env.local` and Vercel environment variables

### Dashboard Shows Sample Data

This means the connection failed. Check:
- Browser console (F12) for error messages
- Verify environment variables are set correctly
- Click "Refresh" button to retry

---

## 📚 Full Documentation

For complete setup instructions, see:
- [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) - Detailed setup guide
- [GOOGLE_SHEETS_INTEGRATION_SUMMARY.md](./GOOGLE_SHEETS_INTEGRATION_SUMMARY.md) - Integration overview

---

## ✅ Checklist

Before deploying:

- [ ] OAuth2 credentials extracted from JSON file
- [ ] Refresh token obtained from OAuth2 Playground
- [ ] Spreadsheet ID copied from Google Sheets URL
- [ ] `.env.local` created with all 5 variables
- [ ] `npm run dev` works locally
- [ ] Environment variables added to Vercel
- [ ] Production redirect URI added to Google Cloud Console
- [ ] Deployed to Vercel

---

**🎉 You're done!** Your dashboard will now pull live data from Google Sheets.
