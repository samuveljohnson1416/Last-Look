# Deploying Last Look

Two free hosts, no credit card: **Render** (backend) + **Vercel** (frontend).
The served backend is a light FastAPI container — it does **not** run the
ADK/MCP stack (that's only for capturing an investigation with
`python investigate.py`), so it deploys as a plain web service.

## 1. Backend → Render

1. Push the repo to GitHub (done).
2. render.com → **New → Web Service** → connect the `Last-Look` repo.
3. Settings:
   - **Root Directory:** `backend`
   - **Runtime:** Docker (Render auto-detects `backend/Dockerfile`)
   - **Instance:** Free
4. **Environment variables** (Settings → Environment):
   - `GRAFANA_URL` = `https://vastsouffle659.grafana.net`
   - `GRAFANA_MCP_TOKEN` = your `glsa_...` service-account token
   *(these power the `/authorize` Grafana annotation; the app serves fine
   without them, annotations just won't write.)*
5. Deploy → copy the service URL, e.g. `https://lastlook-backend.onrender.com`.
   Verify: open `<url>/analyze` docs at `<url>/docs`.

> Render free services sleep when idle and take ~30s to wake on the first
> request — fine for judging, just hit it once before the demo.

## 2. Frontend → Vercel

1. vercel.com → **Add New → Project** → import the `Last-Look` repo.
2. Settings:
   - **Root Directory:** `frontend`
   - Framework: Next.js (auto)
3. **Environment variable:**
   - `NEXT_PUBLIC_API_URL` = your Render backend URL (from step 1, no trailing slash)
4. Deploy → the `*.vercel.app` URL is the **hosted Project URL** you submit.

## 3. Capture the agent investigation (optional but recommended)

Locally, with Docker Desktop running and Gemini quota available:

```bash
cd backend && python investigate.py    # writes last_investigation.json
git add backend/last_investigation.json && git commit -m "Add captured investigation" && git push
```

Redeploy the backend (Render auto-deploys on push) and the **Agent
Investigation** panel goes live from the cached result.

## Submission checklist (Grafana track)

- [x] Public repo + OSI license
- [x] Google Cloud (`google-adk`, `google-genai`) used at runtime in code
- [x] Grafana Cloud MCP server used at runtime (`agents.py`)
- [ ] Hosted URL (the Vercel link above)
- [ ] Demo video ≤3 min on YouTube/Vimeo
- [ ] Devpost text description
