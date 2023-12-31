<template>
  <Headband
    v-if="showAnimation"
    key="home"
    :isContactPage="false"
    :number="number"
    backgroundContainer="white"
    backgroundHeadBand="#181818"
    colorText="white"
  />
  <main>
    <div class="slider" ref="slider" :style="{ width: sliderWidth + 'px' }">
      <div
        class="slide"
        :id="'slide' + index"
        v-for="(item, index) in getData"
        :key="index"
        @click="animationTransitionPage(item.name)"
      >
        <h1>{{ item.name }}</h1>

        <ImageComponent imagePath="large_img" :nameProject="item.name" />
      </div>
    </div>
    <div class="buttons">
      <button
        @click="nextSlide"
        class="next_button hover_data"
        :disabled="nextButtonDisabled"
        v-show="currentItemIndex < getData.length - 1"
      >
        <h3>Next</h3>
        <IconArrow width="24" height="24" />
      </button>
      <button
        @click="prevSlide"
        class="prev_button hover_data"
        :disabled="prevButtonDisabled"
        v-show="currentItemIndex > 0"
      >
        <IconArrow width="24" height="24" class="rotate" />
        <h3>Prev</h3>
      </button>
    </div>
  </main>
</template>

<script>
import data from '../utils/data.json'
import Headband from '../components/transitions/Headband.vue'
import { TimelineLite, gsap } from 'gsap'
import LargeImgBolk from '../assets/bolk/large_img.png'
import LargeImgMdt from '../assets/mdt/large_img.png'
import LargeImgMadamePee from '../assets/madamepee/large_img.png'
import ImageComponent from '../components/image/ImageComponent.vue'
import IconArrow from '../components/icons/IconArrow.vue'

export default {
  name: 'HomeView',
  components: {
    Headband,
    ImageComponent,
    IconArrow
  },
  data: () => ({
    showAnimation: false,
    number: 0,
    currentItemIndex: 0,
    nextButtonDisabled: false,
    prevButtonDisabled: false,
    imageBolk: LargeImgBolk,
    imageMdt: LargeImgMdt,
    imageMadamePee: LargeImgMadamePee
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

    animationTransitionPage(projectName) {
      setTimeout(() => {
        this.$router.push({ name: 'project', params: { name: projectName } })
      }, 1000)
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
          scale: 0.5,
          duration: 0.5,
          x: -(this.currentItemIndex * this.sliderWidth)
        },
        1
      )

      timeline.to(
        this.$refs.slider.children[this.currentItemIndex],
        {
          scale: 1,
          duration: 0.5
        },
        2
      )

      // Animation pour réduire l'élément précédent
      if (this.currentItemIndex > 0) {
        timeline.to(
          this.$refs.slider.children[this.currentItemIndex - 1],
          {
            scale: 0.5,
            duration: 0.5
          },
          0
        )

        timeline.to(
          this.$refs.slider.children[this.currentItemIndex - 1],
          {
            scale: 0.5,
            duration: 0.5,
            x: -(this.currentItemIndex * this.sliderWidth)
          },
          1
        )
      } else {
        // Réduire le dernier élément si l'index est 0 (pour l'effet de boucle)
        timeline.to(
          this.$refs.slider.children[this.getData.length - 1],
          {
            scale: 0.5,
            duration: 0.5,
            x: -(this.currentItemIndex * this.sliderWidth)
          },
          1
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
          0.5
        )

        timeline.to(
          this.$refs.slider.children[this.currentItemIndex + 1],
          {
            scale: 0.5,
            duration: 0.5,
            x: -(this.currentItemIndex * this.sliderWidth)
          },
          1
        )
      } else {
        // Réduire le premier élément si l'index est le dernier (pour l'effet de boucle)
        timeline.to(
          this.$refs.slider.children[0],
          {
            scale: 0.5,
            duration: 0.5
          },
          0.5
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
    // this.showAnimation = true
  },

  mounted() {
    this.incrementTitle()
    const timeline = new TimelineLite()
    const sliders = document.querySelectorAll('.slide')
    const sliderText = document.querySelectorAll('.slide h1')
    const buttons = document.querySelectorAll('.buttons button')
    setTimeout(() => {
      timeline.staggerFromTo(
        sliders,
        1,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: 'power4.out' },
        0.5
      )

      timeline.add(() => {
        gsap.fromTo(
          sliderText,
          2,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease: 'power4.out', stagger: 0.5 }
        )
      }, 1)

      timeline.add(() => {
        gsap.fromTo(
          buttons,
          2,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease: 'power4.out', stagger: 0.5 }
        )
      }, 1.5)
    }, 2500)
  }
}
</script>

<style lang="scss" scoped>
main {
  position: relative;
  left: 0;
  top: 0;
  height: 96%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;

  .rotate {
    transform: rotate(180deg);
  }

  .buttons {
    position: fixed;
    bottom: 1%;
    transform: translate(0, -50%);

    width: 50vw;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    width: auto;
    background: none;
    border: none;
    color: var(--color-text);
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    h3 {
      margin: 0px 10px;
    }
  }

  .next_button {
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
  }
  .prev_button {
    position: absolute;
    bottom: 0;
    left: 0;
    cursor: pointer;
  }

  .slider {
    height: 550px;
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
  }
  .slide {
    height: 100%;
    flex-shrink: 0;
    opacity: 0;
    z-index: 1;
    width: 100%;
    overflow: hidden;
    scale: 0.5;
    &:nth-child(1) {
      scale: 1;
    }
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 1;
    }
    h1 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      opacity: 0;
    }
  }
}
</style>
