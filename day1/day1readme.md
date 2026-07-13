# Day 1 — Introduction to GenAI
**Samsung GenAI Program · SRM Kattankulathur · 13 July 2026**

## Start here — do these 3 steps in order, before anything else

**1. Go to the trainer's GitHub repo:**
`https://github.com/Anilmidna/samsung-genai`

**2. Click the Fork button** (top-right of that page) → **Create fork**.
Wait until the browser address bar shows `github.com/YOUR-USERNAME/samsung-genai` — that's your own personal copy. You now own it; the trainer's copy is untouched.

**3. You're now working from your fork, not the trainer's repo.** Every step below — cloning, labs, submissions — happens inside *your* copy. If you ever need to come back to these instructions, they also live inside your fork at `day1/day1readme.md`.

---

## Part 1 — One-Time Setup (Day 1 Only)

> You do this only today. From Day 2 onwards, skip to Part 2.

### 1A — Verify your AI accounts
Open each of these in a browser tab and confirm you can log in:

| Tool | URL | Model to use |
|---|---|---|
| ChatGPT | chat.openai.com | GPT-4o |
| Claude | claude.ai | Claude Sonnet |
| Gemini | gemini.google.com | Gemini 1.5 Pro |

---

### 1B — Clone your fork to your laptop
1. Press **Windows key** → type **Git Bash** → press Enter
2. A black terminal window opens. Type these commands one line at a time:

```bash
git clone https://github.com/YOUR-USERNAME/samsung-genai.git
cd samsung-genai
```

