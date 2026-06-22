const StatsCards = ({ total, active, blocked }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div className="glass-card p-5 rounded-xl border border-slate-800/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">Tổng người dùng</p>
          <p className="text-2xl font-bold text-white mt-1">{total}</p>
        </div>
        <span className="text-3xl opacity-50">👥</span>
      </div>
    </div>
    <div className="glass-card p-5 rounded-xl border border-green-500/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">Đang hoạt động</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{active}</p>
        </div>
        <span className="text-3xl opacity-50">🟢</span>
      </div>
    </div>
    <div className="glass-card p-5 rounded-xl border border-red-500/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">Đã khóa</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{blocked}</p>
        </div>
        <span className="text-3xl opacity-50">🔴</span>
      </div>
    </div>
  </div>
);

export default StatsCards;