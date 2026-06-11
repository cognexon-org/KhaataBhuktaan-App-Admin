import PageHeader from '../components/PageHeader.jsx';
import DataTable from '../components/DataTable.jsx';
import { statusClass } from '../utils/format';

const demoUsers = [
  { name: 'Demo Dalaal', mobile: '9999999999', businessType: 'Dalaal', totalParties: 0, totalEntries: 0, status: 'Active' }
];
export default function Users(){const columns=[{key:'name',label:'User'},{key:'mobile',label:'Mobile'},{key:'businessType',label:'Business Type'},{key:'totalParties',label:'Parties'},{key:'totalEntries',label:'Entries'},{key:'status',label:'Status',render:r=><span className={`badge ${statusClass(r.status)}`}>{r.status}</span>}]; return <><PageHeader title="Users" subtitle="Platform user overview. Current backend exposes profile auth; full super-admin user APIs can be added later."/><DataTable columns={columns} rows={demoUsers} loading={false}/><div className="card mt-6"><h3 className="font-bold">Implementation note</h3><p className="mt-2 text-sm text-slate-500">This page is ready for future admin endpoints such as GET /api/admin/users, block/unblock user, storage usage and subscription plan controls.</p></div></>}
