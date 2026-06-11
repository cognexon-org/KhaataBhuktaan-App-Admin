import http from './http';

export const authApi = {
  login: (payload) => http.post('/auth/login', payload),
  register: (payload) => http.post('/auth/register', payload),
  me: () => http.get('/auth/me'),
  updateProfile: (payload) => http.put('/auth/profile', payload)
};

export const crudApi = (base) => ({
  list: (params) => http.get(base, { params }),
  get: (id) => http.get(`${base}/${id}`),
  create: (payload) => http.post(base, payload),
  update: (id, payload) => http.put(`${base}/${id}`, payload),
  remove: (id) => http.delete(`${base}/${id}`),
  bulk: (items) => http.post(`${base}/bulk`, { items })
});

export const partiesApi = crudApi('/parties');
export const ledgerApi = { ...crudApi('/ledger'), outstanding: (params) => http.get('/ledger/outstanding', { params }) };
export const settlementsApi = {
  ...crudApi('/settlements'),
  preview: (payload) => http.post('/settlements/preview', payload),
  reverse: (id) => http.post(`/settlements/${id}/reverse`)
};
export const remindersApi = crudApi('/reminders');
export const catalogueApi = crudApi('/catalogue');
export const documentsApi = {
  list: (params) => http.get('/documents', { params }),
  get: (id) => http.get(`/documents/${id}`),
  remove: (id) => http.delete(`/documents/${id}`),
  bulk: (items) => http.post('/documents/bulk', { items }),
  upload: (formData) => http.post('/documents/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
};
export const dalaliApi = {
  summary: () => http.get('/dalali'),
  pending: (params) => http.get('/dalali/pending', { params }),
  collect: (payload) => http.post('/dalali/collect', payload)
};
export const reportsApi = {
  dashboard: () => http.get('/reports/dashboard'),
  ledger: (params) => http.get('/reports/ledger', { params }),
  settlements: (params) => http.get('/reports/settlements', { params }),
  exportLedgerExcel: (params) => http.get('/reports/export/ledger-excel', { params, responseType: 'blob' }),
  monthlyBackup: (payload) => http.post('/reports/backup/monthly', payload, { responseType: 'blob' })
};
