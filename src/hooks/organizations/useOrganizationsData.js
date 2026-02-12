import { useCallback, useEffect, useRef, useState } from 'react';

import organizationAPI from '../../services/organizationAPI';

export const useOrganizationsData = addNotification => {
  const [organizations, setOrganizations] = useState([]);
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

  const loadOrganization = useCallback(
    async (
      page = pagination.page,
      size = pagination.size,
      sortBy = pagination.sortBy,
      direction = pagination.direction,
      name = '',
      fullName = ''
    ) => {
      try {
        setLoading(true);

        const pageRequest = {
          page: page,
          size: size,
          sortBy: sortBy,
          direction: direction,
          name: name || null,
          fullName: fullName || null,
        };

        const response = await organizationAPI.getAllOrganizations(pageRequest);
        const organizationData = response.content;
        const paginationData = {
          page: response.number || response.currentPage || page,
          size: response.size || size,
          totalPages: response.totalPages || 1,
          totalElements: response.totalElements || organizationData.length,
          sortBy: sortBy,
          direction: direction,
        };

        setOrganizations(organizationData);
        setPagination(paginationData);
      } catch (err) {
        addNotification(`Error loading organizations: ${err.message}`);
        console.error('Failed to load organizations:', err);
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
      loadOrganization(
        newPage,
        pagination.size,
        pagination.sortBy,
        pagination.direction
      );
    },
    [loadOrganization, pagination]
  );

  const handleSortChange = useCallback(
    newSort => {
      loadOrganization(0, pagination.size, newSort.sortBy, newSort.direction);
    },
    [loadOrganization, pagination]
  );

  const handleSizeChange = useCallback(
    newSize => {
      loadOrganization(0, newSize, pagination.sortBy, pagination.direction);
    },
    [loadOrganization, pagination]
  );

  return {
    organizations,
    loading,
    pagination,
    loadOrganization,
    getCurrentPagination,
    handlePageChange,
    handleSortChange,
    handleSizeChange,
  };
};
