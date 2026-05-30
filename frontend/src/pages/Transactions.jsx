import { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/layout/Navbar';
import TransactionForm from '../components/ui/TransactionForm';
import TransactionList from '../components/ui/TransactionList';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ category_id: '', start_date: '', end_date: '' });

  const fetchData = async () => {
    try {
      const params = new URLSearchParams({ page, limit: 10, ...filters });
      // Remove empty params
      [...params.entries()].forEach(([k, v]) => { if (!v) params.delete(k); });
      const [t, c] = await Promise.all([
        api.get(`/transactions?${params}`),
        api.get('/categories'),
      ]);
      setTransactions(t.data.data);
      setCategories(c.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, [page, filters]);

  const handleFilter = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setPage(1);
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.content}>
        <h2 style={styles.heading}>Transactions</h2>

        <TransactionForm categories={categories} onSuccess={fetchData} />

        {/* Filters */}
        <div style={styles.filters}>
          <select name="category_id" onChange={handleFilter} style={styles.input}>
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input name="start_date" type="date" onChange={handleFilter} style={styles.input} placeholder="Start date" />
          <input name="end_date" type="date" onChange={handleFilter} style={styles.input} placeholder="End date" />
          <button onClick={() => { setFilters({ category_id: '', start_date: '', end_date: '' }); setPage(1); }} style={styles.resetBtn}>
            Reset
          </button>
        </div>

        <TransactionList transactions={transactions} onDelete={fetchData} />

        {/* Pagination */}
        <div style={styles.pagination}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} style={styles.pageBtn}>
            ← Prev
          </button>
          <span style={styles.pageNum}>Page {page}</span>
          <button onClick={() => setPage((p) => p + 1)} disabled={transactions.length < 10} style={styles.pageBtn}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  content: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
  heading: { marginBottom: '1.5rem', color: '#333' },
  filters: { display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', background: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  input: { padding: '0.6rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.9rem' },
  resetBtn: { padding: '0.6rem 1rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  pagination: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' },
  pageBtn: { padding: '0.5rem 1.25rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', disabled: { opacity: 0.5 } },
  pageNum: { fontWeight: '600', color: '#333' },
};