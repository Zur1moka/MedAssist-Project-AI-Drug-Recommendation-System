export default function StatsCards({ total, active, blocked }) {
  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      <div className="glass-card p-4 rounded">Tổng: {total}</div>
      <div className="glass-card p-4 rounded text-green-400">Active: {active}</div>
      <div className="glass-card p-4 rounded text-red-400">Blocked: {blocked}</div>
    </div>
  );
}