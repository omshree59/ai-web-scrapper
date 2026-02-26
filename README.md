# 🚀 VC Scout  
### VC Intelligence Interface + Live Enrichment

🌐 Live App: https://vcscout.vercel.app/  
📂 GitHub Repository: https://github.com/omshree59/ai-web-scrapper  

---

# 🧩 Assignment Overview

This project implements a **VC Intelligence Interface + Live Enrichment system**, as described in the take-home brief.

The objective:

> Build a sourcing system that turns a fund’s unique thesis into an always-on discovery workflow, reduces noise, surfaces high-signal companies earlier, and makes every recommendation explainable.

This MVP focuses on delivering a working UI + one complete live enrichment pipeline end-to-end.

---

# 🎯 Implemented Product Workflow

The app follows the required workflow:

**Discover → Open Profile → Enrich → Take Action**

### 1️⃣ Discover
- Global search
- Faceted filters (Sector, Stage, Status)
- Sortable + paginated companies table

### 2️⃣ Open Profile
- Company overview
- Signals timeline
- Notes
- Save-to-list functionality

### 3️⃣ Live Enrichment
- One-click “Enrich” button
- Server-side scrape of real public website content
- Structured extraction of intelligence
- Clear loading + error states
- Cached results to avoid repeated fetches

### 4️⃣ Take Action
- Create lists
- Add/remove companies
- Save searches
- Persistent state across sessions

---

# ✨ Minimum Scope Requirements Covered

✔ Sidebar app shell + navigation  
✔ `/companies` page (search + filters + pagination)  
✔ `/companies/[id]` profile page  
✔ `/lists` with persistence + export  
✔ `/saved` searches with persistence  
✔ Live enrichment via server-side endpoint  
✔ Sources displayed with timestamp  
✔ API keys hidden from client  

---

# 🤖 Live Enrichment Details

Enrichment is handled via:

`Next.js /api/enrich` (server-side)

This ensures:
- API keys are never exposed in the browser
- Environment variables are safely used
- Production deployment works reliably

### Enrichment Output Includes:

- 1–2 sentence summary  
- 3–6 bullet value propositions  
- 5–10 keywords  
- 2–4 derived signals (e.g. careers page, blog activity)  
- Exact URLs scraped  
- Timestamp of enrichment  

Only public pages are used. No attempt to bypass access controls.

---

# 🏗 Architecture (MVP Path)
User
↓
Next.js Frontend (App Router)
↓
/api/enrich (Server Layer)
↓
Jina AI (Fetch public content)
↓
Bytez.js (Extract structured fields)
↓
Firestore / Local Cache


This implements one complete enrichment path end-to-end, as required.

Stretch components (queueing, vector store, signal engine) are intentionally out of scope for this timeboxed MVP.

---

# 🛠 Technical Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + Shadcn/UI
- **Authentication:** Firebase Auth
- **Database:** Firebase Firestore
- **AI Scraping:** Jina AI
- **Extraction:** Bytez.js
- **Deployment:** Vercel

---

# 🔐 Environment Setup

Create a `.env.local` file:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="..."
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="..."

# AI Enrichment (Server-Side Only)
BYTEZ_API_KEY="your-primary-key"
BYTEZ_API_KEY_FALLBACK="your-backup-key"

Run locally:
npm install
npm run dev

📊 Evaluation Alignment

This project was built to optimize for:

.Interface quality (clean, fast, usable)
.Reliable live enrichment in production
.Safe server-side key handling
.Clear state management
.Transparent, explainable outputs

👨‍💻 Author

Omshree
VC Intelligence Interface + Live Enrichment
Intern Assignment – February 2026


---

### 🔥 Why This Version Is Strong

- Directly mirrors the assignment brief
- Clearly separates MVP vs stretch
- Shows secure engineering practices
- Avoids over-claiming
- Reviewer can skim and understand everything quickly

---

If you want, I can now:

- Make a slightly more “senior-engineer tone” version  
- Add a short 5-line executive summary at top  
- Or polish language to sound more product-lead than intern  

Tell me the vibe you want to project 👀