import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const cityService = {
    // Obtener todas las ciudades
    getAllCities() {
        return axios.get(`${API_URL}/cities`);
    }
};

