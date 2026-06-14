# GitHub Repository Widget Setup Guide

This site fetches and displays your GitHub repositories dynamically using the GitHub API.

## What Changed

- **Old system**: Used deprecated JSONP API (no longer works with modern GitHub API)
- **New system**: Uses modern Fetch API with better error handling and optional authentication

## How It Works

1. **[javascripts/github.js](javascripts/github.js)** - Fetches repos from GitHub API and renders them
2. **[javascripts/config.js](javascripts/config.js)** - Centralized configuration for GitHub settings
3. Main pages (index.html, about, archives) - Include both scripts and display repos

## Current Behavior

✅ Fetches all your public repositories  
✅ Sorts by most recently updated  
✅ Displays repo name and description  
✅ Works with basic rate limiting (60 requests/hour unauthenticated)

## Improve Performance with GitHub Token (Optional)

If repositories aren't showing or you want higher rate limits (5,000 requests/hour):

### Step 1: Create a GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `website-repos`
4. Select only the **`public_repo`** scope (read-only access to public repos)
5. Set expiration: **No expiration** (or your preference)
6. Click **Generate token**
7. **Copy the token immediately** (you won't see it again)

### Step 2: Add Token to Config

Edit [javascripts/config.js](javascripts/config.js) and replace:

```javascript
token: '',
```

with:

```javascript
token: 'ghp_your_token_here',  // Paste your token here
```

### Step 3: Commit and Push

```bash
git add javascripts/config.js
git commit -m "Add GitHub API token for higher rate limits"
git push origin master
```

## Security Notes

⚠️ **Important**: If you commit a token to a public repo, GitHub will automatically revoke it.

### Safe Alternatives:

1. **Don't add to version control** - Use locally for testing only
2. **GitHub Actions** - Use secrets to inject token at build time
3. **Environment variables** - If using a static site generator
4. **Public tokens only** - `public_repo` scope means read-only access to public repos

## Troubleshooting

### Repos not showing?

1. **Clear browser cache**: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
2. **Check browser console**: F12 → Console tab for error messages
3. **Check GitHub API**:
   ```bash
   curl https://api.github.com/users/sumitbsn/repos
   ```
   Should return JSON data

### Still having issues?

- Wait 5-10 minutes after pushing changes (GitHub Pages cache)
- Check if repos are actually public on GitHub
- Verify username in [javascripts/config.js](javascripts/config.js) is correct
- Check rate limits: https://api.github.com/rate_limit

## File Changes Made

- ✅ Updated `javascripts/github.js` - Modern Fetch API instead of JSONP
- ✅ Created `javascripts/config.js` - Centralized configuration
- ✅ Updated all HTML pages - Token parameter support
- ✅ Updated main pages - Use centralized config

## References

- [GitHub REST API Repos](https://docs.github.com/en/rest/repos)
- [GitHub Personal Access Tokens](https://github.com/settings/tokens)
- [Fetch API MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
