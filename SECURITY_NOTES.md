# Security & Deployment Notes

## Environment Variables Security

### ✅ What's Secure

- **EmailJS Public Key** (`VITE_EMAILJS_PUBLIC_KEY`): Safe to expose in frontend code
- **Environment variables prefixed with `VITE_`**: Automatically bundled into the frontend
- **`.env.local.example`**: Template file with dummy values, safe to commit

### ❌ What's NOT Secure

- **EmailJS Secret Key**: Should NEVER be exposed in frontend code
- **API keys without `VITE_` prefix**: Not accessible in browser, kept on server
- **`.env.local` file**: Contains real credentials, NEVER commit to Git

### Security Best Practices

1. **Never commit `.env.local`**:
   - Already in `.gitignore`
   - Contains real EmailJS credentials
   - Only exists on your local machine

2. **Use `.env.local.example` as template**:
   - Share this file with team members
   - Shows what variables are needed
   - Contains dummy/placeholder values

3. **Set environment variables on Vercel**:
   - Go to Project Settings → Environment Variables
   - Add real values there
   - Vercel keeps them secure and encrypted

4. **Rotate credentials if compromised**:
   - If you accidentally commit `.env.local` to Git:
     1. Regenerate EmailJS keys
     2. Update Vercel environment variables
     3. Force push to remove from Git history (risky!)
   - Better: Use `git-filter-repo` to rewrite history

---

## Build & Deployment Checklist

### Before Deploying

- [ ] Run `cd client && pnpm run build` locally to verify build succeeds
- [ ] Test contact form locally with EmailJS credentials
- [ ] Verify no console errors in development
- [ ] Check that all pages load correctly
- [ ] Test dark mode toggle
- [ ] Verify responsive design on mobile

### On Vercel

- [ ] Set all three EmailJS environment variables
- [ ] Verify build command: `cd client && pnpm run build`
- [ ] Verify output directory: `client/dist`
- [ ] Check that Node.js version is 18.x or higher
- [ ] Enable automatic deployments from GitHub

### After Deployment

- [ ] Visit the live URL and verify it loads
- [ ] Test contact form submission
- [ ] Check browser console for errors
- [ ] Verify dark mode works
- [ ] Test on mobile devices
- [ ] Check that all images load correctly

---

## Sensitive Data Exposure Prevention

### What's Exposed in Frontend Bundle

The following are visible in the browser and safe to expose:

```javascript
// ✅ SAFE - Public credentials
VITE_EMAILJS_PUBLIC_KEY=abc123...
VITE_EMAILJS_SERVICE_ID=service_...
VITE_EMAILJS_TEMPLATE_ID=template_...
```

### What's NOT Exposed

- Server-side environment variables (no `VITE_` prefix)
- Database credentials
- API keys for backend services
- Private keys or secrets

---

## Error Handling & Logging

### Development Mode

- Error boundaries show full error stack traces
- Console logs include detailed debugging information
- EmailJS configuration errors are visible

### Production Mode

- Error boundaries show user-friendly messages
- Detailed error information is hidden
- Sensitive data is not logged
- Only critical errors are reported

### Monitoring

1. **Vercel Analytics**:
   - View performance metrics
   - Monitor Core Web Vitals
   - Check deployment status

2. **Browser Console**:
   - No sensitive data should appear
   - Only user-friendly error messages

3. **EmailJS Dashboard**:
   - Monitor email sending success rate
   - Check for failed submissions
   - View email logs

---

## Updating Credentials

### If You Need to Change EmailJS Credentials

1. Generate new credentials in EmailJS dashboard
2. Update environment variables on Vercel:
   - Settings → Environment Variables
   - Edit each variable with new value
3. Redeploy the project:
   - Go to Deployments
   - Click "Redeploy" on latest deployment
4. Test contact form after redeployment

### If You Accidentally Expose Credentials

1. **Immediately regenerate** EmailJS keys
2. **Update Vercel** environment variables with new keys
3. **Redeploy** the project
4. **Remove from Git history** (if committed):
   ```bash
   # Option 1: Remove file from history
   git rm --cached .env.local
   git commit -m "Remove .env.local"
   git push
   
   # Option 2: Rewrite history (advanced)
   git-filter-repo --path .env.local --invert-paths
   ```

---

## Performance & Security Headers

Vercel automatically provides:

- ✅ HTTPS/SSL encryption
- ✅ HTTP/2 support
- ✅ Gzip compression
- ✅ Security headers (CSP, X-Frame-Options, etc.)
- ✅ DDoS protection
- ✅ Automatic HTTPS redirects

---

## Compliance & Privacy

### GDPR Compliance

- Contact form data is sent via EmailJS
- No data is stored on your servers
- EmailJS handles data according to their privacy policy
- Users should be informed that their data is sent to EmailJS

### Privacy Policy Recommendation

Add a privacy policy that mentions:
- Contact form data is sent to EmailJS
- Data is not stored on your servers
- Link to EmailJS privacy policy

---

## Troubleshooting Security Issues

### Issue: "Cannot find module '@emailjs/browser'"

**Cause**: EmailJS not installed or build failed

**Solution**:
```bash
cd /path/to/portfolio
pnpm install
cd client && pnpm run build
```

### Issue: Contact form shows "EmailJS not configured"

**Cause**: Environment variables not set on Vercel

**Solution**:
1. Go to Vercel project settings
2. Add all three EmailJS variables
3. Redeploy the project
4. Wait for build to complete

### Issue: "Failed to send message" error

**Cause**: Incorrect EmailJS credentials or template

**Solution**:
1. Verify credentials in Vercel environment variables
2. Check EmailJS template configuration
3. Test template in EmailJS dashboard
4. Redeploy if changes were made

---

## Additional Resources

- [Vercel Security Best Practices](https://vercel.com/docs/concepts/security)
- [EmailJS Security](https://www.emailjs.com/docs/faq/security/)
- [OWASP Security Guidelines](https://owasp.org/)
- [Environment Variables Best Practices](https://12factor.net/config)

---

**Last Updated**: May 7, 2026

For questions or security concerns, refer to the main `VERCEL_DEPLOYMENT_GUIDE.md` file.
