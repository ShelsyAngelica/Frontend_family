<template>
    <div class="contador">
      <h2 class="contador-title">Faltan para Navidad:</h2>

      
        
      <div class="time">
        <div class="time-item">  
            <span class="time-item-number">{{ time.days }}</span>
            <span>días</span>

        </div>

        <div class="time-item">
            <span class="time-item-number">{{ time.hours }}</span>
            <span>horas</span>  

        </div>
        <div class="time-item">
            <span class="time-item-number">{{ time.minutes }}</span>
            <span>min</span>  

        </div>
        <div class="time-item">
            <span class="time-item-number">{{ time.seconds }}</span>
            <span>seg</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const time = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  function updateCountdown() {
    const now = new Date()
    const christmas = new Date(now.getFullYear(), 11, 25) // 11 = diciembre
  
    // si ya pasó Navidad este año → cuenta para la del próximo
    if (now > christmas) {
      christmas.setFullYear(christmas.getFullYear() + 1)
    }
  
    const diff = christmas - now
  
    time.value.days = Math.floor(diff / (1000 * 60 * 60 * 24))
    time.value.hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    time.value.minutes = Math.floor((diff / (1000 * 60)) % 60)
    time.value.seconds = Math.floor((diff / 1000) % 60)
  }
  
  let interval = null
  
  onMounted(() => {
    updateCountdown()
    interval = setInterval(updateCountdown, 1000)
  })
  
  onUnmounted(() => {
    clearInterval(interval)
  })
  </script>
  
  <style scoped>
  .contador {
    text-align: center;
  }
  
  .time {
    font-size: 2rem;
    color: #c62828;
    display: flex;
    gap: 40px;
    justify-content: center;
  }

  .time-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: var( --vt-c-tertiary);
    padding: 5px;
    border-radius: 5px;
    width: 60px;
    border: 1px solid var(--vt-c-septenary);
  }
  .time-item span:nth-child(2){
    font-size: 1rem;
  }

  .time-item-number{
    font-size: 3rem;
  }

  @media (max-width: 1001px) {
    .contador-title{
        font-size: 1rem;
    }
    .time{
        font-size: 1.5rem;
        gap: 10px;
    }

    .time-item-number{
        font-size: 2rem;
    }
  }
  </style>
  