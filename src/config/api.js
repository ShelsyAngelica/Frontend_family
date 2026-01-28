// Detecta automáticamente si estamos en local o producción
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const BASE_URL = isLocal 
    ? 'http://localhost:8000' 
    : 'https://shelsygarcia.alwaysdata.net';

export const API_URL = `${BASE_URL}/api`;
