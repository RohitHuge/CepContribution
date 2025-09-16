import React, { useState, useEffect } from 'react';
import { databases, databaseId, collectionId } from '../appwrite';

const TrackStatus = () => {
    const [grievances, setGrievances] = useState([]);
    const [searchId, setSearchId] = useState('');

    const fetchGrievances = async () => {
        try {
            const response = await databases.listDocuments(databaseId, collectionId);
            setGrievances(response.documents);
        } catch (error) {
            console.error('Error fetching grievances:', error);
        }
    };

    useEffect(() => {
        fetchGrievances();
    }, []);

    const handleSearch = () => {
        // Implement search logic here if needed
    };

    return (
        <div id="track" className="tab-content active">
            <h2>Track Status</h2>
            <div className="card">
                <h3>Search by ID</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="trackId">Enter Grievance ID or Property ID</label>
                        <input type="text" id="trackId" placeholder="e.g., GRV-2024-001 or PROP-001" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary" onClick={handleSearch}>Track Status</button>
                    </div>
                </div>
            </div>
            <div id="trackResults">
                <h3>Recent Grievances</h3>
                {grievances.map((grievance) => (
                    <div className="grievance-item" key={grievance.$id}>
                        <div className="grievance-header">
                            <span className="grievance-id">{grievance.$id}</span>
                            <span className={`status ${grievance.status.toLowerCase().replace(' ', '-')}`}>{grievance.status}</span>
                        </div>
                        <h4>{grievance.subject}</h4>
                        <p>{grievance.description}</p>
                        <small>Submitted: {new Date(grievance.$createdAt).toLocaleDateString()} | Urgency: {grievance.urgency}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrackStatus;
