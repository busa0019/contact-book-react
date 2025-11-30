import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import db from './utils/db.js'
import { collection, getDocs } from "firebase/firestore";
import './App.css'

const App = () => {
 
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');

 
  const fetchContacts = async () => {
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
  }

 
  useEffect(() => {
    fetchContacts();
  }, []);



  const filteredContacts = contacts.filter((contact) => {
    return contact.firstName.toLowerCase().includes(search.toLowerCase()) || contact.lastName.toLowerCase().includes(search.toLowerCase());
  });


  return (
    <div className="app-container">
      <div className="contact-card">
        <div className="header-container">
          <h1> Contact Book <small>MTM6404</small> </h1>
          <Link to="/add-contact" className="add-button">
            <button>+ Add New Contact</button>
          </Link>
        </div>

        <div className='search-container'>
          <input type='text' placeholder='Search contacts by name...' value={search} onChange={(e) => setSearch(e.target.value)} />
         
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
          {
            filteredContacts.length === 0 && (
              <p className='no-contacts-found'>No contacts found</p>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default App;