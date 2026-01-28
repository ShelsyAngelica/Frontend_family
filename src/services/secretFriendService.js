import axios from 'axios';

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
        return axios.get(`/auth/friend-secret`, {
            headers: headers
        });
    }
}