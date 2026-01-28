<template>
  <img
    :src="src"
    :alt="alt"
    class="img-anim"
    ref="imageRef"
    loading="lazy"
  />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  src: { type: [String, Object], required: true },
  alt: { type: String, default: '' }
});

const imageRef = ref(null);
let observer = null;
let hideTimeout = null; // timeout id para evitar parpadeo
const HIDE_DELAY = 220; // ms — ajusta entre 150 y 400 según necesites

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Cuando está bastante visible → animar
      if (entry.intersectionRatio >= 0.5) {
        // cancelar cualquier hide pendiente
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }
        entry.target.classList.add('show');
        return;
      }

      // Si no está visible, esperamos un poco antes de quitar la clase.
      // Esto evita toggles por cambios rápidos en UI móvil (barra navegador, etc).
      if (!entry.isIntersecting) {
        if (hideTimeout) clearTimeout(hideTimeout);

        hideTimeout = setTimeout(() => {
          // asegurarse de que el elemento sigue fuera antes de quitar
          // (entry.isIntersecting puede haber cambiado; comprobamos bounding rect)
          const el = entry.target;
          const rect = el.getBoundingClientRect();
          const fullyOut = rect.bottom <= 0 || rect.top >= (window.innerHeight || document.documentElement.clientHeight);
          if (fullyOut) {
            el.classList.remove('show');
          }
          hideTimeout = null;
        }, HIDE_DELAY);
      }
    });
  }, { threshold: [0, 0.5] });

  if (imageRef.value) observer.observe(imageRef.value);
});

onBeforeUnmount(() => {
  if (observer && imageRef.value) observer.unobserve(imageRef.value);
  if (hideTimeout) clearTimeout(hideTimeout);
});
</script>

<style scoped>
.img-anim {
  opacity: 0;
  transform: scale(0.92); 
  transition: opacity 8s cubic-bezier(.2,.9,.2,1), transform 0.55s cubic-bezier(.2,.9,.2,1); 
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0); /* fuerza composición por GPU */
  display: block;
  width: 100%;
  height: auto;
}

.img-anim.show {
  opacity: 1;
  transform: scale(1);
}
</style>
