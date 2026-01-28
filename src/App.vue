
<template>
  <header class="header">
      <nav class="nav">
        <div class="nav-logo">
          <RouterLink to="/" >
            <div >
              <span class="nav-logo-icon">🎄</span>
            </div>
            <div class="div-logo-text">
              <span>Navidad </span>
              <span>Pantoja</span>
            </div>
          </RouterLink>
        </div>

        <div class="nav-links">
          <RouterLink to="/" class="nav-links-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#321b21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
            <span class="link-text">Inicio</span>
          </RouterLink>
          <RouterLink to="/galeria" class="nav-links-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#321b21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-library-photo"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 3m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 7.26a2.005 2.005 0 0 0 -1.012 1.737v10c0 1.1 .9 2 2 2h10c.75 0 1.158 -.385 1.5 -1" /><path d="M17 7h.01" /><path d="M7 13l3.644 -3.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" /><path d="M15 12l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l2.644 2.644" /></svg>
            <span class="link-text">Galeria</span>
          </RouterLink>
          <RouterLink to="/tematica" class="nav-links-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#321b21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-palette"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" /><path d="M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
            <span class="link-text">Tematica</span>
          </RouterLink>
          <RouterLink to="/amigo-secreto" class="nav-links-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#321b21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-gift"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 8m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z" /><path d="M12 8l0 13" /><path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5" /></svg>
            <span class="link-text">Amigo secreto</span>
          </RouterLink>
          <button class="nav-links-link2" @click="logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#321b21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-logout-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M15 12h-12l3 -3" /><path d="M6 15l-3 -3" /></svg>
            <span class="link-text">Cerrar sesion</span>
          </button>
        </div>
      </nav>
  </header>
<RouterView />
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const router = useRouter()
  
  async function logout() {
    try {
      await axios.post('http://localhost:8000/api/auth/logout',{},{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      localStorage.removeItem('token')
      router.push('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }
  </script>

<style scoped>

.header{
  height: 62px;
  padding: 10px 15px;
  border-bottom: 1px solid var(--vt-c-quaternary);
  display: grid;
  align-items: center;  
}

.nav{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav a{
  text-decoration: none;
  width: auto;
}
.nav-logo{
  display: flex;
  align-items: center;
  font-weight: bold;
}

.nav-logo a{
  display: flex;
  align-items: center;
}
.nav-logo-icon{
  font-size: 30px;
}

.nav-links-link.router-link-exact-active{
  background: red;
  color: white;              
  border-radius: 8px;       
  padding: 0.5rem 0.5rem;     
}

.nav-links-link.router-link-exact-active svg {
  stroke: white;            
}


.nav-links-link:hover, .nav-links-link2:hover{
  background-color: var(--vt-c-quinary);
  width: auto;
  border-radius: 5px;
  padding: 7px;
}


.nav-links-link:active{
  background-color: var(--vt-c-quinary);
}

.nav-links {
  display: flex;
  gap: 3rem; 
}

.nav-links-link, .nav-links-link2{
  display: flex;
  align-items: center;     
  gap: 0.5rem;            
  text-decoration: none;   
  color: inherit;
  background: none;
  border: none;
}

.nav-links-link2{
  font-family: "Mountains of Christmas", serif;
}

.div-logo-text{
  margin-top: 10px;
}

.div-logo-text span{
  color: var(--vt-c-secondary);
  font-weight: bold;
  font-size: 30px;
}

.nav-logo a{
  display: flex;

}

.link-text{
  font-size: 16px;
  font-weight: 650;
}


@media (min-width: 481px) {
  .nav-links-link{
    padding: 7px;
  }
}

@media (max-width: 800px) {
  .link-text {
    display: none;
  }

  .nav-logo{
    font-size: 20px;
    display: flex;
    align-items: center
  }
  .div-logo-text{
    display: flex;
    flex-direction: column;
  }
  .div-logo-text span{
    font-size: 20px;
  }
  .nav-links{
    gap: 2rem;
  }
  .nav-links-link:hover{
    background-color: var(--vt-c-quinary);
    width: auto;
  }
}
</style>