Replace `YOUR-USERNAME` with your actual GitHub username (the fork you created in Step 2 above — not the trainer's).

3. You should see a `samsung-genai` folder appear on your Desktop or Documents.

---

## Part 2 — Lab 1: Tool Setup & Pipeline Test
**Not scored · ~30 minutes**

This lab proves your entire submission pipeline works before any scored lab begins.

---

### Step 1 — Open checkin.json
1. Press **Windows key + E** to open File Explorer
2. Navigate to where you cloned the repo (Desktop or Documents)
3. Open `samsung-genai` folder → open `submissions` folder
4. Right-click **checkin.json** → **Open with** → **Notepad**

You will see:
```json
{
  "student_name": "Type Your Full Name Here",
  "github": "your-github-username",
  "team": "TBD",
  "status": "ready"
}
```

---

### Step 2 — Edit two fields only
Change **only** these two lines. Do not touch anything else:
- `"student_name"` → replace with your full name (e.g. `"Rahul Kumar"`)
- `"github"` → replace with your GitHub username (e.g. `"rahulkumar2024"`)

Press **Ctrl+S** to save. Close Notepad.

---

### Step 3 — Push to GitHub
1. In File Explorer, go back up to the `samsung-genai` folder (not submissions)
2. Right-click on empty space inside the folder → click **Git Bash Here**
3. A black terminal opens. Type these 3 commands one by one:

```bash
git add submissions/checkin.json
git commit -m "Day 1 check-in"
git push origin main
```

4. If asked for a username and password, enter your GitHub credentials.

---

### Step 4 — Confirm on dashboard
Look at the projector. Within 30 seconds your name should appear as a **green tick**.

If it does — your pipeline works. You are ready for the scored labs.

---

## Part 3 — Lab 2: Next Word Prediction
**Team activity · ~45 minutes + 20 min Gradio Showdown**

---

### Step 1 — Find your team
Trainer will announce 10 teams of 4 students. Find your teammates.
One person in each team is the **Team Lead** — they will present the Gradio demo.

---

### Step 2 — Open the notebook
Open Lab 2 from the URL on the projector. Click **Open in Google Colab**.
In Colab: **File → Save a copy in Drive** (so you can edit it).

---

### Step 3 — Complete all 8 Missions
Run each cell in order. Key missions:

| Mission | What to do |
|---|---|
| 1 | Install libraries — run cell, no errors |
| 2 | Imports — run cell |
| 3 | Choose ONE model — uncomment only one line |
| 4 | Load model — wait for "Model Loaded" |
| 5 | Tokenization — note vocab size and token count |
| 6 | Fill in the 3 TODOs (logits, softmax, top-k) |
| 7 | Test with different prompts |
| 8 | Run `demo.launch(share=True)` → copy the `gradio.live` URL |

---

### Step 4 — Note your Gradio URL
After Mission 8 runs, you will see a line like:
```
Running on public URL: https://abc123def456.gradio.live
```
**Copy this URL and keep it** — you need it when filling day1.json after Lab 3.

---

### Step 5 — Present your demo (Gradio Showdown)
Trainer calls each team. Team Lead connects to projector and opens the Gradio URL.
You have **2 minutes** to show:
- Which model you used and why
- Your most interesting prediction
- What you learned about how transformers work

---

## Part 4 — Lab 3: Model Face-Off
**Individual · ~60 minutes**

---

### Step 1 — Open Lab 3
Open the URL shown on the projector.

---

### Step 2 — Set up your models
Before starting, open a **new chat** in each of the 3 tools:
- ChatGPT: Settings → Personalization → Memory → turn **OFF**
- Claude: open a new conversation
- Gemini: open a new conversation

---

### Step 3 — Run all 3 prompts
The lab has 3 prompts (P1, P2, P3). For each prompt:
1. Copy the prompt from the lab page
2. Paste it into ChatGPT → note the response
3. Paste the same prompt into Claude → note the response
4. Paste the same prompt into Gemini → note the response
5. Fill in your observations in the lab page

**P3 has a trap** — one or more models will likely give wrong information.
Find it. Verify it. Note exactly what the model said and what is actually correct.

---

### Step 4 — Fill the submission form in Lab 3
Complete all fields on the lab page: winners, observations, hallucination details, overall winner.

---

## Part 5 — Submit day1.json (After Lab 3)

This covers BOTH Lab 2 and Lab 3 in one file. One push at the end of the day.

---

### Step 1 — Copy the JSON template
At the bottom of Lab 3, click **Copy JSON Template**.

---

### Step 2 — Open Notepad and paste
Press **Windows key** → type **Notepad** → Enter
Press **Ctrl+V** to paste.

---

### Step 3 — Fill in every field

```json
{
  "day": 1,
  "student_name": "Your Full Name",
  "github": "your-github-username",

  "lab2_team": "Your Team Name",
  "lab2_model_used": "SmolLM2-360M-Instruct",
  "lab2_gradio_url": "https://xxxx.gradio.live",

  "lab": "model_face_off",
  "p1_winner": "chatgpt or claude or gemini",
  "p1_observation": "What stood out comparing models on Prompt 1",
  "p2_winner": "chatgpt or claude or gemini",
  "p2_observation": "What stood out comparing models on Prompt 2",
  "p3_winner": "chatgpt or claude or gemini",
  "p3_observation": "What stood out comparing models on Prompt 3",
  "hallucination_found": false,
  "hallucination_detail": "Model | What it stated | What is actually correct",
  "overall_winner": "chatgpt or claude or gemini",
  "biggest_surprise": "One sentence on what surprised you most",
  "stretch_done": false,
  "stretch_prompt": "",
  "stretch_observation": "",
  "submitted_at": ""
}
```

Field-by-field guide:

| Field | What to enter |
|---|---|
| `student_name` | Your full name |
| `github` | Your GitHub username |
| `lab2_team` | Your team name from Lab 2 |
| `lab2_model_used` | The model your team chose in Colab |
| `lab2_gradio_url` | The gradio.live URL from Mission 8 |
| `p1_winner` / `p2_winner` / `p3_winner` | Which model gave the best response — write `chatgpt`, `claude`, or `gemini` |
| `hallucination_found` | Write `true` if you caught a wrong answer in P3, otherwise `false` |
| `hallucination_detail` | If true — write which model, what it said, and what is actually correct |
| `overall_winner` | Your pick across all 3 prompts |
| `biggest_surprise` | One honest sentence |
| `stretch_done` | Write `true` if you did the bonus prompt, otherwise `false` |

---

### Step 4 — Save as day1.json

**File → Save As**
- Navigate to: your `samsung-genai` folder → `submissions` folder
- File name: `day1.json`
- **Save as type: All Files** ← do not skip this step
- Click Save

> ⚠️ If Save as type is left as "Text Documents" the file saves as `day1.json.txt` and the dashboard cannot read it.

---

### Step 5 — Push to GitHub

1. Open File Explorer → go to your `samsung-genai` folder (not submissions)
2. Right-click on empty space → **Git Bash Here**
3. Type these 3 commands one by one:

```bash
git add submissions/day1.json
git commit -m "Day 1 submission - YOUR NAME"
git push origin main
```

Replace `YOUR NAME` with your actual name in the commit message.

---

### Step 6 — Check your badge on the dashboard
Open the dashboard URL from the projector. Within 30 seconds you will see your badge:

| Badge | What it means |
|---|---|
| 💎 Diamond | You caught the hallucination AND your Gradio URL is in day1.json |
| 🥇 Gold | You caught the hallucination in P3 (`hallucination_found: true`) |
| 🥈 Silver | You submitted day1.json with your name filled |

> The badge is calculated automatically from what you put in day1.json. You cannot choose it yourself.

---

## How Days 2–5 Work

From Day 2 onwards you already have your fork and clone. No setup needed.

Each day:
1. Open that day's lab from the URL on the projector
2. Complete all labs
3. Click **Copy JSON Template** at the end → Notepad → fill answers → save as `submissions/day2.json`
4. Push:

```bash
git add submissions/day2.json
git commit -m "Day 2 submission - YOUR NAME"
git push origin main
```

Change the day number each day. Everything else is identical.
