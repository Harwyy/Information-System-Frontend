import { useState, useCallback } from 'react';

import addressAPI from '../../services/addressAPI';

export const useAddressOperations = (onSuccess, onError) => {
  const [getByIdLoading, setGetByIdLoading] = useState(false);
  const [foundAddress, setFoundAddress] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleGetById = useCallback(
    async id => {
      try {
        setGetByIdLoading(true);
        setFoundAddress(null);
        const address = await addressAPI.getAddressById(id);
        setFoundAddress(address);
      } catch (error) {
        onError(`Error finding address: ${error}`);
        setFoundAddress(null);
      } finally {
        setGetByIdLoading(false);
      }
    },
    [onError]
  );

  const handleAddAddress = useCallback(
    async newAddress => {
      try {
        await addressAPI.createAddress(newAddress);
        onSuccess('Address created successfully!');
        return true;
      } catch (error) {
        onError(`Error creating address: ${error.message}`);
        return false;
      }
    },
    [onSuccess, onError]
  );

  const handleUpdateAddress = useCallback(
    async updatedAddress => {
      try {
        await addressAPI.updateAddress(updatedAddress.id, updatedAddress);
        onSuccess('Address updated successfully!');
        return true;
      } catch (error) {
        onError(`Error updating address: ${error.message}`);
        return false;
      }
    },
    [onSuccess, onError]
  );

  const handleDeleteAddress = useCallback(
    async (id, deleteRequest = {}) => {
      try {
        setDeleteLoading(true);
        await addressAPI.deleteAddress(id, deleteRequest);
        onSuccess('Address deleted successfully!');
        return true;
      } catch (error) {
        onError(`Error deleting address: ${error.message}`);
        return false;
      } finally {
        setDeleteLoading(false);
      }
    },
    [onSuccess, onError]
  );

  const clearFoundAddress = useCallback(() => {
    setFoundAddress(null);
  }, []);

  return {
    getByIdLoading,
    foundAddress,
    deleteLoading,
    handleGetById,
    handleAddAddress,
    handleUpdateAddress,
    handleDeleteAddress,
    clearFoundAddress,
  };
};
