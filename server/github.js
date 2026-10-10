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
    
    // 1. Fetch User Info
    const userRes = await axios.get(`https://api.github.com/users/${cleanUsername}`, { headers });
    const user = userRes.data;

    // 2. Fetch Repositories
    const reposRes = await axios.get(`https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=30`, { headers });
    const repos = reposRes.data;

    // 3. Fetch Recent Public Events
    let events = [];
    try {
      const eventsRes = await axios.get(`https://api.github.com/users/${cleanUsername}/events/public?per_page=50`, { headers });
      events = eventsRes.data;
    } catch (e) {
      // Events might be restricted or empty
    }

    // 4. Fetch README.md content for top 3 repositories
    const topRepos = repos.slice(0, 3);
    const readmes = {};
    await Promise.all(topRepos.map(async (r) => {
      const content = await fetchRepoReadme(cleanUsername, r.name);
      if (content) {
        // Keep first 1200 characters of README to optimize payload
        readmes[r.name] = content.slice(0, 1200);
      }
    }));

    const payload = { user, repos, events, readmes };
    cache.set(cleanUsername, { data: payload, timestamp: Date.now() });
    return payload;
  } catch (err) {
    console.error(`[GitHub API] Error fetching @${cleanUsername}:`, err.response?.status || err.message);
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
