import { useState, useEffect } from 'react';

import FormActions from '../../components/FormActions';
import FormInput from '../../components/FormInput';
import { useOrganizationForm } from '../../hooks/organizations/useOrganizationForm';
import addressAPI from '../../services/addressAPI';
import coordinatesAPI from '../../services/coordinateAPI';

const OrganizationForm = ({
  organization,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [coordinates, setCoordinates] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const organizationTypes = ['GOVERNMENT', 'TRUST', 'PRIVATE_LIMITED_COMPANY'];

  const { formData, errors, handleInputChange, handleSubmit } =
    useOrganizationForm(organization, onSubmit);

  useEffect(() => {
    const loadData = async () => {
      setLoadingData(true);
      try {
        // Загружаем координаты
        const coordsResponse = await coordinatesAPI.getAllCoordinates();
        const coordsArray = Array.isArray(coordsResponse)
          ? coordsResponse
          : coordsResponse?.content || coordsResponse?.data || [];
        setCoordinates(coordsArray);

        // Загружаем адреса
        const addressesResponse = await addressAPI.getAllAddresses();
        const addressesArray = Array.isArray(addressesResponse)
          ? addressesResponse
          : addressesResponse?.content || addressesResponse?.data || [];
        setAddresses(addressesArray);
      } catch (error) {
        console.error('Error loading data:', error);
        setCoordinates([]);
        setAddresses([]);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  const isEdit = !!organization;
  const formTitle = isEdit ? 'Update Organization' : 'Create New Organization';

  return (
    <div className="modal-overlay">
      <div className="modal-content organization-form-modal">
        <h2>{formTitle}</h2>

        {errors.form && <div className="form-error">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="organization-form">
          <FormInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            placeholder="Enter organization name"
          />

          <FormInput
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
            placeholder="Enter full organization name"
          />

          <div className="form-group">
            <label>Coordinates *</label>
            <select
              name="coordinatesId"
              value={formData.coordinatesId || ''}
              onChange={handleInputChange}
              disabled={loading || loadingData}
              className={`form-control ${errors.coordinatesId ? 'error' : ''}`}
            >
              <option value="">Select coordinates</option>
              {coordinates.map(coord => (
                <option key={coord.id} value={coord.id}>
                  {`Coordinates ID: ${coord.id} (x: ${coord.x}, y: ${coord.y})`}
                </option>
              ))}
            </select>
            {errors.coordinatesId && (
              <div className="error-message">{errors.coordinatesId}</div>
            )}
          </div>

          <div className="form-group">
            <label>Official Address *</label>
            <select
              name="officialAddressId"
              value={formData.officialAddressId || ''}
              onChange={handleInputChange}
              disabled={loading || loadingData}
              className={`form-control ${errors.officialAddressId ? 'error' : ''}`}
            >
              <option value="">Select official address</option>
              {addresses.map(address => (
                <option key={address.id} value={address.id}>
                  {`Address ID: ${address.id} (Zip: ${address.zipCode})`}
                </option>
              ))}
            </select>
            {errors.officialAddressId && (
              <div className="error-message">{errors.officialAddressId}</div>
            )}
          </div>

          <div className="form-group">
            <label>Postal Address *</label>
            <select
              name="postalAddressId"
              value={formData.postalAddressId || ''}
              onChange={handleInputChange}
              disabled={loading || loadingData}
              className={`form-control ${errors.postalAddressId ? 'error' : ''}`}
            >
              <option value="">Select postal address</option>
              {addresses.map(address => (
                <option key={address.id} value={address.id}>
                  {`Address ID: ${address.id} (Zip: ${address.zipCode})`}
                </option>
              ))}
            </select>
            {errors.postalAddressId && (
              <div className="error-message">{errors.postalAddressId}</div>
            )}
          </div>

          <div className="form-group">
            <label>Organization Type *</label>
            <select
              name="type"
              value={formData.type || ''}
              onChange={handleInputChange}
              disabled={loading}
              className={`form-control ${errors.type ? 'error' : ''}`}
            >
              <option value="">Select organization type</option>
              {organizationTypes.map(type => (
                <option key={type} value={type}>
                  {type
                    .replace(/_/g, ' ')
                    .toLowerCase()
                    .replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
            {errors.type && <div className="error-message">{errors.type}</div>}
          </div>

          <FormInput
            label="Annual Turnover"
            name="annualTurnover"
            type="number"
            step="0.01"
            min="0.01"
            value={formData.annualTurnover}
            onChange={handleInputChange}
            error={errors.annualTurnover}
            placeholder="Enter annual turnover (greater than 0)"
          />

          <FormInput
            label="Employees Count"
            name="employeesCount"
            type="number"
            min="1"
            value={formData.employeesCount}
            onChange={handleInputChange}
            error={errors.employeesCount}
            placeholder="Enter number of employees (optional)"
          />

          <FormInput
            label="Rating"
            name="rating"
            type="number"
            step="0.1"
            min="0.1"
            value={formData.rating}
            onChange={handleInputChange}
            error={errors.rating}
            placeholder="Enter rating (optional, greater than 0)"
          />

          <FormActions
            isEdit={isEdit}
            onCancel={onCancel}
            loading={loading || loadingData}
          />
        </form>
      </div>
    </div>
  );
};

export default OrganizationForm;
