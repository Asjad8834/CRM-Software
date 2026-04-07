import { useNavigate } from 'react-router-dom';
import "../styles/ContactCard.css";

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

function ContactCard({ contact }) {
  const navigate = useNavigate();

  return (
    <div
      className="contact-card"
      onClick={() => navigate(`/contacts/${contact._id}`)}
    >
      <div className="card-header">
        <h3 className="contact-name">{contact.name}</h3>
        <span
          className="interest-badge"
          style={{ backgroundColor: interestColors[contact.interestLevel] }}
        >
          {contact.interestLevel === 'Hot' && '🔥'}
          {contact.interestLevel === 'Warm' && '🌤'}
          {contact.interestLevel === 'Cold' && '❄️'}
          {' '}{contact.interestLevel}
        </span>
      </div>

      <div className="card-body">
        {contact.company && (
          <p className="contact-info">🏢 {contact.company}</p>
        )}
        {contact.email && (
          <p className="contact-info">✉️ {contact.email}</p>
        )}
        {contact.phone && (
          <p className="contact-info">📞 {contact.phone}</p>
        )}
      </div>

      <div className="card-footer">
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
  );
}

export default ContactCard;