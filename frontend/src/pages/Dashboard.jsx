import { useEffect, useState } from 'react';
import API from '../api/axios';
import "../styles/Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/dashboard/stats');
        setStats(res.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p className="loading">Loading stats...</p>;

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card total">
          <span className="stat-icon">👥</span>
          <div>
            <p className="stat-label">Total Contacts</p>
            <p className="stat-value">{stats.totalContacts}</p>
          </div>
        </div>

        <div className="stat-card hot">
          <span className="stat-icon">🔥</span>
          <div>
            <p className="stat-label">Hot Leads</p>
            <p className="stat-value">{stats.hotLeads}</p>
          </div>
        </div>

        <div className="stat-card warm">
          <span className="stat-icon">🌤</span>
          <div>
            <p className="stat-label">Warm Leads</p>
            <p className="stat-value">{stats.warmLeads}</p>
          </div>
        </div>

        <div className="stat-card cold">
          <span className="stat-icon">❄️</span>
          <div>
            <p className="stat-label">Cold Leads</p>
            <p className="stat-value">{stats.coldLeads}</p>
          </div>
        </div>

        <div className="stat-card followup">
          <span className="stat-icon">📅</span>
          <div>
            <p className="stat-label">Follow-ups Due</p>
            <p className="stat-value">{stats.followUpsDue}</p>
          </div>
        </div>

        <div className="stat-card converted">
          <span className="stat-icon">✅</span>
          <div>
            <p className="stat-label">Converted</p>
            <p className="stat-value">{stats.converted}</p>
          </div>
        </div>

        <div className="stat-card notinterested">
          <span className="stat-icon">❌</span>
          <div>
            <p className="stat-label">Not Interested</p>
            <p className="stat-value">{stats.notInterested}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;