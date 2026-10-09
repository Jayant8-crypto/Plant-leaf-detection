# Cotton Analyzer Frontend

This directory contains the Next.js 16 and React 19 frontend. For the complete Docker installation, API testing, environment configuration, and troubleshooting guide, see the [root README](../README.md).

## Local Development

Requirements: Node.js 22 and npm.

From this directory, install dependencies and start the development server:

```sh
npm ci
npm run dev
```

Open <http://localhost:3000>. The analyzer calls `http://localhost:8000` by default. Set `NEXT_PUBLIC_API_BASE_URL` to another browser-accessible backend origin before starting the frontend when needed. Do not use a Docker-only service name such as `backend` in this browser-side URL.
