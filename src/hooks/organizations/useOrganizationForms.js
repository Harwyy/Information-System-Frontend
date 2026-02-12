import { useState, useCallback } from 'react';

export const useOrganizationForms = () => {
  const [showForm, setShowForm] = useState(false);
  const [showGetByIdForm, setShowGetByIdForm] = useState(false);
  const [editingOrganization, setEditingOrganization] = useState(null);

  const openCreateForm = useCallback(() => {
    setEditingOrganization(null);
    setShowForm(true);
  }, []);

  const openEditForm = useCallback(address => {
    setEditingOrganization(address);
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
    setEditingOrganization(null);
  }, []);

  const openGetByIdForm = useCallback(() => {
    setShowGetByIdForm(true);
  }, []);

  const closeGetByIdForm = useCallback(() => {
    setShowGetByIdForm(false);
  }, []);

  return {
    showForm,
    showGetByIdForm,
    editingOrganization,
    openCreateForm,
    openEditForm,
    closeForm,
    openGetByIdForm,
    closeGetByIdForm,
  };
};
