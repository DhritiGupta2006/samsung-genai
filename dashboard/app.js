const MEDAL = {
  diamond:   { icon: '💎', label: 'Diamond', color: '#00D4AA' },
  gold:      { icon: '🥇', label: 'Gold',    color: '#FFD700' },
  silver:    { icon: '🥈', label: 'Silver',  color: '#C0C8D8' },
  submitted: { icon: '✅', label: 'Done',    color: '#4A6FA5' },
};

let pollTimer = null;
let totalDays = 5;

async function fetchData() {
  const res = await fetch('/api/leaderboard', { cache: 'no-store' });
  return res.json();
}

function medalCell(achievement) {
  if (!achievement) return `<td class="day-cell empty">—</td>`;
  const m = MEDAL[achievement] || MEDAL.submitted;
  return `<td class="day-cell" title="${m.label}"><span class="medal" style="color:${m.color}">${m.icon}</span></td>`;
}

function rankBadge(rank) {
  if (rank === 1) return '<span class="rank-badge gold-rank">🥇 1</span>';
  if (rank === 2) return '<span class="rank-badge silver-rank">🥈 2</span>';
  if (rank === 3) return '<span class="rank-badge bronze-rank">🥉 3</span>';
  return `<span class="rank-num">${rank}</span>`;
}

function render(data) {
  if (data.error === 'roster_empty') {
    document.getElementById('content').innerHTML =
      `<div class="msg error">roster.json not found or empty — add student GitHub usernames to roster.json.</div>`;
    return;
  }

  totalDays = data.total_days || 5;
  const students = data.students || [];

  document.getElementById('stat-total').textContent = data.total_students ?? '–';
  document.getElementById('stat-submitted').textContent =
    students.filter(s => s.daysSubmitted > 0).length;
  document.getElementById('stat-score').textContent =
    students.length > 0 ? Math.max(...students.map(s => s.totalScore)).toFixed(0) : '–';
  document.getElementById('updated').textContent =
    data.generated_at ? `Updated ${new Date(data.generated_at).toLocaleTimeString()}` : '';

  if (students.length === 0) {
    document.getElementById('content').innerHTML =
      `<div class="msg">No students found in roster.</div>`;
    return;
  }

  // Build day header columns
  let dayHeaders = '';
  for (let d = 1; d <= totalDays; d++) {
    dayHeaders += `<th class="day-header">Day ${d}</th>`;
  }

  // Build student rows
  let rows = '';
  students.forEach(s => {
    const dayCells = s.days.map(d => medalCell(d.achievement)).join('');
    const hasAny = s.daysSubmitted > 0;
    rows += `
      <tr class="${hasAny ? 'active-row' : 'pending-row'}">
        <td class="rank-cell">${rankBadge(s.rank)}</td>
        <td class="name-cell">
          <div class="student-name">${escapeHTML(s.name)}</div>
          <div class="student-github">@${escapeHTML(s.github)}</div>
        </td>
        ${dayCells}
        <td class="score-cell">${s.totalScore > 0 ? s.totalScore.toFixed(0) + ' pts' : '—'}</td>
      </tr>`;
  });

  document.getElementById('content').innerHTML = `
    <div class="table-wrap">
      <table class="scoreboard">
        <thead>
          <tr>
            <th class="rank-header">#</th>
            <th class="name-header">Student</th>
            ${dayHeaders}
            <th class="score-header">Points</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="legend">
      <span>💎 Diamond (3 pts)</span>
      <span>🥇 Gold (2 pts)</span>
      <span>🥈 Silver (1 pt)</span>
      <span>✅ Submitted</span>
      <span>— Not yet</span>
    </div>`;
}

function escapeHTML(str) {
  const d = document.createElement('div');
  d.textContent = str ?? '';
  return d.innerHTML;
}

async function load() {
  try {
    const data = await fetchData();
    render(data);
  } catch {
    document.getElementById('content').innerHTML =
      `<div class="msg error">Cannot reach the leaderboard function. Check Netlify deployment.</div>`;
  }
}

function startPolling() {
  if (pollTimer) clearInterval(pollTimer);
  pollTimer = setInterval(load, 20000);
}

load();
startPolling();
