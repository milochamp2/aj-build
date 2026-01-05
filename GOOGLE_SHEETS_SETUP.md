# Google Sheets Integration Setup Guide (OAuth2)

## 📋 Overview

This guide will help you connect your Google Sheets to the AI Works Dashboard using OAuth2 authentication. The dashboard will automatically fetch and display your project tracking data.

---

## 🚀 Quick Setup Steps

### Step 1: Set Up OAuth2 Credentials in Google Cloud

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Select or Create Project**
   - Click the project dropdown at the top
   - Either select existing project "raindance-463308" or create new one
   - Click "SELECT" or "CREATE"

3. **Enable Google Sheets API**
   - Click the search bar at the top
   - Type "Google Sheets API"
   - Click on "Google Sheets API" in results
   - Click "ENABLE" button (if not already enabled)

4. **Configure OAuth Consent Screen**
   - In left sidebar, go to "APIs & Services" → "OAuth consent screen"
   - Select "External" user type (or "Internal" if using Google Workspace)
   - Click "CREATE"

   **App Information:**
   - App name: "Dashboard Google Sheets Integration"
   - User support email: Your email
   - Developer contact email: Your email
   - Click "SAVE AND CONTINUE"

   **Scopes:**
   - Click "ADD OR REMOVE SCOPES"
   - Search for "Google Sheets API"
   - Select: `https://www.googleapis.com/auth/spreadsheets.readonly`
   - Click "UPDATE"
   - Click "SAVE AND CONTINUE"

   **Test Users (for External apps):**
   - Click "ADD USERS"
   - Add your Google account email
   - Click "SAVE AND CONTINUE"

5. **Create OAuth2 Credentials**
   - In left sidebar, go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" at top
   - Select "OAuth client ID"

   **Application type:**
   - Select "Web application"

   **Name:**
   - Name: `Dashboard OAuth Client`

   **Authorized redirect URIs:**
   - For local testing: `http://localhost:3000/api/auth/google/callback`
   - For production: `https://your-domain.vercel.app/api/auth/google/callback`
   - Click "ADD URI" for each

   - Click "CREATE"
   - **A popup will show your Client ID and Client Secret** - copy these!
   - You can also download the JSON file for reference

---

### Step 2: Obtain Refresh Token

You need to complete the OAuth flow once to get a refresh token.

**Option A: Using Helper Script (Recommended)**

1. **Set up environment variables temporarily:**

   Create `.env.local` file:
   ```bash
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
   GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Get the authorization URL:**
   - In your browser console or create a simple API route to call `getAuthUrl()` from `lib/googleSheets.ts`
   - Visit the URL to authorize the application
   - You'll be redirected back with an authorization code

4. **Exchange code for tokens:**
   - Use `getTokensFromCode(code)` helper function
   - Copy the `refresh_token` from the response
   - Add it to your `.env.local` file

**Option B: Using Google OAuth2 Playground**

1. Visit: https://developers.google.com/oauthplayground/
2. Click the gear icon (settings) in top-right
3. Check "Use your own OAuth credentials"
4. Enter your Client ID and Client Secret
5. In "Step 1", find and select "Google Sheets API v4" → "https://www.googleapis.com/auth/spreadsheets.readonly"
6. Click "Authorize APIs"
7. Sign in and grant access
8. In "Step 2", click "Exchange authorization code for tokens"
9. Copy the "Refresh token" value

---

### Step 3: Get Your Spreadsheet ID

Your spreadsheet ID is in the URL:

```
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
                                      ^^^^^^^^^^^^^^^^^^^^
                                      Copy this part
```

Example:
```
URL: https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit
Spreadsheet ID: 1A2B3C4D5E6F7G8H9I0J
```

---

### Step 4: Set Up Environment Variables

1. **Create `.env.local` file** in your project root

2. **Add the following** (replace with your actual values):

```bash
# Google Sheets Configuration

# Spreadsheet ID from Step 3
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here

# OAuth2 Client ID (from Google Cloud Console credentials)
GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com

# OAuth2 Client Secret (from Google Cloud Console credentials)
GOOGLE_CLIENT_SECRET=your_client_secret_here

# OAuth2 Redirect URI (must match what you set in Google Cloud Console)
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# OAuth2 Refresh Token (from Step 2)
GOOGLE_REFRESH_TOKEN=your_refresh_token_here
```

3. **Extract values from OAuth2 credentials JSON**:

Open your downloaded OAuth2 credentials JSON file:

```json
{
  "web": {
    "client_id": "your_client_id.apps.googleusercontent.com",
    "client_secret": "your_client_secret",
    "redirect_uris": ["http://localhost:3000/api/auth/google/callback"],
    ...
  }
}
```

- Copy `client_id` → `GOOGLE_CLIENT_ID`
- Copy `client_secret` → `GOOGLE_CLIENT_SECRET`
- Add refresh token from Step 2 → `GOOGLE_REFRESH_TOKEN`

---

### Step 5: Configure Your Sheet Structure

Your Google Sheet should have this structure:

**Row 1 (Headers):**
| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Date | Team Member | Client | Task | Hours Worked | Status | Notes | Documentation |

**Row 2+ (Data):**
| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| 12/15/2025 | Joshua | Rolls Royce Hire | Form Responder | 0 | In Dev (On Hold) | -Need the content | https://drive.google.com/... |
| 12/23/2025 | AJ | Setup n6n and | | 0 | In Dev (On Hold) | | |

**Important:**
- Headers must be in Row 1
- Data starts from Row 2
- Sheet name: "Sheet1" (or update in `lib/googleSheets.ts`)
- Date format: MM/DD/YYYY

**Valid Status Values:**
- `Deployed`
- `In Dev`
- `In Dev (On Hold)`
- `Planning`
- `Not Started`

---

### Step 6: Deploy to Vercel

1. **Add Environment Variables in Vercel:**
   - Go to your Vercel project dashboard
   - Navigate to "Settings" → "Environment Variables"
   - Add all five variables:
     - `GOOGLE_SHEETS_SPREADSHEET_ID`
     - `GOOGLE_CLIENT_ID`
     - `GOOGLE_CLIENT_SECRET`
     - `GOOGLE_REDIRECT_URI` (use your production URL)
     - `GOOGLE_REFRESH_TOKEN`
   - Make sure to select "Production", "Preview", and "Development"

2. **Important for Production:**
   - Update `GOOGLE_REDIRECT_URI` to use your production domain:
     - `https://your-domain.vercel.app/api/auth/google/callback`
   - Add this redirect URI to your Google Cloud Console OAuth2 credentials

