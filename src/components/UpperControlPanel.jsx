const UpperControlPanel = ({
  pagination,
  loading,
  onSizeChange,
  onSortChange,
  localSort,
  getSortIcon,
  currentCount,
  totalCount,
  sortFields = [],
}) => {
  const handleSizeChange = e => {
    onSizeChange(parseInt(e.target.value));
  };

  return (
    <div className="controls-panel">
      <div className="control-group">
        <label>Page Size:</label>
        <select
          value={pagination.size}
          onChange={handleSizeChange}
          disabled={loading}
          className="control-select"
        >
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      <div className="control-group">
        <label>Sort By:</label>
        <div className="sort-buttons">
          {sortFields.map(field => (
            <button
              key={field}
              className={`sort-btn ${localSort.sortBy === field ? 'active' : ''}`}
              onClick={() => onSortChange(field)}
              disabled={loading}
            >
              {field.toUpperCase()} {getSortIcon(field)}
            </button>
          ))}
        </div>
      </div>

      <div className="pagination-info">
        Showing {currentCount} of {totalCount || 0} records
      </div>
    </div>
  );
};

export default UpperControlPanel;
