import { API_BASE_URL } from '../config/constants';

class CoordinateAPI {
  async getAllCoordinates(
    pageRequest = { page: 0, size: 10, sortBy: 'id', direction: 'ASC' }
  ) {
    const queryParams = new URLSearchParams({
      page: pageRequest.page,
      size: pageRequest.size,
      sortBy: pageRequest.sortBy,
      direction: pageRequest.direction,
      ...pageRequest,
    }).toString();

    const response = await fetch(`${API_BASE_URL}/coordinates?${queryParams}`);

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorData || response.statusText}`
      );
    }

    return await response.json();
  }

  async getCoordinateById(id) {
    const response = await fetch(`${API_BASE_URL}/coordinates/${id}`);

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorData || response.statusText}`
      );
    }

    return await response.json();
  }

  async deleteCoordinate(id) {
    const response = await fetch(`${API_BASE_URL}/coordinates/${id}`, {
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

  async createCoordinate(coordinateData) {
    const response = await fetch(`${API_BASE_URL}/coordinates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coordinateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP ${response.status}: ${errorData || response.statusText}`
      );
    }

    return await response.json();
  }

  async updateCoordinate(id, coordinateData) {
    // eslint-disable-next-line no-unused-vars
    const { id: _, ...dataWithoutId } = coordinateData;
    const response = await fetch(`${API_BASE_URL}/coordinates/${id}`, {
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

export default new CoordinateAPI();
