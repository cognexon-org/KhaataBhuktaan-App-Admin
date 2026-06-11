import { Link } from 'react-router-dom';
export default function NotFound(){return <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><div className="rounded-3xl bg-white p-8 text-center shadow-soft"><h1 className="text-4xl font-black">404</h1><p className="mt-2 text-slate-500">Page not found</p><Link className="btn-primary mt-5" to="/">Go Dashboard</Link></div></div>}
