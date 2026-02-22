import React from "react";
import ProjectRow from "./ProjectRow";

export const ProjectTable = React.memo(({ projects, onSelect }) => {
  return (
    <div className="rounded-md border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Name</th>
            <th className="px-4 py-3 text-left font-medium">Client</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Priority</th>
            <th className="px-4 py-3 text-left font-medium">Start Date</th>
            <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">
              End Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-background">
          {projects.map((p) => (
            <ProjectRow key={p.id} project={p} onSelect={onSelect} />
          ))}
        </tbody>
      </table>
    </div>
  );
});

ProjectTable.displayName = "ProjectTable";
