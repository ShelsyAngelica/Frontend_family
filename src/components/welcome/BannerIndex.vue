<template>
    <section class="section-1">
      <div class="hero-image-container">
        <div class="hero-image-content">
          <h1>Nuestra Tradición Navideña</h1>
          <p>Celebrando cada año con amor, alegría y temas únicos que nos unen como familia</p>
          <CountdownChristmas />
        </div>
      </div>
    </section>
</template>

<script setup>
import CountdownChristmas from '../count/CountdownChristmas.vue'; 

</script>

<style scoped>
.section-1{
  padding-bottom: 30px; 
}

.hero-image-container{
  background-image: url('../../assets/hero-christmas (1).jpg');
  background-size: cover;       /* La imagen llena la pantalla */
  background-position: center;  /* Se centra el pedazo visible */
  background-repeat: no-repeat; /* Sin repeticiones */
  height: 70vh; 
  border-radius: 20px;
  position: relative;
  box-shadow: 0 4px 13px -2px rgba(255, 31, 31, 0.325);
}

.hero-image-container::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-radius: 20px;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 100%
  );
}

.hero-image-container h1{
  font-size: 40px;
}

.hero-image-container p{
  font-size: 18px;
  font-weight: 650;
}

.hero-image-content{
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  color: var(--vt-c-primary);
  width: 90%;
}

@media (min-width: 1001px) {

  .hero-image-container{
    height: 80vh;
  }
  .section-1{
    height: 90vh;
    padding-bottom: 0;
  }
  .hero-image-container h1{
    font-size: 70px;
    margin: 0;
  }

  .hero-image-container p{
    font-size: 30px;
  }
}


</style>