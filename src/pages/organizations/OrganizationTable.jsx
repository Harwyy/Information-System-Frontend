import { useState } from 'react';

import DataTable from '../../components/DataTable';
import LowerPaginationControlPanel from '../../components/LowerPaginationControlPanel';
import UpperControlPanel from '../../components/UpperControlPanel';

const OrganizationTable = ({
  organizations,
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
    { key: 'name', label: 'Name' },
    {
      key: 'coordinatesResponse.id',
      label: 'Coordinate ID',
      sortKey: 'coordinates_id',
    },
    { key: 'creationDate', label: 'Creation Date' },
    {
      key: 'officialAddressResponse.id',
      label: 'Official Address ID',
      sortKey: 'officialAddress_id',
    },
    { key: 'annualTurnover', label: 'Annual Turnover' },
    { key: 'employeesCount', label: 'Employees Count' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'type', label: 'Type' },
    { key: 'rating', label: 'Rating' },
    {
      key: 'postalAddressResponse.id',
      label: 'Postal Address ID',
      sortKey: 'postalAddress_id',
    },
  ];

  return (
    <div className="organization-table-container">
      <div className="table-container">
        <UpperControlPanel
          pagination={pagination}
          loading={loading}
          onSizeChange={handleSizeChange}
          onSortChange={handleSortChange}
          localSort={localSort}
          getSortIcon={getSortIcon}
          currentCount={organizations.length}
          totalCount={pagination.totalElements}
          sortFields={['id']}
        />

        <DataTable
          data={organizations}
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
    </div>
  );
};

export default OrganizationTable;
