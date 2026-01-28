<template>
  <div class="roulette-container">
    <div class="wheel-wrapper">
      <svg
        ref="wheelRef"
        :width="size"
        :height="size"
        :viewBox="`0 0 ${size} ${size}`"
        class="wheel-svg"
        :style="wheelStyle"
        @click="launchWheel"
      >
        <!-- Círculo de fondo cuando queda 1 elemento -->
        <circle
          v-if="items.length === 1"
          :cx="radius"
          :cy="radius"
          :r="radius"
          :fill="items[0].background || getDefaultColor(0)"
          stroke="#fff"
          stroke-width="2"
        />
        
        <g v-for="(item, index) in items" :key="item.id">
          <path
            v-if="items.length > 1"
            :d="getSlicePath(index)"
            :fill="item.background || getDefaultColor(index)"
            stroke="#fff"
            stroke-width="2"
          />
          <text
            :x="getTextX(index)"
            :y="getTextY(index)"
            :transform="getTextTransform(index)"
            :fill="item.textColor || '#000'"
            text-anchor="middle"
            :font-size="items.length === 1 ? 24 : 16"
            font-weight="bold"
          >
            {{ item.htmlContent }}
          </text>
        </g>
      </svg>
      <div class="wheel-indicator"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineExpose } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (value) => value.length >= 1
  },
  duration: {
    type: Number,
    default: 4
  },
  size: {
    type: Number,
    default: 400
  }
})

const emit = defineEmits(['wheel-start', 'wheel-end'])

const wheelRef = ref(null)
const isSpinning = ref(false)
const currentRotation = ref(0)

const itemAngle = computed(() => 360 / props.items.length)
const radius = computed(() => props.size / 2)

const wheelStyle = computed(() => ({
  transform: `rotate(${currentRotation.value}deg)`,
  transition: isSpinning.value 
    ? `transform ${props.duration}s cubic-bezier(0.25, 0.1, 0.25, 1)` 
    : 'none'
}))

function getSlicePath(index) {
  const angle = itemAngle.value
  const startAngle = (angle * index - 90) * Math.PI / 180
  const endAngle = (angle * (index + 1) - 90) * Math.PI / 180
  const r = radius.value
  const center = radius.value
  
  const x1 = center + r * Math.cos(startAngle)
  const y1 = center + r * Math.sin(startAngle)
  const x2 = center + r * Math.cos(endAngle)
  const y2 = center + r * Math.sin(endAngle)
  
  const largeArcFlag = angle > 180 ? 1 : 0
  
  return `M ${center},${center} L ${x1},${y1} A ${r},${r} 0 ${largeArcFlag},1 ${x2},${y2} Z`
}

function getTextX(index) {
  if (props.items.length === 1) {
    return radius.value
  }
  const angle = (itemAngle.value * index + itemAngle.value / 2 - 90) * Math.PI / 180
  const distance = radius.value * 0.65
  return radius.value + distance * Math.cos(angle)
}

function getTextY(index) {
  if (props.items.length === 1) {
    return radius.value + 5
  }
  const angle = (itemAngle.value * index + itemAngle.value / 2 - 90) * Math.PI / 180
  const distance = radius.value * 0.65
  return radius.value + distance * Math.sin(angle) + 5
}

function getTextTransform(index) {
  if (props.items.length === 1) {
    return '' // Sin rotación cuando hay 1 elemento
  }
  const angle = itemAngle.value * index + itemAngle.value / 2
  const x = getTextX(index)
  const y = getTextY(index)
  return `rotate(${angle}, ${x}, ${y})`
}

function getDefaultColor(index) {
  const hue = (index * (360 / props.items.length)) % 360
  return `hsl(${hue}, 70%, 70%)`
}

function launchWheel() {
  if (isSpinning.value) return
  
  isSpinning.value = true
  
  // Seleccionar un ganador aleatorio
  const winnerIndex = Math.floor(Math.random() * props.items.length)
  const winner = props.items[winnerIndex]
  
  emit('wheel-start', winner)
  
  // Calcular la rotación final
  // Queremos que el ganador quede arriba (a las 12 en punto)
  const spins = 360 * 5 // 5 vueltas completas
  const targetAngle = 360 - (winnerIndex * itemAngle.value + itemAngle.value / 2)
  const finalRotation = currentRotation.value + spins + targetAngle
  
  currentRotation.value = finalRotation
  
  setTimeout(() => {
    isSpinning.value = false
    emit('wheel-end', winner)
  }, props.duration * 1000)
}

function reset() {
  isSpinning.value = false
  currentRotation.value = 0
}

defineExpose({
  launchWheel,
  reset
})
</script>

<style scoped>
.roulette-container {
  display: inline-block;
  position: relative;
}

.wheel-wrapper {
  position: relative;
  display: inline-block;
}

.wheel-svg {
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  background: white;
}

.wheel-indicator {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 25px solid #ff0000;
  z-index: 10;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}
</style>
