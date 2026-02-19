# delta.remind 🔔
DeltaStudy class reminder — deployed on Netlify, proxy via Netlify Functions.

## Folder structure
```
delta-remind/
├── netlify.toml                  ← tells Netlify where to find files + functions
├── netlify/
│   └── functions/
│       └── classes.js            ← serverless proxy (hits DeltaStudy API)
└── public/
    └── index.html                ← frontend
```

## Deploy to Netlify via GitHub

1. Push this folder to a GitHub repo
2. Go to https://app.netlify.com → "Add new site" → "Import from Git"
3. Pick your repo
4. Set these build settings:
   - **Build command:** *(leave empty)*
   - **Publish directory:** `public`
5. Hit Deploy — done 🎉

Netlify auto-detects `netlify.toml` and deploys the function.

## How it works
```
Browser → GET /api/classes
         → Netlify rewrites to /.netlify/functions/classes
         → Function POSTs to delta-pw.onrender.com (server-side, no CORS)
         → Returns JSON to browser ✅
```
