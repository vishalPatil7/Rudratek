function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      {children}
    </div>
  );
}

 const inputCls =
    "w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 placeholder:text-muted-foreground";

    const selectCls =
  "w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 cursor-pointer";


export default function AddNewProject({
  close,
  form,
  setForm,
  formError,
  handleSubmit,
  open,
  loading,
}) {
 
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={close} />

      {/* Dialog card */}
      <div className="relative z-10 w-full max-w-md rounded-lg bg-card p-6 shadow-xl mx-4 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="mb-4 shrink-0">
          <h2 className="text-lg font-semibold text-foreground">Create Project</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Fill in the details for your new project.</p>
        </div>

        {/* scrollable Body */}
          <div className="mt-4 space-y-4">
            {/* Name */}
            <Field label="Name">
              <input
                className={inputCls}
                placeholder="Project name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>

            {/* Client Name */}
            <Field label="Client Name">
              <input
                className={inputCls}
                placeholder="Client name"
                value={form.clientName}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
              />
            </Field>

            {/* Status + Priority */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Status">
                <select
                  className={selectCls}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="on_hold">On Hold</option>
                  <option value="completed">Completed</option>
                </select>
              </Field>
              <Field label="Priority">
                <select
                  className={selectCls}
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </Field>
            </div>

            {/* Dates — native calendar picker via input[type="date"] */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Start Date">
                <input
                  type="date"
                  className={inputCls}
                  value={form.startDate}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                />
              </Field>
              <Field label="End Date (optional)">
                <input
                  type="date"
                  className={inputCls}
                  value={form.endDate ?? ""}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                />
              </Field>
            </div>

            {formError && formError.length > 0 && (
              <ul className="text-sm text-destructive list-disc pl-4 mt-2">
                {formError.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            )}
          </div>
        

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-2 shrink-0">
          <button
            onClick={close}
            className="rounded border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
