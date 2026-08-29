import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

function ΑναφοράPage() {
  const [summary, setSummary] = useState({ expensesByCategory: {} });

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
    <Layout title="Αναφορά">
      <div className="card table-card">
        <h3>Έξοδα ανά κατηγορία</h3>

        <table>
          <thead>
            <tr>
              <th>Κατηγορία</th>
              <th>Σύνολο</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(summary.expensesByCategory).map(([categoryName, totalAmount]) => (
              <tr key={categoryName}>
                <td>{categoryName}</td>
                <td>{Number(totalAmount).toFixed(2)} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default ΑναφοράPage;
