import { useState, useCallback } from 'react';

import organizationAPI from '../../services/organizationAPI';

export const useOrganizationOperations = (onSuccess, onError) => {
  const [getByIdLoading, setGetByIdLoading] = useState(false);
  const [foundOrganization, setFoundOrganization] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleGetById = useCallback(
    async id => {
      try {
        setGetByIdLoading(true);
        setFoundOrganization(null);
        const organization = await organizationAPI.getOrganizationById(id);
        setFoundOrganization(organization);
      } catch (error) {
        onError(`Error finding organization: ${error}`);
        setFoundOrganization(null);
      } finally {
        setGetByIdLoading(false);
      }
    },
    [onError]
  );

  const handleAddOrganization = useCallback(
    async newOrganization => {
      try {
        await organizationAPI.createOrganization(newOrganization);
        onSuccess('Organization created successfully!');
        return true;
      } catch (error) {
        onError(`Error creating organization: ${error.message}`);
        return false;
      }
    },
    [onSuccess, onError]
  );

  const handleUpdateOrganization = useCallback(
    async updateOrganization => {
      try {
        await organizationAPI.updateOrganization(
          updateOrganization.id,
          updateOrganization
        );
        onSuccess('Organization updated successfully!');
        return true;
      } catch (error) {
        onError(`Error updating organization: ${error.message}`);
        return false;
      }
    },
    [onSuccess, onError]
  );

  const handleDeleteOrganization = useCallback(
    async id => {
      try {
        setDeleteLoading(true);
        await organizationAPI.deleteOrganization(id);
        onSuccess('Organization deleted successfully!');
        return true;
      } catch (error) {
        onError(`Error deleting organization: ${error.message}`);
        return false;
      } finally {
        setDeleteLoading(false);
      }
    },
    [onSuccess, onError]
  );

  const clearFoundOrganization = useCallback(() => {
    setFoundOrganization(null);
  }, []);

  return {
    getByIdLoading,
    foundOrganization,
    deleteLoading,
    handleGetById,
    handleAddOrganization,
    handleUpdateOrganization,
    handleDeleteOrganization,
    clearFoundOrganization,
  };
};
