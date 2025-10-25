const LowerPaginationControlPanel = ({ pagination, onPageChange, loading }) => {
  if (pagination.totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(0)}
        disabled={pagination.page === 0 || loading}
        className="pagination-btn"
      >
        ⏮ First
      </button>

      <button
        onClick={() => onPageChange(pagination.page - 1)}
        disabled={pagination.page === 0 || loading}
        className="pagination-btn"
      >
        ← Previous
      </button>

      <span className="pagination-info">
        Page {pagination.page + 1} of {pagination.totalPages}
      </span>

      <button
        onClick={() => onPageChange(pagination.page + 1)}
        disabled={pagination.page >= pagination.totalPages - 1 || loading}
        className="pagination-btn"
      >
        Next →
      </button>

      <button
        onClick={() => onPageChange(pagination.totalPages - 1)}
        disabled={pagination.page >= pagination.totalPages - 1 || loading}
        className="pagination-btn"
      >
        Last ⏭
      </button>
    </div>
  );
};

export default LowerPaginationControlPanel;
