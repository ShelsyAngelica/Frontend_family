<template>
    <section class="section-2">
      <div class="div-title-section-2">
        <h2 class="title-section-2">¿Qué Puedes Hacer?</h2>
      </div>

      <div class="container-cards">
        <RouterLink :to="card.link" v-for="card in cards" :key="card.title" class="card-link">
          <div class="card-container">
            <div class="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#df2333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-library-photo"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 3m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 7.26a2.005 2.005 0 0 0 -1.012 1.737v10c0 1.1 .9 2 2 2h10c.75 0 1.158 -.385 1.5 -1" /><path d="M17 7h.01" /><path d="M7 13l3.644 -3.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" /><path d="M15 12l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l2.644 2.644" /></svg>

            </div>
            <div class="card-content">
              <h2>{{ card.title }}</h2>
              <p>{{ card.description }}</p>
              <button class="button-card">{{ card.button }}</button>
            </div>
          </div>
        </RouterLink>        
      </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            cards: [
                {
                    title: 'Galeria de recuerdos',
                    description: 'Revive las fiestas navideñas organizadas por año',
                    button: 'Ver galeria',
                    color: '#df2333',
                    link: '/galeria'
                },
                {
                    title: 'Ruleta de Temática',
                    description: 'Sortea el tema de la próxima fiesta navideña',
                    button: 'Girar ruleta',
                    color: '#df2333',
                    link: '/tematica'
                },
                {
                    title: 'Amigo Secreto',
                    description: 'Descubre quién es tu amigo navideño secreto',
                    button: 'Sortear amigo',    
                    color: '#df2333',
                    link: '/tematica'
                },
                {
                    title: 'Historial',
                    description: 'Explora todas nuestras celebraciones pasadas',
                    button: 'Ver historial',
                    color: '#df2333',
                    link: '/'
                }
            ]
        }
    }
}
</script>

<style scoped>
/* Seccion que puedes hacer */


.card-link{    
  text-decoration: none;
  margin-bottom: 20px;
  max-width: 300px;
}

.card-link:hover .button-card{
    background-color: var(--vt-c-septenary);
}

.title-section-2{
  color: var(--vt-c-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
}

.container-cards{
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;

}
.card-container{
  border: 2px solid var(--vt-c-quinary);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: url('../../assets/christmas-background.jpeg') no-repeat center center;

  background-size: cover;
}

.card-container:hover{
  border: 2px solid var(--vt-c-septenary);
}

.icon-container{
  padding: 20px
}
.icon-container svg {
  width: 50px;
  height: 50px;
  padding: 15px;
  border-radius: 50%;
  background-color: var(--vt-c-quinary);
  color: var(--vt-c-primary);
}

.card-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--vt-c-primary);
}

.card-content h2{
  font-size: 25px;
  font-weight: 800;
}

.card-content p{
  font-size: 18px;
  font-weight: 550;
}

.card-content p , .card-content h2, .div-title-section-2 h2{
  text-align: center;
}

.button-card{
    height: 40px;
    width: 130px;
    border: 2px solid var(--vt-c-quinary);
    border-radius: 10px;
    background-color: var(--vt-c-tertiary);
}

@media (min-width: 1001px) {
  .section-2{
  height: 85vh;
}

  .title-section-2{
    font-size: 50px;
  }

  .container-cards{
      gap: 40px;
    }
}

@media (max-width: 1000px) {

  .section-2{
    margin-top: 60px;
  }
  .hero-image-content h1{
    font-size: 40px;
    font-weight: 900;
  }
  .hero-image-content p{
    font-size: 17px;
    font-weight: 500;
  }

  .title-section-2{
    font-size: 30px;
    font-weight: 700;
    color: var(--vt-c-primary);
  }

}  
</style>
