# IPRODENA Office

Interactive 2D operations room for the Inula delle Grotte mini-team.

Current status:
- Static HTML/CSS/JS prototype.
- Password gate uses client-side password `inula`; this is only light privacy, not real security.
- Seven clickable agents with task assignment saved to localStorage.
- Office, Pipeline and War Room views.

Recommended secure deployment:
- Use platform-level password protection on Vercel, hosting control panel, or the target website.
- Do not rely on the client-side password for confidential documents.

Development:

```bash
npm install
npm run dev
```

Static use:
Open `index.html` directly in a browser.
