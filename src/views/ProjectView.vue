<template>
  <div class="container">
    <div class="wrapper">
      <img
        :src="image"
        alt="personnage"
        class="wrapper_img"
        :style="{ width: sliderWidth + 'px' }"
      />
      <h1>{{ currentData[0].name }}</h1>
    </div>
    <div class="layer">
      <div class="layer_img"></div>
      <div class="layer_text">
        <h3>{{ currentData[0].Catchphrase }}</h3>
        <p>{{ currentData[0].text }}</p>
      </div>
    </div>
    <div class="layer">
      <div class="layer_video"></div>
    </div>
    <div class="layer">
      <div class="layer_services">
        <h4>Services</h4>
        <ul>
          <li v-for="item in currentData[0].services" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="layer_img"></div>
    </div>
    <div class="layer">
      <div class="layer_services">
        <h4>Feature</h4>
        <ul>
          <li v-for="item in currentData[0].features" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="layer_img"></div>
    </div>
  </div>
</template>

<script>
import data from '../utils/data.json'
import LargeImg from '../assets/bolk/large_img.png'
import { TimelineLite } from 'gsap'
export default {
  name: 'ProjectView',
  data: () => ({
    image: LargeImg
  }),

  computed: {
    getData() {
      return data
    },
    currentData() {
      return this.getData.filter((item) => item.name === this.$route.params.name)
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
  mounted() {
    const timeline = new TimelineLite()
    timeline.to('.wrapper_img', 1, { width: '100vw', height: '100vh', ease: 'power2.out' })
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
  transition: opacity 1s ease-in-out;
  border: 1px solid red;
  padding: 0 5vw;
  @media (max-width: 768px){
    padding: 0 10px;
  }
  .wrapper {
    width: 100%;
    height: 100vh;
    position: relative;
    text-align: center;
    h1 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 9vw;
    }
    .wrapper_img {
      position: absolute;
      top: 374px;
      left: 50%;
      transform: translate(-50%, -50%);

      height: 550px;
    }
  }
  .layer {
    width: 100%;
    height: auto;
    border: 1px solid green;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: 40px 0px;
    @media (max-width: 768px) {
      flex-direction: column;
    }
    h3{
      margin: 10px 0px;
    }

    .layer_img {
      width: 650px;
      height: 345px;
      background: grey;
      border-radius: 40px;
      @media (max-width: 768px) {
        width: 357px;
        height: 364px;
      }
    }
    .layer_video {
      width:100%;
      height: 345px;
      background: grey;
    }
    .layer_text {
      align-self: baseline;
      margin-left: 20px;
    }
  }
}
</style>
