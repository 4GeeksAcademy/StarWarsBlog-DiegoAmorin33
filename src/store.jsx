const API_URL = 'https://swapi.py4e.com/api';

export const getCharacters = async (page = 1) => {
  try {
    const response = await fetch(`https://swapi.py4e.com/api/people/?page=${page}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      results: data.results,
      count: data.count,
      next: data.next,
      previous: data.previous
    };

  } catch (error) {
    console.error('Error fetching characters:', error.message);
    throw error;
  }
};

export const getCharacter = async (id) => {
  try {
    const response = await fetch(`${API_URL}/people/${id}/`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(`Error fetching character with id ${id}:`, error.message);
    throw error;
  }
};

export const getPlanets = async (page = 1) => {
  try {
    const response = await fetch(`https://www.swapi.tech/api/planets?page=${page}&limit=10`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    const results = await Promise.all(data.results.map(async (planet) => {
      const detailResponse = await fetch(planet.url);
      if (!detailResponse.ok) {
        throw new Error(`HTTP error fetching planet details! status: ${detailResponse.status}`);
      }
      const detailData = await detailResponse.json();
      return detailData.result.properties;
    }));

    return {
      results: results,
      count: data.total_records,
      next: data.next,
      previous: null
    };

  } catch (error) {
    console.error('Error fetching planets:', error.message);
    throw error;
  }
};

export const getPlanet = async (id) => {
  try {
    const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result.properties;

  } catch (error) {
    console.error(`Error fetching planet with id ${id}:`, error.message);
    throw error;
  }
};

export const getVehicles = async (page = 1) => {
  try {
    const response = await fetch(`https://www.swapi.tech/api/vehicles?page=${page}&limit=10`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    const results = await Promise.all(data.results.map(async (vehicle) => {
      const detailResponse = await fetch(vehicle.url);
      if (!detailResponse.ok) {
        throw new Error(`HTTP error fetching vehicle details! status: ${detailResponse.status}`);
      }
      const detailData = await detailResponse.json();
      return detailData.result.properties;
    }));

    return {
      results: results,
      count: data.total_records,
      next: data.next,
      previous: null
    };

  } catch (error) {
    console.error('Error fetching vehicles:', error.message);
    throw error;
  }
};

export const getVehicle = async (id) => {
  try {
    const response = await fetch(`https://www.swapi.tech/api/vehicles/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result.properties;

  } catch (error) {
    console.error(`Error fetching vehicle with id ${id}:`, error.message);
    throw error;
  }
};