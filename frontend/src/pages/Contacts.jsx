import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import ContactCard from '../components/ContactCard';
import "../styles/Contacts.css";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterInterest, setFilterInterest] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try { //use Array,isArray to check if the response is an array before setting it to state
        const res = await API.get('/contacts');
        console.log("API Response:", res.data);
        setContacts(res.data.contacts || []);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const filtered = contacts.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchInterest = filterInterest === 'All' || c.interestLevel === filterInterest;
    return matchSearch && matchStatus && matchInterest;
  });

  if (loading) return <p className="loading">Loading contacts...</p>;

  return (
    <div>
      <div className="contacts-header">
        <h1 className="page-title">Contacts</h1>
        <button className="btn-add" onClick={() => navigate('/contacts/add')}>
          + Add Contact
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search by name or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Statuses</option>
          <option value="New Lead">New Lead</option>
          <option value="In Progress">In Progress</option>
          <option value="Converted">Converted</option>
          <option value="Not Interested">Not Interested</option>
        </select>
        <select
          value={filterInterest}
          onChange={(e) => setFilterInterest(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Interest Levels</option>
          <option value="Hot">🔥 Hot</option>
          <option value="Warm">🌤 Warm</option>
          <option value="Cold">❄️ Cold</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="loading">No contacts found.</p>
      ) : (
        <div className="contacts-grid">
          {filtered.map((contact) => (
            <ContactCard key={contact._id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Contacts;