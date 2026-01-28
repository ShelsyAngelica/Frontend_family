import axios from 'axios';

export const cityService = {
    // Obtener todas las ciudades
    getAllCities() {
        return axios.get('/cities');
    }
};

