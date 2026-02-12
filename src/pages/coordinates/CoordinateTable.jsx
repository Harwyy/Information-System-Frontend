import { useState } from 'react';

import DataTable from '../../components/DataTable';
import LowerPaginationControlPanel from '../../components/LowerPaginationControlPanel';
import UpperControlPanel from '../../components/UpperControlPanel';

const CoordinateTable = ({
  coordinates,
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
    { key: 'x', label: 'X' },
    { key: 'y', label: 'Y' },
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
        currentCount={coordinates.length}
        totalCount={pagination.totalElements}
        sortFields={['id', 'x', 'y']}
      />

      <DataTable
        data={coordinates}
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

export default CoordinateTable;
