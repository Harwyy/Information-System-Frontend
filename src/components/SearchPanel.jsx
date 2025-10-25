const SearchPanel = ({
  searchTerm,
  onSearchChange,
  onSearch,
  onClear,
  placeholder = 'Search...',
  loading = false,
  searchFields = [],
}) => {
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  if (searchFields.length > 0) {
    return (
      <div className="search-panel">
        <div className="search-controls multiple-fields">
          {searchFields.map(field => (
            <div key={field.key} className="search-field-group">
              <label className="search-field-label">{field.label}</label>
              <input
                type="text"
                value={field.value}
                onChange={field.onChange}
                onKeyPress={handleKeyPress}
                placeholder={field.placeholder}
                className="search-input"
                disabled={loading}
              />
            </div>
          ))}
          <div className="search-actions">
            <button
              onClick={onSearch}
              disabled={loading}
              className="search-btn"
            >
              Search
            </button>
            <button
              onClick={onClear}
              disabled={loading}
              className="clear-search-btn"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-panel">
      <div className="search-controls">
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="search-input"
          disabled={loading}
        />
        <button onClick={onSearch} disabled={loading} className="search-btn">
          Search
        </button>
        <button
          onClick={onClear}
          disabled={loading || !searchTerm}
          className="clear-search-btn"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchPanel;
