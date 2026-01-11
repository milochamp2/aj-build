# OAuth2 Setup Guide (Dashboard Core)

This guide explains how to set up the dashboard with OAuth2 authentication using the `@raindance-1/dashboard-core` package.

---

## 🎯 Overview

The dashboard now uses a full OAuth2 flow instead of static refresh tokens. This provides:
- ✅ Secure token storage in Supabase
- ✅ Automatic token encryption/decryption
- ✅ Per-user authentication
- ✅ Easy connection management through Settings UI

---

## 📋 Prerequisites

1. **Supabase Project**
   - Create a free account at https://supabase.com
   - Create a new project
   - Note your project URL and API keys

2. **Google Cloud Console**
   - OAuth2 credentials (Client ID & Secret)
   - Google Sheets API enabled

---

## 🔧 Environment Variables Setup

### Required Environment Variables

Add these to your Vercel project (Settings → Environment Variables):

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Token Encryption Key (generate random 32-character string)
TOKEN_ENCRYPTION_KEY=abcdef1234567890abcdef1234567890

# Google OAuth2
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret

# OAuth Redirect URI (use your actual Vercel domain)
GOOGLE_REDIRECT_URI=https://your-domain.vercel.app/api/oauth/google/callback

# Application URL (use your actual Vercel domain)
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### How to Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Click "Settings" → "API"
3. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### How to Generate TOKEN_ENCRYPTION_KEY

Run this command to generate a secure 32-character key:

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

Or use any random 32-character alphanumeric string.

---

## 🔐 Google Cloud Console Setup

### 1. Enable Google Sheets API

1. Go to https://console.cloud.google.com/
2. Navigate to "APIs & Services" → "Library"
3. Search for "Google Sheets API"
4. Click "Enable"

### 2. Configure OAuth Consent Screen

1. Navigate to "APIs & Services" → "OAuth consent screen"
2. Select "External" user type
3. Fill in:
   - App name: "Your Dashboard Name"
   - User support email: Your email
   - Developer contact: Your email
4. Click "Save and Continue"
5. **Scopes**: Add these scopes:
   - `https://www.googleapis.com/auth/spreadsheets.readonly`
   - `https://www.googleapis.com/auth/userinfo.email`
   - `https://www.googleapis.com/auth/userinfo.profile`
6. Click "Save and Continue"
7. **Test users**: Add your Google account email
8. Click "Save and Continue"

### 3. Create OAuth2 Credentials

1. Navigate to "APIs & Services" → "Credentials"
2. Click "+ CREATE CREDENTIALS" → "OAuth client ID"
3. Application type: "Web application"
4. Name: "Dashboard OAuth Client"
5. **Authorized redirect URIs**:
   - Add: `https://your-domain.vercel.app/api/oauth/google/callback`
   - Replace `your-domain` with your actual Vercel domain
6. Click "Create"
7. Copy the **Client ID** and **Client Secret**

---

## 📊 Supabase Database Setup

The `@raindance-1/dashboard-core` package requires a specific table structure in Supabase.

### Create OAuth Tokens Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create oauth_tokens table
CREATE TABLE IF NOT EXISTS oauth_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, provider)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_oauth_tokens_client_provider
ON oauth_tokens(client_id, provider);

-- Enable Row Level Security
ALTER TABLE oauth_tokens ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role access
CREATE POLICY "Allow service role full access" ON oauth_tokens
  FOR ALL
  USING (auth.role() = 'service_role');
```

---

## 🚀 Deployment to Vercel

### 1. Add Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add all 8 environment variables listed above
4. For each variable, select: **Production**, **Preview**, and **Development**

### 2. Update Google Cloud Redirect URI

Make sure your redirect URI in Google Cloud Console matches your Vercel domain:
```
https://your-actual-domain.vercel.app/api/oauth/google/callback
```

### 3. Deploy

```bash
git add .
git commit -m "feat: Implement OAuth2 flow with dashboard-core package"
git push origin main
```

Vercel will automatically deploy.

---

## 👤 User Flow

### How Users Connect Google Sheets

1. **Navigate to Settings**
   - Users click "Settings" in the sidebar
   - Or visit: `https://your-domain.vercel.app/settings`

2. **Connect Google Account**
   - Click "Connect Google Sheets" button
   - Redirected to Google OAuth consent screen
   - Sign in and grant permissions
   - Redirected back to Settings with success message

3. **Enter Spreadsheet ID**
   - After connection, user enters their spreadsheet ID
   - Find ID in Google Sheets URL: `docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Click "Save"

4. **View Data**
   - Navigate to "AI Works" section
   - Dashboard fetches data from connected Google Sheets
   - Data is displayed with filtering and charts

---

## 🔄 How OAuth Flow Works

1. **User clicks "Connect Google Sheets"**
   - Frontend redirects to `/api/oauth/google`

2. **OAuth Initiation** (`/api/oauth/google`)
   - Generates Google OAuth URL
   - Redirects user to Google consent screen

3. **User Grants Permission**
   - Google redirects back to `/api/oauth/google/callback?code=...`

4. **OAuth Callback** (`/api/oauth/google/callback`)
   - Exchanges authorization code for tokens
   - Gets user info (email)
   - Saves encrypted tokens to Supabase using `saveOAuthTokens()`
   - Redirects to Settings with success message

5. **Fetching Data** (`/api/sheets`)
   - AI Works page calls `/api/sheets?clientId=user@email.com&spreadsheetId=...`
   - API retrieves tokens using `getOAuthTokens()`
   - Uses tokens to fetch data from Google Sheets
   - Returns data to frontend

---

## 🔍 Troubleshooting

### "Failed to connect to Google Sheets"

**Check:**
- All 8 environment variables are set in Vercel
- Supabase URL and keys are correct
- TOKEN_ENCRYPTION_KEY is exactly 32 characters
- Google OAuth redirect URI matches Vercel domain

### "No OAuth tokens found"

**Check:**
- User has completed OAuth flow in Settings
- User email is saved in localStorage (`google_user_email`)
- Supabase `oauth_tokens` table exists
- Supabase service role key has access to table

### "Redirect URI mismatch"

**Fix:**
- In Google Cloud Console → Credentials → OAuth2 Client
- Verify redirect URI is: `https://your-domain.vercel.app/api/oauth/google/callback`
- Must match exactly (no trailing slash)
- Update `GOOGLE_REDIRECT_URI` environment variable in Vercel

### "Permission denied"

**Check:**
- OAuth consent screen includes required scopes
- User is added as test user (if app not published)
- User granted all requested permissions

---

## 📝 Summary

### Removed (No Longer Needed)
- ❌ `GOOGLE_REFRESH_TOKEN` - No static tokens
- ❌ `GOOGLE_SHEETS_SPREADSHEET_ID` - Now per-user, set in Settings UI
- ❌ Manual OAuth2 Playground setup

### Added (New Requirements)
- ✅ Supabase project and credentials
- ✅ TOKEN_ENCRYPTION_KEY
- ✅ Settings page with OAuth connection UI
- ✅ Per-user token storage and management
- ✅ Dynamic spreadsheet ID per user

### Benefits
- 🔒 **Secure**: Tokens encrypted in Supabase
- 👥 **Multi-user**: Each user has their own connection
- 🎨 **User-friendly**: Connect through Settings UI
- 🔄 **Automatic**: Token refresh handled by dashboard-core
- 🚀 **Scalable**: Ready for multiple API integrations

---

**Your dashboard now has enterprise-grade OAuth2 authentication!** 🎉
