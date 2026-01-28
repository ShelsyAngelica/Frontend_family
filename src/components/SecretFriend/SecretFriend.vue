<template>
    <div class="ticket-wrapper">
        <!-- Copos de nieve flotantes -->
        <div class="snowflakes" aria-hidden="true">
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
            <div class="snowflake">❅</div>
            <div class="snowflake">❆</div>
        </div>

        <!-- Loading mientras se cargan los datos -->
        <div v-if="loading" class="loading">
            <p>🎅 Cargando tu ticket...</p>
        </div>

        <!-- Contenido cuando los datos están cargados -->
        <template v-else-if="dataUser">
            <h1 class="title">🎄 Hola viajero 🎄</h1>
            <p class="subtitle">Tu destino para este <span>Pantoja World Tour 2025</span> es:</p>
            
            <div class="ticket">
            <!-- Parte principal del ticket -->
            <div class="ticket-main">
                <!-- Header con logo navideño -->
                <div class="ticket-header">
                    <div class="airline-logo">
                        <span class="plane-icon">✈</span>
                        <span class="airline-name">PANTOJA AIRLINES</span>
                    </div>
                    <div class="christmas-decor">
                        🎅 BOARDING PASS 🎁
                    </div>
                </div>
                <!-- Info del pasajero y ciudades en una fila -->
                <div class="main-info-row">
                    <div class="passenger-section">
                        <label>PASSENGER</label>
                        <span class="value">{{ dataUser.name }}</span>
                    </div>
                    <div class="cities-section">
                        <div class="city from">
                            <label>FROM</label>
                            <span class="city-code">{{ dataUser.city?.name || 'POR ASIGNAR' }}</span>
                        </div>
                        <div class="flight-path">
                            <span class="plane-moving">✈</span>
                        </div>
                        <div class="city to">
                            <label>TO</label>
                            <span class="city-code">{{ dataUser.secret_city?.name || 'POR ASIGNAR' }}</span>
                        </div>
                    </div>
                </div>

                <!-- Todos los detalles en una sola fila -->
                <div class="flight-details">
                    <div class="detail">
                        <label>🎄FLIGHT</label>
                        <span class="value">PW-2025</span>
                    </div>
                    <div class="detail">
                        <label>🎁 DATE</label>
                        <span class="value">27/12/25</span>
                    </div>
                    <div class="detail">
                        <label>🔔 GATE</label>
                        <span class="value">01</span>
                    </div>
                    <div class="detail">
                        <label>💺 SEAT</label>
                        <span class="value">01</span>
                    </div>
                    <div class="detail">
                        <label>🛷 CLASS</label>
                        <span class="value">XMAS</span>
                    </div>
                </div>
            </div>

            <!-- Línea de corte punteada -->
            <div class="tear-line">
                <div class="scissors">✂</div>
            </div>

            <!-- Talón del ticket -->
            <div class="ticket-stub">
                <div class="stub-header">
                    <span class="airline-mini">PANTOJA AIRLINES</span>
                    <span class="boarding-mini">🎅 BOARDING PASS</span>
                </div>
                <div class="barcode">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar thin"></div>
                    <div class="bar"></div>
                    <div class="bar thin"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar thin"></div>
                    <div class="bar"></div>
                    <div class="bar thin"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar thin"></div>
                    <div class="bar"></div>
                </div>
                <div class="christmas-wish">¡Feliz Navidad!</div>
            </div>
        </div>
        </template>
    </div>
</template>

<script setup>

import { secretFriendService } from '@/services/secretFriendService.js';
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';


const router = useRouter()
const dataUser = ref(null)
const loading = ref(true)


async function getAuthenticatedUser(){
    try {
        loading.value = true
        const response = await secretFriendService.getAuthenticatedUser();
        dataUser.value = response.data.user;
        console.log('Usuario cargado:', dataUser.value);
    } catch (error) {
        console.error('Error al cargar el usuario autenticado:', error);
        if (error.response?.status === 401) {
            router.push('/login')
        }
    } finally {
        loading.value = false
    }
}
onMounted(getAuthenticatedUser)
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Playfair+Display:wght@700&display=swap');

