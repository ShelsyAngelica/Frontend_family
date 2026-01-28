// Detecta automáticamente si estamos en local o producción
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_URL = isLocal 
    ? 'http://localhost:8000/api' 
    : 'shelsygarcia.alwaysdata.net/api';
