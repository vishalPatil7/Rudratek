import { Search } from "lucide-react";

const inputCls =
  "w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 placeholder:text-muted-foreground";

const selectCls =
  "rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 cursor-pointer";

export default function ProjectFilterBar({ filters, onChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          className={`${inputCls} pl-9`}
          placeholder="Search by project or client name…"
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
        />
      </div>

      {/* Status filter */}
      <select       
        className={`${selectCls} w-[150px]`}
        value={filters.status}
        onChange={(e) => onChange("status", e.target.value)}
      >
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="on_hold">On Hold</option>
        <option value="completed">Completed</option>
      </select>

      {/* Sort by */}
      <select
        className={`${selectCls} w-[150px]`}
        value={filters.sortBy}
        onChange={(e) => onChange("sortBy", e.target.value)}
      >
        <option value="createdAt">Created date</option>
        <option value="startDate">Start date</option>
      </select>

      {/* Sort order */}
      <select
        className={`${selectCls} w-[120px]`}
        value={filters.sortOrder}
        onChange={(e) => onChange("order", e.target.value)}
      >
        <option value="desc">Newest first</option>
        <option value="asc">Oldest first</option>
      </select>
    </div>
  );
}
