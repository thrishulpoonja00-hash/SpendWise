"use client";
import { useEffect, useState, useMemo } from "react";
import { SEED, CATEGORIES, fmt } from "../lib/data";
import ExpenseForm from "../components/ExpenseForm";
import Summary from "../components/Summary";
import ExpenseList from "../components/ExpenseList";

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(15000);
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    try {
      const e = localStorage.getItem("sw_expenses"), b = localStorage.getItem("sw_budget");
      setExpenses(e ? JSON.parse(e) : SEED);
      if (b) setBudget(Number(b));
    } catch { setExpenses(SEED); }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) { localStorage.setItem("sw_expenses", JSON.stringify(expenses)); localStorage.setItem("sw_budget", String(budget)); }
  }, [expenses, budget, ready]);

  const save = (x) => {
    setExpenses((p) => x.id ? p.map((e) => (e.id === x.id ? x : e)) : [{ ...x, id: Date.now() }, ...p]);
    setEditing(null);
  };
  const remove = (id) => setExpenses((p) => p.filter((e) => e.id !== id));
  const month = new Date().toISOString().slice(0, 7);
  const thisMonth = useMemo(() => expenses.filter((e) => e.date.startsWith(month)), [expenses, month]);
  const visible = useMemo(() => expenses
    .filter((e) => (filter === "All" || e.category === filter) && e.title.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id), [expenses, filter, q]);

  if (!ready) return null;
  return (
    <main className="wrap">
      <header className="top">
        <h1>SpendWise</h1>
        <p>Track every rupee. Stay inside your budget.</p>
      </header>
      <Summary expenses={thisMonth} budget={budget} setBudget={setBudget} />
      <div className="grid">
        <ExpenseForm onSave={save} editing={editing} onCancel={() => setEditing(null)} />
        <section className="card">
          <div className="bar">
            <input placeholder="Search expenses" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
            <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter category">
              <option>All</option>
              {Object.keys(CATEGORIES).map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <ExpenseList items={visible} onEdit={setEditing} onDelete={remove} />
          <p className="foot">{visible.length} expense{visible.length !== 1 && "s"} · {fmt(visible.reduce((s, e) => s + e.amount, 0))}</p>
        </section>
      </div>
    </main>
  );
}