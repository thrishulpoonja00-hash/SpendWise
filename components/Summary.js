import { CATEGORIES, fmt } from "../lib/data";
export default function Summary({ expenses, budget, setBudget }) {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const left = budget - total;
  const pct = Math.min(100, Math.round((total / (budget || 1)) * 100));
  const by = Object.keys(CATEGORIES).map((c) => ({ c, v: expenses.filter((e) => e.category === c).reduce((s, e) => s + e.amount, 0) })).filter((x) => x.v > 0).sort((a, b) => b.v - a.v);
  return (
    <section className="card sum">
      <div>
        <small>Spent this month</small>
        <div className="big">{fmt(total)}</div>
        <div className="track"><div className={"fill" + (pct >= 90 ? " hot" : "")} style={{ width: pct + "%" }} /></div>
        <p className={left < 0 ? "err" : "ok"}>{left >= 0 ? fmt(left) + " left of budget " : "Over budget by " + fmt(-left) + " · budget "}
          <input className="bud" type="number" min="0" value={budget} onChange={(e) => setBudget(Number(e.target.value))} aria-label="Monthly budget" /></p>
      </div>
      <div className="cats">
        {by.length === 0 && <p className="empty">No spending this month yet.</p>}
        {by.map(({ c, v }) => (
          <div key={c} className="crow"><span>{CATEGORIES[c].icon} {c}</span>
            <div className="track sm"><div className="fill" style={{ width: (v / total) * 100 + "%", background: CATEGORIES[c].color }} /></div>
            <b>{fmt(v)}</b></div>
        ))}
      </div>
    </section>
  );
}