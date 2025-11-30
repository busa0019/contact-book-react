import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import db from './utils/db.js'
import { collection, getDocs } from "firebase/firestore";
import './App.css'

const App = () => {
 
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

 
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const docSnapshot = await getDocs(collection(db, "contacts"));
      
      const data = docSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      
      data.sort((a, b) => {
        if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
        if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
        return 0;
      });
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  }

 
  useEffect(() => {
    fetchContacts();
  }, []);



  const filteredContacts = contacts.filter((contact) => {
    return contact.firstName.toLowerCase().includes(search.toLowerCase()) || contact.lastName.toLowerCase().includes(search.toLowerCase());
  });

  if (loading) {
    return (
      <div className="app-container">
        <div className="contact-card">
          <div className="loading">
            <h2>Loading your contacts...</h2>
            <p>Please wait while we fetch your contact book.</p>
          </div>
        </div>
      </div>
    );
  }

return (
  <div className="app-container">
    <div className="contact-card">
      <div className="header-container">
        <h1>My Contact Book <small>MTM6404</small></h1>
        <Link to="/add-contact" className="add-button">
          <button>+ Add New Contact</button>
        </Link>
      </div>

      <div className="welcome-section">
        <h2>Welcome to Your Digital Contact Book</h2>
        <p>Manage all your contacts in one place. Search, add, edit, or remove contacts easily.</p>
      </div>

      <div className="contact-stats">
        <p>You have <strong>{filteredContacts.length}</strong> contact{filteredContacts.length !== 1 ? 's' : ''} in your book</p>
      </div>

      <div className='search-container'>
        <input 
          type='text' 
          placeholder='Search contacts by name...' 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>

      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>
              {`${contact.lastName}, ${contact.firstName}`}
            </Link>
          </li>
        ))}
      </ul>

      <div className='contact-list'>
        {filteredContacts.length === 0 && search && (
          <p className='no-contacts-found'>No contacts found matching "{search}"</p>
        )}
        {filteredContacts.length === 0 && !search && (
          <p className='no-contacts-found'>No contacts found. Add your first contact!</p>
        )}
      </div>
    </div>
  </div>
)
}

export default App;