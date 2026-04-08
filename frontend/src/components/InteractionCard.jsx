import { useState } from 'react';
import API from '../api/axios';
import "../styles/InteractionCard.css";

const outcomeColors = {
  Positive: '#26de81',
  Neutral: '#f7b731',
  Negative: '#fc5c65',
};

function InteractionCard({ interaction, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    notes: interaction.notes,
    outcome: interaction.outcome,
    followUpRequired: interaction.followUpRequired,
    date: interaction.date.split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/interactions/${interaction._id}`, form);
      setEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Failed to update interaction:', error);
    }
  };

  if (editing) {
    return (
      <form className="interaction-card editing" onSubmit={handleUpdate}>
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
          <label>Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
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

        <div className="edit-actions">
          <button type="button" className="btn-cancel-edit" onClick={() => setEditing(false)}>
            Cancel
          </button>
          <button type="submit" className="btn-save-edit">
            Save
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="interaction-card">
      <div className="interaction-header">
        <div className="interaction-meta">
          <span
            className="outcome-badge"
            style={{ backgroundColor: outcomeColors[interaction.outcome] }}
          >
            {interaction.outcome === 'Positive' && '👍'}
            {interaction.outcome === 'Neutral' && '😐'}
            {interaction.outcome === 'Negative' && '👎'}
            {' '}{interaction.outcome}
          </span>
          <span className="interaction-date">
            🗓 {new Date(interaction.date).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'short', year: 'numeric',
            })}
          </span>
        </div>
        <div className="interaction-actions">
          <button className="btn-edit-interaction" onClick={() => setEditing(true)}>
            ✏️
          </button>
          <button
            className="btn-delete-interaction"
            onClick={() => onDelete(interaction._id)}
          >
            🗑
          </button>
        </div>
      </div>

      <p className="interaction-notes">{interaction.notes}</p>

      {interaction.followUpRequired && (
        <span className="followup-tag">📅 Follow-up Required</span>
      )}
    </div>
  );
}

export default InteractionCard;