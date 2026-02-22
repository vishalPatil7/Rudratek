# Rudratek Projects Dashboard
A full-stack React application to track and manage client projects. This repository contains both the frontend (Vite/React) and a backend component.
---
## 🚀 Setup Instructions
### Prerequisites
- Node.js (v18 or higher recommended)
- `npm` or `yarn`
### 1. Start the Backend
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server (typically runs on port 3000):
   ```bash
   npm run dev
   ```
### 2. Start the Frontend
1. Open a new, separate terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the localhost URL provided by Vite in your browser.
---
## 📖 API Documentation
The frontend expects a RESTful API to manage the `projects` resource.
### Base URL
Ensure your frontend environment variable or API service points to exactly where the backend is hosted (e.g. `http://localhost:3000/api`).
### Endpoints
#### `GET /projects`
Fetches a list of all projects.
- **Response**: `200 OK`
- **Body**:
  ```json
  [
    {
      "id": "1",
      "name": "Website Redesign",
      "clientName": "Acme Corp",
      "status": "active", // "active" | "on_hold" | "completed"
      "priority": "high", // "high" | "medium" | "low"
      "startDate": "2024-03-01",
      "endDate": null,
      "createdAt": "2024-02-28T10:00:00Z",
      "updatedAt": "2024-03-15T14:30:00Z"
    }
  ]
  ```
#### `POST /projects`
Creates a new project.
- **Request Body**:
  ```json
  {
    "name": "New Project",
    "clientName": "Globex",
    "status": "active",
    "priority": "medium",
    "startDate": "2024-04-01",
    "endDate": "2024-06-01" 
  }
  ```
- **Response**: `201 Created` with the created project object.
#### `PATCH /projects/:id/status`
Updates the status of an existing project.
- **Request Body**:
  ```json
  {
    "status": "on_hold"
  }
  ```
- **Response**: `200 OK`
#### `DELETE /projects/:id`
Deletes an existing project.
- **Response**: `204 No Content`
---
## 🛠️ Assumptions & Trade-offs
1. **Architecture (Feature-Sliced vs Centralized)**: 
   - *Trade-off*: Rather than enforcing a strict "Feature-Sliced Design" (which over-engineers small apps with deep `features/X/components/Y` nesting), we chose a flatter, more approachable structure. 
   - Reusable "dumb" primitives exist in `src/components/ui`, while domain-specific components stay in `src/components`.
2. **State Management**:
   - *Assumption*: The application data requirements are currently centralized to one page (`Index.jsx`). We therefore use a custom hook (`useProjects`) rather than bringing in heavy global state managers like Redux or Zustand, keeping the bundle size small.
3. **Memoization optimizations**:
   - *Trade-off*: We added `useCallback`, `useMemo`, and `React.memo` to the critical list-rendering paths (`Index.jsx` filters and `ProjectRow`). We avoided wrapping *every* primitive component in `React.memo` to prevent unnecessary overhead where re-rendering is already incredibly cheap.
4. **CSS Configuration**:
   - *Assumption*: We pruned the `index.css` Tailwind Layer to only include variables actively used by this specific app, throwing out unused variables from standard UI library templates.
