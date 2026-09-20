import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/me')
      .then((res) => setUser(res.data.user))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    await api.post('/logout');
    navigate('/login');
  };

  if (loading) return <div className="loading-text">Loading...</div>;

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-welcome">Welcome, {user?.name}</h1>
        <button className="home-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}