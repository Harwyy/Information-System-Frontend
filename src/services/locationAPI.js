import { API_BASE_URL } from '../config/constants';

class LocationAPI {
  async getAllLocations(
    pageRequest = {
      page: 0,
      size: 10,
      sortBy: 'id',
      direction: 'ASC',
      nameContains: null,
    }
  ) {
    const params = {
      page: pageRequest.page,
      size: pageRequest.size,
      sortBy: pageRequest.sortBy,
      direction: pageRequest.direction,
    };

    if (pageRequest.nameContains !== null && pageRequest.nameContains !== '') {
      params.nameContains = pageRequest.nameContains;
    }

    const queryParams = new URLSearchParams(params).toString();

    const response = await fetch(`${API_BASE_URL}/location?${queryParams}`);

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorData || response.statusText}`
      );
    }

    return await response.json();
  }

  async getLocationById(id) {
    const response = await fetch(`${API_BASE_URL}/location/${id}`);

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorData || response.statusText}`
      );
    }

    return await response.json();
  }

  async deleteLocation(id) {
    const response = await fetch(`${API_BASE_URL}/location/${id}`, {
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

  async createLocation(locationData) {
    const response = await fetch(`${API_BASE_URL}/location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(locationData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP ${response.status}: ${errorData || response.statusText}`
      );
    }

    return await response.json();
  }

  async updateLocation(id, locationData) {
    // eslint-disable-next-line no-unused-vars
    const { id: _, ...dataWithoutId } = locationData;
    const response = await fetch(`${API_BASE_URL}/location/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataWithoutId),
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

export default new LocationAPI();
