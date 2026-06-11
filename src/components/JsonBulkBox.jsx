import { useState } from 'react';

export default function JsonBulkBox({ title, sample, onSubmit }) {
  const [text, setText] = useState(JSON.stringify(sample, null, 2));
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    try {
      setLoading(true); setMessage('');
      const parsed = JSON.parse(text);
      const items = Array.isArray(parsed) ? parsed : parsed.items;
      if (!Array.isArray(items)) throw new Error('JSON must be an array or { items: [] }');
      await onSubmit(items);
      setMessage(`Imported ${items.length} item(s) successfully.`);
    } catch (e) { setMessage(e.message); }
    finally { setLoading(false); }
  };
  return (
    <div className="card">
      <div className="mb-3 flex items-center justify-between"><h3 className="font-bold text-slate-950">{title}</h3><button onClick={submit} className="btn-primary" disabled={loading}>{loading ? 'Importing...' : 'Import'}</button></div>
      <textarea className="input min-h-64 font-mono text-xs" value={text} onChange={(e) => setText(e.target.value)} />
      {message && <p className="mt-3 text-sm text-slate-600">{message}</p>}
    </div>
  );
}
