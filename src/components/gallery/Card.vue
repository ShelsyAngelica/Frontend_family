<template>
    <section>
        <div class="div-title-gallery">
            <h2     >Galeria de recuerdos</h2>
            <p>Un rincón para recordar las navidades que nos unieron y que hoy viven en fotos.</p>
        </div>
        <div class="div-card-gallery-container">
            <router-link class="div-card-gallery" v-for="card in cards" :key="card.year" :to="{ name: 'photo-view'}">
                <div class="div-card-gallery-header">
                    <div class="div-card-gallery-header-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-photo"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8h.01" /><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z" /><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" /><path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" /></svg>
                    </div>
                    <div class="div-card-gallery-header-year">
                        <span>{{ card.year }}</span>
                    </div>
                </div>
                <div class="div-card-gallery-body">
                    <h3>{{ card.title }}</h3>
                    <p>{{ card.description }}</p>
                    
                </div>
                <div class="div-card-gallery-footer">
                    <p>10 fotos</p>
                    <a href="">Ver fotos <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg></a>
                </div>
            </router-link>
        </div>
        
    </section>
</template>

<script>
export default {
    data() {
        return {
            cards: [
                {
                    year: 2022,
                    title: 'Fiesta de colores',
                    description: 'Una fiesta llena de alegría y colorido.',
                    link:'por definir',
                },
                {
                    year: 2023,
                    title: 'Fiesta de regiones',
                    description: 'Una fiesta con variedad de comidas y bebidas.',
                    link:'por definir',
                },
                {
                    year: 2024,
                    title: 'Fiesta de generos musicales',
                    description: 'Una fiesta con variedad de generos musicales.',
                    link:'por definir',
                },
                {
                    year: 2025,
                    title: 'Fiesta de lugar equivocado',
                    description: 'Una fiesta con variedad de lugares.',
                    link:'por definir',
                }
                

            ]
        }
    }
}
</script>

<style scoped>
.div-card-gallery-container{
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 40px;
    justify-content: center;
}
.div-title-gallery h2{
    font-size: 50px;
    text-align: center;
    font-weight: 700;
}

.div-title-gallery p{
    font-size: 18px;
    font-weight: 550;
    text-align: center;
}

.div-card-gallery{
    background: url('../../assets/christmas-background.jpeg') no-repeat center center;

    background-size: cover;
    width: 300px;
    border-radius: 10px;
    padding: 20px;
    border: 2px solid var(--vt-c-quinary);
    cursor: pointer;
    text-decoration: none;
    color: var(--vt-c-primary);
}

.div-card-gallery:hover{
    border: 2px solid var(--vt-c-secondary);
}

.div-card-gallery:hover .div-card-gallery-header-icon {
  transform: scale(1.2);
}

.div-card-gallery:hover .div-card-gallery-footer a {
  transform: translateX(5px);
}

.div-card-gallery-header{
    display: flex;
    justify-content: space-between;
}

.div-card-gallery-header-icon{
    background-color: var(--vt-c-secondary);
    padding: 10px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.div-card-gallery-header-icon svg {
  transition: transform .3s ease;
}

.div-card-gallery-header-year{
    background-color: var(--vt-c-octonary);
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    font-size: 20px;
    border-radius: 20px;
    color: var(--vt-c-senary);
    font-weight: 550;
}

.div-card-gallery-body{
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    border-bottom: 1px solid var(--vt-c-quinary);
}

.div-card-gallery-body h3{
    margin-bottom: 10px;
}

.div-card-gallery-body p{
    margin: 0 0 16px 0;
}

.div-card-gallery-footer{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.div-card-gallery-footer p{
    margin: 0;
}

.div-card-gallery-footer a{
    display: flex;
    text-decoration: none;
    color: var(--vt-c-secondary);
}

.div-card-gallery-footer a svg {
  transition: transform .3s ease;
}
</style>