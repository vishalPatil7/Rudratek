import { useState, useCallback } from "react";
import { CreateProjectDialog } from "../components/CreateProjectDialog";
import ProjectFilterBar from "../components/ProjectFilterBar";
import { ProjectTable } from "../components/ProjectTable";
import { useProjects } from "../hooks/useProjects";
import { ProjectDetailPanel } from "../components/ProjectDetailPanel";
import { AlertCircle, FolderOpen, SearchX } from "lucide-react";

function Index() {
  const {
    projects,
    filters,
    error,
    loading,
    addProject,
    updateFilter,
    updateStatus,
    deleteProject,
  } = useProjects();

  const [selected, setSelected] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const handleSelect = useCallback((selectedProject) => {
    setSelected(selectedProject);
    setPanelOpen(true);
  }, []);

  const handleUpdateStatus = useCallback(
    async (id, status) => {
      try {
        await updateStatus(id, status);
        setSelected((prev) =>
          prev ? { ...prev, status, updatedAt: new Date().toISOString() } : null
        );
      } catch (err) {
        console.error("Status update failed:", err);
      }
    },
    [updateStatus]
  );

  const hasFilters = !!filters.status || filters.search.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Projects
            </h1>
            <p className="text-sm text-muted-foreground">
              Track and manage your client projects
            </p>
          </div>
          <CreateProjectDialog onSubmit={addProject} />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 space-y-4">
        <ProjectFilterBar filters={filters} onChange={updateFilter} />

        {/* Error state */}
        {error && (
          <div className="flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-14 w-full rounded-md bg-muted animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Project table */}
        {!loading && projects.length > 0 && (
          <ProjectTable projects={projects} onSelect={handleSelect} />
        )}

        {/* Empty — no projects */}
        {!loading && projects.length === 0 && !hasFilters && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-lg font-medium text-foreground">
              No projects yet
            </p>
            <p className="text-sm text-muted-foreground">
              Create your first project to get started.
            </p>
          </div>
        )}

        {/* Empty — no results after filtering */}
        {!loading && projects.length === 0 && hasFilters && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SearchX className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-lg font-medium text-foreground">
              No matching projects
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or search term.
            </p>
          </div>
        )}
      </main>

      <ProjectDetailPanel
        project={selected}
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        onUpdateStatus={handleUpdateStatus}
        onDelete={deleteProject}
      />
    </div>
  );
}

export default Index;
