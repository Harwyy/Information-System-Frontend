import { useState, useCallback } from 'react';

import locationAPI from '../../services/locationAPI';

export const useLocationOperations = (onSuccess, onError) => {
  const [getByIdLoading, setGetByIdLoading] = useState(false);
  const [foundLocation, setFoundLocation] = useState(null);

  const handleGetById = useCallback(
    async id => {
      try {
        setGetByIdLoading(true);
        setFoundLocation(null);
        const location = await locationAPI.getLocationById(id);
        setFoundLocation(location);
      } catch (error) {
        onError(`Error finding location: ${error}`);
        setFoundLocation(null);
      } finally {
        setGetByIdLoading(false);
      }
    },
    [onError]
  );

  const handleAddLocation = useCallback(
    async newLocation => {
      try {
        await locationAPI.createLocation(newLocation);
        onSuccess('Location created successfully!');
        return true;
      } catch (error) {
        onError(`Error creating location: ${error.message}`);
        return false;
      }
    },
    [onSuccess, onError]
  );

  const handleUpdateLocation = useCallback(
    async updatedLocation => {
      try {
        await locationAPI.updateLocation(updatedLocation.id, updatedLocation);
        onSuccess('Location updated successfully!');
        return true;
      } catch (error) {
        onError(`Error updating location: ${error.message}`);
        return false;
      }
    },
    [onSuccess, onError]
  );

  const handleDeleteLocation = useCallback(
    async id => {
      try {
        await locationAPI.deleteLocation(id);
        onSuccess('Location deleted successfully!');
        return true;
      } catch (error) {
        onError(`Error deleting location: ${error.message}`);
        return false;
      }
    },
    [onSuccess, onError]
  );

  const clearFoundLocation = useCallback(() => {
    setFoundLocation(null);
  }, []);

  return {
    getByIdLoading,
    foundLocation,
    handleGetById,
    handleAddLocation,
    handleUpdateLocation,
    handleDeleteLocation,
    clearFoundLocation,
  };
};
