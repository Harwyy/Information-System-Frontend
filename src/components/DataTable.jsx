import { useState } from 'react';

const DataTable = ({
  data,
  loading,
  fields = [],
  actions = true,
  onEdit,
  onDelete,
  onSortChange,
  getSortIcon,
  maxTextLength = 10,
}) => {
  const [modalContent, setModalContent] = useState({
    isOpen: false,
    title: '',
    content: '',
  });

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  const tableFields =
    fields.length > 0
      ? fields
      : data.length > 0
        ? Object.keys(data[0])
            .filter(key => key !== 'id')
            .map(key => ({ key, label: key.toUpperCase() }))
        : [];

  const handleCellClick = (content, fieldLabel) => {
    if (typeof content === 'string' && content.length > maxTextLength) {
      setModalContent({
        isOpen: true,
        title: fieldLabel,
        content: content,
      });
    }
  };

  const closeModal = () => {
    setModalContent({
      isOpen: false,
      title: '',
      content: '',
    });
  };

  const renderCellContent = (content, fieldLabel) => {
    if (typeof content === 'object' && content !== null) {
      content = JSON.stringify(content);
    }

    if (typeof content !== 'string') {
      return content;
    }

    if (content.length <= maxTextLength) {
      return content;
    }

    return (
      <span
        className="truncatable-content"
        title="Click to view full content"
        onClick={() => handleCellClick(content, fieldLabel)}
      >
        {content.substring(0, maxTextLength)}...
      </span>
    );
  };

  const getSortField = field => {
    return field.sortKey || field.key;
  };

  return (
    <>
      <div className="table-wrapper">
        <table className="coordinates-table">
          <thead>
            <tr>
              {tableFields.map(field => (
                <th
                  key={field.key}
                  className="sortable-header"
                  onClick={() =>
                    onSortChange && onSortChange(getSortField(field))
                  }
                >
                  {field.label}{' '}
                  {getSortIcon && getSortIcon(getSortField(field))}
                </th>
              ))}
              {actions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map(item => (
                <tr key={item.id}>
                  {tableFields.map(field => {
                    const value = getNestedValue(item, field.key);
                    const displayValue = field.render
                      ? field.render(item)
                      : value;

                    return (
                      <td
                        key={field.key}
                        className={
                          typeof displayValue === 'string' &&
                          displayValue.length > maxTextLength
                            ? 'truncatable-cell'
                            : ''
                        }
                      >
                        {renderCellContent(displayValue, field.label)}
                      </td>
                    );
                  })}
                  {actions && (
                    <td className="actions-cell">
                      <button
                        className="update-btn"
                        onClick={() => onEdit(item)}
                        disabled={loading}
                      >
                        Update
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => onDelete(item.id)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr className="empty-row">
                <td
                  colSpan={tableFields.length + (actions ? 1 : 0)}
                  className="empty-state-cell"
                >
                  <div className="empty-state">
                    <p>No data to display</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalContent.isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Full Content - {modalContent.title}</h2>
            <div className="full-content-display">
              <pre>{modalContent.content}</pre>
            </div>
            <div className="form-actions">
              <button className="cancel-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataTable;
