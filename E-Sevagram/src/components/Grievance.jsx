import React from 'react';
import { databases, databaseId, collectionId } from '../appwrite';

const Grievance = () => {
    const handleGrievance = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = {
            name: form.grievanceName.value,
            phone: form.grievancePhone.value,
            category: form.grievanceCategory.value,
            subject: form.grievanceSubject.value,
            description: form.grievanceDescription.value,
            address: form.grievanceAddress.value,
            urgency: form.grievanceUrgency.value,
            status: 'Pending'
        };

        try {
            await databases.createDocument(databaseId, collectionId, 'unique()', data);
            alert('Grievance submitted successfully!');
            form.reset();
        } catch (error) {
            console.error('Error submitting grievance:', error);
            alert('Failed to submit grievance.');
        }
    };

    return (
        <div id="grievance" className="tab-content active">
            <h2>Report Grievance</h2>
            <form id="grievanceForm" onSubmit={handleGrievance}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="grievanceName">Your Name</label>
                        <input type="text" id="grievanceName" name="grievanceName" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="grievancePhone">Phone Number</label>
                        <input type="tel" id="grievancePhone" name="grievancePhone" required />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="grievanceCategory">Category</label>
                    <select id="grievanceCategory" name="grievanceCategory" required>
                        <option value="">Select Category</option>
                        <option value="water">Water Supply</option>
                        <option value="sanitation">Sanitation</option>
                        <option value="roads">Roads & Infrastructure</option>
                        <option value="electricity">Electricity</option>
                        <option value="tax">Tax Related</option>
                        <option value="documentation">Documentation</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="grievanceSubject">Subject</label>
                    <input type="text" id="grievanceSubject" name="grievanceSubject" required />
                </div>
                <div className="form-group">
                    <label htmlFor="grievanceDescription">Description</label>
                    <textarea id="grievanceDescription" name="grievanceDescription" rows="4" required placeholder="Describe your issue in detail..."></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="grievanceAddress">Location/Address</label>
                    <textarea id="grievanceAddress" name="grievanceAddress" rows="2" required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="grievanceUrgency">Urgency Level</label>
                    <select id="grievanceUrgency" name="grievanceUrgency" required>
                        <option value="">Select Urgency</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-warning">Submit Grievance</button>
            </form>
            <div id="citizenGrievanceReplies" style={{ marginTop: '30px' }}></div>
        </div>
    );
};

export default Grievance;
