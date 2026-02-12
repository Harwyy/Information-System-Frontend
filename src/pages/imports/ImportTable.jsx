import DataTable from '../../components/DataTable';
import LowerPaginationControlPanel from "../../components/LowerPaginationControlPanel";

import '../../styles/components/import.css';

const ImportTable = ({ imports, loading, pagination, onPageChange, onSortChange, onSizeChange }) => {


    const tableFields = [
        { key: 'id', label: 'ID' },
        { key: 'creationDate', label: 'Creation Date' },
        { key: 'status', label: 'Status' },
        { key: 'counter', label: 'Counter' }
    ];

    return (
        <div className="table-container">

            <div className="status-legend">
                <div className="legend-title">Status Legend:</div>
                <div className="legend-items">
                    <div className="legend-item">
                        <span className="status-badge status-success">Success</span>
                        <span className="legend-text">= 0</span>
                    </div>
                    <div className="legend-item">
                        <span className="status-badge status-fail">Fail</span>
                        <span className="legend-text">= 1</span>
                    </div>
                </div>
            </div>

            <DataTable
                data={imports}
                fields={tableFields}
                loading={loading}
                actions={false}
                pagination={pagination}
                onPageChange={onPageChange}
                onSortChange={onSortChange}
                onSizeChange={onSizeChange}
                emptyMessage="No imports found"
            />
            <LowerPaginationControlPanel
                pagination={pagination}
                onPageChange={onPageChange}
                loading={loading}
            />
        </div>
    );
};

export default ImportTable;