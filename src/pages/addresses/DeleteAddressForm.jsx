import { useState, useEffect } from 'react';

import addressAPI from '../../services/addressAPI';

const DeleteAddressForm = ({ address, onSubmit, onCancel, loading }) => {
  const [forceDelete, setForceDelete] = useState(false);
  const [redirectToAddressId, setRedirectToAddressId] = useState('');
  const [availableAddresses, setAvailableAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  useEffect(() => {
    if (!forceDelete) {
      loadAvailableAddresses();
    }
  }, [forceDelete]);

  const loadAvailableAddresses = async () => {
    setLoadingAddresses(true);
    try {
      const response = await addressAPI.getAddressesWithoutLocation();

      let addressesArray = [];

      if (Array.isArray(response)) {
        addressesArray = response;
      } else if (response && Array.isArray(response.content)) {
        addressesArray = response.content;
      } else if (response && Array.isArray(response.data)) {
        addressesArray = response.data;
      } else if (response && typeof response === 'object') {
        addressesArray = Object.values(response);
      }

      addressesArray = addressesArray.filter(
        addr => addr && typeof addr === 'object' && addr.id !== undefined
      );

      setAvailableAddresses(addressesArray);
    } catch (error) {
      console.error('Error loading available addresses:', error);
      setAvailableAddresses([]);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const deleteData = {
      forceDelete: forceDelete,
      redirectToAddressId: forceDelete ? null : redirectToAddressId || null,
    };

    onSubmit(address.id, deleteData);
  };

  const handleForceDeleteChange = e => {
    const isChecked = e.target.checked;
    setForceDelete(isChecked);
    if (isChecked) {
      setRedirectToAddressId('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Delete Address</h2>

        <form onSubmit={handleSubmit} className="delete-address-form">
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={forceDelete}
                onChange={handleForceDeleteChange}
                disabled={loading}
              />
              <span className="checkmark"></span>
              Force delete (without redirect)
            </label>
            <small className="form-text">
              If checked, the address will be deleted without redirecting to
              another location
            </small>
          </div>

          {!forceDelete && (
            <div className="form-group">
              <label>Redirect to Address:</label>
              <select
                value={redirectToAddressId}
                onChange={e => setRedirectToAddressId(e.target.value)}
                disabled={loading || loadingAddresses}
                className="form-control"
                required={!forceDelete}
              >
                <option value="">Select an address</option>
                {loadingAddresses ? (
                  <option value="" disabled>
                    Loading addresses...
                  </option>
                ) : (
                  availableAddresses.map(addr => (
                    <option key={addr.id} value={addr.id}>
                      {addr.zipCode || 'No zip code'} (ID: {addr.id})
                    </option>
                  ))
                )}
              </select>
              {loadingAddresses && (
                <small className="form-text">
                  Loading available addresses...
                </small>
              )}
              <small className="form-text">
                Select an address without location for redirection
              </small>
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="delete-confirm-btn"
              disabled={loading || (!forceDelete && !redirectToAddressId)}
            >
              {loading ? 'Deleting...' : 'Delete Address'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAddressForm;
