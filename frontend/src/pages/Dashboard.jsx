import { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/layout/Navbar';
import SummaryCards from '../components/ui/SummaryCards';
import ExpenseChart from '../components/ui/ExpenseChart';
import TransactionForm from '../components/ui/TransactionForm';
import TransactionList from '../components/ui/TransactionList';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchAll = async () => {
    try {
      const [s, m, t, c] = await Promise.all([
        api.get('/transactions/summary/dashboard'),
        api.get('/transactions/summary/monthly'),
        api.get('/transactions?limit=5'),
        api.get('/categories'),
      ]);
      setSummary(s.data.data);
      setMonthly(m.data.data);
      setTransactions(t.data.data);
      setCategories(c.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.content}>
        <h2 style={styles.heading}>Dashboard</h2>
        <SummaryCards summary={summary} />
        <div style={styles.grid}>
          <div>
            <TransactionForm categories={categories} onSuccess={fetchAll} />
          </div>
          <ExpenseChart data={monthly} />
        </div>
        <TransactionList transactions={transactions} onDelete={fetchAll} />
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  content: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
  heading: { marginBottom: '1.5rem', color: '#333' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' },
};