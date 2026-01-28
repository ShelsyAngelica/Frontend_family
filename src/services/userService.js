import axios from 'axios';

export const userService = {
    // Guardar asociación de ciudades
    saveCityAssociation(cityId, secret_city_id) {
        return axios.put(`/auth/user-has-city`, {
            city_id: cityId,
            secret_city_id: secret_city_id
        });
    },

    // Obtener asociaciones existentes
    getCityAssociations() {
        return axios.get(`/auth/associations`);
    },

    // Eliminar todas las asociaciones
    deleteAllAssociations() {
        return axios.put(`/auth/delete-associations`);
    }
};