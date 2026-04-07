import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import InteractionCard from '../components/InteractionCard';
import InteractionForm from '../components/InteractionForm';
import "../styles/ContactDetail.css";

const interestColors = {
  Hot: '#ff6b6b',
  Warm: '#f7b731',
  Cold: '#45aaf2',
};

const statusColors = {
  'New Lead': '#4e9af1',
  'In Progress': '#a55eea',
  'Converted': '#26de81',
  'Not Interested': '#fc5c65',
};

function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchContact = async () => {
  try {
    const res = await API.get(`/contacts/${id}`);
    console.log('Contact response:', res.data); // add this
    setContact(res.data);
  } catch (error) {
    console.error('Failed to fetch contact:', error);
  }
};

  const fetchInteractions = async () => {
    try {
      const res = await API.get(`/interactions/${id}`);
      setInteractions(res.data.interactions || []);
    } catch (error) {
      console.error('Failed to fetch interactions:', error);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      await fetchContact();
      await fetchInteractions();
      setLoading(false);
    };
    fetchAll();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    try {
      await API.delete(`/contacts/${id}`);
      navigate('/contacts');
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  };

  const handleInteractionAdded = () => {
    setShowForm(false);
    fetchInteractions();
    fetchContact();
  };

  const handleDeleteInteraction = async (interactionId) => {
    if (!window.confirm('Delete this interaction?')) return;
    try {
      await API.delete(`/interactions/${interactionId}`);
      fetchInteractions();
    } catch (error) {
      console.error('Failed to delete interaction:', error);
    }
  };

  if (loading) return <p className="loading">Loading contact...</p>;
  if (!contact) return <p className="loading">Contact not found.</p>;

  return (
    <div className="detail-page">
      {/* Header */}
      <div className="detail-header">
        <button className="btn-back" onClick={() => navigate('/contacts')}>
          ← Back
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          🗑 Delete Contact
        </button>
      </div>

      {/* Contact Info Card */}
      <div className="detail-card">
        <div className="detail-top">
          <div>
            <h1 className="detail-name">{contact.name}</h1>
            {contact.company && (
              <p className="detail-company">🏢 {contact.company}</p>
            )}
          </div>
          <div className="detail-badges">
            <span
              className="interest-badge"
              style={{ backgroundColor: interestColors[contact.interestLevel] }}
            >
              {contact.interestLevel === 'Hot' && '🔥'}
              {contact.interestLevel === 'Warm' && '🌤'}
              {contact.interestLevel === 'Cold' && '❄️'}
              {' '}{contact.interestLevel}
            </span>
            <span
              className="status-badge"
              style={{ backgroundColor: statusColors[contact.status] }}
            >
              {contact.status}
            </span>
            {contact.needsFollowUp && (
              <span className="followup-badge">📅 Follow-up</span>
            )}
          </div>
        </div>

        <div className="detail-info-grid">
          {contact.email && (
            <div className="detail-info-item">
              <span className="info-label">Email</span>
              <span className="info-value">✉️ {contact.email}</span>
            </div>
          )}
          {contact.phone && (
            <div className="detail-info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">📞 {contact.phone}</span>
            </div>
          )}
          {contact.followUpDate && (
            <div className="detail-info-item">
              <span className="info-label">Follow Up Date</span>
              <span className="info-value">
                📅 {new Date(contact.followUpDate).toLocaleDateString()}
              </span>
            </div>
          )}
          {contact.notes && (
            <div className="detail-info-item full">
              <span className="info-label">Notes</span>
              <span className="info-value">📝 {contact.notes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactions Section */}
      <div className="interactions-section">
        <div className="interactions-header">
          <h2>Interaction History</h2>
          <button className="btn-add" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Cancel' : '+ Log Interaction'}
          </button>
        </div>

        {showForm && (
          <InteractionForm
            contactId={id}
            onSuccess={handleInteractionAdded}
          />
        )}

        {interactions.length === 0 ? (
          <p className="no-interactions">No interactions logged yet.</p>
        ) : (
          <div className="interactions-list">
            {interactions.map((interaction) => (
              <InteractionCard
                key={interaction._id}
                interaction={interaction}
                onDelete={handleDeleteInteraction}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactDetail;