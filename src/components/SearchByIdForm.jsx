const SearchByIdForm = ({
  id,
  onIdChange,
  onSubmit,
  onClose,
  loading = false,
  placeholder = 'Enter ID',
  label = 'ID:',
  cancelButtonText = 'Close',
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    if (id.trim()) {
      onSubmit(id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-by-id-form">
      <div className="form-group">
        <label>{label}</label>
        <input
          type="text"
          value={id}
          onChange={e => onIdChange(e.target.value)}
          placeholder={placeholder}
          required
          disabled={loading}
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="submit-btn"
          disabled={loading || !id.trim()}
        >
          {loading ? 'Searching...' : 'Find'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="cancel-btn"
          disabled={loading}
        >
          {cancelButtonText}
        </button>
      </div>
    </form>
  );
};

export default SearchByIdForm;
