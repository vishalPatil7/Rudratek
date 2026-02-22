// Controller: sits between routes and DB.
// Each function takes (req, res) but has no knowledge of Express routing.
// This makes it straightforward to test in isolation.

import * as db from '../db.js';
import { validateCreateProject, ALLOWED_TRANSITIONS } from '../validation.js';
import { validateListProjectsQuery, validateStatusUpdate, normalizeCreateProjectInput } from '../utils/validators.js';

export async function listProjects(req, res) {
  const validationError = validateListProjectsQuery(req.query);
  if (validationError) {
    return res.status(400).json({ success: false, error: validationError });
  }

  const { status, search, sortBy, order } = req.query;
  const projects = db.findAll({ status, search, sortBy, order });
  res.status(200).json({
    success: true,
    data: projects,
    total: projects.length,
  });
}

export async function getProject(req, res) {
  const project = db.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }
  res.status(200).json({ success: true, data: project });
}

export async function createProject(req, res) {
  const normalized = normalizeCreateProjectInput(req.body);

  const errors = validateCreateProject(normalized);
  if (errors.length) {
    return res.status(400).json({ success: false, errors });
  }

  const { name, clientName, startDate, endDate, priority } = normalized;
  const status = normalized.status ?? 'active';

  const project = db.create({
    name,
    clientName,
    status,
    startDate,
    endDate: endDate ?? null,
    priority: priority ?? 'medium',
  });

  res.status(201).json({ success: true, data: project });
}

export async function updateProjectStatus(req, res) {
  const { status } = req.body;

  const validationError = validateStatusUpdate(status);
  if (validationError) {
    return res.status(400).json({ success: false, error: validationError });
  }

  const project = db.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  const allowed = ALLOWED_TRANSITIONS[project.status];
  if (!allowed.includes(status)) {
    return res.status(422).json({
      success: false,
      error: `Cannot transition from '${project.status}' to '${status}'`,
      allowedTransitions: allowed,
    });
  }

  const updated = db.updateStatus(req.params.id, status);
  res.status(200).json({ success: true, data: updated });
}

export async function deleteProject(req, res) {
  const project = db.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  db.softDelete(req.params.id);
  res.status(204).send();
}
