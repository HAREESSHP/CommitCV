import { answerRecruiterQuestion } from './server/rag.js';

const mockCandidate = {
  user: {
    login: 'hareesshp',
    name: 'Hareesh P',
    public_repos: 4
  },
  repos: [
    {
      name: 'CommitCV',
      language: 'JavaScript',
      description: 'AST resume verification platform with MERN stack and zero hallucinations',
      stargazers_count: 15,
      topics: ['react', 'express', 'rag', 'mongodb']
    },
    {
      name: 'portfolio-website',
      language: 'JavaScript',
      description: 'Engineering portfolio and student code dossier',
      stargazers_count: 5,
      topics: ['react', 'vite']
    },
    {
      name: 'microservice-api',
      language: 'TypeScript',
      description: 'Decoupled REST microservices with Node, Express, Docker',
      stargazers_count: 8,
      topics: ['typescript', 'docker', 'express']
    }
  ],
  manifests: {
    'CommitCV': {
      'package.json': JSON.stringify({ dependencies: { react: '^19.0.0', express: '^4.18.0', mongoose: '^8.0.0' } })
    },
    'microservice-api': {
      'Dockerfile': 'FROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm install\nEXPOSE 5000\nCMD ["npm", "start"]'
    }
  },
  readmes: {
    'CommitCV': 'Grounding tech resumes in AST code citations. Built with React and Express.',
    'microservice-api': 'Dockerized Node REST microservice.'
  },
  events: [
    { type: 'PushEvent', payload: { commits: [1, 2, 3] }, created_at: new Date().toISOString() }
  ]
};

const testQueries = [
  'Hi',
  'Does this candidate have experience with React?',
  'Does this candidate have experience with Rust?',
  'Does this candidate know Docker?',
  'Does this candidate know Solidity or Web3?',
  'What projects has this candidate built?',
  'What are their strengths and missing skills?',
  'What technical questions should I ask in an interview?',
  'Where did this candidate go to college?'
];

async function runTests() {
  console.log('=== TESTING CANDIDATE RAG CHATBOT ===\n');
  for (const q of testQueries) {
    console.log(`\n--------------------------------------------`);
    console.log(`QUERY: "${q}"`);
    try {
      const res = await answerRecruiterQuestion({
        githubData: mockCandidate,
        query: q,
        jdText: 'Full Stack Engineer with React, Node, Express, Docker'
      });
      console.log(`PROOF STATE: ${res.proofState}`);
      console.log(`SOURCES: ${JSON.stringify(res.sources?.map(s => s.file))}`);
      console.log(`ANSWER:\n${res.answer}`);
    } catch (err) {
      console.error('ERROR:', err.message);
    }
  }
}

runTests();

