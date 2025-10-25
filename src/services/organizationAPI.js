import { API_BASE_URL } from '../config/constants';

class OrganizationAPI {
  async getAllOrganizations(
    pageRequest = {
      page: 0,
      size: 10,
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

  async getOrganizationById(id) {
    const response = await fetch(`${API_BASE_URL}/organization/${id}`);

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorData || response.statusText}`
      );
    }

    return await response.json();
  }

  async deleteOrganization(id) {
    const response = await fetch(`${API_BASE_URL}/organization/${id}`, {
      method: 'DELETE',
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

  async createOrganization(organizationData) {
    const response = await fetch(`${API_BASE_URL}/organization`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(organizationData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP ${response.status}: ${errorData || response.statusText}`
      );
    }

    return await response.json();
  }

  async updateOrganization(id, organizationData) {
    const response = await fetch(`${API_BASE_URL}/organization/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(organizationData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP ${response.status}: ${errorData || response.statusText}`
      );
    }

    return await response.json();
  }
}

export default new OrganizationAPI();
