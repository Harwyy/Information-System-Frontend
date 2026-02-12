import { useCallback, useEffect, useRef, useState } from 'react';

import locationAPI from '../../services/locationAPI';

export const useLocationsData = addNotification => {
  const [locations, setLocations] = useState([]);
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

  const loadLocations = useCallback(
    async (
      page = pagination.page,
      size = pagination.size,
      sortBy = pagination.sortBy,
      direction = pagination.direction,
      nameContains = ''
    ) => {
      try {
        setLoading(true);

        const pageRequest = {
          page: page,
          size: size,
          sortBy: sortBy,
          direction: direction,
          nameContains: nameContains || '',
        };

        const response = await locationAPI.getAllLocations(pageRequest);

        const locationsData = response.content;
        const paginationData = {
          page: response.number || response.currentPage || page,
          size: response.size || size,
          totalPages: response.totalPages || 1,
          totalElements: response.totalElements || locationsData.length,
          sortBy: sortBy,
          direction: direction,
        };

        setLocations(locationsData);
        setPagination(paginationData);
      } catch (err) {
        addNotification(`Error loading locations: ${err.message}`);
        console.error('Failed to load locations:', err);
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
      loadLocations(
        newPage,
        pagination.size,
        pagination.sortBy,
        pagination.direction
      );
    },
    [loadLocations, pagination]
  );

  const handleSortChange = useCallback(
    newSort => {
      loadLocations(0, pagination.size, newSort.sortBy, newSort.direction);
    },
    [loadLocations, pagination]
  );

  const handleSizeChange = useCallback(
    newSize => {
      loadLocations(0, newSize, pagination.sortBy, pagination.direction);
    },
    [loadLocations, pagination]
  );

  return {
    locations,
    loading,
    pagination,
    loadLocations,
    getCurrentPagination,
    handlePageChange,
    handleSortChange,
    handleSizeChange,
  };
};
