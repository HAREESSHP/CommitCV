import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const cache = new Map();

function getHeaders() {
  const token = process.env.GITHUB_TOKEN;
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'CommitCV-RAG-Engine/1.0'
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  return headers;
}
export async function fetchRepoReadme(owner, repo) {
  try {
    const headers = getHeaders();
    const url = `https://api.github.com/repos/${owner}/${repo}/readme`;
    const res = await axios.get(url, { headers });
    if (res.data && res.data.content) {
      return Buffer.from(res.data.content, 'base64').toString('utf-8');
    }
    return null;
  } catch {
    return null;
  }
}

export async function fetchGitHubUserData(username) {
  const cleanUsername = username.trim().toLowerCase();

  const cached = cache.get(cleanUsername);
  if (cached && (Date.now() - cached.timestamp < 10 * 60 * 1000)) {
    return cached.data;
  }

  try {
    const headers = getHeaders();
    
    // 1. Fetch GitHub User Profile
    const userRes = await axios.get(`https://api.github.com/users/${cleanUsername}`, { headers });
    const user = userRes.data;

    // 2. Fetch Public Repositories (up to 30 sorted by updated)
    const reposRes = await axios.get(`https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=30`, { headers });
    const repos = reposRes.data || [];

    // 3. Fetch Recent Public Events & Commits
    let events = [];
    try {
      const eventsRes = await axios.get(`https://api.github.com/users/${cleanUsername}/events/public?per_page=50`, { headers });
      events = eventsRes.data || [];
    } catch (e) {
      // Events might be restricted or empty
    }

    // 4. Scrape README.md files, Key Build Manifests, and Language Maps for top 5 repos
    const topRepos = repos.slice(0, 5);
    const readmes = {};
    const manifests = {};
    const repoLanguages = {};
    const manifestCandidates = ['package.json', 'go.mod', 'requirements.txt', 'Cargo.toml', 'Dockerfile', 'db.js', 'server.js'];

    await Promise.all(topRepos.map(async (r) => {
      // Scrape Readme
      const readmeContent = await fetchRepoReadme(cleanUsername, r.name);
      if (readmeContent) {
        readmes[r.name] = readmeContent.slice(0, 2000);
      }

      // Scrape Language Breakdown
      try {
        const langRes = await axios.get(`https://api.github.com/repos/${cleanUsername}/${r.name}/languages`, { headers });
        if (langRes.data) {
          repoLanguages[r.name] = langRes.data;
        }
      } catch {}

      // Scrape Key Manifests
      manifests[r.name] = {};
      await Promise.all(manifestCandidates.map(async (fileName) => {
        const content = await fetchRepoFile(cleanUsername, r.name, fileName);
        if (content) {
          manifests[r.name][fileName] = content.slice(0, 3000);
        }
      }));
    }));

    const payload = { user, repos, events, readmes, manifests, repoLanguages };
    cache.set(cleanUsername, { data: payload, timestamp: Date.now() });
    return payload;
  } catch (err) {
    console.error(`[GitHub API Scraper] Error fetching @${cleanUsername}:`, err.response?.status || err.message);
    throw err;
  }
}
export async function fetchRepoFile(owner, repo, path) {
  try {
    const headers = getHeaders();
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const res = await axios.get(url, { headers });
    if (res.data && res.data.content) {
      return Buffer.from(res.data.content, 'base64').toString('utf-8');
    }
    return null;
  } catch {
    return null;
  }
}
