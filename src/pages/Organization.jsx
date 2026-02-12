import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SampleHeader from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';
import NotificationsContainer from '../components/NotificationsContainer';
import SearchPanel from '../components/SearchPanel';
import { useOrganizationForms } from '../hooks/organizations/useOrganizationForms';
import { useOrganizationOperations } from '../hooks/organizations/useOrganizationOperations';
import { useOrganizationsData } from '../hooks/organizations/useOrganizationsData';
import { useOrganizationWebSocket } from '../hooks/organizations/useOrganizationWebSocket';
import { useNotifications } from '../hooks/useNotifications';

import GetOrganizationByIdForm from './organizations/GetOrganizationByIdForm';
import OrganizationForm from './organizations/OrganizationForm';
import OrganizationTable from './organizations/OrganizationTable';

const Organization = () => {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState('');
  const [searchFullName, setSearchFullName] = useState('');

  const { notifications, addNotification, removeNotification } =
    useNotifications();

  const {
    organizations,
    loading,
    pagination,
    loadOrganization,
    getCurrentPagination,
    handlePageChange,
    handleSortChange,
    handleSizeChange,
  } = useOrganizationsData(addNotification);

  const {
    showForm,
    showGetByIdForm,
    editingOrganization,
    openCreateForm,
    openEditForm,
    closeForm,
    openGetByIdForm,
    closeGetByIdForm,
  } = useOrganizationForms();

  const {
    getByIdLoading,
    foundOrganization,
    deleteLoading,
    handleGetById,
    handleAddOrganization,
    handleUpdateOrganization,
    handleDeleteOrganization,
    clearFoundOrganization,
  } = useOrganizationOperations(
    message => addNotification(message, 'success'),
    message => addNotification(message, 'error')
  );

  useOrganizationWebSocket(loadOrganization, getCurrentPagination);

  useEffect(() => {
    loadOrganization();
  }, []);

  const handleSubmitOrganization = async organizationData => {
    const isEdit = !!editingOrganization;
    const success = isEdit
      ? await handleUpdateOrganization(organizationData)
      : await handleAddOrganization(organizationData);

    if (success) {
      closeForm();
      loadOrganization();
    }
  };

  const handleEdit = org => {
    openEditForm(org);
  };

  const handleDelete = async org => {
    await handleDeleteOrganization(org);
  };

  const handleGetByIdCancel = () => {
    closeGetByIdForm();
    clearFoundOrganization();
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleSearchName = () => {
    loadOrganization(
      0,
      pagination.size,
      pagination.sortBy,
      pagination.direction,
      searchName,
      searchFullName
    );
  };

  const handleSearchFullName = () => {
    loadOrganization(
      0,
      pagination.size,
      pagination.sortBy,
      pagination.direction,
      searchName,
      searchFullName
    );
  };

  const handleClearName = () => {
    setSearchName('');
    loadOrganization(
      0,
      pagination.size,
      pagination.sortBy,
      pagination.direction
    );
  };

  const handleClearFullName = () => {
    setSearchFullName('');
    loadOrganization(
      0,
      pagination.size,
      pagination.sortBy,
      pagination.direction
    );
  };

  return (
    <div className="page-container">
      <LoadingIndicator
        loading={loading || deleteLoading}
        getByIdLoading={getByIdLoading}
        loadingText="Loading organization..."
        searchingText="Searching for organization..."
        deletingText="Deleting organization..."
      />

      <NotificationsContainer
        notifications={notifications}
        onRemoveNotification={removeNotification}
        position="top-right"
        autoClose={true}
        autoCloseDelay={5000}
        maxNotifications={3}
      />

      <SampleHeader
        title="Organizations management"
        backText="Back"
        getByIdText="Get by ID"
        createText="Add organization"
        onBack={handleBack}
        onGetById={openGetByIdForm}
        onCreate={openCreateForm}
        loading={loading}
      />

      <SearchPanel
        searchTerm={searchName}
        onSearchChange={e => setSearchName(e.target.value)}
        onSearch={handleSearchName}
        onClear={handleClearName}
        placeholder="Search by name..."
        loading={loading}
      />

      <SearchPanel
        searchTerm={searchFullName}
        onSearchChange={e => setSearchFullName(e.target.value)}
        onSearch={handleSearchFullName}
        onClear={handleClearFullName}
        placeholder="Search by full name..."
        loading={loading}
      />

      {showForm && (
        <OrganizationForm
          organization={editingOrganization}
          onSubmit={handleSubmitOrganization}
          onCancel={closeForm}
          loading={loading}
        />
      )}

      {showGetByIdForm && (
        <GetOrganizationByIdForm
          onGet={handleGetById}
          onCancel={handleGetByIdCancel}
          loading={getByIdLoading}
          organization={foundOrganization}
        />
      )}

      <OrganizationTable
        organizations={organizations}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
        onSizeChange={handleSizeChange}
      />
    </div>
  );
};

export default Organization;
