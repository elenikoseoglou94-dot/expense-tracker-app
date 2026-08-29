import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

function ΚατηγορίεςPage() {
  const [categories, setΚατηγορίες] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [errorMessage, setErrorMessage] = useState('');

  const loadΚατηγορίες = async () => {
    try {
      const res = await api.get('/categories');
      setΚατηγορίες(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadΚατηγορίες();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      await api.post('/categories', { name, type });
      setName('');
      setType('EXPENSE');
      loadΚατηγορίες();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Κάτι πήγε στραβά.');
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await api.delete(`/categories/${categoryId}`);
      loadΚατηγορίες();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Δεν έγινε διαγραφή.');
    }
  };

  return (
    <Layout title="Κατηγορίες">
      <div className="card form-card">
        <h3>Νέα κατηγορία</h3>

        <form onSubmit={handleSubmit} className="inline-form">
          <input
            type="text"
            placeholder="Όνομα κατηγορίας"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="EXPENSE">Έξοδο</option>
            <option value="INCOME">Έσοδο</option>
          </select>

          <button type="submit">Προσθήκη</button>
        </form>

        {errorMessage && <p className="error-text">{errorMessage}</p>}
      </div>

      <div className="card table-card">
        <h3>Λίστα κατηγοριών</h3>

        <table>
          <thead>
            <tr>
              <th>Όνομα</th>
              <th>Τύπος</th>
              <th>Ενέργεια</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.type}</td>
                <td>
                  <button className="danger-btn" onClick={() => handleDelete(category.id)}>
                    Διαγραφή
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default ΚατηγορίεςPage;
