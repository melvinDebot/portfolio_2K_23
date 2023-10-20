<template>
  <div class="container" :style="{ background: backgroundContainer }">
    <div class="heandband" :style="{ backgroundColor: backgroundHeadBand }">
      <h1 ref="title" :style="{ color: colorText }" v-if="!isContactPage">{{ number }} %</h1>
      <h1 ref="heandband_text" :style="{ color: colorText }" v-if="isContactPage">Contact</h1>
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
    isContactPage: Boolean
  },

  computed: {
    getNumber() {
      return this.number
    }
  },

  updated() {
    const timeline = new TimelineLite()
    timeline.to('.heandband', 1, { height: '10vh', ease: 'power2.out' })
    if (this.getNumber === 100) {
      timeline.to('.heandband', 1, { height: '100vh', ease: 'power2.out' }, 2)
    }
  },
  unmounted() {
    // Revoir la transistion de sortie
    const timeline = new TimelineLite()
    timeline.to('.heandband', 1, { opacity: 0, ease: 'power2.out', duration: 1 })
    console.log('unmounted')
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  transition: all 1s ease-in-out;
  z-index: 99999;
  .heandband {
    position: absolute;
    width: 100%;
    height: 0px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h1 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
