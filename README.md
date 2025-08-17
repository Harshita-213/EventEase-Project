# EventEase – MERN Community Event Management (Starter)

This is a minimal but functional MERN app with:
- JWT auth (register/login)
- Create/Read/Update/Delete events
- RSVP with downloadable QR ticket
- Real‑time notifications for event updates (Socket.IO)

## Quick Start

### 1) Backend
```bash
cd server
npm i
# copy .env as needed; default values are fine for local dev
npm run dev
```
Server runs at `http://localhost:5000`.

### 2) Frontend
```bash
cd client
npm i
npm run dev
```
App runs at `http://localhost:5173`.

### Notes
- Requires MongoDB running locally at `mongodb://127.0.0.1:27017/eventease` (configurable in `.env`).
- JWT secret is set in `server/.env` — change it in production.
- Real‑time toasts appear for created/updated/deleted events and new RSVPs.
