import { VALID_STATUSES } from '../validation.js';

// Validate query parameters for listProjects
export function validateListProjectsQuery(query) {
  const { status } = query;

  if (status && !VALID_STATUSES.includes(status)) {
    return `status must be one of: ${VALID_STATUSES.join(', ')}`;
  }

  return null; // No error
}

// Validate status update request
export function validateStatusUpdate(status) {
  if (!status) return 'status is required';
  if (!VALID_STATUSES.includes(status)) {
    return `status must be one of: ${VALID_STATUSES.join(', ')}`;
  }
  return null;
}

// Trim string fields before validation
export function normalizeCreateProjectInput(body) {
  return {
    ...body,
    name: body.name?.trim?.(),
    clientName: body.clientName?.trim?.(),
  };
}
