<script>
import { RouterLink } from 'vue-router'
import { TimelineLite } from 'gsap'

export default {
  name: 'NavBar',
  data: () => ({
    showText: true,
    animationPlayed: false // Ajoutez un état pour vérifier si l'animation a été jouée
  }),
  methods: {
    getScreen() {
      const screenWidth = window.innerWidth
      if (screenWidth <= 500) {
        this.showText = false
      }
    },
    playAnimation() {
      if (!this.animationPlayed) {
        // Vérifiez si l'animation n'a pas encore été jouée
        const timeline = new TimelineLite()
        timeline.from('nav h4', 1.8, {
          y: 100,
          ease: 'power4.out',
          opacity: 0,
          delay: 1,
          skewY: 7,
          stagger: {
            amount: 0.2
          }
        })
        this.animationPlayed = true // Mettez à jour l'état pour indiquer que l'animation a été jouée
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.getScreen()
      this.playAnimation()
    },
      // 8000
      1000
    )
  },
  components: {
    RouterLink
  }
}
</script>

<template>
  <nav>
    <RouterLink to="/">
      <h4 ref="text" class="hover_data">Melvin Debot</h4>
    </RouterLink>

    <h4 v-if="showText" class="hover_data">Developer Front End / Porfolio 2023</h4>
    <RouterLink to="/contact"
      ><button class="hover_data"><h4>Contact Me</h4></button></RouterLink
    >
  </nav>
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  mix-blend-mode: difference;
  position: fixed;
  z-index: 999;
  top: 10px;
  left: 0;
  a {
    text-decoration: none;
    color: var(--color-text);
  }
  h4 {
    opacity: 1;
    mix-blend-mode: difference;
  }
  button {
    background: none;
    color: var(--color-text);
    border: none;
    text-align: center;
    border-radius: 10px;
    padding: 5px;
  }
}
</style>
