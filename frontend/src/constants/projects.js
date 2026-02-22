export const STATUS_LABELS = {
  active: "Active",
  on_hold: "On Hold",
  completed: "Completed",
};

export const STATUS_BADGE_STYLES = {
  active: "bg-emerald-100 text-emerald-800",
  on_hold: "bg-amber-100 text-amber-800",
  completed: "bg-muted text-muted-foreground",
};

export const PRIORITY_STYLES = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-primary/10 text-primary",
  low: "bg-muted text-muted-foreground",
};

export const STATUS_TRANSITIONS = {
  active: ["on_hold", "completed"],
  on_hold: ["active", "completed"],
  completed: [],
};
