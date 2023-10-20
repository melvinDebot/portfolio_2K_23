<script setup>
import { onMounted} from 'vue'
import {  RouterView } from 'vue-router'
import NavBar from './components/navbar/NavBar.vue'

onMounted(() => {
  const cursor = document.querySelector('.custom-cursor')

  document.addEventListener('mousemove', (e) => {
    // Mettez à jour la position du curseur en fonction des coordonnées de la souris
    cursor.style.left = `${e.clientX}px`
    cursor.style.top = `${e.clientY}px`
  })
})
</script>

<template>
  <div class="custom-cursor"></div>
  <NavBar />
  <!-- <header>
    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<style scoped lang="css">
/* Curseur personnalisé */
.custom-cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  border: 2px solid green;
  border-radius: 50%;
  pointer-events: none; /* Permet au curseur personnalisé de ne pas entrer en conflit avec les éléments de la page */
  transform: translate(-50%, -50%);
  z-index: 9999999;
}

/* Animation de vagues lorsque vous survolez un élément */
.custom-cursor:hover {
  animation: wave 0.5s ease infinite;
}

@keyframes wave {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
