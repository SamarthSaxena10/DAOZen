// api.js
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export const getTokenHolders = async () => {
    const response = await axios.get(`${BASE_URL}/token-holders`);
    return response.data;
};

export const getTokenTransfers = async () => {
    const response = await axios.get(`${BASE_URL}/token-transfers`);
    return response.data;
};

export const getTokenMetadata = async () => {
    const response = await axios.get(`${BASE_URL}/token-metadata`);
    return response.data;
};
