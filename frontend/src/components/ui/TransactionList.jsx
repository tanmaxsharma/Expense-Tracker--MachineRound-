import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function TransactionList({ transactions, onDelete, onRefresh }) {

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;
    try {
      await api.delete(`/transactions/${id}`);
      toast.success('Deleted!');
      onDelete();
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (!transactions?.length) {
    return <div style={styles.empty}>No transactions found 📭</div>;
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Recent Transactions</h3>
      {transactions.map((t) => (
        <div key={t.id} style={styles.item}>
          <div style={styles.left}>
            <span style={styles.category}>{t.category_name}</span>
            <span style={styles.desc}>{t.description || '—'}</span>
            <span style={styles.date}>{new Date(t.date).toLocaleDateString()}</span>
          </div>
          <div style={styles.right}>
            <span style={{ ...styles.amount, color: t.type === 'income' ? '#10b981' : '#ef4444' }}>
              {t.type === 'income' ? '+' : '-'}₹{Number(t.amount).toFixed(2)}
            </span>
            <button onClick={() => handleDelete(t.id)} style={styles.del}>🗑</button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  title: { marginTop: 0, marginBottom: '1rem' },
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f0f0f0' },
  left: { display: 'flex', flexDirection: 'column', gap: '0.2rem' },
  category: { fontWeight: '600', fontSize: '0.95rem' },
  desc: { fontSize: '0.8rem', color: '#888' },
  date: { fontSize: '0.75rem', color: '#aaa' },
  right: { display: 'flex', alignItems: 'center', gap: '1rem' },
  amount: { fontWeight: '700', fontSize: '1rem' },
  del: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' },
  empty: { background: '#fff', padding: '2rem', borderRadius: '12px', textAlign: 'center', color: '#888', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
};