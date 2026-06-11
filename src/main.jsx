import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Users from './pages/Users.jsx';
import Parties from './pages/Parties.jsx';
import Ledger from './pages/Ledger.jsx';
import Settlements from './pages/Settlements.jsx';
import Dalali from './pages/Dalali.jsx';
import Outstanding from './pages/Outstanding.jsx';
import Documents from './pages/Documents.jsx';
import Catalogue from './pages/Catalogue.jsx';
import Reminders from './pages/Reminders.jsx';
import Reports from './pages/Reports.jsx';
import BulkImport from './pages/BulkImport.jsx';
import Backups from './pages/Backups.jsx';
import Settings from './pages/Settings.jsx';
import NotFound from './pages/NotFound.jsx';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="parties" element={<Parties />} />
            <Route path="ledger" element={<Ledger />} />
            <Route path="settlements" element={<Settlements />} />
            <Route path="dalali" element={<Dalali />} />
            <Route path="outstanding" element={<Outstanding />} />
            <Route path="documents" element={<Documents />} />
            <Route path="catalogue" element={<Catalogue />} />
            <Route path="reminders" element={<Reminders />} />
            <Route path="reports" element={<Reports />} />
            <Route path="bulk-import" element={<BulkImport />} />
            <Route path="backups" element={<Backups />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
