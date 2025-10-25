import { useState, useCallback } from 'react';

export const useAddressForms = () => {
  const [showForm, setShowForm] = useState(false);
  const [showGetByIdForm, setShowGetByIdForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const openCreateForm = useCallback(() => {
    setEditingAddress(null);
    setShowForm(true);
  }, []);

  const openEditForm = useCallback(address => {
    setEditingAddress(address);
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
    setEditingAddress(null);
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
    editingAddress,
    openCreateForm,
    openEditForm,
    closeForm,
    openGetByIdForm,
    closeGetByIdForm,
  };
};
