import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import db from "../utils/db";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import '../App.css';

export const EditForm = () => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

   
    useEffect(() => {
        const fetchContact = async () => {
            const docRef = doc(db, "contacts", id);
            const docSnap = await getDoc(docRef);
            setContact({
                id: docSnap.id,
                ...docSnap.data()
            });
        }
        fetchContact();
    }, [id]);

  
    useEffect(() => {
        if (contact) {
            setFormData({
                firstName: contact.firstName || '',
                lastName: contact.lastName || '',
                email: contact.email || '',
                phoneNumber: contact.phoneNumber || ''
            });
        }
    }, [contact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const docRef = doc(db, "contacts", id);
        await updateDoc(docRef, formData);
       
        navigate(`/contact/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            const docRef = doc(db, "contacts", id);
            await deleteDoc(docRef);
            navigate(`/`);
        }
    };

    const handleCancel = () => {
        navigate(`/contact/${id}`);
    };

    return (
        <div className="edit-form-container">
            <Link to="/" className="back-link">← Back to All Contacts</Link>
            <div className="edit-form-card">
                <h2>Edit Contact Information</h2>
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>

                      <div className="edit-form-actions">
                        <div className="primary-actions">
                            <button type="submit" className="submit-button">Update Contact</button>
                            <button type="button" className="cancel-button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                        <div className="danger-actions">
                            <button type="button" className="delete-button" onClick={handleDelete}>
                                Delete Contact
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditForm;