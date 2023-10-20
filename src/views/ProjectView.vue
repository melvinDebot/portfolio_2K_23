<template>
  <div class="container">
    <div class="wrapper">
      <ImageComponent class="wrapper_img" imagePath="large_img" :nameProject="currentData[0].name" />

      <h1>{{ currentData[0].name }}</h1>
    </div>
    <div class="layer">
      <div class="layer_img reveal">
        <ImageComponent imagePath="img_01" :nameProject="currentData[0].name" />
      </div>
      <div class="layer_text">
        <h2 class="text_color_white">{{ currentData[0].Catchphrase }}</h2>
        <h3 class="text_color_white">{{ currentData[0].text }}</h3>
      </div>
    </div>
    <div class="layer">
      <div class="layer_video">
        <VideoComponent :imagePath="currentData[0].name" :nameProject="currentData[0].name" />
      </div>
    </div>
    <div class="layer">
      <div class="layer_services">
        <h3>Services</h3>
        <ul>
          <li v-for="item in currentData[0].services" :key="item">
            <h3 class="text_color_white">{{ item }}</h3>
          </li>
        </ul>
      </div>
      <div class="layer_img_small reveal">
        <ImageComponent imagePath="small_img" :nameProject="currentData[0].name" />
      </div>
    </div>
    <div class="layer">
      <div class="layer_services">
        <h3>Feature</h3>
        <ul>
          <li v-for="item in currentData[0].features" :key="item">
            <h3 class="text_color_white">{{ item }}</h3>
          </li>
        </ul>
      </div>
      <div class="layer_img_small reveal">
        <ImageComponent imagePath="img_02" :nameProject="currentData[0].name" />
      </div>
    </div>
    <div class="layer">
      <div>
        <h3>Year</h3>
        <h3 class="text_color_white">{{ currentData[0].year }}</h3>
      </div>
    </div>
    <div class="layer">
      <div>
        <h3 class="text_color_white">Website</h3>
        <a :href="currentData[0].website_url" target="_blank"
          ><h3 class="text_color_white">{{ currentData[0].name }}</h3></a
        >
      </div>
    </div>
    <div class="layer">
      <div class="layer_next_project">
        <h3>Next Project</h3>
        <span></span>
        <h3>Scroll</h3>
      </div>
    </div>
    <div class="next_project">
      <ImageComponent imagePath="large_img" :nameProject="getNameNextProject(currentData[0].name)" />
      <h1>{{ getNameNextProject(currentData[0].name) }}</h1>
    </div>
  </div>
</template>

<script>
import data from '../utils/data.json'
import LargeImg from '../assets/bolk/large_img.png'
import { TimelineLite, gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ImageComponent from '../components/image/ImageComponent.vue'
import VideoComponent from '../components/video/VideoComponent.vue'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'ProjectView',
  components: {
    ImageComponent,
    VideoComponent
  },
  data: () => ({
    image: LargeImg
  }),
  methods: {
    scrollAnimation() {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.next_project',
          start: this.getSizeScreen,
          markers: true,
          scrub: true,
          pin: true,
          onEnter: () => {
            this.navigateToNextPage(this.currentData[0].name)
          }
        }
      })
    },
    getNameNextProject(currentName) {
      const currentIndex = data.findIndex((item) => item.name === currentName)
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % data.length
        const nextObjectName = data[nextIndex].name
        return nextObjectName
      } else {
        return data[0].name
      }
    },
    revealImg() {
      let revealContainers = document.querySelectorAll('.reveal')
      revealContainers.forEach((container) => {
        let image = container.querySelector('img')
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            toggleActions: 'restart none none reset'
          }
        })

        tl.set(container, { autoAlpha: 1 })
        tl.from(container, 1.5, {
          xPercent: -50,
          opacity: 0,
          ease: 'power2.out'
        })
        tl.from(image, 1.5, {
          xPercent: 50,
          opacity: 1,
          scale: 1.3,
          delay: -1.5,
          ease: 'power2.out'
        })
      })
    },
    navigateToNextPage(name) {
      // Trouver l'indice de l'objet ayant le nom donné
      const currentIndex = data.findIndex((item) => item.name === name)

      // Si l'objet est trouvé dans le tableau
      if (currentIndex !== -1) {
        // Trouver l'indice de l'objet suivant
        const nextIndex = (currentIndex + 1) % data.length // Utilisation du modulo pour revenir au premier élément si c'est le dernier

        // Obtenir le nom de l'objet suivant
        const nextObjectName = data[nextIndex].name

        // Rediriger vers l'objet suivant
        this.$router.push({ name: 'project', params: { name: nextObjectName } })
      } else {
        // Si l'objet n'est pas trouvé, rediriger vers la première page
        this.$router.push({ name: 'project', params: { name: data[0].name } })
      }
      window.scrollTo({
        top: 0
      })
    }
  },

  computed: {
    getData() {
      return data
    },
    currentData() {
      return this.getData.filter((item) => item.name === this.$route.params.name)
    },
    sliderWidth() {
      return '100%'
    },
    getSizeScreen() {
      if (window.innerWidth < 768) {
        return 'top top'
      } else {
        return '1170 top'
      }
    }
  },
  mounted() {
    this.scrollAnimation()
    this.revealImg()
    const timeline = new TimelineLite()
    timeline.to('.wrapper_img', 1, { height: '100vh', width: '100%', ease: 'power2.out' })
    timeline.to('.wrapper h1', 1, { opacity: '1', ease: 'power2.out' })
  },
  unmounted() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  position: relative;
  transition: opacity 1s ease-in-out;
  z-index: 99999999;

  h1 {
    opacity: 0;
  }
  .text_color_white {
    color: white;
  }

  @media (max-width: 768px) {
    padding: 0 10px;
  }

  .layer_next_project {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    h3 {
      text-align: center;
    }
  }
  span {
    width: 2px;
    height: 70px;
    background: white;
    align-self: center;
    justify-self: center;
  }

  .reveal {
    visibility: hidden;
    position: relative;
    width: auto;
    height: auto;
    overflow: hidden;
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
      height: 550px;
      width: 600px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      @media (max-width: 768px) {
        width: 300px;
      }
    }
  }
  .layer {
    width: 100%;
    height: auto;
    margin: 40px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0px 5vw;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }

    li {
      list-style: none;
      color: var(--color-text);
    }

    .layer_img {
      min-width: 32.5vw;
      min-height: 32.25vw;
      border-radius: 20px;
      @media (max-width: 768px) {
        width: 100%;
        height: 364px;
      }
    }

    .layer_img_small {
      min-width: 32.05vw;
      min-height: 26.5vw;
      border-radius: 20px;

      @media (max-width: 768px) {
        width: 100%;
        height: 364px;
        margin: 20px 0px;
      }
    }
    .layer_video {
      width: auto;
      height: auto;
      border-radius: 20px;
    }
    .layer_text {
      align-self: baseline;
      margin-left: 20px;
      @media (max-width: 768px) {
        margin-left: 0px;
        margin-top: 20px;
      }
    }
  }

  .next_project {
    width: 100%;
    height: 100vh;
    background: grey;
  }
}
</style>
