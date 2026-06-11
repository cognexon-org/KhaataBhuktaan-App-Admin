import PageHeader from '../components/PageHeader.jsx';
import JsonBulkBox from '../components/JsonBulkBox.jsx';
import { catalogueApi, documentsApi, ledgerApi, partiesApi, remindersApi, settlementsApi } from '../api/endpoints';

const samples = {
  party: [{ name:'ABC Traders', mobile:'9876543210', partyType:'Vyapaari', defaultDalaliPercent:1 }],
  ledger: [{ entryType:'Sale', productName:'Cotton', quantity:10, unit:'Quintal', rate:7000, dalaliPercent:1, paymentStatus:'Unpaid' }],
  settlement: [{ totalAmount:100000, allocationMethod:'FIFO', notes:'Bulk settlement import' }],
  reminder: [{ title:'Collect dalali from ABC Traders', reminderType:'Dalali Due', dueDate:'2026-06-30', priority:'High', status:'Pending' }],
  document: [{ title:'Receipt 1001', documentType:'Receipt', fileUrl:'https://example.com/receipt.pdf' }],
  catalogue: [{ itemName:'Cotton Sample', category:'Commodity', price:7000, unit:'Quintal', availabilityStatus:'Available' }]
};
export default function BulkImport(){return <><PageHeader title="Bulk Import APIs" subtitle="Paste JSON arrays or { items: [] } payloads for every major backend module."/><div className="grid gap-6 xl:grid-cols-2"><JsonBulkBox title="Bulk Parties" sample={samples.party} onSubmit={(items)=>partiesApi.bulk(items)}/><JsonBulkBox title="Bulk Ledger Entries" sample={samples.ledger} onSubmit={(items)=>ledgerApi.bulk(items)}/><JsonBulkBox title="Bulk Settlements" sample={samples.settlement} onSubmit={(items)=>settlementsApi.bulk(items)}/><JsonBulkBox title="Bulk Reminders" sample={samples.reminder} onSubmit={(items)=>remindersApi.bulk(items)}/><JsonBulkBox title="Bulk Documents" sample={samples.document} onSubmit={(items)=>documentsApi.bulk(items)}/><JsonBulkBox title="Bulk Catalogue Items" sample={samples.catalogue} onSubmit={(items)=>catalogueApi.bulk(items)}/></div></>}
