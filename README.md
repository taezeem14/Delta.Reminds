# delta.remind 🔔
> DeltaStudy class schedule & reminders — serverless, zero-dependency, deploys in 2 minutes.

---

## Folder structure
```
delta-remind/
├── netlify.toml                  ← publish dir + function routing
├── netlify/
│   └── functions/
│       └── classes.js            ← serverless proxy to DeltaStudy API
└── public/
    └── index.html                ← entire frontend (single file)
```

---

## How it works
```
Browser
  └─ GET /api/classes
       └─ netlify.toml rewrites → /.netlify/functions/classes
            └─ Node.js function POSTs to delta-pw.onrender.com
                 └─ Returns JSON to browser  ✅  (no CORS, no backend)
```
The function runs server-side on Netlify's edge — the DeltaStudy API never sees your browser, so CORS is never an issue.

---

## Deploy to Netlify
**Prerequisites:** GitHub account + Netlify account (both free).

1. Push this folder to a GitHub repo *(can be private)*
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Pick your repo
4. Set build settings:
   | Field | Value |
   |---|---|
   | Build command | *(leave empty)* |
   | Publish directory | `public` |
5. Hit **Deploy** — live in ~30 seconds 🎉

Netlify auto-detects `netlify.toml` and wires up the function automatically.

---

## Changing your batch
Open `netlify/functions/classes.js` and update the `batchId` in the request body:
```js
body: JSON.stringify({ batchId: "YOUR_BATCH_ID_HERE" })
```
Commit + push → Netlify auto-redeploys.

---

## Local dev
```bash
npm install -g netlify-cli
netlify dev
# → http://localhost:8888
```
`netlify dev` emulates functions locally so `/api/classes` works exactly like production.

---

## Stack
- **Frontend** — vanilla HTML/CSS/JS, zero dependencies, single file
- **Backend** — Netlify Functions (Node.js), native `fetch`, no `node_modules`
- **Hosting** — Netlify free tier (100GB bandwidth/month)
