<script>
import { RouterLink } from 'vue-router'
export default {
  name: 'NavBar',
  data: () => ({
    showText: true
  }),
  methods: {
    getScreen() {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 500) {
        this.showText = false
      }
    },
  },
  mounted() {
    this.getScreen()
  }

}
</script>

<template>
  <nav>
    <RouterLink to="/"><h3>Melvin Debot</h3></RouterLink>
    
    <h3 v-if="showText">Developer Front End / Porfolio 2023</h3>
    <RouterLink to="/"><button>Contact Me</button></RouterLink>
    
  </nav>
</template>



<style lang="scss" scoped>
nav{
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  a {
    text-decoration: none;
    color: var(--color-text);
  }
  button{
    background: none;
    color: var(--color-text);
    border: 1px solid var(--color-text);
    text-align: center;
    border-radius: 22px;
  }
}

</style>