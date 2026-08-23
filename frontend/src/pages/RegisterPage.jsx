import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setΚωδικός] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Συμπλήρωσε όλα τα πεδία.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/register', { fullName, email, password });
      navigate('/login');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Κάτι πήγε στραβά.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Δημιουργία λογαριασμού</h1>
        <p className="auth-subtitle">Φτιάξε λογαριασμό για να καταγράφεις έσοδα και έξοδα.</p>

        <label>Ονοματεπώνυμο</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Ονοματεπώνυμο"
        />

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
          {loading ? 'Γίνεται εγγραφή...' : 'Εγγραφή'}
        </button>

        <p className="auth-switch">
          Έχεις ήδη λογαριασμό; <Link to="/login">Σύνδεση</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
