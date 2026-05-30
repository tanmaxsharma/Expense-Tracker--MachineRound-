import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <span style={styles.logo}>💰 Expense Tracker</span>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/transactions" style={styles.link}>Transactions</Link>
      </div>
      <div style={styles.right}>
        <span style={styles.user}>👤 {user?.name || 'User'}</span>
        <button onClick={handleLogout} style={styles.btn}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#4f46e5', color: '#fff' },
  left: { display: 'flex', alignItems: 'center', gap: '1.5rem' },
  logo: { fontWeight: '700', fontSize: '1.2rem' },
  link: { color: '#fff', textDecoration: 'none', fontSize: '0.95rem' },
  right: { display: 'flex', alignItems: 'center', gap: '1rem' },
  user: { fontSize: '0.9rem' },
  btn: { padding: '0.4rem 1rem', background: '#fff', color: '#4f46e5', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
};