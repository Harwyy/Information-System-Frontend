import { useState, useCallback } from 'react';

export const useLocationForms = () => {
  const [showForm, setShowForm] = useState(false);
  const [showGetByIdForm, setShowGetByIdForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);

  const openCreateForm = useCallback(() => {
    setEditingLocation(null);
    setShowForm(true);
  }, []);

  const openEditForm = useCallback(location => {
    setEditingLocation(location);
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
    setEditingLocation(null);
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
    editingLocation,
    openCreateForm,
    openEditForm,
    closeForm,
    openGetByIdForm,
    closeGetByIdForm,
  };
};
