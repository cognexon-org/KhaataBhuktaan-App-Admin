import { useEffect, useState } from 'react';
import { RefreshCcw, Wand2 } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import DataTable from '../components/DataTable.jsx';
import Modal from '../components/Modal.jsx';
import { FormInput, FormSelect, FormTextarea } from '../components/FormInput.jsx';
import { partiesApi, settlementsApi } from '../api/endpoints';
import { currency, date, statusClass } from '../utils/format';

export default function Settlements(){
 const [rows,setRows]=useState([]),[parties,setParties]=useState([]),[open,setOpen]=useState(false),[preview,setPreview]=useState(null),[loading,setLoading]=useState(false),[form,setForm]=useState({paidByPartyId:'',totalAmount:0,allocationMethod:'FIFO',notes:''});
 const load=async()=>{setLoading(true);try{const [s,p]=await Promise.all([settlementsApi.list(),partiesApi.list()]);setRows(s.data.data||s.data.items||s.data||[]);setParties(p.data.data||p.data.items||p.data||[])}catch{setRows([])}finally{setLoading(false)}}; useEffect(()=>{load()},[]);
 const doPreview=async()=>{const r=await settlementsApi.preview(form);setPreview(r.data.data||r.data)}; const save=async()=>{await settlementsApi.create(form);setOpen(false);setPreview(null);load()}; const reverse=async(id)=>{if(confirm('Reverse this settlement?')){await settlementsApi.reverse(id);load()}};
 const cols=[{key:'settlementNumber',label:'No.'},{key:'settlementDate',label:'Date',render:r=>date(r.settlementDate||r.createdAt)},{key:'paidByPartyId',label:'Paid By',render:r=>r.paidByPartyId?.name||'-'},{key:'totalAmount',label:'Amount',render:r=>currency(r.totalAmount)},{key:'allocationMethod',label:'Method'},{key:'status',label:'Status',render:r=><span className={`badge ${statusClass(r.status)}`}>{r.status||'-'}</span>},{key:'actions',label:'Actions',render:r=><button className="btn-secondary py-1" onClick={()=>reverse(r._id)}><RefreshCcw size={14}/> Reverse</button>}];
 return <><PageHeader title="Settlements" subtitle="Preview, allocate, create and reverse lump-sum settlements." actions={<button className="btn-primary" onClick={()=>setOpen(true)}><Wand2 size={16}/> New Settlement</button>}/><DataTable columns={cols} rows={rows} loading={loading}/>
 <Modal open={open} title="New Settlement" onClose={()=>setOpen(false)} footer={<div className="flex justify-end gap-2"><button className="btn-secondary" onClick={doPreview}>Preview</button><button className="btn-primary" onClick={save}>Confirm Settlement</button></div>}>
  <div className="grid gap-4 md:grid-cols-2"><FormSelect label="Paid By Party" value={form.paidByPartyId} onChange={e=>setForm({...form,paidByPartyId:e.target.value})}><option value="">Select</option>{parties.map(p=><option key={p._id} value={p._id}>{p.name}</option>)}</FormSelect><FormInput label="Amount" type="number" value={form.totalAmount} onChange={e=>setForm({...form,totalAmount:Number(e.target.value)})}/><FormSelect label="Allocation Method" value={form.allocationMethod} onChange={e=>setForm({...form,allocationMethod:e.target.value})}>{['FIFO','NEWEST','HIGHEST','MANUAL'].map(x=><option key={x}>{x}</option>)}</FormSelect><div className="md:col-span-2"><FormTextarea label="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></div></div>
  {preview && <div className="mt-6 rounded-2xl bg-slate-50 p-4"><h3 className="mb-3 font-bold">Settlement Preview</h3><pre className="overflow-auto text-xs">{JSON.stringify(preview,null,2)}</pre></div>}
 </Modal></>;
}
