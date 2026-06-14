// GitHub Configuration
// This file stores your GitHub settings for fetching and displaying repositories

var githubConfig = {
    // Your GitHub username
    user: 'sumitbsn',
    
    // GitHub Personal Access Token (optional but recommended for higher rate limits)
    // To create a token:
    // 1. Go to https://github.com/settings/tokens
    // 2. Click "Generate new token"
    // 3. Select "public_repo" scope
    // 4. Copy the token and paste it below (remove the quotes)
    // WARNING: Never commit real tokens to public repos. Use GitHub Secrets if needed.
    // For now, you can:
    // - Leave it empty for unauthenticated requests (60 requests/hour limit)
    // - Use it locally for testing (don't commit to git)
    // - Use GitHub Actions to inject it at build time
    token: '',
    
    // Number of repositories to display (0 = all)
    count: 0,
    
    // Skip forked repositories
    skip_forks: false,
    
    // Element ID where repos will be rendered
    target: '#gh_repos'
};

// Initialize GitHub repos on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if github object exists before calling
    if (typeof github !== 'undefined' && github.showRepos) {
        github.showRepos(githubConfig);
    }
});
