# Rudratek Projects Dashboard

A full-stack React application to track and manage client projects with real-time filtering, status management, and priority tracking. This repository contains both the frontend (Vite/React) and a backend component.

🌐 **Live Deployments:**
- **Frontend:** https://projectflow-cyan.vercel.app/
- **Backend API:** https://rudratek.onrender.com

---
## 🏗️ Technology Stack

**Frontend:**
- React 18+ with Vite (fast dev server & build)
- Tailwind CSS (utility-first styling)
- React Router v7 for navigation
- React Hooks (custom hooks for state management)

**Backend:**
- Node.js + Express
- File-based JSON storage (data.json)
- RESTful API with standardized responses
- CORS enabled for cross-origin requests

---

## 📂 Project Structure

```
rudratek/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddNewProject.jsx
│   │   │   ├── CreateProjectDialog.jsx
│   │   │   ├── ProjectDetailPanel.jsx
│   │   │   ├── ProjectFilterBar.jsx
│   │   │   ├── ProjectRow.jsx
│   │   │   └── ProjectTable.jsx
│   │   ├── constants/
│   │   │   └── projects.js
│   │   ├── hooks/
│   │   │   └── useProjects.js       # Main state management hook
│   │   ├── pages/
│   │   │   ├── Index.jsx            # Main dashboard page
│   │   │   └── NotFound.tsx
│   │   ├── services/
│   │   │   └── api.js               # API client wrapper
│   │   ├── utils/
│   │   │   └── date.js
│   │   ├── App.jsx
│   │   ├── index.css                # Global styles
│   │   ├── main.jsx
│   │   ├── tokens.css
│   │   ├── assets/
│   │   └── public/
│   ├── eslint.config.js
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
├── backend/
│   ├── config/
│   │   └── index.js                 # Configuration (PORT, CORS, DB_FILE)
│   ├── controllers/
│   │   └── projects.js              # Business logic & request handlers
│   ├── routes/
│   │   └── projects.js              # Route definitions
│   ├── utils/
│   │   └── validators.js            # Input validation utilities
│   ├── db.js                        # Database layer (file-based)
│   ├── validation.js                # Business validation rules
│   ├── server.js                    # Express app setup + middleware
│   ├── data.json                    # Project data store
│   ├── package.json
│   └── README.md
├── package.json
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Two terminal windows

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on **http://localhost:3001**

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173** (Vite default)

---

## 📖 API Documentation

### Base URL

```
http://localhost:3001
```

### Response Format

All endpoints return a standardized JSON response:

**Success (2xx):**
```json
{
  "success": true,
  "data": { /* endpoint-specific data */ }
}
```

**Error (4xx/5xx):**
```json
{
  "success": false,
  "error": "Error message describing the issue"
}
```

Or for validation errors:
```json
{
  "success": false,
  "errors": ["field1 is required", "field2 must be a valid date"]
}
```

---

## 🔌 Endpoints

### GET `/projects`

Fetch all projects with optional filtering, searching, and sorting.

**Query Parameters:**
| Parameter | Type | Values | Default | Description |
|-----------|------|--------|---------|-------------|
| `status` | string | `active`, `on_hold`, `completed` | - | Filter by project status |
| `search` | string | any text | - | Search by project name or client name (case-insensitive) |
| `sortBy` | string | `createdAt`, `startDate` | `createdAt` | Field to sort by |
| `order` | string | `asc`, `desc` | `desc` | Sort order |

**Examples:**
```bash
# Get all active projects
GET /projects?status=active

# Search projects
GET /projects?search=acme

# Sort by start date, oldest first
GET /projects?sortBy=startDate&order=asc

# Combine filters
GET /projects?status=active&search=website&sortBy=startDate&order=desc
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Website Redesign",
      "clientName": "Acme Corp",
      "status": "active",
      "priority": "high",
      "startDate": "2025-01-15",
      "endDate": "2025-06-30",
      "createdAt": "2025-01-10T09:00:00.000Z",
      "updatedAt": "2025-01-10T09:00:00.000Z",
      "deletedAt": null
    }
  ],
  "total": 1
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "status must be one of: active, on_hold, completed"
}
```

---

### GET `/projects/:id`

Fetch a single project by ID.

**Path Parameter:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string (UUID) | Project ID |

**Examples:**
```bash
GET /projects/550e8400-e29b-41d4-a716-446655440000
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Website Redesign",
    "clientName": "Acme Corp",
    "status": "active",
    "priority": "high",
    "startDate": "2025-01-15",
    "endDate": "2025-06-30",
    "createdAt": "2025-01-10T09:00:00.000Z",
    "updatedAt": "2025-01-10T09:00:00.000Z",
    "deletedAt": null
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Project not found"
}
```

---

### POST `/projects`

Create a new project.

**Request Body:**
```json
{
  "name": "New Project",
  "clientName": "Globex Corporation",
  "status": "active",
  "priority": "medium",
  "startDate": "2025-04-01",
  "endDate": "2025-06-30"
}
```

**Required Fields:**
| Field | Type | Rules |
|-------|------|-------|
| `name` | string | Required, non-empty |
| `clientName` | string | Required, non-empty |
| `startDate` | string | Required, YYYY-MM-DD format, valid date |

**Optional Fields:**
| Field | Type | Default | Rules |
|-------|------|---------|-------|
| `status` | string | `active` | Must be one of: `active`, `on_hold`, `completed` |
| `priority` | string | `medium` | Must be one of: `low`, `medium`, `high` |
| `endDate` | string | null | Must be YYYY-MM-DD format, valid date, on or after `startDate` |

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "New Project",
    "clientName": "Globex Corporation",
    "status": "active",
    "priority": "medium",
    "startDate": "2025-04-01",
    "endDate": "2025-06-30",
    "createdAt": "2025-02-22T10:30:00.000Z",
    "updatedAt": "2025-02-22T10:30:00.000Z",
    "deletedAt": null
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "errors": [
    "name is required",
    "endDate must be on or after startDate"
  ]
}
```

