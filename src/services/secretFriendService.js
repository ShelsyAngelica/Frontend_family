import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Función para obtener el token del localStorage
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    console.log('Token leído del localStorage:', token ? 'Token encontrado' : 'NO HAY TOKEN');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const secretFriendService = {
    //Obtener el usuario autenticado y su ciudad asociada
    getAuthenticatedUser() {
        const headers = getAuthHeader();
        console.log('Headers enviados:', headers);
        return axios.get(`${API_URL}/auth/friend-secret`, {
            headers: headers
        });
    }
}