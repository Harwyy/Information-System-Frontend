import { useState } from 'react';

import importsAPI from '../../services/importsAPI';

export const useImportOperations = (onSuccess, onError, onImportComplete) => {
    const [showForm, setShowForm] = useState(false);
    const [importLoading, setImportLoading] = useState(false);

    const openCreateForm = () => {
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    const handleImportFile = async (file) => {
        if (!file) {
            onError('Please select a file to import');
            return false;
        }

        setImportLoading(true);
        try {
            await importsAPI.importFile(file);
            onSuccess('File imported successfully!');

            if (onImportComplete) {
                onImportComplete();
            }

            return true;
        } catch (error) {
            onError(`Error importing file: ${error.message}`);
            return false;
        } finally {
            setImportLoading(false);
        }
    };

    return {
        showForm,
        importLoading,
        openCreateForm,
        closeForm,
        handleImportFile,
    };
};