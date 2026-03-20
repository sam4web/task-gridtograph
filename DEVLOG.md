# Project DevLog: GridToGraph 

**Internship Task:** Data Visualization using MERN Stack\
**Tech Stack:** React, Node.js, MongoDB, PostgreSQL, Turborepo

---

## Progress Overview

| Phase | Status | Key Milestones |
| :--- | :--- | :--- |
| **Phase 1: Architecture** | Completed | Turborepo setup, Biome, TypeScript configs |
| **Phase 2: Authentication** | Completed | Admin Login system, JWT, Postgres integration |
| **Phase 3: Data Management** | Completed | Excel (.xlsx) Parser, MongoDB Sales Schema, CRUD APIs |
| **Phase 4: Sales Dashboard** | In Progress | Product Table, Bar Chart (Qty), Pie Chart (Revenue) |
| **Phase 5: Dynamic Sync** | Pending | Real-time Chart updates on CRUD operations |

---

## Daily Log

### [2026-05-14] | Day 1: Monorepo Foundation
**Focus:** Architecture and cross-package synchronization.

**Tasks Completed**
* **Monorepo:** Created **Turborepo** for `web` and `api` using **pnpm catalogs**.
* **Tooling:** Set up **Biome** for linting and **Vite + React** for the frontend.
* **Validation:** Built a shared **validators** package with a Zod-based `enforceEnv` utility.
* **Backend:** Initialized Node.js server with strict `.env` and **CORS** validation.

**Insights**
* **Strategy:** Using shared Zod validators ensures data types remain synced across the entire stack.
* **Impact:** `enforceEnv` creates a "fail-fast" system, preventing runtime errors caused by missing configurations.

---

### [2026-05-15] | Day 2: Database & Infrastructure
**Focus:** Data layer, error handling, and observability.

**Tasks Completed**
* **Database:** Set up **PostgreSQL** with **Drizzle ORM**; defined `users` and `otp` schemas.
* **Security & Constants:** Integrated a **Rate Limiter** and a shared package for global constants.
* **Observability:** Combined **Morgan** and **Winston** for structured request/app logging.
* **Error Handling:** Built a global `ApiError` class and middleware for uniform JSON responses.

**Insights**
* **Strategy:** Chose **Drizzle ORM** for its "TypeScript-first" safety and low runtime overhead.
* **Impact:** Centralized logging and error handling provide predictable API failures and faster debugging.
* 
---

### [2026-05-17] | Day 3: Authentication System
**Focus:** User data layer and secure API authentication.

**Tasks Completed**
* **Data Access:** Built a **User Repository** for PostgreSQL CRUD operations.
* **JWT & Auth:** Set up **JSON Web Tokens** and dedicated Auth routes.
* **API Structure:** Developed **Controllers** and **Services** to separate business logic from routing.

**Insights**
* **Strategy:** Decoupling the Repository from the Service layer ensures database logic remains modular and testable.
* **Impact:** Clean JWT-based architecture provides a scalable foundation for protecting admin routes.
 
---

### [2026-05-18] | Day 4: Full-Stack Auth & State
**Focus:** Frontend UI, persistent sessions, and API refinement.

**Tasks Completed**
* **UI & Forms:** Set up **Shadcn UI** and built Login/Register forms with **TanStack Form**.
* **State Management:** Integrated **Zustand** for global auth state and added a React **Auth Provider**.
* **Session Persistence:** Implemented **persistent login** logic and added `/refresh` and `/me` API routes.
* **Data Fetching:** Set up **TanStack Query** to handle Login and Register mutations.

**Insights**
* **Strategy:** Using **Zustand** with **TanStack Query** simplifies state sync between the server and the UI.
* **Impact:** The `/refresh` token pattern ensures a secure, seamless user experience without constant re-logins.

---

### [2026-05-20] | Day 5: Data Management & MongoDB
**Focus:** MongoDB integration and Excel file processing.

**Tasks Completed**
* **Database:** Set up **MongoDB** and created a **Dataset Repository** for collection management.
* **File logic:** Built **file validation middleware** and logic to process and store Excel uploads.
* **API & CRUD:** Developed the **Dataset** controller, routes, and services for full data management.

**Insights**
* **Strategy:** Using MongoDB for sales data provides the flexible document structure needed for dynamic product attributes.
* **Impact:** Dedicated file middleware ensures only valid `.xlsx` data reaches the processing layer, preventing database corruption.

---
