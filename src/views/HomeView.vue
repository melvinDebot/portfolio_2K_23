<template>
  <Headband
    v-if="showAnimation"
    :number="number"
    backgroundContainer="black"
    backgroundHeadBand="white"
    colorText="white"
  />
  <main>
    <div class="slider" ref="slider">
      <div class="slide" :id="'slide' + index" v-for="(slide, index) in slides" :key="index">
        {{ slide.content }}
      </div>
    </div>

    <!-- <ul :style="{ transform: `translateX(-${currentItemIndex * 1149}px)` }">
        <li v-for="(item, index) in getData" :key="index" :class="{ 'centered': index === currentItemIndex }">
          <RouterLink :to="{ name: 'project', params: { name: item.name } }">
            {{ item.name }}
          </RouterLink>
        </li>
      </ul> -->
    <button @click="nextSlide" class="next_button" :disabled="nextButtonDisabled">Next</button>
    <button @click="prevSlide" class="prev_button" :disabled="prevButtonDisabled">Prev</button>
  </main>
</template>

<script>
import data from '../utils/data.json'
import Headband from '../components/transitions/Headband.vue'
import { TimelineLite, gsap } from 'gsap'

export default {
  name: 'HomeView',
  components: {
    Headband
  },
  data: () => ({
    showAnimation: false,
    number: 0,
    currentItemIndex: 0,
    nextButtonDisabled: false,
    prevButtonDisabled: false,
    tl: new TimelineLite(),
    slides: [
      { content: 'Slide 1', width: 600 },
      { content: 'Slide 2', width: 400 },
      { content: 'Slide 3', width: 400 }
    ]
  }),
  computed: {
    getData() {
      return data
    }
  },
  methods: {
    incrementTitle() {
      const interval = setInterval(() => {
        if (this.number < 100) {
          this.number += 1
        } else {
          clearInterval(interval)
          setTimeout(() => {
            this.showAnimation = false
          }, 4000)
        }
      }, 50) // Adjust the interval time as needed
    },
    nextSlide() {
      if (this.currentItemIndex < this.slides.length - 1) {
        this.currentItemIndex++
      } else {
        this.currentItemIndex = 0
      }
      this.animateSlider()
    },
    prevSlide() {
      if (this.currentItemIndex > 0) {
        this.currentItemIndex--
      } else {
        this.currentItemIndex = this.slides.length - 1
      }
      this.animateSlider()
    },
    animateSlider() {
      this.nextButtonDisabled = true
      this.prevButtonDisabled = true
      const timeline = new TimelineLite()

      console.log('before', this.currentItemIndex - 1, 'after', this.currentItemIndex)

      // Animation pour agrandir l'élément actuel
      timeline.to(
        this.$refs.slider.children[this.currentItemIndex],
        {
          scale: 1,
          duration: 0.5
        },
        2
      )

      // Animation pour mettre à jour le slider (translation)
      timeline.to(
        this.$refs.slider,
        {
          x: -this.currentItemIndex * 800,
          duration: 0.5,
          ease: 'power2.out'
        },
        1
      )

      // Animation pour réduire l'élément précédent
      if (this.currentItemIndex > 0) {
        timeline.fromTo(
          this.$refs.slider.children[this.currentItemIndex - 1],
          {
            scale: 1,
            duration: 0.5
          },
          { scale: 0.5, duration: 0.5 },
          0
        )
      } else {
        // Réduire le dernier élément si l'index est 0 (pour l'effet de boucle)
        timeline.fromTo(
          this.$refs.slider.children[this.slides.length - 1],
          {
            scale: 0.5,
            duration: 0.5
          },
          { scale: 0.5, duration: 0.5 },
          0
        )
      }

      // Animation pour réduire l'élément suivant
      if (this.currentItemIndex < this.slides.length - 1) {
        timeline.to(
          this.$refs.slider.children[this.currentItemIndex + 1],
          {
            scale: 0.5,
            duration: 0.5
          },
          0
        )
      } else {
        // Réduire le premier élément si l'index est le dernier (pour l'effet de boucle)
        timeline.to(
          this.$refs.slider.children[0],
          {
            scale: 0.5,
            duration: 0.5
          },
          0
        )
      }

      // Réactiver les boutons à la fin de l'animation
      timeline.eventCallback('onComplete', () => {
        this.nextButtonDisabled = false
        this.prevButtonDisabled = false
      })
    }
  },
  beforeMount() {
    // this.showAnimation = true;
  },
  mounted() {
    this.incrementTitle()
  }
}
</script>

<style lang="scss" scoped>
main {
  position: relative;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;

  button {
    width: auto;
  }

  .next_button {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .prev_button {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .slider {
    width: 800px;
    height: 550px;
    display: flex;
    flex-direction: row;
  }
  .slide {
    height: 100%;
    flex-shrink: 0;

    width: 100%;
    overflow: hidden;
    scale: 0.5;
    &:nth-child(1) {
      scale: 1;
    }
  }
  .slide:nth-child(1) {
    background: crimson;
  }
  .slide:nth-child(2) {
    background: green;
  }
  .slide:nth-child(3) {
    background: darkcyan;
  }
}
</style>
