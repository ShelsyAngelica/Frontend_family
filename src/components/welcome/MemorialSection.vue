<template>
    <section class="section-memorial">
      <div class="div-title-memorial">
        <h2 class="">Trajimos un Pedacito de cielo</h2>
        <p>En memoria de quienes siguen iluminando nuestras celebraciones desde el cielo</p>
      </div>

      <div class="container-memorial">
          <div class="img-container">
            <div class="image-wrapper">
                <AnimatedImage :src="alex" alt="foto Alex" />
            </div>
            
            <div class="img-container-content">
                <p>Alexander Torres</p>
                <p>Siempre en nuestros corazones.</p>
            </div>
          </div>     

          <div class="img-container">
            <div class="image-wrapper">
                <AnimatedImage :src="papi_luchito" alt="foto Luis P" />
            </div>
           <div class="img-container-content">
            <p>Luis Eduardo Pantoja</p>
                <p>Siempre en nuestros corazones.</p>
           </div>
          </div>  
        
          <div class="img-container">
            <div class="image-wrapper">
            <AnimatedImage :src="cesar" alt="foto Cesar"/>

            </div>
            <div class="img-container-content">
                <p>Cesar Vargas</p>
                <p>Siempre en nuestros corazones.</p>
            </div>
          </div>              
      </div>
    </section>
</template>

<script setup>
import AnimatedImage from './AnimatedImage.vue';
import alex from '@/assets/alex.jpeg'
import cesar from '@/assets/cesar.jpg'
import papi_luchito from '@/assets/papi_luchito.jpeg'
</script>

<style scoped>
.section-memorial{
    width: 100%;
}

.div-title-memorial{
    margin-bottom: 60px;
}

.img-memorial{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
}

.img-container {
    position: relative;
    width: 300px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border: 3px solid rgba(255, 2, 2, 0.148);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 470px;
}

.img-container:hover {
    border: 3px solid var(--vt-c-septenary);
}

.image-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  
}

.image-wrapper::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to top, rgba(255,255,255,0.9), transparent);
  pointer-events: none;
}

.div-title-memorial p{
    font-size: 18px;
    font-weight: 550;
    text-align: center;
    text-align: center;
}

.div-title-memorial h2{
    font-size: 50px;
    text-align: center;
    font-weight: 700;
}

.container-memorial{
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.img-container-content{
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}

.img-container-content p{
    text-align: center;
}


.img-container img{
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: inherit;
}

.img-container-content p:nth-child(1){
    font-size: 20px;
    font-weight: 650;
}

.img-container-content p:nth-child(2){
    margin: 0;
}

@media (min-width: 1001px) {
    .section-memorial{
        background-color: var(--vt-c-senary);
        border-radius: 16px;
    }
    .container-memorial{
        gap: 40px;
    }
}

@media (min-width: 1200px) {
    .section-memorial{
        height: 100vh;
        padding: 10px 0;
    }
}

@media (max-width: 1000px) {
  .div-title-memorial h2{
    font-size: 30px;
  }

  .div-title-memorial p{
    font-size: 16px;
  }
  
}
</style>

