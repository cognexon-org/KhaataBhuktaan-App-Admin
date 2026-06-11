export default function StatCard({ title, value, icon: Icon, tone = 'orange', subtitle }) {
  const tones = {
    orange: 'bg-orange-100 text-orange-700', emerald: 'bg-emerald-100 text-emerald-700', rose: 'bg-rose-100 text-rose-700', blue: 'bg-blue-100 text-blue-700', violet: 'bg-violet-100 text-violet-700'
  };
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-950">{value}</h3>
          {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
        </div>
        {Icon && <div className={`rounded-2xl p-3 ${tones[tone] || tones.orange}`}><Icon size={22} /></div>}
      </div>
    </div>
  );
}
