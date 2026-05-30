import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const schema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.string().min(1, 'Required'),
  date: z.string().min(1, 'Required'),
  category_id: z.string().min(1, 'Required'),
  description: z.string().optional(),
});

export default function TransactionForm({ categories, onSuccess }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { type: 'expense', date: new Date().toISOString().split('T')[0] },
  });

  const onSubmit = async (data) => {
    try {
      await api.post('/transactions', { ...data, amount: parseFloat(data.amount), category_id: parseInt(data.category_id) });
      toast.success('Transaction added!');
      reset({ type: 'expense', date: new Date().toISOString().split('T')[0] });
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Add Transaction</h3>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Type</label>
            <select {...register('type')} style={styles.input}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Amount (₹)</label>
            <input {...register('amount')} type="number" step="0.01" style={styles.input} placeholder="0.00" />
            {errors.amount && <p style={styles.error}>{errors.amount.message}</p>}
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Date</label>
            <input {...register('date')} type="date" style={styles.input} />
            {errors.date && <p style={styles.error}>{errors.date.message}</p>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Category</label>
            <select {...register('category_id')} style={styles.input}>
              <option value="">Select category</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.category_id && <p style={styles.error}>{errors.category_id.message}</p>}
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Description (optional)</label>
          <input {...register('description')} style={styles.input} placeholder="e.g. Lunch at cafe" />
        </div>

        <button type="submit" style={styles.button}>+ Add Transaction</button>
      </form>
    </div>
  );
}

const styles = {
  container: { background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: '2rem' },
  title: { marginTop: 0, marginBottom: '1rem' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  field: { marginBottom: '1rem' },
  label: { display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.85rem' },
  input: { width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem', boxSizing: 'border-box' },
  error: { color: 'red', fontSize: '0.75rem', marginTop: '0.2rem' },
  button: { width: '100%', padding: '0.75rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' },
};