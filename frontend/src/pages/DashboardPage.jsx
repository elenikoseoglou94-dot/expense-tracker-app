import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

function ΤαμπλόPage() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    expensesByCategory: {}
  });

  const loadSummary = async () => {
    try {
      const res = await api.get('/transactions/summary');
      setSummary(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <Layout title="Ταμπλό">
      <div className="stats-grid">
        <div className="card stat-card income-card">
          <h3>Σύνολο Εσόδων</h3>
          <p>{summary.totalIncome.toFixed(2)} €</p>
        </div>

        <div className="card stat-card expense-card">
          <h3>Σύνολο Εξόδων</h3>
          <p>{summary.totalExpense.toFixed(2)} €</p>
        </div>

        <div className="card stat-card balance-card">
          <h3>Υπόλοιπο</h3>
          <p>{summary.balance.toFixed(2)} €</p>
        </div>
      </div>
    </Layout>
  );
}

export default ΤαμπλόPage;
