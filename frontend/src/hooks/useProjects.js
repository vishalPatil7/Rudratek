import { useEffect, useState } from "react";
import { api } from "../services/api.js";

export function useProjects() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const [filters, setFilters] = useState({
    status: "",
    search: "",
    sortBy: "createdAt",
    order: "desc",
  });

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.listProjects(filters);
      setProjects(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filters]);
  const addProject = async (body) => {
    const res = await api.createProject(body);
    await fetchProjects(); // refetch to get correct sort position
    return res.data;
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const updateStatus = async (id, status) => {
    setError(null);
    try {
      const res = await api.updateStatus(id, status);
      setProjects((prev) => prev.map((p) => (p.id === id ? res.data : p)));
      return res.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProject = async (id) => {
    setError(null);
    try {
      await api.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };


  return {
    projects,
    filters,
    error,
    loading,
    addProject,
    updateFilter,
    updateStatus,
    deleteProject,
  };
}
