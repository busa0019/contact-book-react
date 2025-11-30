import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import db from "../utils/db";

// import './EditForm.css';
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

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


    // Load data from Firestore
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

    // Check if contact data is provided
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
        // Update the contact in Firestore
        const docRef = doc(db, "contacts", id);
        await updateDoc(docRef, formData);
        // Redirect to the contact page
        navigate(`/contact/${id}`);
    };

    const handleDelete = async () => {
        const docRef = doc(db, "contacts", id);
        await deleteDoc(docRef);
        navigate(`/`);
    };

    return (
        <div className="edit-form-container">
            {/* <Link to={`./contact/${contact.id}`} className="back-link">← Back to Contacts</Link> */}
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

                    <div className="action-buttons-container">
                        <button type="submit" className="submit-button">Update Contact</button>
                        <button type="button" className="delete-button" onClick={handleDelete}>Delete Contact</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditForm;   