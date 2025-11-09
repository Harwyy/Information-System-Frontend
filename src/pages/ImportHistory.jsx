import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SampleHeader from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';
import NotificationsContainer from '../components/NotificationsContainer';
import { useImportOperations } from '../hooks/imports/useImportOperations';
import { useImportsData } from '../hooks/imports/useImportsData';
import { useNotifications } from '../hooks/useNotifications';

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

    useEffect(() => {
        loadImports();
    }, []);

    const handleSubmitImport = async (file) => {
        const success = await handleImportFile(file);
        if (success) {
            closeForm();
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="page-container">
            <LoadingIndicator
                loading={loading || importLoading}
                loadingText={importLoading ? "Importing file..." : "Loading imports..."}
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
                loading={loading}
                showGetById={false}
            />

            {showForm && (
                <ImportForm
                    onSubmit={handleSubmitImport}
                    onCancel={closeForm}
                    loading={importLoading}
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