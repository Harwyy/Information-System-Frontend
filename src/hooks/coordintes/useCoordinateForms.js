import { useState, useCallback } from 'react';

export const useCoordinateForms = () => {
  const [showForm, setShowForm] = useState(false);
  const [showGetByIdForm, setShowGetByIdForm] = useState(false);
  const [editingCoordinate, setEditingCoordinate] = useState(null);

  const openCreateForm = useCallback(() => {
    setEditingCoordinate(null);
    setShowForm(true);
  }, []);

  const openEditForm = useCallback(coordinate => {
    setEditingCoordinate(coordinate);
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
    setEditingCoordinate(null);
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
    editingCoordinate,
    openCreateForm,
    openEditForm,
    closeForm,
    openGetByIdForm,
    closeGetByIdForm,
  };
};
