<template>
  <div class="container" >
    <div class="heandband">
      <h1 ref="title">{{ number }} %</h1>
    </div>
  </div>
</template>

<script>
import { TimelineLite } from 'gsap'

export default {
  name: 'HeadbandComponent',
  props: {
    number: Number,
    backgroundContainer: String,
    backgroundHeadBand: String,
    colorText: String,
  },

  computed : {
    getNumber() {
      return this.number
    },
  },

  updated() {
    const timeline = new TimelineLite()
    timeline.to(".heandband", 1, { height: "10vh", ease: "power2.out" })
    if (this.getNumber === 100) {
      timeline.to(".heandband", 1, { height: "100vh", ease: "power2.out" }, 2)
    }
  },
  unmounted() {
    // Revoir la transistion de sortie
    console.log('unmounted')
  }
  
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100vh;
  background: white;
  transition: all 1s ease-in-out;
  z-index: 99999;
  .heandband {
    position: absolute;
    width: 100%;
    height: 0px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #282828;
    h1 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      
    }
  }
}
</style>
