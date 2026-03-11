# Meddit

**Share what worked. Discover natural remedies.**

Meddit is a story-first community for people who want to share and discover real experiences with natural remedies—herbs, teas, movement, lifestyle changes—that helped them heal or feel better, without the hype.

---

## What is Meddit?

Meddit is a Reddit-inspired space focused on **natural remedies and holistic approaches** to health. Each post is a timeline: what someone tried, for how long, and what actually changed. The goal is honest, outcome-focused sharing so others can see what worked (and what didn’t) for people in similar situations.

- **Tell your story** — Start a post about your situation and what you’re hoping to change.
- **Document your protocol** — List the foods, herbs, movement, and lifestyle changes you actually tried.
- **Share outcomes, not hype** — Share what improved, what didn’t, and what you’d try again.

---

## Tech Stack

| Layer        | Technology |
|-------------|------------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS 4, NextAuth (Google) |
| **API Gateway** | Go (Echo), JWT auth middleware, reverse proxy |
| **Auth Service** | Go (Echo), PostgreSQL, GORM, JWT, Google OAuth |
| **Feed Service** | Go (Echo), PostgreSQL, GORM — posts, tags, votes |

---

## Architecture

```
                    ┌─────────────────┐
                    │   Frontend      │
                    │   (Next.js)     │
                    │   :3000         │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  API Gateway    │
                    │  (Echo) :8000   │
                    │  CORS, JWT      │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────┐
              ▼                         ▼  
     ┌──────────────┐            ┌──────────────┐
     │ Auth Service │            │ Feed Service │
     │ (Echo) :8001 │            │ (Echo) :8002 │
     │ Google OAuth │            │ Posts, Votes │
     └──────┬───────┘            └──────┬───────┘
            │                           │
            ▼                           ▼
     ┌──────────────┐            ┌──────────────┐
     │  PostgreSQL  │            │  PostgreSQL  │
     │ (auth DB)    │            │ (feed DB)    │
     └──────────────┘            └──────────────┘
```

- **Frontend** talks only to the gateway at `http://localhost:8000`.
- **Gateway** routes `/auth/*` to the auth service and `/feed/*` to the feed service (with JWT validation for feed routes).
- **Auth** and **Feed** services share one PostgreSQL database (each has its own tables).

---

## Project Structure

```
Meddit/
├── frontend/           # Next.js app (landing, feed, auth)
├── meddit-gateway/     # API gateway (proxy + JWT middleware) + Dockerfile
├── auth-service/       # Google sign-in, JWT issuance, user DB
├── feed-service/       # Posts, tags, votes, feed API
├── docker-compose.yml  # PostgreSQL + Gateway (Docker)
└── README.md
```

---

## Prerequisites

- **Go** 1.25+
- **Node.js** 20+ (for frontend)
- **PostgreSQL** (one instance; create two databases for auth and feed)
- **Google OAuth** credentials (Client ID & Secret) for sign-in

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/Meddit.git
cd Meddit
```

### 2. Database

Use **one** PostgreSQL database. Both auth-service and feed-service point to the same database (different tables). If you don’t have PostgreSQL installed, you can run it via Docker (see section 5).

### 3. Environment

Create a `.env` file at the **project root** (parent of `frontend/`, `meddit-gateway/`, `auth-service/`, `feed-service/`). **Do not commit this file**—use it only locally and add real values yourself.

**Database & gateway** (same `DB_*` and `DB_NAME` for both auth and feed services):

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=<your-db-password>
DB_NAME=meddit

JWT_SECRET=<at-least-32-character-secret>
```

**Frontend** (NextAuth + Google):

- In [Google Cloud Console](https://console.cloud.google.com/apis/credentials) create an OAuth 2.0 Client ID (Web application).
- Set authorized redirect URI to: `http://localhost:3000/api/auth/callback/google`.

Then in `.env` at project root (or in `frontend/.env.local` if you prefer), add:

```env
AUTH_GOOGLE_ID=<your-google-client-id>
AUTH_GOOGLE_SECRET=<your-google-client-secret>
```

Optional: if the frontend runs against a different gateway URL:

```env
GATEWAY_URL=http://localhost:8000
```

### 4. Run the stack

Use **four terminals** (or a process manager), from the project root:

**Terminal 1 — Auth service**

```bash
cd auth-service && go run main.go
```

**Terminal 2 — Feed service**

```bash
cd feed-service && go run main.go
```

**Terminal 3 — API Gateway**

```bash
cd meddit-gateway && go run main.go

```

**Terminal 4 — Frontend**

```bash
cd frontend && npm install && npm run dev
```

- **App:** [http://localhost:3000](http://localhost:3000)  
- **Gateway:** [http://localhost:8000](http://localhost:8000)  
- **Auth API:** [http://localhost:8001](http://localhost:8001)  
- **Feed API:** [http://localhost:8002](http://localhost:8002)  

Sign in with Google, then open the feed to create posts and vote.

### 5. Run with Docker (PostgreSQL + Gateway)

You can run **PostgreSQL** and the **API Gateway** as containers and keep auth, feed, and frontend on your host.

From the project root, with a `.env` file in place:

```bash
docker compose up -d
```

This will:

- **`db`** — Start a PostgreSQL container (official `postgres` image). Uses `DB_USER`, `DB_PASSWORD`, and `DB_NAME` from `.env`. Port `5432` is published. Both auth-service and feed-service use this database; you can inspect tables with pgAdmin or any PostgreSQL client.
- **`gateway`** — Build the image from `meddit-gateway/Dockerfile` (multi-stage Go build) and run the API gateway. It loads `.env` and exposes port `8000`.

Useful commands:

```bash
docker compose up -d      # Start in background
docker compose down       # Stop and remove containers
docker compose logs -f    # Follow logs
```

When using Docker for the DB and gateway, run **auth-service** and **feed-service** locally. The gateway container must be able to reach them: on Mac/Windows use `host.docker.internal` instead of `localhost` in the gateway’s proxy targets (or add `extra_hosts: ["host.docker.internal:host-gateway"]` for the gateway service in `docker-compose.yml`). Ensure auth and feed are listening on ports 8001 and 8002.

---

## Features

- **Landing page** — What Meddit is and why it exists.
- **Google sign-in** — OAuth via NextAuth; auth service issues JWTs.
- **Feed** — List of posts (stories) with voting.
- **Create post** — Authenticated users can add stories (title, body, tags).
- **Voting** — Upvote/downvote on posts (stored per user in feed-service).

---

## License

MIT (or your preferred license).

---

*Meddit — Who knows what might work for you?*
