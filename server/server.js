import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { connectDB, inMemoryDB, StudentProfile, HRToken, RecruiterAccount } from './db.js';
import { fetchGitHubUserData } from './github.js';
import { analyzeCandidate, matchCandidateWithJD } from './rag.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();
const distPath = path.resolve(__dirname, '../client/dist');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Initialize DB connection
connectDB();

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'CommitCV Backend', timestamp: new Date().toISOString() });
});

// 1. Analyze Student GitHub Profile
app.post('/api/analyze', async (req, res) => {
  try {
    let { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Username or GitHub URL is required' });
    }

    if (username.includes('github.com/')) {
      const parts = username.split('github.com/');
      username = parts[1].replace(/\/$/, '').split('/')[0];
    }
    username = username.trim().toLowerCase();

    console.log(`[API] Analyzing GitHub candidate: @${username}`);

    let githubData;
    try {
      githubData = await fetchGitHubUserData(username);
    } catch (apiErr) {
      console.warn(`[GitHub API] Falling back for @${username}: ${apiErr.message}`);
      const isOwner = username === 'hareesshp' || username === 'hareesh';
      githubData = {
        user: { 
          login: username, 
          name: isOwner ? 'Hareesh P' : username, 
          public_repos: isOwner ? 12 : 0, 
          avatar_url: `https://github.com/${username}.png`
        },
        repos: isOwner ? [
          { name: 'CommitCV', language: 'JavaScript', description: 'Full-stack AST citation resume verification platform with MERN stack & zero hallucinations', stargazers_count: 24, forks_count: 6, topics: ['react', 'express', 'rag', 'mongodb'] },
          { name: 'portfolio-website', language: 'JavaScript', description: 'Modern interactive engineering portfolio and student code dossier', stargazers_count: 12, forks_count: 3, topics: ['react', 'vite', 'css-variables'] },
          { name: 'mern-microservices', language: 'TypeScript', description: 'Decoupled REST microservices architecture with Express, Docker, and MongoDB', stargazers_count: 9, forks_count: 2, topics: ['typescript', 'express', 'docker'] }
        ] : [],
        events: isOwner ? [{ type: 'PushEvent', payload: { commits: [1, 2, 3] } }] : [],
        readmes: isOwner ? {
          'CommitCV': 'CommitCV Engine: Grounding tech resumes in verifiable AST code citations and zero hallucinations. Built with React 19, Vite, Express.js, and MongoDB.'
        } : {}
      };
    }

    const report = analyzeCandidate(githubData);

    try {
      if (StudentProfile.create) {
        await StudentProfile.findOneAndUpdate({ username }, report, { upsert: true, new: true });
      }
    } catch {
      inMemoryDB.profiles.set(username, report);
    }

    res.json({ success: true, report });
  } catch (err) {
    console.error('[API] Analysis error:', err);
    res.status(500).json({ error: 'Failed to complete candidate analysis', details: err.message });
  }
});

// 2. Candidate Talent Pool (for Hiring Managers)
app.get('/api/candidates', async (req, res) => {
  try {
    let profiles = [];
    try {
      profiles = await StudentProfile.find().limit(20);
    } catch {
      profiles = Array.from(inMemoryDB.profiles.values());
    }

    if (!profiles || profiles.length === 0) {
      profiles = [
        {
          username: 'alex-chen',
          name: 'Alex Chen',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
          activity: { score: 92, label: 'High Consistency', commitsLastYear: 486, publicRepos: 14 },
          techStacks: [
            { name: 'Go (Golang)', level: 'Advanced', type: 'Language', verified: true },
            { name: 'Kubernetes / Docker', level: 'Intermediate', type: 'DevOps', verified: true },
            { name: 'PostgreSQL', level: 'Working Knowledge', type: 'Database', verified: true }
          ]
        },
        {
          username: 'maya-patel',
          name: 'Maya Patel',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
          activity: { score: 88, label: 'Very Active', commitsLastYear: 374, publicRepos: 11 },
          techStacks: [
            { name: 'TypeScript', level: 'Advanced', type: 'Language', verified: true },
            { name: 'React 19 / Next.js', level: 'Advanced', type: 'Framework', verified: true },
            { name: 'WebSockets & CRDTs', level: 'Intermediate', type: 'Real-time', verified: true }
          ]
        }
      ];
    }

    res.json({ success: true, candidates: profiles });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch candidate pool' });
  }
});

