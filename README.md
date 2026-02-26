# 🚀 VC Scout: Precision AI Sourcing Platform

[cite_start]**VC Scout** is a high-performance discovery interface designed for venture capital firms to transform their unique investment thesis into an automated, always-on discovery workflow[cite: 3, 6]. [cite_start]By combining a modern intelligence interface with live AI enrichment, it surfaces high-signal companies earlier and makes every recommendation explainable[cite: 4, 6].

### 🔗 [Live Demo URL] | [GitHub Repository]

---

## ✨ Key Features

### 📡 Market Intelligence & Discovery
* [cite_start]**Thesis-Driven Sourcing:** A modern interface to search and filter through startups using faceted filters like Sector, Stage, and Status[cite: 6, 7].
* [cite_start]**Market Signals Terminal:** A real-time feed of funding announcements, product launches, and trending open-source momentum[cite: 1, 6].
* [cite_start]**Intelligent Workspaces:** Create and manage custom lists to track leads, with full persistence in `localStorage`[cite: 25].

### 🤖 Live AI Enrichment (The Engine)
* [cite_start]**On-Demand Scraping:** One-click "Enrich" functionality that fetches real public website content via AI to display extracted fields[cite: 14, 27].
* [cite_start]**Automated Extraction:** Generates 1-2 sentence summaries, 3-6 bulleted value propositions, and 5-10 key tags per company[cite: 29, 30, 31].
* [cite_start]**Signal Identification:** Detects technical signals like careers page existence, recent blog activity, and changelog updates[cite: 32].
* [cite_start]**Explainable Sources:** Lists every exact URL scraped with a precise timestamp for full transparency[cite: 33].

### 🛡️ Enterprise-Grade Infrastructure (Power User Touches)
* **Cinematic Onboarding:** A premium, multi-slide introduction featuring Firebase Google Auth and a "Continue as Guest" fail-safe.
* **Smart API Failover:** Implemented a waterfall system that automatically swaps between primary and backup AI keys to ensure 100% uptime during high-volume scraping.
* **Data Velocity Metrics:** A live dashboard tracking total pages scraped and cumulative MB of data processed to demonstrate platform power.
* [cite_start]**Secure Architecture:** Enrichment is handled via a server-side Next.js `/api/enrich` endpoint to keep API keys hidden from the client[cite: 35].

---

## 🛠️ Technical Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/)
* **Authentication:** [Firebase Auth](https://firebase.google.com/products/auth)
* **Database:** [Firebase Firestore](https://firebase.google.com/products/firestore)
* **AI Scraping:** [Jina AI](https://jina.ai/) (Markdown Scraper) & [Bytez.js](https://bytez.com/) (LLM Extraction)
* **Icons:** [Lucide React](https://lucide.dev/)

---

## ⚙️ Setup & Installation

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="..."
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="..."

# Bytez AI Failover System
BYTEZ_API_KEY="your-primary-key"
BYTEZ_API_KEY_FALLBACK="your-backup-key"

3. Run Development
npm run dev

📈 North Star ArchitectureThis MVP focuses on the core UI + AI Scrape + Extracted Fields path. It is designed to be highly customizable per fund while remaining transparent about why a company matched.

📝 Evaluation Checklist:
.Interface Quality: Premium typography, spacing, and fast interactions.
.Reliability: Server-side enrichment that handles bot-protection (Cloudflare/403) gracefully
.Persistence: Lists, saved searches, and user profile data persist across sessions.

Developed by [Omshree ] – VC Sourcing Take-Home Assignment, Feb 2026.