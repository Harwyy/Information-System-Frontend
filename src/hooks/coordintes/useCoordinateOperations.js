import { useState, useCallback } from 'react';

import coordinateAPI from '../../services/coordinateAPI';

export const useCoordinateOperations = (onSuccess, onError) => {
  const [getByIdLoading, setGetByIdLoading] = useState(false);
  const [foundCoordinate, setFoundCoordinate] = useState(null);

  const handleGetById = useCallback(
    async id => {
      try {
        setGetByIdLoading(true);
        setFoundCoordinate(null);
        const coordinate = await coordinateAPI.getCoordinateById(id);
        setFoundCoordinate(coordinate);
      } catch (error) {
        onError(`Error finding coordinate: ${error}`);
        setFoundCoordinate(null);
      } finally {
        setGetByIdLoading(false);
      }
    },
    [onError]
  );

  const handleAddCoordinate = useCallback(
    async newCoordinate => {
      try {
        await coordinateAPI.createCoordinate(newCoordinate);
        onSuccess('Coordinate created successfully!');
        return true;
      } catch (error) {
        onError(`Error creating coordinate: ${error.message}`);
        return false;
      }
    },
    [onSuccess, onError]
  );

  const handleUpdateCoordinate = useCallback(
    async updatedCoordinate => {
      try {
        await coordinateAPI.updateCoordinate(
          updatedCoordinate.id,
          updatedCoordinate
        );
        onSuccess('Coordinate updated successfully!');
        return true;
      } catch (error) {
        onError(`Error updating coordinate: ${error.message}`);
        return false;
      }
    },
    [onSuccess, onError]
  );

  const handleDeleteCoordinate = useCallback(
    async id => {
      try {
        await coordinateAPI.deleteCoordinate(id);
        onSuccess('Coordinate deleted successfully!');
        return true;
      } catch (error) {
        onError(`Error deleting coordinate: ${error.message}`);
        return false;
      }
    },
    [onSuccess, onError]
  );

  const clearFoundCoordinate = useCallback(() => {
    setFoundCoordinate(null);
  }, []);

  return {
    getByIdLoading,
    foundCoordinate,
    handleGetById,
    handleAddCoordinate,
    handleUpdateCoordinate,
    handleDeleteCoordinate,
    clearFoundCoordinate,
  };
};
