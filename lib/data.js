export const CATEGORIES = {
  Food: { icon: "🍜", color: "#f59f00" },
  Transport: { icon: "🚌", color: "#3b82f6" },
  Shopping: { icon: "🛍️", color: "#ec4899" },
  Bills: { icon: "💡", color: "#8b5cf6" },
  Health: { icon: "💊", color: "#ef4444" },
  Fun: { icon: "🎬", color: "#14b8a6" },
  Other: { icon: "📦", color: "#64748b" },
};
const d = (n) => { const t = new Date(); t.setDate(t.getDate() - n); return t.toISOString().slice(0, 10); };
export const SEED = [
  { id: 1, title: "Groceries", amount: 1850, category: "Food", date: d(0) },
  { id: 2, title: "Metro card recharge", amount: 500, category: "Transport", date: d(1) },
  { id: 3, title: "Electricity bill", amount: 2300, category: "Bills", date: d(2) },
  { id: 4, title: "Movie night", amount: 650, category: "Fun", date: d(3) },
  { id: 5, title: "Sneakers", amount: 3200, category: "Shopping", date: d(5) },
  { id: 6, title: "Pharmacy", amount: 420, category: "Health", date: d(6) },
  { id: 7, title: "Lunch with team", amount: 780, category: "Food", date: d(8) },
];
export const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");