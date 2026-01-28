  <template>
    <div class="roulette-wrapper">
      <div v-if="showRoulette">

        <div v-if="loading && initialItems.length === 0" class="loading-message">
          <h2>Cargando ciudades...</h2>
        </div>
  
        <div v-if="!loading && currentParticipant" class="current-participant">
          <h2>Buscando amigo secreto para:</h2>
          <h1 class="current-participant-h1 ">{{ currentParticipant.name }}</h1>
        </div>
  
        <CustomRoulette
          v-if="!loading && items.length > 0"
          ref="wheel"
          :items="items"
          :size="400"
          :duration="4"
          @wheel-start="onStart"
          @wheel-end="onEnd"
        />
      </div>

      
      <div v-if="!showRoulette" class="list">
        <div v-if="loading" class="loading-message">
          <h2>Cargando informacion</h2>
        </div>
        <div v-if="!loading"> 
          <h2 class="final-message-title">¡Todos los destinos han sido asociados!</h2>
        <div class="pairs-list">
          <h3 >Asociaciones guardadas:</h3>
          <ul>
            <li v-for="(data, index) in cityAssociations" :key="index">
              <strong>{{ data.city.name }}</strong> → {{ data.secret_city?.name }}
            </li>
          </ul>
        </div>
        <button 
          @click="resetGame" 
          class="reset-button" >
           Reiniciar
        </button>
        </div>
      </div>


      <!-- Mensaje del ganador -->
     <div v-if="showRoulette">
      <div v-if="showWinner && winner" class="winner-overlay">
        <!-- Copos de nieve -->
        <div class="snowflakes" aria-hidden="true">
          <div class="snowflake" v-for="n in 50" :key="n">❅</div>
        </div>
        
        <div class="winner-card">
          <span class="current-participant-h1 ">{{ currentParticipant.name  }}</span>
          <h1>Tu amigo secreto es: 🎉</h1>
          <h2 class="winner-name">{{ winner.htmlContent }}</h2>
          <p class="countdown">Continuando en {{ countdown }} segundos...</p>
        </div>
      </div>

  
      <div class="button-group" v-if="currentParticipant || loading ">
        <button 
          @click="launchWheel" 
          :disabled="isSpinning || items.length === 0"
          class="spin-button"
          v-if="!loading"
          
        >
          {{ isSpinning ? 'Girando...' : 'Girar' }}
        </button>
        
        <button 
          @click="resetGame" 
          :disabled="isSpinning"
          class="reset-button"
          v-if="pairs.length > 0"
        >
           Reiniciar
        </button>
      </div>
      </div>
    </div>
    
  </template>

<script setup>
import { ref, nextTick, onMounted, computed } from 'vue'
import CustomRoulette from './CustomRoulette.vue'
import { cityService } from '@/services/cityService.js'
import '@/assets/main.css';
import { userService } from '@/services/userService';

const wheel = ref(null)
const isSpinning = ref(false)
const loading = ref(true)
const showWinner = ref(false)
const winner = ref(null)
const countdown = ref(5)

const colors = ["var(--vt-c-secondary)", "var(--vt-c-senary)", "var(--vt-c-octonary)"]

const initialItems = ref([])
const allParticipants = ref([])
const currentParticipantIndex = ref(0)
const currentParticipant = ref(null)
const items = ref([])
const pairs = ref([]) 
const cityAssociations = ref([])

const showRoulette = computed(() => {
  let filtered = cityAssociations.value.filter(el => el.secret_city_id == null)
  
  return filtered.length > 0;
})

onMounted(async () => {
    await loadCities()
    await getCityAssociations()
})

async function loadCities() {
    try {
        loading.value = true
        const response = await cityService.getAllCities()
        
        // Transformar ciudades al formato de la ruleta
        initialItems.value = response.data.map((city, index) => ({
            id: city.id,
            name: city.name,
            htmlContent: city.name,
            textColor: "#000",
            background: colors[index % colors.length]
        }))
        
        allParticipants.value = [...initialItems.value]
        currentParticipant.value = allParticipants.value[0]
        items.value = allParticipants.value.filter(item => item.id !== currentParticipant.value.id)
        loading.value = false
    } catch (error) {
        console.error('Error al cargar ciudades:', error)
        loading.value = false
    }
}

