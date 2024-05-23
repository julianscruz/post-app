import axios from 'axios';

const APP_ID = '664e722391f570afde2dfd94';
const BASE_URL = 'https://dummyapi.io/data/v1/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'app-id': APP_ID,
  },
});

export const getData = async (route, params = {}) => {
  try {
    const response = await api.get(route, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
