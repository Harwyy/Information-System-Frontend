import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SampleHeader from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';
import NotificationsContainer from '../components/NotificationsContainer';
import { useImportOperations } from '../hooks/imports/useImportOperations';
import { useImportsData } from '../hooks/imports/useImportsData';
import { useNotifications } from '../hooks/useNotifications';
import ImportsAPI from "../services/importsAPI";

import DownloadImportByIdForm from './imports/DownloadImportByIdForm';
import ImportForm from './imports/ImportForm';
import ImportTable from './imports/ImportTable';

const Imports = () => {
    const navigate = useNavigate();

    const { notifications, addNotification, removeNotification } =
        useNotifications();

    const {
        imports,
        loading,
        pagination,
        loadImports,
        handlePageChange,
        handleSortChange,
        handleSizeChange,
    } = useImportsData(addNotification);

    const {
        showForm,
        openCreateForm,
        closeForm,
        handleImportFile,
        importLoading,
    } = useImportOperations(
        message => addNotification(message, 'success'),
        message => addNotification(message, 'error'),
        loadImports
    );

    const [showDownloadForm, setShowDownloadForm] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [selectedImport, setSelectedImport] = useState(null);

    useEffect(() => {
        loadImports();
    }, []);

    const handleSubmitImport = async (file) => {
        const success = await handleImportFile(file);
        if (success) {
            closeForm();
        }
    };

    const openDownloadForm = () => {
        setShowDownloadForm(true);
        setSelectedImport(null);
    };

    const closeDownloadForm = () => {
        setShowDownloadForm(false);
        setSelectedImport(null);
    };

    const handleDownloadById = async (importId) => {
        if (!importId) {
            addNotification('Please enter an import ID', 'error');
            return;
        }

        setDownloadLoading(true);
        try {
            addNotification(`File download started for import ID: ${importId}`, 'success');
            await ImportsAPI.downloadImportFile(importId);
        } catch (error) {
            addNotification(`Failed to download file: ${error.message}`, 'error');
        } finally {
            setDownloadLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="page-container">
            <LoadingIndicator
                loading={loading || importLoading || downloadLoading}
                loadingText={
                    importLoading ? "Importing file..." :
                        downloadLoading ? "Downloading file..." :
                            "Loading imports..."
                }
            />

            <NotificationsContainer
                notifications={notifications}
                onRemoveNotification={removeNotification}
                position="top-right"
                autoClose={true}
                autoCloseDelay={5000}
                maxNotifications={3}
            />

            <SampleHeader
                title="Imports Management"
                backText="Back"
                createText="Import File"
                onBack={handleBack}
                onCreate={openCreateForm}
                onGetById={openDownloadForm}
                loading={loading}
            />

            {showForm && (
                <ImportForm
                    onSubmit={handleSubmitImport}
                    onCancel={closeForm}
                    loading={importLoading}
                />
            )}

            {showDownloadForm && (
                <DownloadImportByIdForm
                    onDownload={handleDownloadById}
                    onCancel={closeDownloadForm}
                    loading={downloadLoading}
                    importHistory={selectedImport}
                />
            )}

            <ImportTable
                imports={imports}
                loading={loading}
                pagination={pagination}
                onPageChange={handlePageChange}
                onSortChange={handleSortChange}
                onSizeChange={handleSizeChange}
            />
        </div>
    );
};

export default Imports;