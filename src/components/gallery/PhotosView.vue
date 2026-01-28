<template>
    <section class="section-photos">
        <div class="div-title-photos">
            <h2>2023</h2>
            <h3>Fiesta de colores</h3>
        </div>
        <div class="div-photos-container">
            <div class="div-photo-container">
                <img src="../../assets/hero-christmas (1).jpg" alt="">
            </div>

            <div class="div-photo-container">
                <img src="../../assets/hero-christmas (1).jpg" alt="">
            </div>

            <div class="div-photo-container">
                <img src="../../assets/hero-christmas (1).jpg" alt="">
            </div>

            <div class="div-photo-container">
                <img src="../../assets/hero-christmas (1).jpg" alt="">
            </div>
            <div class="div-photo-container">
                <img src="../../assets/hero-christmas (1).jpg" alt="">
            </div>

            <div class="div-photo-container">
                <img src="../../assets/hero-christmas (1).jpg" alt="">
            </div>

            <div class="div-photo-container">
                <img src="../../assets/hero-christmas (1).jpg" alt="">
            </div>

            <div class="div-photo-container">
                <img src="../../assets/hero-christmas (1).jpg" alt="">
            </div>
            <div class="div-photo-container">
                <img src="../../assets/hero-christmas (1).jpg" alt="">
            </div>

            <div class="div-photo-container">
                <img src="../../assets/hero-christmas (1).jpg" alt="">
            </div>
        </div>
    </section>
</template>

<style scoped>

.section-photos{
  padding: 25px 45px;
}

.div-title-photos{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.div-photos-container{
    /* display: flex;
    flex-wrap: wrap;
    gap: 20px; */
    margin-top: 40px;

    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    justify-content: center;
    gap: 20px;
}

.div-title-photos h2{
    font-size: 50px;
    text-align: center;
    font-weight: 700;
    color: var(--vt-c-secondary);
}

.div-title-photos h3{
    font-size: 18px;
    font-weight: 550;
    text-align: center;
}
.div-photo-container{
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;    
}

.div-photo-container img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}
   
</style>