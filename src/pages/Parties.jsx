import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import DataTable from '../components/DataTable.jsx';
import Modal from '../components/Modal.jsx';
import { FormInput, FormSelect, FormTextarea } from '../components/FormInput.jsx';
import { partiesApi } from '../api/endpoints';

const initial = { name: '', mobile: '', partyType: 'Vyapaari', businessName: '', gstNumber: '', city: '', state: '', defaultDalaliPercent: 1, notes: '' };
export default function Parties() {
  const [rows, setRows] = useState([]), [loading, setLoading] = useState(false), [open, setOpen] = useState(false), [form, setForm] = useState(initial), [q, setQ] = useState('');
  const load = async () => { setLoading(true); try { const r = await partiesApi.list({ search: q }); setRows(r.data.data || r.data.items || r.data || []); } catch { setRows([]); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const save = async () => { await partiesApi.create(form); setOpen(false); setForm(initial); load(); };
  const columns = [
    { key: 'name', label: 'Name' }, { key: 'mobile', label: 'Mobile' }, { key: 'partyType', label: 'Type' }, { key: 'businessName', label: 'Business' }, { key: 'gstNumber', label: 'GST' }, { key: 'defaultDalaliPercent', label: 'Dalali %', render: r => r.defaultDalaliPercent ?? '-' }
  ];
  return <>
    <PageHeader title="Parties" subtitle="Manage Vyapaari, Dukandaar, Dealer, Supplier, Transporter and other parties." actions={<><input className="input w-56" placeholder="Search party" value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter' && load()} /><button className="btn-secondary" onClick={load}>Search</button><button className="btn-primary" onClick={()=>setOpen(true)}><Plus size={16}/> Add Party</button></>} />
    <DataTable columns={columns} rows={rows} loading={loading} />
    <Modal open={open} title="Add Party" onClose={()=>setOpen(false)} footer={<div className="flex justify-end gap-2"><button className="btn-secondary" onClick={()=>setOpen(false)}>Cancel</button><button className="btn-primary" onClick={save}>Save Party</button></div>}>
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput label="Party Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><FormInput label="Mobile" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})}/>
        <FormSelect label="Party Type" value={form.partyType} onChange={e=>setForm({...form,partyType:e.target.value})}>{['Vyapaari','Dukandaar','Dealer','Supplier','Customer','Transporter','Labour','Other'].map(x=><option key={x}>{x}</option>)}</FormSelect><FormInput label="Business Name" value={form.businessName} onChange={e=>setForm({...form,businessName:e.target.value})}/>
        <FormInput label="GST Number" value={form.gstNumber} onChange={e=>setForm({...form,gstNumber:e.target.value})}/><FormInput label="City" value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/>
        <FormInput label="State" value={form.state} onChange={e=>setForm({...form,state:e.target.value})}/><FormInput label="Default Dalali %" type="number" value={form.defaultDalaliPercent} onChange={e=>setForm({...form,defaultDalaliPercent:Number(e.target.value)})}/>
        <div className="md:col-span-2"><FormTextarea label="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></div>
      </div>
    </Modal>
  </>;
}
