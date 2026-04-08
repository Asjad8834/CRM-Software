import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';
import "../styles/AddContact.css";

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await API.get(`/contacts/${id}`);
        const c = res.data;
        setForm({
          name: c.name || '',
          email: c.email || '',
          phone: c.phone || '',
          company: c.company || '',
          interestLevel: c.interestLevel || 'Warm',
          status: c.status || 'New Lead',
          needsFollowUp: c.needsFollowUp || false,
          followUpDate: c.followUpDate
            ? c.followUpDate.split('T')[0]
            : '',
          notes: c.notes || '',
        });
      } catch (error) {
        console.error('Failed to fetch contact:', error);
      } finally {
        setFetching(false);
      }
    };
    fetchContact();
  }, [id]);

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
      await API.put(`/contacts/${id}`, form);
      navigate(`/contacts/${id}`);
    } catch (error) {
      console.error('Failed to update contact:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p className="loading">Loading contact...</p>;

  return (
    <div className="form-page">
      <div className="form-header">
        <button className="btn-back" onClick={() => navigate(`/contacts/${id}`)}>
          ← Back
        </button>
        <h1 className="page-title">Edit Contact</h1>
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
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate(`/contacts/${id}`)}
          >
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditContact;