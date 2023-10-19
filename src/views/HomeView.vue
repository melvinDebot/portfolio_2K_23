<template>
  <Headband
    v-if="showAnimation"
    :number="number"
    backgroundContainer="black"
    backgroundHeadBand="white"
    colorText="white"
  />
  <main>
    <div class="slider" ref="slider" :style="{ width: sliderWidth + 'px' }">
      <div
        class="slide"
        :id="'slide' + index"
        v-for="(item, index) in getData"
        :key="index"
      >
        <RouterLink :to="{ name: 'project', params: { name: item.name } }">
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
    <div class="buttons">
      <button @click="nextSlide" class="next_button" :disabled="nextButtonDisabled">Next</button>
      <button @click="prevSlide" class="prev_button" :disabled="prevButtonDisabled">Prev</button>
    </div>
  </main>
</template>

<script>
import data from '../utils/data.json'
import Headband from '../components/transitions/Headband.vue'
import { TimelineLite } from 'gsap'

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
    prevButtonDisabled: false
  }),
  computed: {
    getData() {
      return data
    },
    sliderWidth() {
      const screenWidth = window.innerWidth

      // Définir des valeurs de largeur pour desktop, tablette et mobile
      let sliderWidth
      if (screenWidth >= 1200) {
        // Desktop : largeur pour les écrans de 1200 pixels ou plus
        sliderWidth = 800
      } else if (screenWidth >= 768) {
        // Tablette : largeur pour les écrans de 768 pixels ou plus
        sliderWidth = 600
      } else {
        // Mobile : largeur pour les écrans de moins de 768 pixels
        sliderWidth = 300
      }

      return sliderWidth
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
      if (this.currentItemIndex < this.getData.length - 1) {
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
        this.currentItemIndex = this.getData.length - 1
      }
      this.animateSlider()
    },
    animateSlider() {
      this.nextButtonDisabled = true
      this.prevButtonDisabled = true
      const timeline = new TimelineLite()

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
          x: -this.currentItemIndex * this.sliderWidth,
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
          this.$refs.slider.children[this.getData.length - 1],
          {
            scale: 0.5,
            duration: 0.5
          },
          { scale: 0.5, duration: 0.5 },
          0
        )
      }

      // Animation pour réduire l'élément suivant
      if (this.currentItemIndex < this.getData.length - 1) {
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .buttons {
    position: relative;
    width: 50vw;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  button {
    width: auto;
    background: none;
    border: none;
    color: var(--color-text);
    flex-grow: 1;
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
    height: 550px;
    display: flex;
    flex-direction: row;
    position: relative;
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
