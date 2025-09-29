import React from 'react';
import './LostItemCard.css';

const LostItemCard = ({ item, onContact }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      electronics: 'fas fa-mobile-alt',
      clothing: 'fas fa-tshirt',
      documents: 'fas fa-file-alt',
      accessories: 'fas fa-gem',
      books: 'fas fa-book',
      other: 'fas fa-question-circle'
    };
    return icons[category] || icons.other;
  };

  const getStatusBadge = (status) => {
    const badges = {
      lost: 'badge-danger',
      found: 'badge-success',
      returned: 'badge-info'
    };
    return badges[status] || 'badge-secondary';
  };

  return (
    <div className="lost-item-card">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">
            <i className={`${getCategoryIcon(item.category)} me-2`}></i>
            {item.item_name}
          </h5>
          <span className={`badge ${getStatusBadge(item.status)}`}>
            {item.status.toUpperCase()}
          </span>
        </div>
        <small className="text-muted">
          <i className="fas fa-calendar me-1"></i>
          Lost on {formatDate(item.lost_date)}
        </small>
      </div>
      
      <div className="card-body">
        <p className="card-text description">
          {item.description}
        </p>
        
        {item.location && (
          <p className="card-text">
            <i className="fas fa-map-marker-alt me-2 text-primary"></i>
            <strong>Location:</strong> {item.location}
          </p>
        )}
        
        {item.reward && (
          <p className="card-text">
            <i className="fas fa-gift me-2 text-warning"></i>
            <strong>Reward:</strong> {item.reward}
          </p>
        )}
        
        <div className="contact-info">
          <p className="card-text">
            <i className="fas fa-user me-2 text-info"></i>
            <strong>Contact:</strong> {item.contact_name}
          </p>
          <p className="card-text">
            <i className="fas fa-envelope me-2 text-info"></i>
            <strong>Email:</strong> 
            <a href={`mailto:${item.contact_email}`} className="ms-1">
              {item.contact_email}
            </a>
          </p>
          {item.contact_phone && (
            <p className="card-text">
              <i className="fas fa-phone me-2 text-info"></i>
              <strong>Phone:</strong> 
              <a href={`tel:${item.contact_phone}`} className="ms-1">
                {item.contact_phone}
              </a>
            </p>
          )}
        </div>
      </div>
      
      <div className="card-footer">
        <div className="d-flex justify-content-between align-items-center">
          <span className="badge badge-light">
            <i className="fas fa-tag me-1"></i>
            {item.category}
          </span>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onContact && onContact(item)}
          >
            <i className="fas fa-envelope me-1"></i>
            Contact Owner
          </button>
        </div>
      </div>
    </div>
  );
};

export default LostItemCard;
