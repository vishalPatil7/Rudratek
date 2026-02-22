# Rudratek Projects Dashboard

A full-stack React application to track and manage client projects with real-time filtering, status management, and priority tracking. This repository contains both the frontend (Vite/React) and a backend component.

---

## ✨ Features

- 📋 **Project List Management** - View, search, filter, and sort projects
- 🎯 **Status Tracking** - Transition projects through active → on_hold → completed states
- 🏆 **Priority Levels** - Assign and view project priorities (high, medium, low)
- 🔍 **Advanced Filtering** - Filter by status, search by name/client, sort by date
- ⚡ **Real-time Updates** - Optimistic UI updates for instant feedback
- 🎨 **Responsive Design** - Works seamlessly on desktop and tablet

---

## 🏗️ Technology Stack

**Frontend:**
- React 18+ with Vite (fast dev server & build)
- Tailwind CSS (utility-first styling)
- React Hooks (custom hooks for state management)

**Backend:**
- Node.js + Express
- File-based JSON storage (data.json)
- RESTful API with standardized responses

---

## 📂 Project Structure

```
rudratek/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # Reusable UI primitives
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Select.jsx
│   │   │   └── ProjectRow.jsx   # Domain-specific components
│   │   ├── hooks/
│   │   │   └── useProjects.js   # Main state management hook
│   │   ├── services/
│   │   │   └── api.js           # API client wrapper
│   │   ├── pages/
│   │   │   └── Index.jsx        # Main dashboard page
│   │   └── index.css            # Global styles
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── config/
│   │   └── index.js             # Configuration (PORT, CORS, DB_FILE)
│   ├── controllers/
│   │   └── projects.js          # Business logic & request handlers
│   ├── routes/
│   │   └── projects.js          # Route definitions
│   ├── utils/
│   │   └── validators.js        # Input validation utilities
│   ├── db.js                    # Database layer (file-based)
│   ├── validation.js            # Business validation rules
│   ├── server.js                # Express app setup + middleware
│   ├── data.json                # Project data store
│   └── package.json
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

## 🏛️ Backend Architecture

### Clean Separation of Concerns

The backend is organized into focused layers:

- **`server.js`** - Express app setup, middleware (logging, CORS, error handling)
- **`routes/`** - Route definitions mapping HTTP methods to controllers
- **`controllers/`** - Business logic and request handling (independent of Express)
- **`validation.js`** - Business rules and validation constants
- **`db.js`** - Data persistence layer (queries, CRUD operations)
- **`config/`** - Configuration from environment variables
- **`utils/`** - Reusable utilities (validation helpers)

### Key Design Decisions

1. **Controllers are Express-agnostic** - Can be tested without mocking Express, imported elsewhere
2. **Validation is centralized** - All validation rules in one place, easy to update
3. **Response format is standardized** - All responses follow the same structure inline in controllers
4. **Error handling is consistent** - Global error handler + validation error handler in server.js
5. **Configuration is externalized** - Hardcoded values moved to `config/index.js`

---

## 🛠️ Assumptions & Trade-offs

### 1. Architecture (Feature-Sliced vs Centralized)

**Trade-off:** Rather than enforcing a strict "Feature-Sliced Design" (which over-engineers small apps with deep `features/X/components/Y` nesting), we chose a flatter, more approachable structure.

- Reusable "dumb" primitives exist in `src/components/ui`
- Domain-specific components stay in `src/components`
- Hooks live in `src/hooks` for easy discovery

### 2. State Management

**Assumption:** The application data requirements are currently centralized to one page (`Index.jsx`). We use a custom hook (`useProjects`) rather than introducing heavy global state managers (Redux, Zustand), keeping the bundle size small.

- Scales well up to 10-20 features
- Easy to upgrade to global state if needed

### 3. Memoization Optimizations

**Trade-off:** We added `useCallback`, `useMemo`, and `React.memo` to critical list-rendering paths (`Index.jsx` filters and `ProjectRow`). We avoided wrapping *every* primitive component in `React.memo` to prevent unnecessary overhead where re-rendering is already cheap.

### 4. CSS Configuration

**Assumption:** We pruned the `index.css` Tailwind layers to only include variables actively used by this specific app, throwing out unused variables from standard UI library templates.

### 5. Optimistic UI Updates

**Trade-off:** When updating or deleting projects, the UI updates immediately before the server confirms. This provides better UX but requires the frontend to handle potential rollback errors.

### 6. Soft Deletes

**Trade-off:** Deleted projects are marked with a `deletedAt` timestamp rather than permanently removed. This enables:
- Audit trails
- Accidental delete recovery
- Data retention compliance

Trade-off: Slightly more complex database queries (always filter `deletedAt = null`)

### 7. File-Based Storage

**Trade-off:** Using JSON file storage instead of a database keeps dependencies minimal and deployment simple, but:
- ✅ Good for: prototypes, demos, small teams
- ❌ Not ideal for: concurrent writes, scaling to thousands of records
- 📈 Upgrade path: Replace `db.js` with MongoDB/PostgreSQL client when needed

---

## 🐛 Troubleshooting

### Backend won't start
- ✅ Check Node.js version: `node --version` (v18+)
- ✅ Verify port 3001 is not in use: `lsof -i :3001` (macOS/Linux)
- ✅ Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- ✅ Check for syntax errors: `node server.js` (avoid `npm run dev` to see full error)

### Frontend won't connect to backend
- ✅ Verify backend is running on port 3001
- ✅ Check CORS: backend should allow `http://localhost:5173`
- ✅ Check browser console for fetch errors (Network tab)
- ✅ Verify `frontend/src/services/api.js` BASE URL is correct

### Projects list is empty
- ✅ Seed data loads automatically on first run
- ✅ Check `backend/data.json` exists and has content
- ✅ Try restarting backend to reload seed data
- ✅ Open DevTools Network tab to verify API response status

### Status transition failing
- ✅ Review allowed transitions: active/on_hold ↔ completed (terminal)
- ✅ Check API response for `allowedTransitions` field
- ✅ Try invalid transition in API docs to see detailed error

### Port conflicts
- ✅ Change backend port: `PORT=3002 npm run dev`
- ✅ Change frontend port: `npm run dev -- --port 5174`
- ✅ Update `frontend/src/services/api.js` BASE URL if using custom ports

### Data not persisting
- ✅ Check that `backend/data.json` file exists
- ✅ Verify write permissions in backend directory
- ✅ Check for disk space on the machine

---

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

## 🎯 Development Workflow

1. **Make changes** to components in `src/` (frontend) or `controllers/` (backend)
2. **Test in browser** at `http://localhost:5173` (hot reload enabled)
3. **Check backend logs** for API errors
4. **Verify API responses** using browser DevTools Network tab
5. **Commit changes** when satisfied

---

## 📋 Development Checklist

Before committing or deploying:

- [ ] Backend starts without errors: `npm run dev`
- [ ] Frontend starts without errors: `npm run dev`
- [ ] All CRUD operations work (Create, Read, Update, Delete)
- [ ] Status transitions validate correctly
- [ ] Filters and search work
- [ ] Error messages are helpful
- [ ] No console errors in DevTools
- [ ] Responsive design looks good on mobile

---

## 📄 License

This project is provided as-is for educational and development purposes.
