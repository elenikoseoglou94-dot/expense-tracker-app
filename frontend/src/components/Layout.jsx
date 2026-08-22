import { Link, useLocation, useNavigate } from 'react-router-dom';

function Layout({ title, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleΑποσύνδεση = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuLinks = [
    { to: '/', label: 'Ταμπλό' },
    { to: '/categories', label: 'Κατηγορίες' },
    { to: '/transactions', label: 'Συναλλαγές' },
    { to: '/report', label: 'Αναφορά' }
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Διαχείριση Εξόδων</h2>
        </div>

        <nav className="sidebar-nav">
          {menuLinks.map((linkItem) => {
            const isActive = location.pathname === linkItem.to;

            return (
              <Link
                key={linkItem.to}
                to={linkItem.to}
                className={isActive ? 'active' : ''}
              >
                {linkItem.label}
              </Link>
            );
          })}
        </nav>

        <button className="logout-btn" onClick={handleΑποσύνδεση}>
          Αποσύνδεση
        </button>
      </aside>

      <main className="content">
        <div className="topbar">
          <h1>{title}</h1>
        </div>

        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
