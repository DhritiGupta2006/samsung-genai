# Bonus Lab: Real Grounded AI on Amazon Bedrock

**Duration:** ~60 minutes
**What you'll do:** Analyze real customer feedback with Claude on Bedrock, then build **Course Copilot** — an assistant that answers questions about your own Generative AI course material by retrieving real content from the course chapters, not guessing.

---

## Before you start

1. You've been given an IAM username/password for this AWS account. Log in at the console URL provided, and set a new password when prompted.
2. Set your region to **US East (N. Virginia) — us-east-1** in the top-right region selector. Everything in this lab only exists in that region.

---

## Part A — Grounded Prompting (20 min)

Toy prompts like "write me a poem" don't teach you much. Instead, you'll use Claude to do real analytical work on real (anonymized) customer feedback.

1. Go to **Amazon Bedrock → Playgrounds → Chat**.
2. Choose a Claude model (Sonnet or the latest available).
3. Paste the customer reviews below into the chat, followed by your instructions.

**Sample data — paste this in first:**

```
1. "Delivery took 6 days when the site promised 2. Product itself was fine."
2. "App keeps crashing when I try to apply a coupon code at checkout."
3. "Customer support resolved my refund in 10 minutes over chat — excellent."
4. "The size chart is wrong for hoodies, I had to return twice to get the right fit."
5. "Great quality for the price, will order again."
6. "Tracking link never updates, I had no idea where my order was for a week."
7. "Checkout page froze twice before payment finally went through."
8. "Packaging was damaged but the item inside was okay."
9. "Loved the product but the invoice email never arrived, needed it for reimbursement."
10. "Support was rude and unhelpful when I asked about a late delivery."
```

**Then ask Claude (as one prompt):**

```
You are a customer experience analyst. Based on the 10 reviews above:
1. Classify each review as Positive, Negative, or Mixed.
2. Identify the top 3 recurring complaint themes (not just symptoms — the underlying cause).
3. For each theme, recommend one concrete fix a small e-commerce team could ship this sprint.
4. Output as a markdown table for (1), then a short bulleted list for (2) and (3).
```

**Try this next** — change ONE thing and compare the output:
- Add to your prompt: `Assume the team only has capacity to fix ONE thing this sprint — which one, and why?`
- Re-run with a different Claude model. Compare quality vs. speed.

This is the same skill — structured prompting for a real decision — that shows up in any job using an LLM: you're not asking for text, you're asking for a decision-ready output.

---

## Part B — Course Copilot: Ask Your Own Course Material (35 min)

A Knowledge Base has already been built and loaded with **Chapter 1 — Introduction to Generative AI** — you're querying it directly using its own built-in test chat. Nothing to create, nothing to configure.

### Step 1 — Open the Knowledge Base

1. In the AWS Console search bar (top), type **Bedrock** and open **Amazon Bedrock**.
2. In the left-hand navigation menu, find **Knowledge Bases** (under the Builder tools section) and click it.
3. You'll see `knowledge-base-samsung-genai` in the list, with status **Available**. Click on its name to open it.

### Step 2 — Open the test panel

1. On the Knowledge Base details page, look for the **Test Knowledge Base** panel — it's on the right-hand side of the screen (may need to click a "Test" button/icon to expand it if it's collapsed).
2. You'll see a mode selector — choose **"Agentic retrieval with answer generation"** (the other modes either don't generate an answer, or aren't supported for this Knowledge Base type).
3. Click **Select model** and choose any available Claude model.
4. You'll see a chat box at the bottom of that panel — that's where you type your questions.

### Step 3 — Ask real questions (Chapter 1 topics only)

Type each of these into the test panel's chat box, one at a time, and read the response:

- `What is Generative AI?`
- `How is Generative AI different from traditional AI or machine learning?`
- `What are some real-world examples or use cases of Generative AI?`
- `What are the main types of Generative AI models mentioned?`

**Then try a question the document can't answer:**
- `Give me 3 prompt engineering techniques with examples.` (this is Chapter 2 content, not loaded)
- `What's a good recipe for chocolate cake?` (completely unrelated domain)

**What happens with these, and why that's correct:** since only Chapter 1 is loaded, the assistant should say it doesn't have that information, instead of guessing or making something up. **That's the expected, correct behavior** — not a bug.

**Bonus "aha" moment to try:** ask `What's the capital of France?` — you may see it actually answer this correctly, citing a source. That's not a mistake: Chapter 1 likely uses "the capital of France is Paris" as an example sentence while explaining how models predict the next word/token. The retrieval found that real passage and cited it — it's still grounded, just via an incidental example rather than the chapter's core topic. Good discussion point: retrieval grabs *any* relevant passage in the document, not just what you'd consider the "main" content.

### Step 4 — Check the source citations

After each answer that *is* answered, look below it for a **citations / source chunks** link or icon. Click it — it shows you the exact passage from Chapter 1 the answer was pulled from. This is the proof that it's not answering from memory.

### What to notice

- The citation is the whole point: it's pointing at a real chunk of the real PDF, not generating text from what Claude already "knew."
- Ask it something outside Chapter 1 and watch it say so (or notice if it doesn't — see Step 3).
- This retrieve-then-generate pattern is the same one behind every "chat with your data" product — internal wikis, policy documents, support knowledge bases. You just used it directly, pointed at your own course material.

---

## Part C — Build a Guardrail (10-15 min)

Every real AI system needs a safety layer independent of the model itself — this is that layer.

### Step 1 — Create the guardrail

1. Go to **Amazon Bedrock → Guardrails → Create guardrail**.
2. Name it `guardrail-<yourusername>`.
3. **Content filters**: turn on filters for Hate, Insults, Sexual, Violence, and Misconduct. Set each to **Medium**.
4. **Denied topics**: add a new denied topic:
   - Name: `Exam Cheating`
   - Definition: `Requests for exam answers, assignment solutions, or help cheating on academic assessments`
   - Add 1-2 example phrases: `Give me the answers to tomorrow's exam`
5. **Word filters**: turn on the built-in **profanity filter**.
6. Create the guardrail and wait for status **Ready**.

### Step 2 — Test it (right in the Guardrails console, no agent needed)

Use the built-in test panel on the guardrail's page, pick any Claude model, and try:
- `Can you give me the answers to my final exam?` — should get blocked (denied topic).
- `What is prompt engineering?` — should pass through normally.
- Try a message with an insult, e.g. `You are so stupid` or `Only a fool would ask that` — should get blocked by the **Insults** content filter.

### What to notice

The guardrail blocks things **before the model even has to decide** — this is exactly how production AI systems enforce safety/compliance rules that can't depend on the model "choosing" to behave. It's a completely separate layer that can sit in front of any chat, including the one you built in Part B.

---

## Part D — Generate an Image (5-10 min, bonus)

A different kind of Bedrock output, just to see the range of what's available.

1. Go to **Amazon Bedrock → Playgrounds → Image**.
2. Choose an available image model (Titan Image Generator, or Stability AI if Titan isn't enabled).
3. Prompt: `A futuristic classroom where students learn AI, digital art style`
4. Generate, view the result.
5. Try changing the prompt (add a style, a mood, a different scene) and regenerate — compare outputs.

---

## Cleanup note

Everything in this lab (your IAM account) is temporary and will be removed after today. Take screenshots of your working chat, guardrail test, and generated image if you want to keep a record.
