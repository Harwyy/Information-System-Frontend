import { useState } from 'react';

import SearchByIdForm from '../../components/SearchByIdForm';

const DownloadImportByIdForm = ({ onDownload, onCancel, loading, importHistory }) => {
    const [id, setId] = useState('');

    const handleClose = () => {
        setId('');
        onCancel();
    };

    const handleDownload = () => {
        onDownload(id);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Download Import File by ID</h2>

                <SearchByIdForm
                    id={id}
                    onIdChange={setId}
                    onSubmit={handleDownload}
                    onClose={handleClose}
                    loading={loading}
                    placeholder="Enter import history ID"
                    label="Import ID:"
                    submitButtonText="Download"
                    cancelButtonText="Close"
                />

                {importHistory && (
                    <div className="import-details">
                        <h3>Import Details</h3>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">ID:</span>
                                <span className="detail-value">{importHistory.id}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Status:</span>
                                <span className={`detail-value status-badge status-${importHistory.status?.toLowerCase()}`}>
                                    {importHistory.status}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Records Count:</span>
                                <span className="detail-value">{importHistory.counter}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Created:</span>
                                <span className="detail-value">
                                    {new Date(importHistory.creationDate).toLocaleString()}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">File URL:</span>
                                <span className="detail-value">
                                    {importHistory.fileUrl ? (
                                        <a
                                            href={importHistory.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="file-link"
                                        >
                                            Download Link
                                        </a>
                                    ) : (
                                        'Not available'
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DownloadImportByIdForm;