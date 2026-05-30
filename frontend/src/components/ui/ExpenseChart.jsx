import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#4f46e5', '#10b981', '#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function ExpenseChart({ data }) {
  const chartData = data
    ?.filter((d) => d.type === 'expense')
    .map((d) => ({ name: d.category, value: Number(d.total) }));

  if (!chartData || chartData.length === 0) {
    return (
      <div style={styles.empty}>
        <p>No expense data for this month 📊</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Expenses by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(val) => `₹${val}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  container: { background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  title: { marginTop: 0, marginBottom: '1rem', fontSize: '1rem', color: '#333' },
  empty: { background: '#fff', padding: '2rem', borderRadius: '12px', textAlign: 'center', color: '#888', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
};