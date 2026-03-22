# Project DevLog: GridToGraph 

**Internship Task:** Data Visualization using MERN Stack\
**Tech Stack:** React, Node.js, MongoDB, PostgreSQL, Turborepo

---

## Progress Overview

| Phase | Status | Key Milestones |
| :--- | :--- | :--- |
| **Phase 1: Architecture** | Completed | Turborepo setup, Biome, TypeScript configs |
| **Phase 2: Authentication** | Completed | Login system, JWT, Postgres integration |
| **Phase 3: Data Management** | Completed | Excel (.xlsx) Parser, MongoDB Dataset Schema, CRUD APIs |
| **Phase 4: Datasheet Visualization** | Completed | Record Table, Data Visualization, Data CRUD Functionality |

---

## Daily Log

### [2026-05-14] | Day 1: Monorepo Foundation
**Focus:** Architecture and cross-package synchronization.

**Tasks Completed**
* **Monorepo:** Created **Turborepo** for `web` and `api`, setup **pnpm catalogs**.
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
* **Database:** Set up **PostgreSQL** with **Drizzle ORM**; defined `users` schema.
* **Security & Constants:** Integrated a **Rate Limiter** and a shared package for global constants.
* **Observability:** Combined **Morgan** and **Winston** for structured request/app logging.
* **Error Handling:** Built a global `ApiError` class and middleware for uniform JSON responses.

**Insights**
* **Strategy:** Chose **Drizzle ORM** for its "TypeScript-first" safety and low runtime overhead.
* **Impact:** Centralized logging and error handling provide predictable API failures and faster debugging.

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
* **Strategy:** Using MongoDB dataset provides the flexible document structure needed for dynamic product attributes.
* **Impact:** Dedicated file middleware ensures only valid excel file data reaches the processing layer, preventing database corruption.

---

### [2026-05-21] | Day 6: Dashboard UI & Data Visualization
**Focus:** Frontend implementation for data management and analytics.

**Tasks Completed**
* **UI Development:** Built the **Dashboard**, **File Upload** component, **Editor** page, and a **Home** page.
* **Data Visualization:** Integrated **Recharts** to create dynamic visualizers on the Analytics page.
* **Core Features:** Implemented Excel file uploading and connected the **Library** to fetch and display datasets.
* **Data Management:** Added full **Row-level CRUD** functionality in the Editor for manual data manipulation.
* **API Refinement:** Fixed dataset row validation and manipulation logic on the backend.

**Insights**
* **Strategy:** Using **Recharts** allows for a decoupled visualization layer that scales easily with different dataset types.

---

## Architectural Decision Records (ADR)

### ADR 001: Monorepo with Turborepo
* **Context:** Managing separate builds and repositories for the web and API is slow, repetitive, and fragmented.
* **Decision:** I moved everything into a **single repository** (Monorepo) and used **Turborepo** to manage and run all project tasks.
* **Consequences:** 
    * **Smart Caching:** It remembers what was already built and skips unchanged code, making builds much faster.
    * **Side-by-Side Running:** It can lint, build, and test the frontend and backend at the same time.
    * **Stay in Sync:** All parts of the app grow together in one history, ensuring the API and Web never get out of step.
    * **Easy Sharing:** I can share things like validation rules or types between the API and Web apps instantly without any extra setup.

### ADR 002: Choosing TanStack Router
* **Context:** Most routing tools don't tell you if a link or a URL setting is broken until you run the app.
* **Decision:** I chose **TanStack Router** over React Router for the web app.
* **Consequences:**
    * **Fewer Bugs:** It catches broken links and typos while coding, not after deploying.
    * **Pre-loading:** It fetches data before the page even shows up, making the app feel snappier.

### ADR 003: Using both MongoDB and PostgreSQL
* **Context:** The app needs to handle strict user accounts but also needs to store messy, varied Excel data.
* **Decision:** I used **PostgreSQL** for Auth and **MongoDB** for Datasets.
* **Consequences:**
    * **Strict for Users:** PostgreSQL keeps user accounts and sessions safe and organized.
    * **Flexible for Data:** MongoDB saves "Dataset" records even if the columns change, without breaking the database.
    
---
