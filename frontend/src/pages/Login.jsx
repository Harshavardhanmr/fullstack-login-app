import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const [form, setForm] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/login', form);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo" />
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Log in to your account to continue.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label">Username</label>
            <input
              className="auth-input"
              name="name"
              placeholder="Enter your username"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field-group">
            <label className="field-label">Password</label>
            <input
              className="auth-input"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button className="auth-button" type="submit">
            Log in
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}