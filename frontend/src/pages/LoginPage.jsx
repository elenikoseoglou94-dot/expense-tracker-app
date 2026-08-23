import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setΚωδικός] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Κάτι πήγε στραβά.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Διαχείριση Εξόδων</h1>
        <p className="auth-subtitle">Συνδέσου για να δεις τα οικονομικά σου στοιχεία.</p>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@mail.com"
        />

        <label>Κωδικός</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setΚωδικός(e.target.value)}
          placeholder="••••••••"
        />

        {errorMessage && <p className="error-text">{errorMessage}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Γίνεται σύνδεση...' : 'Σύνδεση'}
        </button>

        <p className="auth-switch">
          Δεν έχεις λογαριασμό; <Link to="/register">Εγγραφή</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