---

### PATCH `/projects/:id/status`

Update a project's status with state transition validation.

**Path Parameter:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string (UUID) | Project ID |

**Request Body:**
```json
{
  "status": "on_hold"
}
```

**Status Transition Rules:**
```
active     → can transition to: on_hold, completed
on_hold    → can transition to: active, completed
completed  → terminal state (no further transitions allowed)
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Website Redesign",
    "clientName": "Acme Corp",
    "status": "on_hold",
    "priority": "high",
    "startDate": "2025-01-15",
    "endDate": "2025-06-30",
    "createdAt": "2025-01-10T09:00:00.000Z",
    "updatedAt": "2025-02-22T11:00:00.000Z",
    "deletedAt": null
  }
}
```

**Error Responses:**

If status is missing or invalid (400 Bad Request):
```json
{
  "success": false,
  "error": "status is required"
}
```

If invalid transition (422 Unprocessable Entity):
```json
{
  "success": false,
  "error": "Cannot transition from 'completed' to 'active'",
  "allowedTransitions": []
}
```

If project not found (404 Not Found):
```json
{
  "success": false,
  "error": "Project not found"
}
```

---

### DELETE `/projects/:id`

Soft-delete a project (marks as deleted but retains in database for audit trail).

**Path Parameter:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string (UUID) | Project ID |

**Success Response (204 No Content):**
```
[Empty body - header only]
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Project not found"
}
```



---

## 🛠️ Assumptions & Trade-offs



### 1. State Management

**Assumption:** The application data requirements are currently centralized to one page (`Index.jsx`). We use a custom hook (`useProjects`) rather than introducing heavy global state managers (Redux, Zustand), keeping the bundle size small.

### 2. Memoization Optimizations

**Trade-off:** We added `useCallback`, `useMemo`, and `React.memo` to critical list-rendering paths (`Index.jsx` filters and `ProjectRow`). We avoided wrapping *every* primitive component in `React.memo` to prevent unnecessary overhead where re-rendering is already cheap.



### 3. Optimistic UI Updates

**Trade-off:** When updating or deleting projects, the UI updates immediately before the server confirms. This provides better UX but requires the frontend to handle potential rollback errors.

### 4. Soft Deletes

**Trade-off:** Deleted projects are marked with a `deletedAt` timestamp rather than permanently removed. 



## 📚 API Client Usage (Frontend)

The frontend provides a thin API wrapper in `src/services/api.js`:

```javascript
import { api } from '../services/api.js';

// List projects with filters
const res = await api.listProjects({ status: 'active', search: 'acme' });
const projects = res.data;

// Get single project
const res = await api.getProject('550e8400-e29b-41d4-a716-446655440000');
const project = res.data;

// Create project
const res = await api.createProject({
  name: 'New Project',
  clientName: 'Client Name',
  startDate: '2025-04-01',
  endDate: '2025-06-30'
});
const newProject = res.data;

// Update status
const res = await api.updateStatus('550e8400-e29b-41d4-a716-446655440000', 'completed');
const updatedProject = res.data;

// Delete project
await api.deleteProject('550e8400-e29b-41d4-a716-446655440000');
```


---

## 🤖 AI Tool Usage

I used ChatGPT and Claude as supportive tools during development.

They were mainly used to:
- Review and reason about frontend and backend structure
- Validate implementation approaches
- Get a second opinion while debugging and refining the solution

The suggestions were not applied blindly. I adapted, simplified, or rejected them based on the assignment scope and requirements. The focus was to keep the code simple, readable, and appropriate for the problem size, without over-engineering.

All final design and implementation decisions were made intentionally, and the codebase is fully understood end-to-end.
