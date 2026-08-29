import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

function ΣυναλλαγέςPage() {
  const [transactions, setΣυναλλαγές] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loadΣυναλλαγές = async () => {
    try {
      const res = await api.get('/transactions');
      setΣυναλλαγές(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadΣυναλλαγές();
    loadCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => category.type === type);
  }, [categories, type]);

  useEffect(() => {
    setCategoryId('');
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      await api.post('/transactions', {
        title,
        amount,
        type,
        date,
        note,
        categoryId
      });

      setTitle('');
      setAmount('');
      setType('EXPENSE');
      setDate('');
      setNote('');
      setCategoryId('');
      loadΣυναλλαγές();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Κάτι πήγε στραβά.');
    }
  };

  const handleDelete = async (transactionId) => {
    try {
      await api.delete(`/transactions/${transactionId}`);
      loadΣυναλλαγές();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Δεν έγινε διαγραφή.');
    }
  };

  return (
    <Layout title="Συναλλαγές">
      <div className="card form-card">
        <h3>Νέα κίνηση</h3>

        <form onSubmit={handleSubmit} className="transaction-form">
          <input
            type="text"
            placeholder="Τίτλος"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            step="0.01"
            placeholder="Ποσό"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="EXPENSE">Έξοδο</option>
            <option value="INCOME">Έσοδο</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Επιλογή κατηγορίας</option>
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Σημείωση"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button type="submit">Προσθήκη</button>
        </form>

        {errorMessage && <p className="error-text">{errorMessage}</p>}
      </div>

      <div className="card table-card">
        <h3>Λίστα κινήσεων</h3>

        <table>
          <thead>
            <tr>
              <th>Τίτλος</th>
              <th>Ποσό</th>
              <th>Τύπος</th>
              <th>Κατηγορία</th>
              <th>Ημερομηνία</th>
              <th>Σημείωση</th>
              <th>Ενέργεια</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td>{Number(transaction.amount).toFixed(2)} €</td>
                <td>{transaction.type}</td>
                <td>{transaction.category?.name}</td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{transaction.note || '-'}</td>
                <td>
                  <button className="danger-btn" onClick={() => handleDelete(transaction.id)}>
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

export default ΣυναλλαγέςPage;