function launchWheel (){ 
    if (!isSpinning.value) {
    wheel.value.launchWheel()
  }
}

function onStart() {
    isSpinning.value = true
}

async function onEnd(result) {
    isSpinning.value = false
    winner.value = result
    showWinner.value = true
    countdown.value = 5

    // Guardar pareja en el frontend
    pairs.value.push({
        participant: currentParticipant.value.name,
        secretFriend: result.name
    })

    // Guardar asociación en la base de datos
    try {
        await userService.saveCityAssociation(currentParticipant.value.id, result.id)
        console.log('Asociación guardada exitosamente')
    } catch (error) {
        console.error('Error al guardar la asociación:', error)
    }

    // Countdown
    const countdownInterval = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            clearInterval(countdownInterval)
        }
    }, 1000)

    // Esperar 5 segundos antes de continuar
    setTimeout(() => {
        showWinner.value = false
        loading.value = true

        setTimeout(() => {
            // Eliminar el ganador de la lista de disponibles
            allParticipants.value = allParticipants.value.filter(item => item.id !== result.id)
            
            // Pasar al siguiente participante
            currentParticipantIndex.value++
            
            if (currentParticipantIndex.value < initialItems.value.length) {
                currentParticipant.value = initialItems.value[currentParticipantIndex.value]
                items.value = allParticipants.value.filter(item => item.id !== currentParticipant.value.id)
            } else { 
                currentParticipant.value = null 
                items.value = []
            }
            
            loading.value = false 
            winner.value = null 
            nextTick(() => { 
                if (wheel.value && items.value.length > 0) { 
                    wheel.value.reset(); //
                }
            });
        }, 500);
    }, 6000);
}

async function getCityAssociations() {
  try {
    loading.value = true;
    const response = await userService.getCityAssociations()
    cityAssociations.value = response.data
    loading.value = false;
  } catch (error) {
    console.error('Error al obtener asociaciones:', error)
    loading.value = false;
  }
}
async function resetGame() {
    // Resetear todos los estados
    pairs.value = []
    showWinner.value = false
    winner.value = null
    isSpinning.value = false
    currentParticipantIndex.value = 0
    
    // Eliminar asociaciones de la base de datos
    try {
        await userService.deleteAllAssociations()
        console.log('Asociaciones eliminadas de la base de datos')
    } catch (error) {
        console.error('Error al eliminar asociaciones:', error)
    }
    
    // Recargar ciudades desde el backend
    await loadCities()
    await getCityAssociations()
    
    nextTick(() => { 
        if (wheel.value) {
            wheel.value.reset()
        }
    })
}
</script>

