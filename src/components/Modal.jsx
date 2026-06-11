import { X } from 'lucide-react';

export default function Modal({ open, title, children, onClose, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-950">{title}</h2>
          <button className="rounded-xl p-2 hover:bg-slate-100" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="max-h-[65vh] overflow-y-auto p-6">{children}</div>
        {footer && <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}
