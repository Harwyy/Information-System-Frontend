import { useState, useCallback, useRef, useEffect } from 'react';

import coordinateAPI from '../../services/coordinateAPI';

export const useCoordinatesData = addNotification => {
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    sortBy: 'id',
    direction: 'ASC',
  });

  const currentPaginationRef = useRef(pagination);

  useEffect(() => {
    currentPaginationRef.current = pagination;
  }, [pagination]);

  const loadCoordinates = useCallback(
    async (
      page = pagination.page,
      size = pagination.size,
      sortBy = pagination.sortBy,
      direction = pagination.direction
    ) => {
      try {
        setLoading(true);

        const pageRequest = {
          page: page,
          size: size,
          sortBy: sortBy,
          direction: direction,
        };

        const response = await coordinateAPI.getAllCoordinates(pageRequest);

        const coordinatesData = response.content;
        const paginationData = {
          page: response.number || response.currentPage || page,
          size: response.size || size,
          totalPages: response.totalPages || 1,
          totalElements: response.totalElements || coordinatesData.length,
          sortBy: sortBy,
          direction: direction,
        };

        setCoordinates(coordinatesData);
        setPagination(paginationData);
      } catch (err) {
        addNotification(`Error loading coordinates: ${err.message}`);
        console.error('Failed to load coordinates:', err);
      } finally {
        setLoading(false);
      }
    },
    [pagination, addNotification]
  );

  const getCurrentPagination = useCallback(() => {
    return currentPaginationRef.current;
  }, []);

  const handlePageChange = useCallback(
    newPage => {
      loadCoordinates(
        newPage,
        pagination.size,
        pagination.sortBy,
        pagination.direction
      );
    },
    [loadCoordinates, pagination]
  );

  const handleSortChange = useCallback(
    newSort => {
      loadCoordinates(0, pagination.size, newSort.sortBy, newSort.direction);
    },
    [loadCoordinates, pagination]
  );

  const handleSizeChange = useCallback(
    newSize => {
      loadCoordinates(0, newSize, pagination.sortBy, pagination.direction);
    },
    [loadCoordinates, pagination]
  );

  return {
    coordinates,
    loading,
    pagination,
    loadCoordinates,
    getCurrentPagination,
    handlePageChange,
    handleSortChange,
    handleSizeChange,
  };
};
