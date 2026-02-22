import { readFileSync, writeFileSync, existsSync } from 'fs';
import { v4 as uuid } from 'uuid';

const DB_FILE = './data.json';
const now = () => new Date().toISOString();

// Seed data — only used if data.json doesn't exist yet
const SEED = [
  {
    id: uuid(),
    name: 'Website Redesign',
    clientName: 'Acme Corp',
    status: 'active',
    startDate: '2025-01-15',
    endDate: '2025-06-30',
    priority: 'high',
    createdAt: '2025-01-10T09:00:00.000Z',
    updatedAt: '2025-01-10T09:00:00.000Z',
    deletedAt: null,
  },
  {
    id: uuid(),
    name: 'Mobile App v2',
    clientName: 'Beta Ventures',
    status: 'active',
    startDate: '2025-02-01',
    endDate: '2025-08-31',
    priority: 'medium',
    createdAt: '2025-01-20T10:00:00.000Z',
    updatedAt: '2025-01-20T10:00:00.000Z',
    deletedAt: null,
  },
  {
    id: uuid(),
    name: 'Data Pipeline Migration',
    clientName: 'CloudFirst Ltd',
    status: 'on_hold',
    startDate: '2024-11-01',
    endDate: '2025-03-31',
    priority: 'high',
    createdAt: '2024-10-28T08:00:00.000Z',
    updatedAt: '2025-01-05T14:00:00.000Z',
    deletedAt: null,
  },
  {
    id: uuid(),
    name: 'Brand Identity',
    clientName: 'Acme Corp',
    status: 'completed',
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    priority: 'low',
    createdAt: '2024-08-25T11:00:00.000Z',
    updatedAt: '2024-12-16T16:00:00.000Z',
    deletedAt: null,
  },
  {
    id: uuid(),
    name: 'API Integration',
    clientName: 'Delta Systems',
    status: 'active',
    startDate: '2025-03-01',
    endDate: null,
    priority: 'medium',
    createdAt: '2025-02-20T09:30:00.000Z',
    updatedAt: '2025-02-20T09:30:00.000Z',
    deletedAt: null,
  },
];

// Load from data.json if it exists, otherwise write seed data and use that
function load() {
  if (existsSync(DB_FILE)) {
    return JSON.parse(readFileSync(DB_FILE, 'utf-8'));
  }
  save(SEED);
  return SEED;
}

function save(data) {
  writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

let projects = load();

// ── Query helpers ──────────────────────────────────────────────────────────────

export function findAll({ status, search, sortBy = 'createdAt', order = 'desc' } = {}) {
  let result = projects.filter((p) => p.deletedAt === null);

  if (status) {
    result = result.filter((p) => p.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.clientName.toLowerCase().includes(q)
    );
  }

  const allowedSortFields = ['createdAt', 'startDate'];
  const field = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

  result.sort((a, b) => {
    const va = a[field] ?? '';
    const vb = b[field] ?? '';
    return order === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  return result;
}

export function findById(id) {
  return projects.find((p) => p.id === id && p.deletedAt === null) ?? null;
}

export function create(data) {
  const project = {
    id: uuid(),
    ...data,
    createdAt: now(),
    updatedAt: now(),
    deletedAt: null,
  };
  projects.push(project);
  save(projects);
  return project;
}

export function updateStatus(id, status) {
  const project = findById(id);
  if (!project) return null;
  project.status = status;
  project.updatedAt = now();
  save(projects);
  return project;
}

export function softDelete(id) {
  const project = findById(id);
  if (!project) return null;
  project.deletedAt = now();
  project.updatedAt = now();
  save(projects);
  return project;
}