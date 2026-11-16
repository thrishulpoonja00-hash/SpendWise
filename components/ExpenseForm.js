"use client";
import { useEffect, useState } from "react";
import { CATEGORIES } from "../lib/data";
const blank = () => ({ title: "", amount: "", category: "Food", date: new Date().toISOString().slice(0, 10) });
export default function ExpenseForm({ onSave, editing, onCancel }) {
  const [f, setF] = useState(blank());
  const [err, setErr] = useState("");
  useEffect(() => { setF(editing ? { ...editing } : blank()); setErr(""); }, [editing]);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const amount = Number(f.amount);
    if (!f.title.trim()) return setErr("Add a name for this expense.");
    if (!(amount > 0)) return setErr("Enter an amount greater than 0.");
    onSave({ ...f, title: f.title.trim(), amount });
    setF(blank()); setErr("");
  };
  return (
    <form className="card form" onSubmit={submit}>
      <h2>{editing ? "Edit expense" : "Add expense"}</h2>
      <label>Name<input value={f.title} onChange={set("title")} placeholder="e.g. Coffee" /></label>
      <label>Amount (₹)<input type="number" min="0" value={f.amount} onChange={set("amount")} placeholder="0" /></label>
      <label>Category
        <select value={f.category} onChange={set("category")}>
          {Object.entries(CATEGORIES).map(([c, v]) => <option key={c} value={c}>{v.icon} {c}</option>)}
        </select>
      </label>
      <label>Date<input type="date" value={f.date} onChange={set("date")} /></label>
      {err && <p className="err" role="alert">{err}</p>}
      <button className="btn" type="submit">{editing ? "Save changes" : "Add expense"}</button>
      {editing && <button className="btn ghost" type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}