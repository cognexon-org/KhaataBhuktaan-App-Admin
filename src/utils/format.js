export const currency = (value = 0) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value || 0));
export const date = (value) => value ? new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';
export const statusClass = (status = '') => {
  const key = String(status).toLowerCase();
  if (['paid', 'collected', 'completed', 'active'].includes(key)) return 'bg-emerald-100 text-emerald-700';
  if (['partially paid', 'partial', 'partially_collected', 'partially allocated'].includes(key)) return 'bg-amber-100 text-amber-700';
  if (['unpaid', 'pending', 'overdue', 'due'].includes(key)) return 'bg-rose-100 text-rose-700';
  return 'bg-slate-100 text-slate-700';
};
