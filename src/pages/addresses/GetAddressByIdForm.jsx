import { useState } from 'react';

import SearchByIdForm from '../../components/SearchByIdForm';

const GetAddressByIdForm = ({ onGet, onCancel, loading, address }) => {
  const [id, setId] = useState('');

  const handleClose = () => {
    setId('');
    onCancel();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Find Address by ID</h2>

        <SearchByIdForm
          id={id}
          onIdChange={setId}
          onSubmit={onGet}
          onClose={handleClose}
          loading={loading}
          placeholder="Enter address ID"
          label="Address ID:"
          submitButtonText="Find"
          cancelButtonText="Close"
        />

        {address && (
          <div className="coordinate-details">
            <h3>Address Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">ID:</span>
                <span className="detail-value">{address.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Zip Code:</span>
                <span className="detail-value">{address.zipCode || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location ID:</span>
                <span className="detail-value">
                  {address.locationDTO?.id || 'N/A'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location X:</span>
                <span className="detail-value">
                  {address.locationDTO?.x || 'N/A'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location Y:</span>
                <span className="detail-value">
                  {address.locationDTO?.y || 'N/A'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location Z:</span>
                <span className="detail-value">
                  {address.locationDTO?.z || 'N/A'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location Name:</span>
                <span className="detail-value">
                  {address.locationDTO?.name || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAddressByIdForm;
