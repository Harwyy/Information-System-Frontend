import { useState, useCallback } from 'react';

import importsAPI from '../../services/importsAPI';

export const useImportsData = (addNotification) => {
    const [imports, setImports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 5,
        totalElements: 0,
        totalPages: 0,
        sortBy: 'id',
        direction: 'ASC'
    });

    const loadImports = useCallback(async (page = pagination.page, size = pagination.size, sortBy = pagination.sortBy, direction = pagination.direction) => {
        setLoading(true);
        try {
            const pageRequest = {
                page,
                size,
                sortBy,
                direction
            };

            const response = await importsAPI.getAllImports(pageRequest);
            setImports(response.content || response);

            // Обновляем пагинацию, если API возвращает пагинированный ответ
            if (response.totalElements !== undefined) {
                setPagination(prev => ({
                    ...prev,
                    page: response.number || page,
                    size: response.size || size,
                    totalElements: response.totalElements,
                    totalPages: response.totalPages,
                    sortBy,
                    direction
                }));
            }

        } catch (error) {
            console.error('Error loading imports:', error);
            addNotification(`Failed to load imports: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    }, [pagination, addNotification]);

    const handlePageChange = useCallback((newPage) => {
        loadImports(newPage, pagination.size, pagination.sortBy, pagination.direction);
    }, [loadImports, pagination.size, pagination.sortBy, pagination.direction]);

    const handleSizeChange = useCallback((newSize) => {
        loadImports(0, newSize, pagination.sortBy, pagination.direction);
    }, [loadImports, pagination.sortBy, pagination.direction]);

    const handleSortChange = useCallback((newSortBy, newDirection) => {
        loadImports(0, pagination.size, newSortBy, newDirection);
    }, [loadImports, pagination.size]);

    return {
        imports,
        loading,
        pagination,
        loadImports,
        handlePageChange,
        handleSortChange,
        handleSizeChange,
    };
};