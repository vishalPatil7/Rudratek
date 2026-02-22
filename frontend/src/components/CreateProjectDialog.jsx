import { Plus } from "lucide-react";
import { useState } from "react";
import AddNewProject from "./AddNewProject";

const INITIAL = {
  name: "",
  clientName: "",
  status: "active",
  startDate: new Date().toISOString().slice(0, 10),
  endDate: "",
  priority: "medium",
};

export function CreateProjectDialog({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(INITIAL);
  const [formError, setFormError] = useState([]);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = [];
    if (!form.name.trim()) errs.push("Name is required");
    if (!form.clientName.trim()) errs.push("Client name is required");
    if (!form.startDate) errs.push("Start date is required");
    if (form.endDate && form.endDate < form.startDate)
      errs.push("End date must be on or after start date");
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (errs.length) {
      setFormError(errs);
      return;
    }
    setLoading(true);
    setFormError([]);
    try {
      await onSubmit({ ...form, endDate: form.endDate || undefined });
      setOpen(false);
      setForm(INITIAL);
    } catch (err) {
      setFormError([err.message]);
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    setOpen(false);
    setFormError(null);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <Plus className="h-4 w-4" />
        New Project
      </button>

      {/* Modal */}
      <AddNewProject
        open={open}
        close={close}
        form={form}
        setForm={setForm}
        formError={formError}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </>
  );
}
