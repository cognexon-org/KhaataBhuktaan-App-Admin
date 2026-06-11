import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackagePlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [mobile, setMobile] = useState('9999999999');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try { setLoading(true); setError(''); await login({ mobile, password }); navigate('/'); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };
  return (
    <div className="grid min-h-screen bg-slate-50 lg:grid-cols-2">
      <div className="hidden bg-gradient-to-br from-orange-600 to-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3"><div className="rounded-2xl bg-white/15 p-3"><PackagePlus /></div><h1 className="text-2xl font-black">VyaparSettle Admin</h1></div>
        <div><h2 className="max-w-xl text-5xl font-black leading-tight">Control centre for ledger, dalali, settlement and backup operations.</h2><p className="mt-5 max-w-lg text-orange-100">Built for the Node/Express backend with bulk import, reports, and Excel backup support.</p></div>
        <p className="text-sm text-orange-100">React + Tailwind CSS</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-soft">
          <div className="mb-8"><h2 className="text-3xl font-black text-slate-950">Login</h2><p className="mt-2 text-sm text-slate-500">Use backend seed credentials or your registered admin user.</p></div>
          <label className="mb-4 block"><span className="label">Mobile</span><input className="input" value={mobile} onChange={(e) => setMobile(e.target.value)} /></label>
          <label className="mb-4 block"><span className="label">Password</span><input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          {error && <div className="mb-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
      </div>
    </div>
  );
}
