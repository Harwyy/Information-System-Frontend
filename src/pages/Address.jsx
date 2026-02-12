import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SampleHeader from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';
import NotificationsContainer from '../components/NotificationsContainer';
import SearchPanel from '../components/SearchPanel';
import { useAddressesData } from '../hooks/addresses/useAddressesData';
import { useAddressesWebSocket } from '../hooks/addresses/useAddressesWebSocket';
import { useAddressForms } from '../hooks/addresses/useAddressForms';
import { useAddressOperations } from '../hooks/addresses/useAddressOperations';
import { useNotifications } from '../hooks/useNotifications';

import AddressForm from './addresses/AddressForm';
import AddressTable from './addresses/AddressTable';
import DeleteAddressForm from './addresses/DeleteAddressForm';
import GetAddressByIdForm from './addresses/GetAddressByIdForm';

const Address = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deletingAddress, setDeletingAddress] = useState(null);

  const { notifications, addNotification, removeNotification } =
    useNotifications();

  const {
    addresses,
    loading,
    pagination,
    loadAddresses,
    getCurrentPagination,
    handlePageChange,
    handleSortChange,
    handleSizeChange,
  } = useAddressesData(addNotification);

  const {
    showForm,
    showGetByIdForm,
    editingAddress,
    openCreateForm,
    openEditForm,
    closeForm,
    openGetByIdForm,
    closeGetByIdForm,
  } = useAddressForms();

  const {
    getByIdLoading,
    foundAddress,
    deleteLoading,
    handleGetById,
    handleAddAddress,
    handleUpdateAddress,
    handleDeleteAddress,
    clearFoundAddress,
  } = useAddressOperations(
    message => addNotification(message, 'success'),
    message => addNotification(message, 'error')
  );

  useAddressesWebSocket(loadAddresses, getCurrentPagination);

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleSubmitAddress = async addressData => {
    const isEdit = !!editingAddress;
    const success = isEdit
      ? await handleUpdateAddress(addressData)
      : await handleAddAddress(addressData);

    if (success) {
      closeForm();
      loadAddresses();
    }
  };

  const handleEdit = address => {
    openEditForm(address);
  };

  const handleDelete = async address => {
    setDeletingAddress(address);
    setShowDeleteForm(true);
  };

  const handleDeleteConfirm = async (id, deleteRequest) => {
    const success = await handleDeleteAddress(deletingAddress, deleteRequest);
    if (success) {
      setShowDeleteForm(false);
      setDeletingAddress(null);
      loadAddresses();
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteForm(false);
    setDeletingAddress(null);
  };

  const handleGetByIdCancel = () => {
    closeGetByIdForm();
    clearFoundAddress();
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleSearch = () => {
    loadAddresses(
      0,
      pagination.size,
      pagination.sortBy,
      pagination.direction,
      searchTerm
    );
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    loadAddresses(0, pagination.size, pagination.sortBy, pagination.direction);
  };

  return (
    <div className="page-container">
      <LoadingIndicator
        loading={loading || deleteLoading}
        getByIdLoading={getByIdLoading}
        loadingText="Loading addresses..."
        searchingText="Searching for address..."
        deletingText="Deleting address..."
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
        title="Addresses management"
        backText="Back"
        getByIdText="Get by ID"
        createText="Add address"
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
        placeholder="Search by zip code..."
        loading={loading}
      />

      {showForm && (
        <AddressForm
          address={editingAddress}
          onSubmit={handleSubmitAddress}
          onCancel={closeForm}
          loading={loading}
        />
      )}

      {showGetByIdForm && (
        <GetAddressByIdForm
          onGet={handleGetById}
          onCancel={handleGetByIdCancel}
          loading={getByIdLoading}
          address={foundAddress}
        />
      )}

      {showDeleteForm && deletingAddress && (
        <DeleteAddressForm
          address={deletingAddress}
          onSubmit={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          loading={deleteLoading}
        />
      )}

      <AddressTable
        addresses={addresses}
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

export default Address;
