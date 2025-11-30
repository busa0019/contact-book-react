import { useState, useEffect } from "react";
import db from '../utils/db';
import { doc, getDoc } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import '../App.css';

export const Contact = () => {
  
    const [contactInfo, setContactInfo] = useState({});

  
    const { id } = useParams();

  
    const fetchContactInfoById = async (contactId) => {
        const docRef = doc(db, "contacts", contactId);
        const docSnapshot = await getDoc(docRef);

      
        if (docSnapshot.exists()) {
            setContactInfo({
                id: docSnapshot.id,
                ...docSnapshot.data()
            });
        } else {
            alert("Contact does not exist in our records! Please provide a valid id");
            return null;
        }
    };

    useEffect(() => {
     
        fetchContactInfoById(id);
    }, [id]);

    console.log(id);
  
    return (

        <div className="app-container">
            <div className="action-buttons-container">
                <Link to="/" className="back-button">
                    ← Back to Contact List
                </Link>

                <Link
                    to={`/contact/edit/${id}`}
                    className="edit-button"
                >
                    Edit Contact
                </Link>
            </div>
            <div className="contact-card">
                <h1>Contact Details <small>MTM6404</small></h1>

              <div className="contact-details">
  <h2>{`${contactInfo.firstName || ''} ${contactInfo.lastName || ''}`}</h2>
  <p><strong>Email:</strong> {contactInfo.email || 'No email provided'}</p>
  <p><strong>Phone Number:</strong> {contactInfo.phoneNumber || 'No phone number provided'}</p>
</div>

            </div>
        </div>
    );
}

export default Contact;