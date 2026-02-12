import { useCallback, useEffect, useRef, useState } from 'react';

import addressAPI from '../../services/addressAPI';

export const useAddressesData = addNotification => {
  const [addresses, setAddresses] = useState([]);
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

  const loadAddresses = useCallback(
    async (
      page = pagination.page,
      size = pagination.size,
      sortBy = pagination.sortBy,
      direction = pagination.direction,
      zipCode = ''
    ) => {
      try {
        setLoading(true);

        const pageRequest = {
          page: page,
          size: size,
          sortBy: sortBy,
          direction: direction,
          zipCode: zipCode || null,
        };

        const response = await addressAPI.getAllAddresses(pageRequest);
        const addressesData = response.content;
        const paginationData = {
          page: response.number || response.currentPage || page,
          size: response.size || size,
          totalPages: response.totalPages || 1,
          totalElements: response.totalElements || addressesData.length,
          sortBy: sortBy,
          direction: direction,
        };

        setAddresses(addressesData);
        setPagination(paginationData);
      } catch (err) {
        addNotification(`Error loading addresses: ${err.message}`);
        console.error('Failed to load addresses:', err);
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
      loadAddresses(
        newPage,
        pagination.size,
        pagination.sortBy,
        pagination.direction
      );
    },
    [loadAddresses, pagination]
  );

  const handleSortChange = useCallback(
    newSort => {
      loadAddresses(0, pagination.size, newSort.sortBy, newSort.direction);
    },
    [loadAddresses, pagination]
  );

  const handleSizeChange = useCallback(
    newSize => {
      loadAddresses(0, newSize, pagination.sortBy, pagination.direction);
    },
    [loadAddresses, pagination]
  );

  return {
    addresses,
    loading,
    pagination,
    loadAddresses,
    getCurrentPagination,
    handlePageChange,
    handleSortChange,
    handleSizeChange,
  };
};
