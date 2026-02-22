// api.js — thin wrapper around fetch
// All API calls live here. Components never call fetch() directly.
// Trade-off: keeps components clean and makes it trivial to mock in tests
// or swap the base URL.

const BASE = import.meta.env.VITE_API_BASE_URL;

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  // 204 No Content has no body
  if (res.status === 204) return null;

  const json = await res.json();

  if (!res.ok) {
    // Normalise error shape — backend returns { error } or { errors: [] }
    const message = json.errors
      ? json.errors.join(", ")
      : (json.error ?? `HTTP ${res.status}`);
    throw new Error(message);
  }

  return json;
}

export const api = {
  listProjects: (params = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v != null && v !== ""),
    ).toString();
    return request(`/projects${qs ? `?${qs}` : ""}`);
  },

  getProject: (id) => request(`/projects/${id}`),

  createProject: (body) =>
    request("/projects", { method: "POST", body: JSON.stringify(body) }),

  updateStatus: (id, status) =>
    request(`/projects/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  deleteProject: (id) => request(`/projects/${id}`, { method: "DELETE" }),
};
