import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((s) => s.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>💰 Expense Tracker</h2>
        <p style={styles.subtitle}>Login to your account</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input {...register('email')} style={styles.input} placeholder="you@example.com" />
            {errors.email && <p style={styles.error}>{errors.email.message}</p>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input {...register('password')} type="password" style={styles.input} placeholder="••••••" />
            {errors.password && <p style={styles.error}>{errors.password.message}</p>}
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={styles.link}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' },
  card: { background: '#000000', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
  title: { textAlign: 'center', marginBottom: '0.25rem', fontSize: '1.5rem' },
  subtitle: { textAlign: 'center', color: '#888', marginBottom: '1.5rem' },
  field: { marginBottom: '1rem' },
  label: { display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' },
  input: { width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' },
  error: { color: 'red', fontSize: '0.8rem', marginTop: '0.3rem' },
  button: { width: '100%', padding: '0.75rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem' },
  link: { textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' },
};