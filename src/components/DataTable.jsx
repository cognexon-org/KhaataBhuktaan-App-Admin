export default function DataTable({ columns, rows, loading, emptyText = 'No records found' }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr>{columns.map((col) => <th key={col.key} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">{col.label}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && <tr><td className="px-4 py-8 text-center text-sm text-slate-500" colSpan={columns.length}>Loading...</td></tr>}
            {!loading && rows?.length === 0 && <tr><td className="px-4 py-8 text-center text-sm text-slate-500" colSpan={columns.length}>{emptyText}</td></tr>}
            {!loading && rows?.map((row, index) => (
              <tr key={row._id || row.id || index} className="hover:bg-slate-50/70">
                {columns.map((col) => <td key={col.key} className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{col.render ? col.render(row, index) : row[col.key] ?? '-'}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
