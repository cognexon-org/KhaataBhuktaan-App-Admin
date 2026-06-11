import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import DataTable from '../components/DataTable.jsx';
import Modal from '../components/Modal.jsx';
import { FormInput, FormSelect, FormTextarea } from '../components/FormInput.jsx';
import { ledgerApi, partiesApi } from '../api/endpoints';
import { currency, date, statusClass } from '../utils/format';

const initial = { entryType:'Sale', productName:'', quantity:1, unit:'Kg', rate:0, bhaadaAmount:0, dalaliEnabled:true, dalaliPercent:1, interestEnabled:false, interestPercent:0, paymentStatus:'Unpaid', notes:'' };
export default function Ledger() {
  const [rows,setRows]=useState([]),[parties,setParties]=useState([]),[loading,setLoading]=useState(false),[open,setOpen]=useState(false),[form,setForm]=useState(initial);
  const load=async()=>{setLoading(true);try{const [l,p]=await Promise.all([ledgerApi.list(),partiesApi.list()]);setRows(l.data.data||l.data.items||l.data||[]);setParties(p.data.data||p.data.items||p.data||[])}catch{setRows([])}finally{setLoading(false)}}; useEffect(()=>{load()},[]);
  const total=Number(form.quantity||0)*Number(form.rate||0)+Number(form.bhaadaAmount||0);
  const save=async()=>{await ledgerApi.create({...form,totalAmount:total, grossAmount:Number(form.quantity||0)*Number(form.rate||0), primaryPartyId:form.primaryPartyId||undefined});setOpen(false);setForm(initial);load()};
  const columns=[{key:'entryNumber',label:'Entry'},{key:'entryDate',label:'Date',render:r=>date(r.entryDate||r.createdAt)},{key:'entryType',label:'Type'},{key:'party',label:'Party',render:r=>r.primaryPartyId?.name||r.party?.name||r.partyName||'-'},{key:'totalAmount',label:'Amount',render:r=>currency(r.totalAmount)},{key:'dalaliAmount',label:'Dalali',render:r=>currency(r.dalaliAmount)},{key:'paymentStatus',label:'Status',render:r=><span className={`badge ${statusClass(r.paymentStatus)}`}>{r.paymentStatus||'-'}</span>}];
  return <><PageHeader title="Ledger" subtitle="Create and monitor purchase, sale, payment, receipt, interest, bhaada and adjustment entries." actions={<button className="btn-primary" onClick={()=>setOpen(true)}><Plus size={16}/> Add Entry</button>} /> <DataTable columns={columns} rows={rows} loading={loading}/>
  <Modal open={open} title="Add Ledger Entry" onClose={()=>setOpen(false)} footer={<div className="flex justify-between"><p className="font-bold">Total: {currency(total)}</p><div className="flex gap-2"><button className="btn-secondary" onClick={()=>setOpen(false)}>Cancel</button><button className="btn-primary" onClick={save}>Save Entry</button></div></div>}>
    <div className="grid gap-4 md:grid-cols-2">
      <FormSelect label="Entry Type" value={form.entryType} onChange={e=>setForm({...form,entryType:e.target.value})}>{['Purchase','Sale','Payment','Receipt','Advance','Expense','Bhaada','Dalali','Adjustment','Interest'].map(x=><option key={x}>{x}</option>)}</FormSelect>
      <FormSelect label="Primary Party" value={form.primaryPartyId||''} onChange={e=>setForm({...form,primaryPartyId:e.target.value})}><option value="">Select</option>{parties.map(p=><option value={p._id} key={p._id}>{p.name}</option>)}</FormSelect>
      <FormInput label="Product" value={form.productName} onChange={e=>setForm({...form,productName:e.target.value})}/><FormInput label="Unit" value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})}/>
      <FormInput label="Quantity" type="number" value={form.quantity} onChange={e=>setForm({...form,quantity:Number(e.target.value)})}/><FormInput label="Rate" type="number" value={form.rate} onChange={e=>setForm({...form,rate:Number(e.target.value)})}/>
      <FormInput label="Bhaada" type="number" value={form.bhaadaAmount} onChange={e=>setForm({...form,bhaadaAmount:Number(e.target.value)})}/><FormInput label="Dalali %" type="number" value={form.dalaliPercent} onChange={e=>setForm({...form,dalaliPercent:Number(e.target.value)})}/>
      <FormInput label="Interest %" type="number" value={form.interestPercent} onChange={e=>setForm({...form,interestPercent:Number(e.target.value), interestEnabled:Number(e.target.value)>0})}/><FormSelect label="Payment Status" value={form.paymentStatus} onChange={e=>setForm({...form,paymentStatus:e.target.value})}>{['Unpaid','Partially Paid','Paid','Overdue'].map(x=><option key={x}>{x}</option>)}</FormSelect>
      <div className="md:col-span-2"><FormTextarea label="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></div>
    </div>
  </Modal></>;
}
