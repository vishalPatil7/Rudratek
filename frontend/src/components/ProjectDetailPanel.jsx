import { Trash2, X } from "lucide-react";
import { formatDate, formatDateTime } from "../utils/date";
import { STATUS_LABELS, STATUS_BADGE_STYLES, STATUS_TRANSITIONS } from "../constants/projects";

export function ProjectDetailPanel({
  project,
  open,
  onClose,
  onUpdateStatus,
  onDelete,
}) {
  if (!project) return null;

  const allowedTransitions = STATUS_TRANSITIONS[project.status];

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      )}

      {/* Slide-over panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-card shadow-xl flex flex-col overflow-y-auto transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-border shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {project.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Project details and actions
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 px-6 py-5 space-y-4">
          <DetailRow label="Client" value={project.clientName} />
          <DetailRow
            label="Status"
            value={
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE_STYLES[project.status]}`}
              >
                {STATUS_LABELS[project.status]}
              </span>
            }
          />
          <DetailRow label="Priority" value={project.priority} />
          <DetailRow label="Start Date" value={formatDate(project.startDate)} />
          <DetailRow
            label="End Date"
            value={project.endDate ? formatDate(project.endDate) : "Not set"}
          />
          <DetailRow
            label="Created"
            value={formatDateTime(project.createdAt)}
          />
          <DetailRow
            label="Updated"
            value={formatDateTime(project.updatedAt)}
          />

          <hr className="border-border" />

          {/* Status transitions */}
          {allowedTransitions.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Change Status
              </p>
              <div className="flex gap-2 flex-wrap">
                {allowedTransitions.map((s) => (
                  <button
                    key={s}
                    onClick={() => onUpdateStatus(project.id, s)}
                    className="rounded border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    → {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {project.status === "completed" && (
            <p className="text-sm text-muted-foreground italic">
              Completed projects cannot change status.
            </p>
          )}

          <hr className="border-border" />

          {/* Delete */}
          <button
            onClick={() => {
              onDelete(project.id);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 rounded bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors"
          >
            <Trash2 />
            Delete Project
          </button>
        </div>
      </div>
    </>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">
        {typeof value === "string" ? value : value}
      </span>
    </div>
  );
}
