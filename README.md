# Project GridToGraph

GridToGraph is a full-stack data visualization platform developed to transform static Excel spreadsheets into interactive, editable dashboards. Built with a modern monorepo architecture, the application allows users to upload sales data, manage records through a built-in editor, and view dynamic insights via automated charts.

## Features

### Frontend

- **Excel Import**: Upload .xlsx files to instantly populate the dashboard with records.
- **Dynamic Visualization**: Automatically generates Bar Charts, Pie Charts and Line Charts using Recharts library.
- **Live Data Editor**: A dedicated interface for manual Row-level CRUD (Create, Read, Update, Delete) operations on dataset.
- **Real-Time Sync**: Charts and tables update instantly whenever data is modified or deleted in the editor.
- **Aesthetic UI**: Minimalist dashboard built with Tailwind CSS and Shadcn UI components.

### Backend

- **Polyglot Persistence**: Use of PostgreSQL for secure authentication and MongoDB for flexible, schema-less dataset storage.
- **File Processing Pipeline**: Custom middleware for validating and parsing Excel data before database insertion to prevent corruption.
- **Secure Authentication**: Implements JWT (JSON Web Tokens) and persistent session logic for protected admin access.
- **Scalable Architecture**: Built using a Monorepo structure with Turborepo for optimized builds and shared logic across packages.

## Tech Stack

### Frontend

React, TanStack Router, TanStack Query, Recharts, Zustand, Tailwind CSS

### Backend

Node.js & Express, TypeScript, PostgreSQL & Drizzle ORM, MongoDB & Mongoose, Turborepo

## Setup & Installation

This project heavily relies on **pnpm workspaces** and **pnpm catalogs**. Ensure you have `pnpm` installed before proceeding.

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/gridtograph.git
    cd gridtograph
    ```

2. **Install dependencies:**
   ```bash 
   pnpm install
    ```

3. **Configure Environment Variables:**
   Copy the `.env.example` files to create your local `.env` files:
   - Copy `apps/web/.env.example` to `apps/web/.env`
   - Copy `apps/api/.env.example` to `apps/api/.env`

4. **Database Configuration:**
   In `apps/api/.env`, ensure you set your connection strings:
   - `DATABASE_URL` (PostgreSQL)
   - `MONGODB_URI` (MongoDB)

5. **Run the application:**
    ```bash
    pnpm run dev
    ```

> **Note:** This project is currently configured for a local development environment. While all core features are fully functional and stable, it has not yet been tested and configured for production release.

## Screenshots

![Visualize Overview - Bar Chart](./screenshots/visualize-bar.png)  
![Visualize Overview - Pie Chart](./screenshots/visualize-pie.png)  
![Visualize Overview - Line Chart](./screenshots/visualize-line.png)  
*Main visualize page showing the analytics overview and charts.*

![Dataset Library](./screenshots/library.png)  
*The dataset library where uploaded files are managed and viewed.*

![Data Editor](./screenshots/editor.png)  
*The editor page for performing manual CRUD operations on specific data rows.*

## Project Links

- **Source Code**: [GitHub Repository](https://github.com/sam4web/task-gridtograph)

---
