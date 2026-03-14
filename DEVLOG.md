# 🚀 Project DevLog: SheetSight 

**Internship Task:** Data Visualization using MERN Stack\
**Developer:** Sijal Manandhar\
**Tech Stack:** React, Node.js, MongoDB, PostgreSQL, Turborepo

---

## Progress Overview

| Phase | Status | Key Milestones |
| :--- | :--- | :--- |
| **Phase 1: Architecture** | Completed | Turborepo setup, Biome, TypeScript configs |
| **Phase 2: Authentication** | In Progress | Admin Login system, JWT, Postgres/Sequelize integration |
| **Phase 3: Data Management** | Pending | Excel (.xlsx) Parser, MongoDB Sales Schema, CRUD APIs |
| **Phase 4: Sales Dashboard** | Pending | Product Table, Bar Chart (Qty), Pie Chart (Revenue) |
| **Phase 5: Dynamic Sync** | Pending | Real-time Chart updates on CRUD operations |

---

## Daily Log

### [2026-05-14] | Day 1: Monorepo Foundation & Workspace Setup
**Focus:** Workspace architecture and cross-package synchronization.

**Tasks Completed**
* **Architecture:** Initialized **Turborepo** monorepo to manage `apps/web` and `apps/api`.
* **Tooling:** Set up **Biome** for linting/formatting and **pnpm catalogs** for unified dependency versions.
* **Shared Logic:** Created a **shared-validators** package featuring `enforceEnv`, a Zod-based utility to strictly validate environment variables.
* **Frontend (Web):** Scaffolded **Vite + React** with **Tailwind CSS** and **TanStack Router**.
* **Backend (API):** Node.js server setup with **Zod** `.env` validation and dynamic **CORS** origin checks.

**Technical Strategy & Decisions**
* **Decision:** Implemented a Monorepo with a **shared-validators** package.
* **Reasoning:** Centralizing Zod schemas prevents code duplication and ensures absolute data consistency between the API and UI.
* **Benefit:** The `enforceEnv` utility creates a "fail-fast" system, ensuring the app crashes with clear logs if configurations are invalid, while **pnpm catalogs** eliminate version mismatch errors.

---