<style scoped>
.roulette-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.loading-message {
    text-align: center;
    padding: 40px;
    background: var(--vt-c-quinary, #f5f5f5);
    border-radius: 12px;
}

.loading-message h2 {
    margin: 0;
    color: var(--vt-c-secondary);
    font-size: 24px;
}

.current-participant {
    text-align: center;
    padding: 20px;
    background: var(--vt-c-quinary, #f5f5f5);
    border-radius: 12px;
}

.current-participant h2 {
    margin: 0 0 10px 0;
    color: #666;
    font-size: 20px;
}

.current-participant-h1 {
    margin: 0;
    color: var(--vt-c-secondary);
    font-size: 30px;
}

.pairs-list {
    padding: 20px;
    background: white;
    border-radius: 8px;
}

.pairs-list h3 {
    margin: 0 0 15px 0;
    color: #333;
    text-align: center;
}

.pairs-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    justify-content: center;
}

.pairs-list li {
    padding: 10px;
    margin: 5px 0;
    background: var(--vt-c-quinary, #f5f5f5);
    border-radius: 6px;
    border-left: 4px solid var(--vt-c-secondary);
    flex: 1 1 calc(25% - 20px); /* 4 por fila */
    height: 35px;
}

.pairs-list strong {
    color: var(--vt-c-octonary);
}

.final-message-title {
  
  text-align: center;
}

.button-group {
    display: flex;
    gap: 15px;
    align-items: center;
}

.spin-button {
    width: 100px;
    height: 40px;
    font-size: 16px;
    font-weight: 650;
    background: var(--vt-c-secondary);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.spin-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.spin-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.reset-button {
    width: 100px;
    height: 40px;
    font-size: 16px;
    font-weight: 650;
    background: var( --vt-c-octonary);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.reset-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(240, 147, 251, 0.6);
}

.reset-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.winner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
}

.list{
  display: flex;
  flex-direction: column;
  align-items: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.winner-card {
    background: var(--vt-c-quinary, rgb(219, 217, 217));
    padding: 60px 80px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.5s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.winner-card h1 {
    margin: 0 0 20px 0;
    font-size: 42px;
    color: #333;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.winner-name {
    margin: 20px 0;
    font-size: 56px;
    font-weight: bold;
    background: var( --vt-c-octonary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.countdown {
    margin-top: 20px;
    font-size: 18px;
    color: #666;
}

.final-message {
    text-align: center;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.final-message h2 {
    font-size: 32px;
    color: #333;
}

.reset-button-large {
    margin-top: 20px;
    padding: 15px 40px;
    font-size: 18px;
    font-weight: 650;
    background: var(--vt-c-octonary);
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(240, 147, 251, 0.3);
}

.reset-button-large:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(240, 147, 251, 0.5);
}

.reset-button-large:active {
    transform: translateY(0);
}

/* Copos de nieve */
.snowflakes {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 999;
    overflow: hidden;
}

.snowflake {
    position: absolute;
    top: -10%;
    color: white;
    font-size: 1.5rem;
    user-select: none;
    animation: fall linear infinite;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
}

/* Diferentes posiciones y duraciones para cada copo */
.snowflake:nth-child(1n) { left: 1%; animation-duration: 8s; animation-delay: 0s; }
.snowflake:nth-child(2n) { left: 10%; animation-duration: 10s; animation-delay: 1s; }
.snowflake:nth-child(3n) { left: 20%; animation-duration: 7s; animation-delay: 2s; }
.snowflake:nth-child(4n) { left: 30%; animation-duration: 9s; animation-delay: 0.5s; }
.snowflake:nth-child(5n) { left: 40%; animation-duration: 11s; animation-delay: 1.5s; }
.snowflake:nth-child(6n) { left: 50%; animation-duration: 8.5s; animation-delay: 3s; }
.snowflake:nth-child(7n) { left: 60%; animation-duration: 9.5s; animation-delay: 2.5s; }
.snowflake:nth-child(8n) { left: 70%; animation-duration: 10.5s; animation-delay: 1s; }
.snowflake:nth-child(9n) { left: 80%; animation-duration: 7.5s; animation-delay: 0s; }
.snowflake:nth-child(10n) { left: 90%; animation-duration: 8s; animation-delay: 2s; }

.snowflake:nth-child(odd) {
    animation-name: fall-swing-left;
    font-size: 1.2rem;
}

.snowflake:nth-child(even) {
    animation-name: fall-swing-right;
    font-size: 1.8rem;
}

@keyframes fall {
  to {
    transform: translateY(110vh);
  }
}

@keyframes fall-swing-left {
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(25vh) translateX(-15px);
  }
  50% {
    transform: translateY(50vh) translateX(0);
  }
  75% {
    transform: translateY(75vh) translateX(-10px);
  }
  100% {
    transform: translateY(110vh) translateX(0);
  }
}

@keyframes fall-swing-right {
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(25vh) translateX(15px);
  }
  50% {
    transform: translateY(50vh) translateX(0);
  }
  75% {
    transform: translateY(75vh) translateX(10px);
  }
  100% {
    transform: translateY(110vh) translateX(0);
  }
}

@media (max-width: 700px) {
  .pairs-list li {
    height: auto;
  }
}
</style>
