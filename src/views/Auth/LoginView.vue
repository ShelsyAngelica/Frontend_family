<template>
    <section class="section-login">
        <div class="login-container">
            <h1>Bienvenido a la mansión</h1>
            <p>Ingresa tus datos para acceder</p>
        </div>

        <div class="login-form">
            <form @submit.prevent="login">
                <input type="email" placeholder="Correo" required v-model="email">
                <input type="password" placeholder="Contraseña" required v-model="password">
                <button type="submit">Ingresar a la mansión</button>
            </form>
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { BASE_URL, API_URL } from '@/config/api';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  const errorMessage = ref('');

  try {
    // Pedir CSRF cookie
    await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
      withCredentials: true
    })

    // Login contra la API real
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        email: email.value,
        password: password.value
      },
      {
        withCredentials: true
      }
    )

    //Guardar el token en localStorage
    localStorage.setItem('token', response.data.token);
    console.log('Respuesta del login:', response.data)
    

    //Redirigir si todo sale bien
    router.push('/amigo-secreto')

  } catch (error) {
    if (error.response?.status === 401) {
      errorMessage.value = 'Credenciales incorrectas'
    } else if (error.response?.status === 422) {
      errorMessage.value = 'Datos inválidos'
    } else {
      errorMessage.value = 'Error inesperado'
    }

    console.error(error)
  }
}
</script>

<style scoped>

.section-login{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 88vh;
    background-size: cover;
    background: url('../../assets/christmas-background.jpeg') ;
    width: 100vw;
}

.login-container{
    color:var(--vt-c-octonary)
}
.login-container h1{
    font-size: 50px;
}

.login-container p{
    text-align: center;
    font-size: 20px;
    font-weight: 550;
    color:var(--vt-c-nonary);
}
.login-form form{
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}

.login-form p{
    text-align: center;
    font-size: 18px;
    font-weight: 550;
    color:var(--vt-c-nonary);
}

.login-form form input{
    width: 250px;
    font-family: 'Mountains of Christmas', serif;
    text-align: center;
    height: 35px;
    border-radius: 8px;
    border: none;
    /* color:var(--vt-c-secondary); */
    border: 2px solid var(--vt-c-quinary);
    font-size: 20px;
}

.login-form form button{
    font-family: 'Mountains of Christmas', serif;
    text-align: center;
    width: 100%;
    height: 40px;
    border: none;
    background-color: var(--vt-c-octonary);
    color:var(--vt-c-octonary);
    border-radius: 8px;
    color:var(--vt-c-senary);
    font-size: 20px;
    font-weight: 550;
    cursor: pointer;
    transition: all 0.3s ease;
}

.login-form form button:hover{
    background-color: var(--vt-c-secondary);
    transform: scale(1.05);
}

.login-form form button:active{
    transform: scale(0.95);
}

@media (max-width: 1001px) {
    .login-container h1{
        font-size: 36px; 
    }
    .login-container p{
        font-size: 20px;
    }
    .login-form form input{
        width: 250px;
    }
    .login-form form button{
        width: 200px;
    }
}

</style>