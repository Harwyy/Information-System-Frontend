import { useState } from 'react';

const ImportForm = ({ onSubmit, onCancel, loading }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedFile) {
            onSubmit(selectedFile);
        }
    };

    const handleCancel = () => {
        setSelectedFile(null);
        onCancel();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Import Organizations</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="file">Select JSON File:</label>
                        <input
                            type="file"
                            id="file"
                            accept=".json,application/json"
                            onChange={handleFileChange}
                            disabled={loading}
                        />
                        {selectedFile && (
                            <div className="file-info">
                                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                            </div>
                        )}
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            disabled={!selectedFile || loading}
                            className="submit-btn"
                        >
                            {loading ? 'Importing...' : 'Import'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ImportForm;