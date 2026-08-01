# BioMesh Sync 🛡️

![Runtime](https://img.shields.io/badge/Runtime-Vercel%20Edge-black?style=flat-square&logo=vercel)
![Database](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-emerald?style=flat-square&logo=supabase)
![Status](https://img.shields.io/badge/Status-Alpha%20V1.0-blue?style=flat-square)

BioMesh Sync is an autonomous, edge-native application that bridges the gap between passive biometric telemetry and active calendar defense. By ingesting real-time stress metrics directly from wearables (Oura Ring, Garmin Connect) via direct webhooks, the system evaluates physiological load in under 50 milliseconds and automatically provisions focus blocks or shifts meetings in Google Calendar before burnout takes over.

## ⚙️ Architecture & High-Performance Stack

To achieve zero idle infrastructure cost and microsecond response times, BioMesh Sync bypasses heavy container networks (Docker/Kubernetes) and traditional long-running server runtimes in favor of a stateless edge architecture:

* **Ingestion & Compute:** Vercel Edge Functions running on a V8 Isolate engine. Executes core programmatic validation rules with zero cold-start latency.
* **Database & Auth:** Supabase (PostgreSQL). Manages user records, encrypted OAuth tokens, and asynchronous telemetry logging via connectionless HTTP REST clients (`@supabase/supabase-js`).
* **Frontend & Onboarding:** Next.js App Router with Tailwind CSS, optimized for high-conversion lead capture and concierge executive provisioning.

## 📊 System Data Flow

```text
[ Oura / Garmin Webhook Stream ] 
             │
             ▼
┌──────────────────────────────────────────────┐
│  Vercel Edge Functions (Runtime Engine)       │
│  - Parses provider-specific payload schemas  │
│  - Validates stress thresholds in <50ms      │
└──────────────────────────────────────────────┘
             │
             ├──(Async HTTP Log)───────> [ Supabase (PostgreSQL / RLS) ]
             │
             └──(OAuth Token Refresh)──> [ Google Workspace Calendar API ]

📁 Project Directory Structure
biomesh-sync/
├── supabase/
│   └── migrations/
│       └── 20260731000000_init_schema.sql
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── api/
│   │       └── webhooks/
│   │           └── route.ts
│   ├── lib/
│   │   ├── supabase/
│   │   │   └── client.ts
│   │   ├── calendar/
│   │   │   └── engine.ts
│   │   └── security/
│   │       └── crypto.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json

🚀 Getting Started & Quick Setup
1. Clone the Repository
git clone [https://github.com/your-username/biomesh-sync.git](https://github.com/your-username/biomesh-sync.git)
cd biomesh-sync
npm install

2. Configure Environment Variables
Create a .env.local file in the root directory and inject your production credentials:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

3. Initialize the Database Schema
 * Navigate to your Supabase project dashboard and open the SQL Editor.
 * Paste and execute the migration script located in supabase/migrations/20260731000000_init_schema.sql to provision tables, extensions, and Row Level Security (RLS) policies.
4. Run Development Server
npm run dev

☁️ Deployment
 * Push your repository to GitHub.
 * Import the project into Vercel.
 * Configure the environment variables within the Vercel project settings dashboard.
 * Deploy to your custom domain (e.g., biomesh.online).
 * Point your Oura or Garmin developer webhook subscriptions directly to:
   https://biomesh.online/api/webhooks
🛡️ License
Distributed under the MIT License. See LICENSE for details.

