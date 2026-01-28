<script setup>
import BannerIndex from '../components/welcome/BannerIndex.vue'
import MemorialSection from '../components/welcome/MemorialSection.vue' 
import CardsIndex from '../components/welcome/CardsIndex.vue'
import Footer from '../components/welcome/Footer.vue'
</script>

<template>
  <main class="container-index">
    <BannerIndex />
    <MemorialSection />
    <CardsIndex />
  </main>
  <Footer/>
</template>

<style scoped>
.container-index{
  padding: 25px 45px;
}
</style>