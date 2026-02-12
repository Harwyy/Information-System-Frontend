import { useState } from 'react';

import SearchByIdForm from '../../components/SearchByIdForm';

const GetCoordinateByIdForm = ({ onGet, onCancel, loading, coordinate }) => {
  const [id, setId] = useState('');

  const handleClose = () => {
    setId('');
    onCancel();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Find Coordinate by ID</h2>

        <SearchByIdForm
          id={id}
          onIdChange={setId}
          onSubmit={onGet}
          onClose={handleClose}
          loading={loading}
          placeholder="Enter coordinate ID"
          label="Coordinate ID:"
          submitButtonText="Find"
          cancelButtonText="Close"
        />

        {coordinate && (
          <div className="coordinate-details">
            <h3>Coordinate Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">ID:</span>
                <span className="detail-value">{coordinate.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">X:</span>
                <span className="detail-value">{coordinate.x}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Y:</span>
                <span className="detail-value">{coordinate.y}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetCoordinateByIdForm;
