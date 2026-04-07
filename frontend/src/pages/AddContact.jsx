import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import "../styles/AddContact.css";

function AddContact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interestLevel: 'Warm',
    status: 'New Lead',
    needsFollowUp: false,
    followUpDate: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/contacts', form);
      navigate('/contacts');
    } catch (error) {
      console.error('Failed to create contact:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-header">
        <button className="btn-back" onClick={() => navigate('/contacts')}>
          ← Back
        </button>
        <h1 className="page-title">Add New Contact</h1>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
            />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Acme Corp"
            />
          </div>

          <div className="form-group">
            <label>Interest Level</label>
            <select name="interestLevel" value={form.interestLevel} onChange={handleChange}>
              <option value="Hot">🔥 Hot</option>
              <option value="Warm">🌤 Warm</option>
              <option value="Cold">❄️ Cold</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="New Lead">New Lead</option>
              <option value="In Progress">In Progress</option>
              <option value="Converted">Converted</option>
              <option value="Not Interested">Not Interested</option>
            </select>
          </div>

          <div className="form-group">
            <label>Follow Up Date</label>
            <input
              type="date"
              name="followUpDate"
              value={form.followUpDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="needsFollowUp"
                checked={form.needsFollowUp}
                onChange={handleChange}
              />
              Needs Follow Up
            </label>
          </div>
        </div>

        <div className="form-group full-width">
          <label>Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any notes about this contact..."
            rows={4}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate('/contacts')}>
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving...' : 'Add Contact'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddContact;