# Running Avvy locally

Guide for setting up and testing the extension and backend on your machine. Everything is stubbed — no auth, calendar, or chat logic is implemented yet.

## Prerequisites

- **Node.js** 20+ and npm
- **Python** 3.11+
- **Google Chrome** (for loading the unpacked extension)
- Supabase project and Google Cloud OAuth client (needed once auth is implemented; not required to run stubs)

---

## Backend

### 1. Create virtual environment and install deps

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure environment

```bash
cp .env.example .env
```

Fill in values when implementing auth/services. Stubs run without real credentials.

### 3. Start the API server

From `backend/` with venv active:

```bash
uvicorn app.main:app --reload --port 8000
```

### 4. Test stub endpoints

**Health check** (works now):

```bash
curl http://localhost:8000/health
# {"status":"ok"}
```

**Calendar events** (returns 501 until implemented):

```bash
curl "http://localhost:8000/calendar/events?start_date=2026-06-01&end_date=2026-06-07" \
  -H "Authorization: Bearer fake" \
  -H "X-Google-Token: fake"
# {"detail":"JWT verification not implemented"}
```

**Chat** (returns 501 until implemented):

```bash
curl -X POST http://localhost:8000/chat \
  -H "Authorization: Bearer fake" \
  -H "Content-Type: application/json" \
  -d '{"message":"exclude weekends","current_slots":[],"date_range":{"start":"2026-06-01","end":"2026-06-07"}}'
# {"detail":"JWT verification not implemented"}
```

Interactive API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Extension

### 1. Install dependencies

```bash
cd extension
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_API_URL` when wiring auth and API calls. Placeholder values are fine for UI-only testing.

### 3. Start dev build

```bash
npm run dev
```

Vite + `@crxjs/vite-plugin` watches and rebuilds the extension into `extension/dist/`.

**Keep this terminal running.** In dev mode the service worker loads scripts from `http://localhost:5173`; if Vite stops, the extension breaks.

### 4. Load in Chrome

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select `extension/dist/`
5. Note the **Extension ID** shown on the card — you'll need it for Google OAuth setup later
6. Pin the extension and click its icon to open the side panel

### 5. What you'll see

- **Connect screen** — "Connect Google Calendar" button (no-op stub)
- After auth is wired, **main view** with date picker, availability table, and chat input stubs

---

## CORS (when connecting extension → backend)

Update `ALLOWED_ORIGINS` in [`backend/app/main.py`](backend/app/main.py) with your unpacked extension origin:

```
chrome-extension://YOUR_EXTENSION_ID
```

Find `YOUR_EXTENSION_ID` on `chrome://extensions` after loading the unpacked build.

---

## Google OAuth setup (for later)

Not needed to run stubs. When implementing auth:

1. Create a **Chrome Extension** OAuth client in Google Cloud Console
2. Add your extension ID under Application ID
3. Put the client ID in `extension/public/manifest.json` → `oauth2.client_id`
4. Register `https://<extension-id>.chromiumapp.org` in:
   - Google Cloud authorized redirect URIs
   - Supabase Dashboard → Authentication → URL Configuration → Redirect URLs
5. Add the same client ID to Supabase Google provider settings

See the product spec and [Supabase Chrome extension Google auth docs](https://supabase.com/docs/guides/auth/social-login/auth-google?platform=chrome-extensions).

---

## Production build

```bash
# Extension
cd extension && npm run build

# Backend (no build step — run with uvicorn in production)
cd backend && uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Extension won't load | Ensure `npm run dev` or `npm run build` ran; load `extension/dist/`, not `extension/` |
| Service worker failed (status 3) / CORS on `localhost:5173` | Use `npm run dev` with Vite running; manifest must include `http://localhost:5173/*` in `host_permissions`. Or use `npm run build` and load `dist/` without the dev server (no HMR). |
| Side panel doesn't open | Click the extension toolbar icon; check service worker errors on `chrome://extensions` |
| CORS errors from extension | Add `chrome-extension://<id>` to `ALLOWED_ORIGINS` in backend |
| `501 Not implemented` on API routes | Expected — stubs only; implement in focused chunks |
