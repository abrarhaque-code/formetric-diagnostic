# Formetric Diagnostic - Complete Setup Guide

## 🚀 Quick Setup (15 minutes)

This guide will help you make the diagnostic fully functional with real data storage and email delivery.

---

## Prerequisites

Before starting, ensure you have:
- A web browser (Chrome/Firefox/Safari)
- A text editor (VS Code, Notepad++, etc.)
- Internet connection for API services

---

## Step 1: Supabase Database Setup (5 minutes)

### 1.1 Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" (it's free)
3. Sign up with GitHub or email
4. Create a new project:
   - Choose a project name (e.g., "formetric-diagnostic")
   - Set a database password (save this!)
   - Select region closest to you
   - Click "Create new project"
5. Wait 1-2 minutes for setup

### 1.2 Create Database Table ⚠️ CRITICAL STEP
1. In your Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query** button
3. **Copy and paste this ENTIRE SQL block:**

```sql
-- Create diagnostic_responses table
CREATE TABLE diagnostic_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    company_name TEXT,
    founder_name TEXT,
    responses_json JSONB NOT NULL,
    overall_score INTEGER,
    financial_health INTEGER,
    growth_potential INTEGER,
    operational_efficiency INTEGER,
    email_sent BOOLEAN DEFAULT FALSE,
    email_sent_at TIMESTAMPTZ,
    email_error TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_diagnostic_responses_email ON diagnostic_responses(email);
CREATE INDEX idx_diagnostic_responses_created_at ON diagnostic_responses(created_at);

-- Enable Row Level Security
ALTER TABLE diagnostic_responses ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for the diagnostic form)
CREATE POLICY "Allow diagnostic submissions" ON diagnostic_responses
    FOR INSERT WITH CHECK (true);

-- Allow reading (for admin/analytics)
CREATE POLICY "Allow reading submissions" ON diagnostic_responses
    FOR SELECT USING (true);
```

4. Click **Run** button (bottom right)
5. You should see "Success. No rows returned" message

### 1.3 Get Your API Keys
1. Go to **Settings** → **API** (left sidebar)
2. Find and copy these two values:
   - **Project URL**: Looks like `https://xxxxx.supabase.co`
   - **anon public** key: A long string starting with `eyJ...`

### 1.4 Update Your Code
1. Open `supabase-client.js` in your text editor
2. Find lines 5-6 and replace with your values:

```javascript
// BEFORE (example values)
this.SUPABASE_URL = 'YOUR_SUPABASE_URL';
this.SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// AFTER (your actual values)
this.SUPABASE_URL = 'https://vcuxiacsdghsmbmbzygx.supabase.co';
this.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIs...your-full-key-here...';
```

3. Save the file

### 1.5 Verify Database Setup ✅
1. Go back to Supabase dashboard
2. Click **Table Editor** (left sidebar)
3. You should see `diagnostic_responses` table listed
4. If not visible, refresh the page

---

## Step 2: Email Service Setup with Resend (5 minutes)

### 2.1 Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Click "Sign up" (free tier includes 100 emails/day)
3. Verify your email address

### 2.2 Get Your API Key
1. Once logged in, you'll see the dashboard
2. Go to **API Keys** (left sidebar)
3. Click **Create API Key**
4. Name it (e.g., "Formetric Diagnostic")
5. Click **Create**
6. **IMPORTANT**: Copy the API key immediately (starts with `re_`)
   - You won't be able to see it again!

### 2.3 Configure Email Settings

**For Quick Testing (Recommended for setup):**
1. Open `email-service.js` in your text editor
2. Find lines 5-6 and update:

```javascript
// BEFORE
this.RESEND_API_KEY = 'YOUR_RESEND_API_KEY';
this.FROM_EMAIL = 'noreply@resend.dev';

// AFTER (with your actual API key)
this.RESEND_API_KEY = 're_XXgqeL9v_34TaRQtxPiyjaAtugCYbZ6oz';
this.FROM_EMAIL = 'noreply@resend.dev'; // Keep this for testing
```

3. Save the file

**For Production (with your domain):**
1. In Resend dashboard, go to **Domains**
2. Add your domain and follow DNS verification steps
3. Once verified, update `FROM_EMAIL` to use your domain:
```javascript
this.FROM_EMAIL = 'noreply@yourdomain.com';
```

---

## Step 3: Test Your Setup (5 minutes)

