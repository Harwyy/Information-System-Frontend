import { API_BASE_URL } from '../config/constants';

class AddressAPI {
  async getAllAddresses(
    pageRequest = {
      page: 0,
      size: 10,
      sortBy: 'id',
      direction: 'ASC',
      zipCode: null,
    }
  ) {
    const params = {
      page: pageRequest.page,
      size: pageRequest.size,
      sortBy: pageRequest.sortBy,
      direction: pageRequest.direction,
    };

    if (pageRequest.zipCode !== null && pageRequest.zipCode !== '') {
      params.zipCode = pageRequest.zipCode;
    }

    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/address?${queryParams}`);

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorData || response.statusText}`
      );
    }

    return await response.json();
  }

  async getAddressById(id) {
    const response = await fetch(`${API_BASE_URL}/address/${id}`);

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorData || response.statusText}`
      );
    }

    return await response.json();
  }

  async deleteAddress(id, deleteRequest = {}) {
    const params = {};

    if (deleteRequest.forceDelete !== undefined) {
      params.forceDelete = deleteRequest.forceDelete;
    }

    if (
      deleteRequest.redirectToAddressId !== undefined &&
      deleteRequest.redirectToAddressId !== null
    ) {
      params.redirectToAddressId = deleteRequest.redirectToAddressId;
    }

    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/address/${id}${queryParams ? `?${queryParams}` : ''}`;

    const response = await fetch(url, {
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

  async getAddressesWithoutLocation() {
    const response = await fetch(`${API_BASE_URL}/address/without-location`);

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorData || response.statusText}`
      );
    }

    return await response.json();
  }

  async createAddress(addressData) {
    const response = await fetch(`${API_BASE_URL}/address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP ${response.status}: ${errorData || response.statusText}`
      );
    }

    return await response.json();
  }

  async updateAddress(id, addressData) {
    // eslint-disable-next-line no-unused-vars
    const { id: _, ...dataWithoutId } = addressData;
    const response = await fetch(`${API_BASE_URL}/address/${id}`, {
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

export default new AddressAPI();