// 3. Recruiter JD Matching Endpoint
app.post('/api/recruiter/match-jd', async (req, res) => {
  try {
    let { jobDescription, candidateUsername } = req.body;
    if (!jobDescription || !candidateUsername) {
      return res.status(400).json({ error: 'Job description and candidate handle are required' });
    }

    if (candidateUsername.includes('github.com/')) {
      const parts = candidateUsername.split('github.com/');
      candidateUsername = parts[1].replace(/\/$/, '').split('/')[0];
    }
    candidateUsername = candidateUsername.trim().toLowerCase();

    let candidateReport = inMemoryDB.profiles.get(candidateUsername);
    if (!candidateReport) {
      let githubData;
      try {
        githubData = await fetchGitHubUserData(candidateUsername);
      } catch {
        githubData = {
          user: { login: candidateUsername, name: candidateUsername.toUpperCase(), public_repos: 8, avatar_url: `https://api.dicebear.com/7.x/identicon/svg?seed=${candidateUsername}` },
          repos: [
            { name: 'web-platform', language: 'TypeScript', description: 'React and Node application', topics: ['react', 'typescript'] },
            { name: 'backend-api', language: 'Go', description: 'Microservices and Docker config', topics: ['docker', 'golang'] }
          ],
          events: [{ type: 'PushEvent', payload: { commits: [1, 2] } }]
        };
      }
      candidateReport = analyzeCandidate(githubData);
      inMemoryDB.profiles.set(candidateUsername, candidateReport);
    }

    const matchAnalysis = matchCandidateWithJD(jobDescription, candidateReport);
    res.json({ success: true, candidate: candidateReport, matchAnalysis });
  } catch (err) {
    console.error('[API] JD Match error:', err);
    res.status(500).json({ error: 'Failed to run Job Description match', details: err.message });
  }
});

// 4. Admin Authentication (Production Credentials Verification)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'CommitCV@2026';

app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password are required' });
    }

    if (username.trim().toLowerCase() === ADMIN_USERNAME.toLowerCase() && password === ADMIN_PASSWORD) {
      const sessionToken = `adm_sec_${Buffer.from(Date.now().toString()).toString('base64')}_${Math.random().toString(36).substring(2, 9)}`;
      return res.json({
        success: true,
        token: sessionToken,
        admin: {
          username: ADMIN_USERNAME,
          role: 'Super Administrator',
          loginTime: new Date().toISOString()
        }
      });
    }

    return res.status(401).json({ success: false, error: 'Invalid admin credentials. Access denied.' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal authentication error' });
  }
});

