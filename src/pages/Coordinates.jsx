import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SampleHeader from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';
import NotificationsContainer from '../components/NotificationsContainer';
import { useCoordinateForms } from '../hooks/coordintes/useCoordinateForms';
import { useCoordinateOperations } from '../hooks/coordintes/useCoordinateOperations';
import { useCoordinatesData } from '../hooks/coordintes/useCoordinatesData';
import { useCoordinatesWebSocket } from '../hooks/coordintes/useCoordinatesWebSocket';
import { useNotifications } from '../hooks/useNotifications';

import CoordinateForm from './coordinates/CoordinateForm';
import CoordinateTable from './coordinates/CoordinateTable';
import GetCoordinateByIdForm from './coordinates/GetCoordinateByIdForm';

const Coordinates = () => {
  const navigate = useNavigate();

  const { notifications, addNotification, removeNotification } =
    useNotifications();

  const {
    coordinates,
    loading,
    pagination,
    loadCoordinates,
    getCurrentPagination,
    handlePageChange,
    handleSortChange,
    handleSizeChange,
  } = useCoordinatesData(addNotification);

  const {
    showForm,
    showGetByIdForm,
    editingCoordinate,
    openCreateForm,
    openEditForm,
    closeForm,
    openGetByIdForm,
    closeGetByIdForm,
  } = useCoordinateForms();

  const {
    getByIdLoading,
    foundCoordinate,
    handleGetById,
    handleAddCoordinate,
    handleUpdateCoordinate,
    handleDeleteCoordinate,
    clearFoundCoordinate,
  } = useCoordinateOperations(
    message => addNotification(message, 'success'),
    message => addNotification(message, 'error')
  );

  useCoordinatesWebSocket(loadCoordinates, getCurrentPagination);

  useEffect(() => {
    loadCoordinates();
  }, []);

  const handleSubmitCoordinate = async coordinateData => {
    const isEdit = !!editingCoordinate;
    const success = isEdit
      ? await handleUpdateCoordinate(coordinateData)
      : await handleAddCoordinate(coordinateData);

    if (success) {
      closeForm();
    }
  };

  const handleEdit = coordinate => {
    openEditForm(coordinate);
  };

  const handleDelete = async id => {
    await handleDeleteCoordinate(id);
  };

  const handleGetByIdCancel = () => {
    closeGetByIdForm();
    clearFoundCoordinate();
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="page-container">
      <LoadingIndicator
        loading={loading}
        getByIdLoading={getByIdLoading}
        loadingText="Loading coordinates..."
        searchingText="Searching for coordinate..."
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
        title="Coordinates management"
        backText="Back"
        getByIdText="Get by ID"
        createText="Add coordinate"
        onBack={handleBack}
        onGetById={openGetByIdForm}
        onCreate={openCreateForm}
        loading={loading}
      />

      {showForm && (
        <CoordinateForm
          coordinate={editingCoordinate}
          onSubmit={handleSubmitCoordinate}
          onCancel={closeForm}
          loading={loading}
        />
      )}

      {showGetByIdForm && (
        <GetCoordinateByIdForm
          onGet={handleGetById}
          onCancel={handleGetByIdCancel}
          loading={getByIdLoading}
          coordinate={foundCoordinate}
        />
      )}

      <CoordinateTable
        coordinates={coordinates}
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

export default Coordinates;
