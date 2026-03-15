# Devyansh Gupta — React Portfolio

## Project Structure
```
portfolio-react/
├── index.html
├── vite.config.js
├── package.json               ← Frontend (React + Vite)
├── package-backend.json       ← Backend deps
├── server.js                  ← Email backend
├── render.yaml                ← Render.com deploy config
├── .env.example               ← Backend env template
├── .env.local.example         ← Frontend env template
└── src/
    ├── App.jsx
    ├── index.css
    ├── assets.js
    └── components/ (13 files)
```

---

## PART 1 — Run Locally

### 1. Start the React frontend
```bash
npm install
npm run dev
# Opens at http://localhost:5173
```

### 2. Get Gmail App Password (one time only)
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Search "App passwords" → Mail → Generate
4. Copy the 16-character code

### 3. Start the email backend
```bash
cp .env.example .env
```
Edit .env:
```
EMAIL_USER=devgupta51006@gmail.com
EMAIL_PASS=abcdefghijklmnop
PORT=3001
```
```bash
npm install --prefix . nodemailer express cors dotenv
node server.js
```
Success output:
```
🚀  Backend running at http://localhost:3001
✅  Email transporter ready — connected to Gmail
```

### 4. Test it
Open http://localhost:5173, fill the contact form.
Check devgupta51006@gmail.com — email arrives within seconds.

---

## PART 2 — Deploy (works everywhere, not just localhost)

### Backend on Render.com (FREE public HTTPS URL)

1. Push to GitHub:
```bash
git init && git add . && git commit -m "portfolio"
git remote add origin https://github.com/YOUR_USERNAME/portfolio-react.git
git push -u origin main
```

2. Go to https://render.com → New+ → Web Service → Connect repo

3. Settings:
   - Build Command: npm install
   - Start Command: node server.js

4. Environment tab → Add variables:
```
EMAIL_USER = devgupta51006@gmail.com
EMAIL_PASS = abcdefghijklmnop
```

5. Deploy → copy your URL:
```
https://devyansh-portfolio-backend.onrender.com
```

### Connect frontend to deployed backend

```bash
cp .env.local.example .env.local
```
Edit .env.local:
```
VITE_BACKEND_URL=https://devyansh-portfolio-backend.onrender.com
```

### Frontend on Vercel

```bash
npm run build
npx vercel
```
In Vercel dashboard → Settings → Environment Variables → Add:
```
VITE_BACKEND_URL = https://devyansh-portfolio-backend.onrender.com
```

---

## Result

| Feature | Local | Deployed |
|---------|-------|---------|
| Portfolio | localhost:5173 | your-app.vercel.app |
| Email to devgupta51006@gmail.com | YES | YES |
| Auto-reply to sender | YES | YES |

---

## Troubleshooting

"Invalid login" → Used Gmail password, not App Password. Create one at myaccount.google.com/security

"Backend not running" → Run node server.js in separate terminal

Form works locally but not deployed → Set VITE_BACKEND_URL in Vercel env vars

Render sleeps on free tier → First request after 15min idle takes ~30s to wake up
