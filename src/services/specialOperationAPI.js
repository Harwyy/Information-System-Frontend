import { API_BASE_URL } from '../config/constants';

class SpecialOperationAPI {
    async updateEmployeeCount(id) {
        const response = await fetch(`${API_BASE_URL}/special-operation/update-count-employee?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(
                `HTTP ${response.status}: ${errorData || response.statusText}`
            );
        }

        return await response.json();
    }

    async getMaxOfficialAddress() {
        const response = await fetch(`${API_BASE_URL}/special-operation/max-official-address`);

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(
                `HTTP ${response.status}: ${errorData || response.statusText}`
            );
        }

        return await response.json();
    }

    async getGroupedFullName() {
        const response = await fetch(`${API_BASE_URL}/special-operation/group-fullname`);

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(
                `HTTP ${response.status}: ${errorData || response.statusText}`
            );
        }

        return await response.json();
    }

    async joinOrganizations(requestData) {
        const response = await fetch(`${API_BASE_URL}/special-operation/join-organizations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(
                `HTTP ${response.status}: ${errorData || response.statusText}`
            );
        }

        return await response.json();
    }

    async getAllOrganizations(
        pageRequest = {
            page: 0,
            size: 100, // Увеличиваем размер для получения всех организаций
            sortBy: 'id',
            direction: 'ASC',
            name: null,
            fullName: null,
        }
    ) {
        const params = {
            page: pageRequest.page,
            size: pageRequest.size,
            sortBy: pageRequest.sortBy,
            direction: pageRequest.direction,
        };

        if (pageRequest.name !== null && pageRequest.name !== '') {
            params.name = pageRequest.name;
        }

        if (pageRequest.fullName !== null && pageRequest.fullName !== '') {
            params.fullName = pageRequest.fullName;
        }

        const queryParams = new URLSearchParams(params).toString();
        const response = await fetch(`${API_BASE_URL}/organization?${queryParams}`);

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(
                `HTTP ${response.status}: ${errorData || response.statusText}`
            );
        }

        return await response.json();
    }

}

export default new SpecialOperationAPI();