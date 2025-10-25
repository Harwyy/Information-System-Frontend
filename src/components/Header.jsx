const SampleHeader = ({
  title = '',
  backText = '',
  getByIdText = '',
  createText = '',
  showGetById = true,
  showCreate = true,
  onBack,
  onGetById,
  onCreate,
  loading = false,
}) => {
  return (
    <div className="sample-header">
      <button className="back-button" onClick={onBack}>
        ← {backText}
      </button>
      <h1 className="page-title">{title}</h1>
      <div className="header-actions">
        {showGetById && (
          <button
            className="get-by-id-button"
            onClick={onGetById}
            disabled={loading}
          >
            🔍 {getByIdText}
          </button>
        )}
        {showCreate && (
          <button className="add-button" onClick={onCreate} disabled={loading}>
            ➕ {createText}
          </button>
        )}
      </div>
    </div>
  );
};

export default SampleHeader;
