<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/navbar/NavBar.vue'
import TransitionPage from "./components/transitions/TransitionPage.vue";

onMounted(() => {
  const cursor = document.querySelector('.custom-cursor')
  const cursorCircle = document.querySelector('.custom-cursor-circle')

  // Sélectionnez toutes les divs avec la classe hover_data
  const hoverDivs = document.querySelectorAll('.hover_data')

  // Ajoutez un gestionnaire d'événements mouseover à chaque div avec la classe hover_data
  hoverDivs.forEach((div) => {
    div.addEventListener('mouseover', () => {
      // Mettez à jour la taille du cercle du curseur lorsque la souris entre dans la div
      cursorCircle.style.width = '60px'
      cursorCircle.style.height = '60px'
      cursorCircle.style.transform = 'translate(-50%, -50%) scale(1)'
    })

    div.addEventListener('mouseout', () => {
      // Rétablissez la taille du cercle du curseur lorsque la souris quitte la div
      cursorCircle.style.width = '40px'
      cursorCircle.style.height = '40px'

    })
  })

  // Mettez à jour la position du curseur en fonction des coordonnées de la souris
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`
    cursor.style.top = `${e.clientY}px`

    cursorCircle.style.left = `${e.clientX}px`
    cursorCircle.style.top = `${e.clientY}px`
  })
})
</script>

<template>
  <div class="custom-cursor"></div>
  <div class="custom-cursor-circle"></div>
  <NavBar />
  <TransitionPage>
    <RouterView />
  </TransitionPage>
  
</template>

<style scoped lang="css">
/* Curseur personnalisé */
.custom-cursor {
  position: fixed;
  width: 8px;
  height: 8px;
  border: 5px solid #54CC7C;
  border-radius: 50%;
  pointer-events: none; /* Permet au curseur personnalisé de ne pas entrer en conflit avec les éléments de la page */
  transform: translate(-50%, -50%);
  z-index: 9999999;
}

.custom-cursor-circle {
  position: fixed;
  width: 40px;
  height: 40px;
  border: 1px solid #54CC7C;
  border-radius: 50%;
  pointer-events: none; /* Permet au curseur personnalisé de ne pas entrer en conflit avec les éléments de la page */
  transform: translate(-50%, -50%);
  z-index: 9999999;
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
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