3. **Deploy:**
   ```bash
   git add .
   git commit -m "feat: Add Google Sheets OAuth2 integration"
   git push origin main
   ```

4. **Vercel will auto-deploy**

### Step 7: Test on Vercel

1. **Wait for deployment to complete** in Vercel dashboard

2. **Visit your production URL:**
   ```
   https://your-domain.vercel.app/ai-works
   ```

3. **Expected behavior:**
   - ✅ **With environment variables set:** Displays your Google Sheets data
   - ⚠️ **Without environment variables:** Displays sample data with message "(Using sample data - Check connection)"

4. **If connection fails:**
   - Check **Vercel Function Logs** for error details
   - Verify all environment variables in Vercel Settings
   - Click "Refresh" button on dashboard to retry

---

## 🔍 Troubleshooting

### Error: "Failed to fetch data from Google Sheets"

**Check:**
1. Refresh token is valid and not expired
2. Spreadsheet ID is correct
3. Sheet name is "Sheet1" or update range in `lib/googleSheets.ts`
4. All environment variables are set correctly
5. OAuth2 scopes include `spreadsheets.readonly`

### Error: "No data found in sheet"

**Check:**
1. Sheet has data starting from Row 2
2. Row 1 has headers
3. Range in `lib/googleSheets.ts` is correct (default: `Sheet1!A2:H`)

### OAuth2 Token Issues

**Check:**
1. Refresh token hasn't been revoked
2. Client ID and Client Secret match your OAuth2 credentials
3. Redirect URI matches exactly what's configured in Google Cloud Console
4. If token expires, you may need to re-authorize and get a new refresh token

### Dashboard shows sample data

**This means:**
- Google Sheets connection failed
- Dashboard is using fallback data
- Check console for specific error
- Click "Refresh" button to retry

---

## 📊 Data Auto-Refresh

The dashboard will:
- Load data when page opens
- Cache data for 60 seconds (configurable in `app/api/sheets/route.ts`)
- Manual refresh via "Refresh" button

**To change cache time:**

Edit `app/api/sheets/route.ts`:
```typescript
export const revalidate = 60; // Change to desired seconds
```

---

## 🔐 Security Best Practices

1. **Never commit `.env.local`** to git (already in `.gitignore`)
2. **Never commit OAuth2 credentials JSON** to git (already in `.gitignore`)
3. **Use environment variables** in Vercel, not hardcoded values
4. **Keep refresh tokens secure** - treat them like passwords
5. **Use "readonly" scope** if dashboard only needs to read data
6. **Regularly rotate credentials** if security is compromised
7. **Limit OAuth consent screen** to specific test users during development

---

## 📝 File Structure

```
your-project/
├── .env.local.example            # Template for environment variables
├── lib/
│   └── googleSheets.ts           # Google Sheets API service (OAuth2)
├── app/
│   ├── api/
│   │   └── sheets/
│   │       └── route.ts          # API endpoint
│   └── ai-works/
│       └── page.tsx              # Dashboard page (updated)
└── *.json                        # OAuth2 credentials (don't commit!)
```

**Note:** Environment variables are set in Vercel Dashboard, not in `.env.local` for production.

---

## ✅ Verification Checklist

**To deploy without Google Sheets (using sample data):**
- [ ] Code pushed to repository
- [ ] Vercel deployment successful
- [ ] Dashboard accessible at production URL
- [ ] Sample data displays correctly

**To connect Google Sheets (when ready):**
- [ ] OAuth2 credentials created in Google Cloud Console
- [ ] OAuth consent screen configured
- [ ] Production redirect URI added to Google Cloud Console
- [ ] Refresh token obtained from OAuth2 Playground
- [ ] Spreadsheet ID copied from Google Sheets URL
- [ ] Sheet has correct structure (8 columns)
- [ ] Data starts from Row 2
- [ ] All 5 environment variables added to Vercel
- [ ] Redirect URI matches Vercel domain
- [ ] Redeployed (or triggered redeploy in Vercel)
- [ ] Tested on Vercel production URL

---

## 🎉 You're All Set!

Your dashboard should now be connected to Google Sheets and automatically display your project data!

**Need help?** Check the console logs or contact support.
