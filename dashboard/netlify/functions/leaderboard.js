const https = require('https');

const GITHUB_OWNER = process.env.GITHUB_OWNER || "REPLACE_ME";
const GITHUB_REPO  = process.env.GITHUB_REPO  || "samsung-genai";
const BRANCH       = process.env.SUBMISSIONS_BRANCH || "main";
const TOTAL_DAYS   = parseInt(process.env.TOTAL_DAYS || "5", 10);

const CACHE_MS = 25000;
let cache = null;
let cacheTs = 0;

function fetchJSON(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'Cache-Control': 'no-cache', 'User-Agent': 'Samsung-GenAI-Dashboard/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
  });
}

function rosterUrl() {
  return `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${BRANCH}/roster.json`;
}

function submissionUrl(username, day) {
  return `https://raw.githubusercontent.com/${username}/${GITHUB_REPO}/${BRANCH}/submissions/day${day}.json`;
}

function achievementScore(sub) {
  if (!sub) return 0;
  if (typeof sub.score === 'number') return sub.score;
  const map = { diamond: 3, gold: 2, silver: 1 };
  if (sub.achievement) return map[sub.achievement] ?? 0.5;
  if (sub.student_name && sub.student_name.trim().length > 2) return 0.5;
  return 0;
}

function achievementLabel(sub) {
  if (!sub) return null;
  if (sub.achievement) return sub.achievement; // diamond / gold / silver
  const score = achievementScore(sub);
  if (score > 0) return 'submitted';
  return null;
}

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };

  // Serve from cache if fresh
  if (cache && Date.now() - cacheTs < CACHE_MS) {
    return { statusCode: 200, headers, body: JSON.stringify(cache) };
  }

  const roster = await fetchJSON(rosterUrl());
  if (!Array.isArray(roster) || roster.length === 0) {
    return { statusCode: 200, headers, body: JSON.stringify({ error: 'roster_empty' }) };
  }

  // Fetch all days for every student in parallel
  const students = await Promise.all(
    roster.map(async (s) => {
      const dayResults = await Promise.all(
        Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map(async (day) => {
          const sub = await fetchJSON(submissionUrl(s.github, day));
          return {
            day,
            achievement: achievementLabel(sub),
            score: achievementScore(sub),
          };
        })
      );

      const totalScore = dayResults.reduce((sum, d) => sum + d.score, 0);
      const daysSubmitted = dayResults.filter(d => d.achievement !== null).length;

      return {
        github: s.github,
        name: s.name || s.github,
        days: dayResults,
        totalScore,
        daysSubmitted,
      };
    })
  );

  // Sort by total score descending, then alphabetically
  students.sort((a, b) => b.totalScore - a.totalScore || a.name.localeCompare(b.name));

  const payload = {
    students: students.map((s, i) => ({ ...s, rank: i + 1 })),
    total_students: roster.length,
    total_days: TOTAL_DAYS,
    generated_at: new Date().toISOString(),
  };

  cache = payload;
  cacheTs = Date.now();

  return { statusCode: 200, headers, body: JSON.stringify(payload) };
};
