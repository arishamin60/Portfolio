# Vercel Deployment Guide

This guide will walk you through deploying your portfolio to Vercel, a modern hosting platform optimized for Next.js and static sites.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step-by-Step Deployment](#step-by-step-deployment)
3. [Environment Variables](#environment-variables)
4. [Testing After Deployment](#testing-after-deployment)
5. [Troubleshooting](#troubleshooting)
6. [Custom Domain Setup](#custom-domain-setup)

---

## Prerequisites

Before you begin, you'll need:

- A **GitHub account** (recommended for easy deployment)
- A **Vercel account** (free tier available at https://vercel.com)
- **EmailJS account** with credentials (if using contact form):
  - Public Key
  - Service ID
  - Template ID
  - Get these from: https://dashboard.emailjs.com/

---

## Step-by-Step Deployment

### Option 1: Deploy via GitHub (Recommended)

#### Step 1: Push Your Code to GitHub

1. Initialize a Git repository (if not already done):
   ```bash
   cd /path/to/portfolio
   git init
   git add .
   git commit -m "Initial portfolio commit"
   ```

2. Create a new repository on GitHub (https://github.com/new)

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

#### Step 2: Connect to Vercel

1. Go to https://vercel.com and sign in (or create an account)

2. Click **"Add New..."** → **"Project"**

3. Select **"Import Git Repository"**

4. Paste your GitHub repository URL and click **"Continue"**

5. Vercel will automatically detect this as a Vite project

#### Step 3: Configure Project Settings

1. **Project Name**: Keep default or customize (e.g., `arish-portfolio`)

2. **Framework Preset**: Select **"Vite"**

3. **Root Directory**: Leave as default (or set to `./`)

4. **Build Command**: Should auto-detect as `cd client && pnpm run build`

5. **Output Directory**: Should auto-detect as `client/dist`

6. **Install Command**: Should auto-detect as `pnpm install`

7. Click **"Continue"**

#### Step 4: Add Environment Variables

1. In the **"Environment Variables"** section, add:

   | Name | Value | Description |
   |------|-------|-------------|
   | `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS Public Key | Found in EmailJS dashboard |
   | `VITE_EMAILJS_SERVICE_ID` | Your EmailJS Service ID | Found in EmailJS dashboard |
   | `VITE_EMAILJS_TEMPLATE_ID` | Your EmailJS Template ID | Found in EmailJS dashboard |

2. Click **"Deploy"**

3. Vercel will build and deploy your site automatically

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd /path/to/portfolio
   vercel
   ```

4. **Follow the prompts** to configure your project

5. **Add environment variables** via Vercel dashboard after deployment

---

## Environment Variables

### Required Variables for Contact Form

All variables must be prefixed with `VITE_` to be accessible in the browser:

#### `VITE_EMAILJS_PUBLIC_KEY`
- **Purpose**: Public key for EmailJS authentication
- **Where to find**: https://dashboard.emailjs.com/ → Account → API Keys
- **Example**: `abc123def456ghi789jkl012mno345pqr`

#### `VITE_EMAILJS_SERVICE_ID`
- **Purpose**: EmailJS service identifier
- **Where to find**: https://dashboard.emailjs.com/ → Email Services → Select your service
- **Example**: `service_abc123def456`

#### `VITE_EMAILJS_TEMPLATE_ID`
- **Purpose**: EmailJS email template identifier
- **Where to find**: https://dashboard.emailjs.com/ → Email Templates → Select your template
- **Example**: `template_abc123def456`

### How to Set Environment Variables on Vercel

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add each variable:
   - Click **"Add New"**
   - Enter the name (e.g., `VITE_EMAILJS_PUBLIC_KEY`)
   - Enter the value
   - Select environments (Production, Preview, Development)
   - Click **"Save"**
4. **Redeploy** your project for changes to take effect

---

## Testing After Deployment

### Test 1: Verify Site is Live

1. After deployment completes, Vercel will provide a URL (e.g., `https://portfolio-abc123.vercel.app`)
2. Visit the URL in your browser
3. Verify all pages load correctly:
   - ✅ Home page displays
   - ✅ Navigation works
   - ✅ Dark mode toggle functions
   - ✅ Scroll animations work

### Test 2: Test Contact Form

1. Scroll to the Contact section
2. Fill out the form:
   - **Name**: Your name
   - **Email**: Your email
   - **Message**: Test message
3. Click **"Send Message"**
4. **Expected result**: "Message Sent!" confirmation appears
5. **Check your email**: You should receive the contact form submission

### Test 3: Check Browser Console

1. Open Developer Tools (F12 or Cmd+Option+I)
2. Go to **Console** tab
3. Look for any errors (should be none)
4. Verify no sensitive data is exposed

---

## Troubleshooting

### Issue: Build Fails with "Cannot find module"

**Cause**: Dependencies not installed correctly

**Solution**:
1. Ensure `pnpm` is used (not npm or yarn)
2. Delete `node_modules` and `pnpm-lock.yaml`
3. Run `pnpm install`
4. Redeploy

### Issue: Contact Form Shows "Initializing..." Forever

**Cause**: EmailJS environment variables not set or incorrect

**Solution**:
1. Go to Vercel project settings → Environment Variables
2. Verify all three EmailJS variables are set correctly:
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
3. **Redeploy** the project (click "Redeploy" in Deployments tab)
4. Wait for build to complete
5. Test again

### Issue: Contact Form Sends but Email Not Received

**Cause**: EmailJS template not configured correctly

**Solution**:
1. Go to https://dashboard.emailjs.com/
2. Check your email template:
   - Verify template variables match form fields:
     - `{{from_name}}` for name
     - `{{from_email}}` for email
     - `{{message}}` for message
   - Verify recipient email is set correctly
3. Test sending from EmailJS dashboard directly
4. Update template if needed
5. Redeploy portfolio

### Issue: 404 Error on Page Refresh

**Cause**: SPA routing not configured for static hosting

**Solution**:
1. Vercel automatically handles this for Vite projects
2. If issue persists, create a `vercel.json` file (already included)
3. Ensure `outputDirectory` is set to `client/dist`
4. Redeploy

### Issue: Styles Not Loading (Page Looks Broken)

**Cause**: CSS assets not bundled correctly

**Solution**:
1. Run `cd client && pnpm run build` locally to test
2. Check that `client/dist` folder contains CSS files
3. Verify `vercel.json` has correct `outputDirectory`
4. Clear Vercel cache: Go to Settings → Git → Redeploy
5. Click "Redeploy" button

### Issue: Environment Variables Not Updating

**Cause**: Vercel cache not cleared

**Solution**:
1. Go to Vercel project dashboard
2. Click **"Deployments"**
3. Find the latest deployment
4. Click the **"..."** menu
5. Select **"Redeploy"**
6. Wait for build to complete

---

## Custom Domain Setup

### Connect a Custom Domain

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Domains"**
3. Click **"Add Domain"**
4. Enter your domain name (e.g., `arishamn.com`)
5. Follow the DNS configuration steps:
   - **For Vercel nameservers** (easiest):
     - Update your domain registrar to use Vercel's nameservers
     - Vercel will provide the nameserver addresses
   - **For CNAME record**:
     - Add a CNAME record pointing to `cname.vercel-dns.com`
6. Wait for DNS propagation (can take up to 48 hours, usually faster)
7. Verify domain is connected in Vercel dashboard

### Redirect www to Non-www (or vice versa)

1. In Vercel project settings → Domains
2. Add both `yourdomain.com` and `www.yourdomain.com`
3. Set one as primary
4. Vercel automatically handles the redirect

---

## Performance Optimization

### Recommended Settings

1. **Enable Edge Caching**:
   - Vercel automatically caches static assets
   - No configuration needed

2. **Monitor Performance**:
   - Use Vercel Analytics: Settings → Analytics
   - Check Core Web Vitals

3. **Optimize Images**:
   - Use modern formats (WebP)
   - Compress before uploading
   - Use lazy loading (already implemented)

---

## Monitoring & Maintenance

### Check Deployment Status

1. Go to https://vercel.com/dashboard
2. Select your project
3. View deployment history
4. Check build logs if issues occur

### Enable Automatic Deployments

1. Vercel automatically deploys when you push to GitHub
2. Each push to `main` branch triggers a production deployment
3. Other branches trigger preview deployments

### View Logs

1. Click on a deployment
2. Scroll to "Build Logs" section
3. Review for any warnings or errors

---

## Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Vite Documentation**: https://vitejs.dev
- **EmailJS Documentation**: https://www.emailjs.com/docs/
- **React Documentation**: https://react.dev

---

## Rollback to Previous Version

If deployment has issues:

1. Go to Vercel project → Deployments
2. Find the previous working deployment
3. Click the **"..."** menu
4. Select **"Promote to Production"**

---

## Next Steps

After successful deployment:

1. ✅ Test all functionality
2. ✅ Monitor analytics
3. ✅ Set up custom domain (optional)
4. ✅ Enable automatic deployments
5. ✅ Share your portfolio URL

---

**Congratulations!** Your portfolio is now live on Vercel! 🎉
