import { useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../utils/db";
import { addDoc, collection } from "firebase/firestore";



export const NewContact = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Add new contact to Firestore
            const docRef = await addDoc(collection(db, "contacts"), formData);

            // Redirect to the new contact page
            navigate(`/contact/${docRef.id}`);
        } catch (error) {
            console.error("Error adding contact: ", error);
        }
    };

    return (
        <div className="new-contact-container">
            <div className="new-contact-card">
                <h2>Add New Contact</h2>
                <form onSubmit={handleSubmit} className="new-contact-form">
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
                    <button type="submit" className="submit-button">Add Contact</button>
                </form>
            </div>
        </div>
    );
};

export default NewContact;