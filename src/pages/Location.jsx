import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SampleHeader from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';
import NotificationsContainer from '../components/NotificationsContainer';
import SearchPanel from '../components/SearchPanel';
import { useLocationForms } from '../hooks/locations/useLocationForms';
import { useLocationOperations } from '../hooks/locations/useLocationOperations';
import { useLocationsData } from '../hooks/locations/useLocationsData';
import { useLocationsWebSocket } from '../hooks/locations/useLocationWebSocket';
import { useNotifications } from '../hooks/useNotifications';

import GetLocationByIdForm from './locations/GetLocationByIdForm';
import LocationForm from './locations/LocationForm';
import LocationTable from './locations/LocationTable';

const Location = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { notifications, addNotification, removeNotification } =
    useNotifications();

  const {
    locations,
    loading,
    pagination,
    loadLocations,
    getCurrentPagination,
    handlePageChange,
    handleSortChange,
    handleSizeChange,
  } = useLocationsData(addNotification);

  const {
    showForm,
    showGetByIdForm,
    editingLocation,
    openCreateForm,
    openEditForm,
    closeForm,
    openGetByIdForm,
    closeGetByIdForm,
  } = useLocationForms();

  const {
    getByIdLoading,
    foundLocation,
    handleGetById,
    handleAddLocation,
    handleUpdateLocation,
    handleDeleteLocation,
    clearFoundLocation,
  } = useLocationOperations(
    message => addNotification(message, 'success'),
    message => addNotification(message, 'error')
  );

  useLocationsWebSocket(loadLocations, getCurrentPagination);

  useEffect(() => {
    loadLocations();
  }, []);

  const handleSubmitLocation = async locationData => {
    const isEdit = !!editingLocation;
    const success = isEdit
      ? await handleUpdateLocation(locationData)
      : await handleAddLocation(locationData);

    if (success) {
      closeForm();
    }
  };

  const handleEdit = location => {
    openEditForm(location);
  };

  const handleDelete = async id => {
    await handleDeleteLocation(id);
  };

  const handleGetByIdCancel = () => {
    closeGetByIdForm();
    clearFoundLocation();
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleSearch = () => {
    loadLocations(
      0,
      pagination.size,
      pagination.sortBy,
      pagination.direction,
      searchTerm
    );
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    loadLocations(0, pagination.size, pagination.sortBy, pagination.direction);
  };

  return (
    <div className="page-container">
      <LoadingIndicator
        loading={loading}
        getByIdLoading={getByIdLoading}
        loadingText="Loading locations..."
        searchingText="Searching for location..."
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
        title="Locations management"
        backText="Back"
        getByIdText="Get by ID"
        createText="Add location"
        onBack={handleBack}
        onGetById={openGetByIdForm}
        onCreate={openCreateForm}
        loading={loading}
      />

      <SearchPanel
        searchTerm={searchTerm}
        onSearchChange={e => setSearchTerm(e.target.value)}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        placeholder="Search by name..."
        loading={loading}
      />

      {showForm && (
        <LocationForm
          location={editingLocation}
          onSubmit={handleSubmitLocation}
          onCancel={closeForm}
          loading={loading}
        />
      )}

      {showGetByIdForm && (
        <GetLocationByIdForm
          onGet={handleGetById}
          onCancel={handleGetByIdCancel}
          loading={getByIdLoading}
          location={foundLocation}
        />
      )}

      <LocationTable
        locations={locations}
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

export default Location;
