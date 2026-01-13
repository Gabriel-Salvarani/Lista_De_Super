import axios from 'axios';

const API_URL = 'http://localhost:3000/api/stores';

export const createStore = async (storeData) => {
  // Axios convierte automáticamente el objeto a JSON
  const response = await axios.post(API_URL, storeData);
  return response.data;
};

export const getStores = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};