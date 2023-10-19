<script>
import { RouterLink } from 'vue-router'
import { TimelineLite } from 'gsap'
export default {
  name: 'NavBar',
  data: () => ({
    showText: true
  }),
  methods: {
    getScreen() {
      const screenWidth = window.innerWidth
      if (screenWidth <= 500) {
        this.showText = false
      }
    }
  },
  mounted() {
    this.getScreen()
    const timeline = new TimelineLite()
    setTimeout(() => {
      timeline.from("nav h4", 1.8, {
        y: 100,
        ease: 'power4.out',
        opacity:0,
        delay: 1,
        skewY: 7,
        stagger: {
          amount: 0.2
        }
      })
    }, 8000)
  }
}
</script>

<template>
  <nav>
    <RouterLink to="/">
        <h4 ref="text">Melvin Debot</h4>
    </RouterLink>

    <h4 v-if="showText">Developer Front End / Porfolio 2023</h4>
    <RouterLink to="/contact"><button><h4>Contact Me</h4></button></RouterLink>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  position: fixed;
  z-index: 999;
  top: 10px;
  left: 0;
  a {
    text-decoration: none;
    color: var(--color-text);
  }
  h4{
    opacity: 1;
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
