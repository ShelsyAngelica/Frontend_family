import axios from 'axios';
import { API_URL } from '@/config/api';

export const cityService = {
    // Obtener todas las ciudades
    getAllCities() {
        return axios.get(`${API_URL}/cities`);
    }
};

