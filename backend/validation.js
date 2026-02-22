// Centralised validation logic kept separate from routing and controller
// concerns so it's easy to swap for a schema library (zod, joi) later.

export const VALID_STATUSES = ['active', 'on_hold', 'completed'];
export const VALID_PRIORITIES = ['low', 'medium', 'high'];

// Valid transitions map — completed is intentionally absent (terminal state)
export const ALLOWED_TRANSITIONS = {
  active: ['on_hold', 'completed'],
  on_hold: ['active', 'completed'],
  completed: [],
};

export function validateCreateProject(body) {
  const errors = [];

  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
    errors.push('name is required');
  }

  if (!body.clientName || typeof body.clientName !== 'string' || !body.clientName.trim()) {
    errors.push('clientName is required');
  }

  if (body.status && !VALID_STATUSES.includes(body.status)) {
    errors.push(`status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  if (!body.startDate || !isValidDate(body.startDate)) {
    errors.push('startDate is required and must be a valid YYYY-MM-DD date');
  }

  if (body.endDate) {
    if (!isValidDate(body.endDate)) {
      errors.push('endDate must be a valid YYYY-MM-DD date');
    } else if (body.startDate && body.endDate < body.startDate) {
      errors.push('endDate must be on or after startDate');
    }
  }

  if (body.priority && !VALID_PRIORITIES.includes(body.priority)) {
    errors.push('priority must be low, medium, or high');
  }

  return errors;
}

function isValidDate(str) {
  return /^\d{4}-\d{2}-\d{2}$/.test(str) && !isNaN(Date.parse(str));
}
