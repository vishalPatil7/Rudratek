import React from "react";
import { formatDate } from "../utils/date";
import { STATUS_BADGE_STYLES, PRIORITY_STYLES } from "../constants/projects";

const ProjectRow = React.memo(({ project, onSelect }) => {
  return (
    <tr
      className="cursor-pointer hover:bg-muted transition-colors"
      onClick={() => onSelect(project)}
    >
      <td className="px-4 py-3 font-medium text-foreground">{project.name}</td>
      <td className="px-4 py-3 text-muted-foreground">{project.clientName}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE_STYLES[project.status]}`}
        >
          {project.status.replace("_", " ")}
        </span>
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${PRIORITY_STYLES[project.priority]}`}
        >
          {project.priority}
        </span>
      </td>
      <td className="px-4 py-3 text-muted-foreground">
        {formatDate(project.startDate)}
      </td>
      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
        {project.endDate ? formatDate(project.endDate) : "—"}
      </td>
    </tr>
  );
});

ProjectRow.displayName = "ProjectRow";

export default ProjectRow;
