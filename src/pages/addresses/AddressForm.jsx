import { useState, useEffect } from 'react';

import FormActions from '../../components/FormActions';
import FormInput from '../../components/FormInput';
import { useAddressForm } from '../../hooks/addresses/useAddressForm';
import locationAPI from '../../services/locationAPI';

const AddressForm = ({ address, onSubmit, onCancel, loading = false }) => {
  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  const { formData, errors, handleInputChange, handleSubmit } = useAddressForm(
    address,
    onSubmit
  );

  const isEdit = !!address;
  const formTitle = isEdit ? 'Update address' : 'Create new address';

  useEffect(() => {
    const loadLocations = async () => {
      setLoadingLocations(true);
      try {
        const response = await locationAPI.getAllLocations();
        let locationsArray = [];
        if (Array.isArray(response)) {
          locationsArray = response;
        } else if (response && Array.isArray(response.content)) {
          locationsArray = response.content;
        } else if (response && Array.isArray(response.data)) {
          locationsArray = response.data;
        }

        setLocations(locationsArray || []);
      } catch (error) {
        setLocations([]);
      } finally {
        setLoadingLocations(false);
      }
    };

    loadLocations();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{formTitle}</h2>

        {errors.form && <div className="form-error">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="address-form">
          <FormInput
            label="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            error={errors.zipCode}
            placeholder="Enter zip code (e.g., 12345)"
          />

          <div className="form-group">
            <label>Location</label>
            <select
              name="locationId"
              value={formData.locationId || ''}
              onChange={handleInputChange}
              disabled={loading || loadingLocations}
              className={`form-control ${errors.locationId ? 'error' : ''}`}
            >
              <option value="">Select a location</option>
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {`Location ID: ${location.id}`}
                </option>
              ))}
            </select>
            {errors.locationId && (
              <div className="error-message">{errors.locationId}</div>
            )}
            {loadingLocations && (
              <small className="form-text">Loading locations...</small>
            )}
          </div>

          <FormActions
            isEdit={isEdit}
            onCancel={onCancel}
            loading={loading || loadingLocations}
          />
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