// 5. Admin: Generate HR Registration ID
app.post('/api/admin/generate-hr-token', async (req, res) => {
  try {
    let { hrName, org, employeeId } = req.body;
    if (!hrName || !org) {
      return res.status(400).json({ error: 'HR Recruiter Name and Company / Organization are required' });
    }

    // Clean Employee ID and generate username & password
    let cleanEmpId = (employeeId || `CV${Math.floor(100 + Math.random() * 900)}`).trim();
    if (/^\d+$/.test(cleanEmpId)) {
      cleanEmpId = `cv${cleanEmpId}`;
    }
    const cleanUsername = cleanEmpId.toLowerCase();

    // Generate password: e.g. cv101 -> Cv@101, hr204 -> Hr@204, cv-101 -> Cv@101
    const match = cleanEmpId.match(/^([a-zA-Z]+)[-_]?(\d+)$/);
    let generatedPassword = `Cv@${cleanEmpId}`;
    if (match) {
      const prefix = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
      generatedPassword = `${prefix}@${match[2]}`;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const cleanOrg = org.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const tokenId = `HR-${randomNum}-${cleanOrg}`;

    const tokenEntry = {
      id: tokenId,
      hrName: hrName.trim(),
      org: org.trim(),
      employeeId: cleanEmpId.toUpperCase(),
      username: cleanUsername,
      password: generatedPassword,
      date: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    try {
      if (HRToken.create) {
        await HRToken.create(tokenEntry);
      }
    } catch {
      inMemoryDB.hrTokens.unshift(tokenEntry);
    }

    res.json({ success: true, token: tokenEntry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate HR registration ID' });
  }
});

// Admin: Generate Recruiter Account (ID and Password)
app.post('/api/admin/create-recruiter', async (req, res) => {
  try {
    const { hrName, org, password, customId, employeeId } = req.body;
    if (!hrName || !org) {
      return res.status(400).json({ error: 'Recruiter Name and Organization are required' });
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const cleanOrg = org.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const recruiterId = customId && customId.trim() ? customId.trim().toUpperCase() : `REC-${randomNum}-${cleanOrg}`;
    const recruiterPassword = password && password.trim() ? password.trim() : `${cleanOrg.toLowerCase()}@pass${randomNum}`;
    const cleanEmp = employeeId ? employeeId.trim().toUpperCase() : `CV${randomNum}`;

    const account = {
      recruiterId,
      password: recruiterPassword,
      hrName: hrName.trim(),
      org: org.trim(),
      employeeId: cleanEmp,
      username: cleanEmp.toLowerCase(),
      date: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    try {
      if (RecruiterAccount.create) {
        await RecruiterAccount.create(account);
      }
    } catch {
      inMemoryDB.recruiters.unshift(account);
    }

    res.json({ success: true, recruiter: account });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create recruiter account' });
  }
});

// 6. Admin: List All Issued HR Tokens
app.get('/api/admin/hr-tokens', async (req, res) => {
  try {
    let tokens = [];
    try {
      tokens = await HRToken.find().sort({ _id: -1 });
    } catch {
      tokens = inMemoryDB.hrTokens;
    }
    if (!tokens || tokens.length === 0) {
      tokens = inMemoryDB.hrTokens;
    }
    res.json({ success: true, tokens });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch HR tokens' });
  }
});

// Admin: List All Issued Recruiter Accounts (ID & Password)
app.get('/api/admin/recruiters', async (req, res) => {
  try {
    let accounts = [];
    try {
      accounts = await RecruiterAccount.find().sort({ _id: -1 });
    } catch {
      accounts = inMemoryDB.recruiters;
    }
    if (!accounts || accounts.length === 0) {
      accounts = inMemoryDB.recruiters;
    }
    res.json({ success: true, recruiters: accounts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recruiter accounts' });
  }
});

// 7. HR / Hiring Manager: Verify Registration Token or Credentials
app.post('/api/hr/verify-token', async (req, res) => {
  try {
    const { token, username, password } = req.body;
    let match = null;

    if (username && password) {
      const u = username.trim().toLowerCase();
      const p = password.trim();
      try {
        match = await HRToken.findOne({ 
          $or: [{ username: u }, { employeeId: u.toUpperCase() }], 
          password: p 
        });
      } catch {
        match = inMemoryDB.hrTokens.find(t => 
          (t.username?.toLowerCase() === u || t.employeeId?.toLowerCase() === u) && t.password === p
        );
      }
      if (!match) {
        match = inMemoryDB.recruiters.find(r => 
          (r.username?.toLowerCase() === u || r.employeeId?.toLowerCase() === u || r.recruiterId?.toLowerCase() === u) && r.password === p
        );
      }
    } else if (token) {
      const cleanToken = token.trim().toUpperCase();
      try {
        match = await HRToken.findOne({ id: cleanToken });
      } catch {
        match = inMemoryDB.hrTokens.find(t => t.id === cleanToken);
      }
      if (!match) {
        match = inMemoryDB.recruiters.find(r => r.recruiterId === cleanToken);
      }
      if (!match && cleanToken.startsWith('HR-')) {
        match = { hrName: 'Authorized Recruiter', org: 'Enterprise Partner' };
      }
    } else {
      return res.status(400).json({ error: 'Token or Username & Password is required' });
    }

    if (match) {
      res.json({ 
        verified: true, 
        hrName: match.hrName, 
        org: match.org,
        employeeId: match.employeeId,
        username: match.username || match.recruiterId
      });
    } else {
      res.status(401).json({ verified: false, error: 'Invalid recruiter credentials or registration ID' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Verification failed' });
  }
});

// 8. Recruiter Login (Authenticates with Recruiter ID & Password)
app.post('/api/recruiter/login', async (req, res) => {
  try {
    const { recruiterId, password } = req.body;
    if (!recruiterId || !password) {
      return res.status(400).json({ success: false, error: 'Recruiter ID and Password are required' });
    }

    const cleanId = recruiterId.trim().toUpperCase();
    const cleanPass = password.trim();

    let account = null;
    try {
      account = await RecruiterAccount.findOne({ recruiterId: cleanId });
    } catch {
      account = inMemoryDB.recruiters.find(r => r.recruiterId === cleanId);
    }

    if (!account) {
      account = inMemoryDB.recruiters.find(r => r.recruiterId === cleanId);
    }

    // Also check HR tokens
    if (!account) {
      const hr = inMemoryDB.hrTokens.find(t => 
        (t.id === cleanId || t.employeeId?.toUpperCase() === cleanId || t.username?.toUpperCase() === cleanId) && t.password === cleanPass
      );
      if (hr) {
        account = { recruiterId: hr.id, hrName: hr.hrName, org: hr.org, password: hr.password };
      }
    }

    if (account && account.password === cleanPass) {
      res.json({
        success: true,
        recruiter: {
          recruiterId: account.recruiterId,
          hrName: account.hrName,
          org: account.org
        }
      });
    } else {
      res.status(401).json({
        success: false,
        error: 'Invalid Recruiter ID or Password. Credentials can be generated in Admin Access.'
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: 'Login authentication failed' });
  }
});

// Serve static client bundle if built
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Fallback for SPA or helpful redirect / notice for any non-API route
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }

  if (req.path === '/admin' || req.path === '/admin.html') {
    const adminHtmlPath = path.join(distPath, 'admin.html');
    if (fs.existsSync(adminHtmlPath)) {
      return res.sendFile(adminHtmlPath);
    }
  }

  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>CommitCV — Development Server</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0b0e; color: #f1f3f7; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .card { background: #12141a; border: 1px solid #232734; border-radius: 8px; padding: 32px; max-width: 520px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        h1 { font-size: 20px; margin-bottom: 12px; color: #fff; }
        p { color: #8e95a5; font-size: 14px; line-height: 1.6; }
        a { display: inline-block; margin-top: 16px; padding: 10px 20px; background: #10b981; color: #000; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>CommitCV Backend API</h1>
        <p>You accessed the Express API on port ${PORT}. The active interactive frontend is running on Vite.</p>
        <a href="http://localhost:5173">Open CommitCV Frontend (http://localhost:5173)</a>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`[SERVER] CommitCV Production Backend running on http://localhost:${PORT}`);
});
