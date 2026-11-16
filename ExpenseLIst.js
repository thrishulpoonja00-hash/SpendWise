import { CATEGORIES, fmt } from "../lib/data";
export default function ExpenseList({ items, onEdit, onDelete }) {
  if (!items.length) return <p className="empty">No expenses match. Add one to get started.</p>;
  return (
    <ul className="list">
      {items.map((e) => (
        <li key={e.id}>
          <span className="ico" style={{ background: CATEGORIES[e.category].color + "22" }}>{CATEGORIES[e.category].icon}</span>
          <div className="meta"><strong>{e.title}</strong><small>{e.category} · {new Date(e.date + "T00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</small></div>
          <b>{fmt(e.amount)}</b>
          <button className="link" onClick={() => onEdit(e)}>Edit</button>
          <button className="link del" onClick={() => onDelete(e.id)} aria-label={"Delete " + e.title}>Delete</button>
        </li>
      ))}
    </ul>
  );
}