import { useState } from 'react';

import DataTable from '../../components/DataTable';
import LowerPaginationControlPanel from '../../components/LowerPaginationControlPanel';
import UpperControlPanel from '../../components/UpperControlPanel';

const AddressTable = ({
  addresses,
  onEdit,
  onDelete,
  loading,
  pagination,
  onPageChange,
  onSortChange,
  onSizeChange,
}) => {
  const [localSort, setLocalSort] = useState({
    sortBy: pagination.sortBy,
    direction: pagination.direction,
  });

  const savedAddresses = addresses || [];

  const handleSortChange = field => {
    let newDirection = 'ASC';

    if (localSort.sortBy === field) {
      newDirection = localSort.direction === 'ASC' ? 'DESC' : 'ASC';
    }

    const newSort = {
      sortBy: field,
      direction: newDirection,
    };

    setLocalSort(newSort);
    onSortChange(newSort);
  };

  const handleSizeChange = newSize => {
    onSizeChange(parseInt(newSize));
  };

  const getSortIcon = field => {
    if (localSort.sortBy !== field) return '↑↓';
    return localSort.direction === 'ASC' ? '↑' : '↓';
  };

  const tableFields = [
    { key: 'id', label: 'ID' },
    { key: 'zipCode', label: 'Zip Code' },
    { key: 'locationDTO.id', label: 'Location ID', sortKey: 'town_id' },
  ];

  return (
    <div className="table-container">
      <UpperControlPanel
        pagination={pagination}
        loading={loading}
        onSizeChange={handleSizeChange}
        onSortChange={handleSortChange}
        localSort={localSort}
        getSortIcon={getSortIcon}
        currentCount={savedAddresses.length}
        totalCount={pagination.totalElements}
        sortFields={['id']}
      />

      <DataTable
        data={savedAddresses}
        loading={loading}
        fields={tableFields}
        actions={true}
        onEdit={onEdit}
        onDelete={onDelete}
        onSortChange={handleSortChange}
        localSort={localSort}
        getSortIcon={getSortIcon}
      />

      <LowerPaginationControlPanel
        pagination={pagination}
        onPageChange={onPageChange}
        loading={loading}
      />
    </div>
  );
};

export default AddressTable;
