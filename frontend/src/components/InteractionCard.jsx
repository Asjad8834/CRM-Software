import "../styles/InteractionCard.css";

const outcomeColors = {
  Positive: '#26de81',
  Neutral: '#f7b731',
  Negative: '#fc5c65',
};

function InteractionCard({ interaction, onDelete }) {
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
              day: 'numeric', month: 'short', year: 'numeric'
            })}
          </span>
        </div>
        <button
          className="btn-delete-interaction"
          onClick={() => onDelete(interaction._id)}
        >
          🗑
        </button>
      </div>

      <p className="interaction-notes">{interaction.notes}</p>

      {interaction.followUpRequired && (
        <span className="followup-tag">📅 Follow-up Required</span>
      )}
    </div>
  );
}

export default InteractionCard;