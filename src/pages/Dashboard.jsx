import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AlertTriangle, BookOpen, HandCoins, IndianRupee, Landmark, ReceiptText } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import DataTable from '../components/DataTable.jsx';
import { reportsApi } from '../api/endpoints';
import { currency, statusClass } from '../utils/format';

const fallback = {
  totalParties: 0, totalLedgerEntries: 0, totalReceivable: 0, totalPayable: 0, pendingDalali: 0, overdueCount: 0,
  recentEntries: [], chart: [{ name: 'Jan', amount: 120000 }, { name: 'Feb', amount: 185000 }, { name: 'Mar', amount: 145000 }, { name: 'Apr', amount: 220000 }, { name: 'May', amount: 260000 }, { name: 'Jun', amount: 310000 }]
};

export default function Dashboard() {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  useEffect(() => { reportsApi.dashboard().then((r) => setData({ ...fallback, ...(r.data.data || r.data) })).catch(() => setData(fallback)).finally(() => setLoading(false)); }, []);
  const columns = [
    { key: 'entryNumber', label: 'Entry' }, { key: 'party', label: 'Party', render: r => r.party?.name || r.partyName || '-' }, { key: 'totalAmount', label: 'Amount', render: r => currency(r.totalAmount) }, { key: 'paymentStatus', label: 'Status', render: r => <span className={`badge ${statusClass(r.paymentStatus)}`}>{r.paymentStatus || '-'}</span> }
  ];
  return <>
    <PageHeader title="Dashboard" subtitle="Business, settlement, dalali and outstanding overview." />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Total Parties" value={data.totalParties || 0} icon={Landmark} tone="blue" />
      <StatCard title="Ledger Entries" value={data.totalLedgerEntries || 0} icon={BookOpen} tone="orange" />
      <StatCard title="Receivable" value={currency(data.totalReceivable)} icon={IndianRupee} tone="emerald" />
      <StatCard title="Pending Dalali" value={currency(data.pendingDalali)} icon={HandCoins} tone="violet" />
      <StatCard title="Payable" value={currency(data.totalPayable)} icon={ReceiptText} tone="rose" />
      <StatCard title="Overdue Entries" value={data.overdueCount || 0} icon={AlertTriangle} tone="rose" />
    </div>
    <div className="mt-6 grid gap-6 xl:grid-cols-3">
      <div className="card xl:col-span-2"><h3 className="mb-4 font-bold">Monthly business trend</h3><div className="h-80"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data.chart || fallback.chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip formatter={(v) => currency(v)} /><Area type="monotone" dataKey="amount" stroke="currentColor" fill="currentColor" fillOpacity={0.12} /></AreaChart></ResponsiveContainer></div></div>
      <div className="card"><h3 className="mb-4 font-bold">Admin checklist</h3><div className="space-y-3 text-sm text-slate-600"><p>✅ Verify monthly Excel backup cron.</p><p>✅ Review bulk imports before production.</p><p>✅ Keep Cloudinary credentials secure.</p><p>✅ Monitor pending dalali and overdue payments.</p></div></div>
    </div>
    <div className="mt-6"><h3 className="mb-3 text-lg font-bold">Recent ledger entries</h3><DataTable columns={columns} rows={data.recentEntries || []} loading={loading} /></div>
  </>;
}
