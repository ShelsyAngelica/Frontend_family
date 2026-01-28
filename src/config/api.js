// Detecta automáticamente si estamos en local o producción
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

let apiUrl = '';
if (isLocal) {
    console.log('Estamos en local');
    apiUrl = 'http://localhost:8000/api';
} else {
    console.log('Estamos en producción');
    apiUrl = 'shelsygarcia.alwaysdata.net/api';
}
export const API_URL = apiUrl;
