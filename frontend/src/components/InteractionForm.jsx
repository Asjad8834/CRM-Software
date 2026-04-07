import { useState } from 'react';
import API from '../api/axios';
import '../styles/InteractionForm.css';

function InteractionForm({ contactId, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    notes: '',
    outcome: 'Neutral',
    followUpRequired: false,
    date: new Date().toISOString().split('T')[0],
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
      await API.post('/interactions', { ...form, contactId });
      setForm({
        notes: '',
        outcome: 'Neutral',
        followUpRequired: false,
        date: new Date().toISOString().split('T')[0],
      });
      onSuccess();
    } catch (error) {
      console.error('Failed to log interaction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="interaction-form" onSubmit={handleSubmit}>
      <h3>Log New Interaction</h3>

      <div className="iform-grid">
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Outcome</label>
          <select name="outcome" value={form.outcome} onChange={handleChange}>
            <option value="Positive">👍 Positive</option>
            <option value="Neutral">😐 Neutral</option>
            <option value="Negative">👎 Negative</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Notes *</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="What was discussed in this interaction?"
          rows={3}
          required
        />
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="followUpRequired"
            checked={form.followUpRequired}
            onChange={handleChange}
          />
          Follow-up Required
        </label>
      </div>

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? 'Saving...' : 'Log Interaction'}
      </button>
    </form>
  );
}

export default InteractionForm;