export default function SummaryCards({ summary }) {
  const income = Number(summary?.total_income || 0).toFixed(2);
  const expense = Number(summary?.total_expense || 0).toFixed(2);
  const balance = Number(summary?.balance || 0).toFixed(2);

  const cards = [
    { label: 'Total Balance', value: `₹${balance}`, color: '#4f46e5', icon: '💼' },
    { label: 'Total Income', value: `₹${income}`, color: '#10b981', icon: '📈' },
    { label: 'Total Expense', value: `₹${expense}`, color: '#ef4444', icon: '📉' },
  ];

  return (
    <div style={styles.grid}>
      {cards.map((card) => (
        <div key={card.label} style={{ ...styles.card, borderTop: `4px solid ${card.color}` }}>
          <div style={styles.row}>
            <span style={styles.icon}>{card.icon}</span>
            <span style={{ ...styles.value, color: card.color }}>{card.value}</span>
          </div>
          <p style={styles.label}>{card.label}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' },
  card: { background: '#fff', padding: '1.25rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
  icon: { fontSize: '1.5rem' },
  value: { fontSize: '1.4rem', fontWeight: '700' },
  label: { color: '#888', fontSize: '0.85rem', margin: 0 },
};