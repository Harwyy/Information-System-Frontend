import { API_BASE_URL } from '../config/constants';

class ImportsAPI {
    async getAllImports(pageRequest = {
        page: 0,
        size: 5
    }) {
        const params = {
            page: pageRequest.page,
            size: pageRequest.size
        };

        const queryParams = new URLSearchParams(params).toString();
        const response = await fetch(`${API_BASE_URL}/import?${queryParams}`);

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorData || response.statusText}`);
        }

        return await response.json();
    }

    async importFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/import`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            let errorMessage;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || JSON.stringify(errorData);
            } catch {
                errorMessage = await response.text();
            }
            throw new Error(`HTTP ${response.status}: ${errorMessage}`);
        }

        return await response.text();
    }

    async downloadImportFile(id, filename = 'imported-file.json') {
        const response = await fetch(`${API_BASE_URL}/import/${id}/file`);

        if (!response.ok) {
            let errorMessage;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || JSON.stringify(errorData);
            } catch {
                errorMessage = await response.text();
            }
            throw new Error(`HTTP ${response.status}: ${errorMessage}`);
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        return blob;
    }
}

export default new ImportsAPI();