### 3.1 Start Local Server
To avoid CORS issues, we need to run a local server:

**Option A: Using Node.js (Recommended)**
1. Open terminal/command prompt
2. Navigate to the `formetric-app` folder
3. Run: `npx http-server -p 8080`
4. Keep this terminal open

**Option B: Using Python**
1. Open terminal in `formetric-app` folder
2. Run: `python -m http.server 8080`

**Option C: Using VS Code**
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### 3.2 Run Test Suite
1. Open browser and go to: `http://localhost:8080/test-suite.html`
2. Click **"Run Complete Test Suite"**
3. All tests should show ✅ green checkmarks:
   - ✅ localStorage Support
   - ✅ Email Validation  
   - ✅ Data Persistence
   - ✅ Supabase Connection
   - ✅ Email Delivery

### 3.3 Test Complete User Flow
1. Go to `http://localhost:8080/index.html`
2. Click "Get your analysis"
3. Complete all 10 diagnostic questions
4. On results page, enter your email
5. Click "Send me the analysis"
6. Check:
   - ✅ Success message appears
   - ✅ Email arrives in your inbox (may take 30 seconds)
   - ✅ Data appears in Supabase dashboard (Table Editor → diagnostic_responses)

---

## 🚨 Troubleshooting Guide

### "Supabase connection failed" error
**Problem**: Test suite shows ❌ for Supabase Connection

**Solutions**:
1. **Check credentials are correct:**
   - Project URL must include `https://` 
   - API key should be the "anon public" key, not service key
   - No extra spaces or quotes around the values

2. **Verify table was created:**
   - Go to Supabase dashboard → Table Editor
   - Check if `diagnostic_responses` table exists
   - If not, re-run the SQL from Step 1.2

3. **Check browser console:**
   - Press F12 → Console tab
   - Look for specific error messages
   - Common: "relation does not exist" = table not created

### "Email sending failed" error
**Problem**: Emails not being sent or received

**Solutions**:
1. **Verify API key:**
   - Must start with `re_`
   - Check for typos or missing characters
   - Create a new key if unsure

2. **Check spam folder:**
   - Emails from `resend.dev` often go to spam initially

3. **Test with Resend dashboard:**
   - Go to Resend → Logs
   - Check if API calls are being received
   - Look for error messages

4. **CORS issues:**
   - Make sure you're using `http://localhost:8080` not `file://`
   - Server must be running (Step 3.1)

### "localStorage not available" warning
**Problem**: Warning appears in private/incognito mode

**Solution**: This is normal - the app automatically falls back to sessionStorage. No action needed.

### Nothing happens when clicking buttons
**Problem**: JavaScript not loading properly

**Solutions**:
1. Check all files are in the same folder
2. Use a local server (not file://)
3. Check browser console for errors (F12)
4. Try a different browser

---

## 📊 After Successful Setup

### What You Can Now Do:
- **Track submissions**: View all responses in Supabase dashboard
- **Export data**: Download CSV from Supabase Table Editor
- **Monitor emails**: Check delivery status in Resend dashboard
- **Analyze metrics**: See average scores and trends
- **Follow up**: Use email addresses for marketing

### Recommended Next Steps:
1. **Custom domain**: Set up your domain in Resend for professional emails
2. **Analytics**: Add Google Analytics or Plausible
3. **Webhook**: Set up Zapier/Make for CRM integration
4. **A/B testing**: Test different questions and scoring
5. **Deploy**: Host on Vercel, Netlify, or GitHub Pages

---

## 🎯 Quick Reference

### Service URLs:
- **Supabase Dashboard**: [app.supabase.com](https://app.supabase.com)
- **Resend Dashboard**: [resend.com/emails](https://resend.com/emails)
- **Local Test Suite**: http://localhost:8080/test-suite.html
- **Live App**: http://localhost:8080/index.html

### Free Tier Limits:
- **Supabase**: 500MB database, 2GB bandwidth, 50,000 requests/month
- **Resend**: 100 emails/day, 3,000 emails/month

### Support:
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Resend Docs**: [resend.com/docs](https://resend.com/docs)
- **Issues**: Check browser console (F12) for detailed errors

---

## ✅ Setup Complete!

Your diagnostic tool is now fully functional with:
- Real-time data storage in Supabase
- Professional email delivery via Resend
- Complete tracking and analytics capabilities

**Total setup time: ~15 minutes**

Remember to keep your local server running while testing!