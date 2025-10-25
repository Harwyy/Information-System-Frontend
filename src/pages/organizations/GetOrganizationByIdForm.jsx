import { useState } from 'react';

import SearchByIdForm from '../../components/SearchByIdForm';

const GetOrganizationByIdForm = ({
  onGet,
  onCancel,
  loading,
  organization,
}) => {
  const [id, setId] = useState('');

  const handleClose = () => {
    setId('');
    onCancel();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Find Organization by ID</h2>

        <SearchByIdForm
          id={id}
          onIdChange={setId}
          onSubmit={onGet}
          onClose={handleClose}
          loading={loading}
          placeholder="Enter organization ID"
          label="Organization ID:"
          submitButtonText="Find"
          cancelButtonText="Close"
        />

        {organization && (
          <div className="coordinate-details">
            <h3>Organization Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">ID:</span>
                <span className="detail-value">{organization.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{organization.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Creation data:</span>
                <span className="detail-value">
                  {organization.creationDate}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Annual Turnover:</span>
                <span className="detail-value">
                  {organization.annualTurnover}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Employees Count:</span>
                <span className="detail-value">
                  {organization.employeesCount}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Full Name:</span>
                <span className="detail-value">{organization.fullName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{organization.type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Rating:</span>
                <span className="detail-value">{organization.rating}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Coordinate ID:</span>
                <span className="detail-value">
                  {organization.coordinatesResponse?.id || 'N/A'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Official Address ID:</span>
                <span className="detail-value">
                  {organization.officialAddressResponse?.id || 'N/A'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Postal Address ID:</span>
                <span className="detail-value">
                  {organization.postalAddressResponse?.id || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetOrganizationByIdForm;