/* Loading */
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    font-size: 24px;
    color: #fff;
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.ticket-wrapper {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background: var(--vt-c-septenary);
    position: relative;
    overflow: hidden;
    border-radius: 20px;
}

/* Título */
.title {
    font-size: 34px;
    color: #ffffff;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    margin-bottom: 6px;
    animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
    from { text-shadow: 0 0 8px #ffd700, 0 0 16px #ffd700; }
    to { text-shadow: 0 0 16px #ff6b6b, 0 0 24px #ff6b6b; }
}

.subtitle {
    /* font-family: 'Courier Prime', monospace; */
    font-size: 22px;
    color: #fff;
    margin-bottom: 16px;
}

.subtitle span {
    color: var(--vt-c-secondary);
    font-weight: bold;
}

/* Copos de nieve */
.snowflakes {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.snowflake {
    position: absolute;
    top: -20px;
    color: #fff;
    font-size: 0.9rem;
    opacity: 0.8;
    animation: fall linear infinite;
}

.snowflake:nth-child(1) { left: 5%; animation-duration: 8s; animation-delay: 0s; }
.snowflake:nth-child(2) { left: 15%; animation-duration: 12s; animation-delay: 1s; font-size: 0.7rem; }
.snowflake:nth-child(3) { left: 30%; animation-duration: 10s; animation-delay: 2s; }
.snowflake:nth-child(4) { left: 45%; animation-duration: 14s; animation-delay: 0.5s; font-size: 1.1rem; }
.snowflake:nth-child(5) { left: 60%; animation-duration: 9s; animation-delay: 3s; }
.snowflake:nth-child(6) { left: 75%; animation-duration: 11s; animation-delay: 1.5s; font-size: 0.7rem; }
.snowflake:nth-child(7) { left: 85%; animation-duration: 13s; animation-delay: 2.5s; }
.snowflake:nth-child(8) { left: 95%; animation-duration: 10s; animation-delay: 4s; font-size: 1rem; }

@keyframes fall {
    0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(360deg); opacity: 0.3; }
}

/* Ticket principal */
.ticket {
    display: flex;
    background: #fffef5;
    border-radius: 10px;
    box-shadow: 0 12px 35px rgba(0,0,0,0.4);
    position: relative;
    z-index: 2;
    overflow: hidden;
    width: 720px;
    max-width: 95vw;
}

.ticket::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c41e3a' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
    pointer-events: none;
}

.ticket-main {
    flex: 1;
    padding: 12px 16px;
    position: relative;
}

/* Header del ticket */
.ticket-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 2px dashed var(--vt-c-secondary);
}

.airline-logo {
    display: flex;
    align-items: center;
    gap: 6px;
}

.plane-icon {
    font-size: 26px;
    color: var(--vt-c-secondary);
    animation: fly 3s ease-in-out infinite;
}

@keyframes fly {
    0%, 100% { transform: translateX(0) rotate(0deg); }
    50% { transform: translateX(4px) rotate(-5deg); }
}

.airline-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: bold;
    color: var(--vt-c-octonary);
    letter-spacing: 2px;
}

