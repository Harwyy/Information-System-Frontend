import { useState } from 'react';

import SearchByIdForm from '../../components/SearchByIdForm';

const GetLocationByIdForm = ({ onGet, onCancel, loading, location }) => {
  const [id, setId] = useState('');

  const handleClose = () => {
    setId('');
    onCancel();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Find Location by ID</h2>

        <SearchByIdForm
          id={id}
          onIdChange={setId}
          onSubmit={onGet}
          onClose={handleClose}
          loading={loading}
          placeholder="Enter location ID"
          label="Location ID:"
          submitButtonText="Find"
          cancelButtonText="Close"
        />

        {location && (
          <div className="coordinate-details">
            <h3>Location Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">ID:</span>
                <span className="detail-value">{location.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">X:</span>
                <span className="detail-value">{location.x}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Y:</span>
                <span className="detail-value">{location.y}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Z:</span>
                <span className="detail-value">{location.z}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{location.name || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetLocationByIdForm;
