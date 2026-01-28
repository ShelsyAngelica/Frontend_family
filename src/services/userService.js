import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const userService = {
    // Guardar asociación de ciudades
    saveCityAssociation(cityId, secret_city_id) {
        return axios.put(`${API_URL}/auth/user-has-city`, {
            city_id: cityId,
            secret_city_id: secret_city_id
        });
    },

    // Obtener asociaciones existentes
    getCityAssociations() {
        return axios.get(`${API_URL}/auth/associations`);
    },

    // Eliminar todas las asociaciones
    deleteAllAssociations() {
        return axios.put(`${API_URL}/auth/delete-associations`);
    }
};