.christmas-decor {
    font-family: 'Courier Prime', monospace;
    font-size: 15px;
    font-weight: bold;
    background: var(--vt-c-quinary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

@keyframes twinkle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
}

/* Fila principal de info */
.main-info-row {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    padding: 8px 12px;
    background: linear-gradient(135deg, rgba(22, 91, 51, 0.08) 0%, rgba(196, 30, 58, 0.08) 100%);
    border-radius: 6px;
}

/* Sección del pasajero */
.passenger-section {
    flex: 1;
}

.passenger-section label,
.detail label,
.city label,
.stub-field label {
    display: block;
    font-family: 'Courier Prime', monospace;
    font-size: 15px;
    color: #666;
    letter-spacing: 1px;
    margin-bottom: 2px;
}

.passenger-section .value {
    font-family: 'Courier Prime', monospace;
    font-size: 20px;
    font-weight: bold;
    color: var(--vt-c-octonary);
    letter-spacing: 2px;
}

/* Ciudades */
.cities-section {
    display: flex;
    align-items: center;
    gap: 8px;
}

.city {
    text-align: center;
}

.city-code {
    display: block;
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: bold;
    color:var(--vt-c-secondary);
}

.flight-path {
    padding: 0 6px;
}

.plane-moving {
    font-size: 20px;
    color: var(--vt-c-octonary);
    animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
}

/* Detalles del vuelo */
.flight-details {
    display: flex;
    justify-content: space-between;
    gap: 6px;
    margin-bottom: 8px;
}

.detail {
    flex: 1;
    padding: 6px 8px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    border: 1px solid rgba(22, 91, 51, 0.15);
    text-align: center;
}

.detail label {
    font-size: 15px;
}

.detail .value {
    font-family: 'Courier Prime', monospace;
    font-size: 16px;
    font-weight: bold;
    color: var(--vt-c-octonary);
}

@keyframes swing {
    0%, 100% { transform: rotate(-5deg); }
    50% { transform: rotate(5deg); }
}

/* Línea de corte */
.tear-line {
    width: 20px;
    background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 6px,
        #ccc 6px,
        #ccc 12px
    );
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tear-line::before,
.tear-line::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    background: var(--vt-c-septenary);
    border-radius: 50%;
}

.tear-line::before { top: -7px; }
.tear-line::after { bottom: -7px; }

.scissors {
    transform: rotate(90deg);
    font-size: 15px;
    color: #999;
}

/* Talón del ticket */
.ticket-stub {
    width: 115px;
    padding: 10px;
    background: linear-gradient(180deg, #fffef5 0%, #fff5f5 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.stub-header {
    text-align: center;
    margin-bottom: 6px;
    padding-bottom: 5px;
    border-bottom: 1px dashed var(--vt-c-secondary);
}

.airline-mini {
    display: block;
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: bold;
    color: var(--vt-c-octonary);
    letter-spacing: 1px;
}

.boarding-mini {
    font-family: 'Courier Prime', monospace;
    font-size: 15px;
    color: var(--vt-c-secondary);
}

.stub-details {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
}

.stub-field {
    margin-bottom: 0;
}

.stub-field label {
    font-size: 15px;
}

.stub-field span {
    font-family: 'Courier Prime', monospace;
    font-size: 15px;
    font-weight: bold;
    color: var(--vt-c-octonary);
}

/* Código de barras */
.barcode {
    display: flex;
    justify-content: center;
    gap: 2px;
    padding: 6px 0;
    margin: 5px 0;
}

.bar {
    width: 2px;
    height: 28px;
    background: #333;
}

.bar.thin {
    width: 1px;
}

.christmas-wish {
    text-align: center;
    font-family: 'Courier Prime', monospace;
    font-size: 15px;
    color: var(--vt-c-secondary);
    font-weight: bold;
    animation: glow 2s ease-in-out infinite alternate;
}

/* Responsive */
@media (max-width: 760px) {
    .ticket {
        flex-direction: column;
        width: 95%;
    }
    
    .tear-line {
        width: 100%;
        height: 20px;
        background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 6px,
            #ccc 6px,
            #ccc 12px
        );
    }
    
    .tear-line::before,
    .tear-line::after {
        top: 50%;
        transform: translateY(-50%);
    }
    
    .tear-line::before { left: -7px; }
    .tear-line::after { right: -7px; left: auto; }
    
    .scissors {
        transform: rotate(0deg);
    }
    
    .ticket-stub {
        width: 100%;
        flex-direction: row;
        align-items: center;
        gap: 12px;
    }
    
    .stub-header {
        border-bottom: none;
        border-right: 1px dashed var(--vt-c-secondary);
        padding-right: 10px;
        margin-bottom: 0;
    }
    
    .main-info-row {
        flex-direction: column;
        gap: 8px;
    }
    
    .flight-details {
        flex-wrap: wrap;
    }
    
    .detail {
        min-width: 30%;
    }
    
    .title {
        font-size: 26px;
    }
    
    .subtitle {
        font-size: 15px;
        text-align: center;
    }
    .city-code{
        font-size: 15px;
    }
}
</style>