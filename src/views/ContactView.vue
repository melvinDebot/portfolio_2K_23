<template>
  <div class="contact-view">
    <Headband
      v-if="showAnimation"
      key="contact"
      :number="number"
      backgroundContainer="#181818"
      backgroundHeadBand="white"
      colorText="#181818"
      :isContactPage="true"
    />
    <h1 class="contact_title">Contact</h1>
    <div class="contact_container">
      <div class="contact_container_form">
        <div class="form">
          <input type="text" name="text" autocomplete="off" required />
          <label for="text" class="label-name">
            <span class="content-name"> Name </span>
          </label>
        </div>
        <div class="form">
          <input type="text" name="text" autocomplete="off" required />
          <label for="text" class="label-name">
            <span class="content-name"> Email </span>
          </label>
        </div>
        <div class="form">
          <input type="text" name="text" autocomplete="off" required />
          <label for="text" class="label-name">
            <span class="content-name"> Message </span>
          </label>
        </div>
        <button>Send</button>
      </div>
      <h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi
      </h2>
    </div>
  </div>
</template>

<script>
import { TimelineLite } from 'gsap'
import Headband from '../components/transitions/Headband.vue'

export default {
  name: 'ContactView',
  components: {
    Headband
  },
  data: () => ({
    number: 0,
    showAnimation: false
  }),
  methods: {
    incrementTitle() {
      const interval = setInterval(() => {
        if (this.number < 100) {
          this.number += 50
        } else {
          clearInterval(interval)
          setTimeout(() => {
            this.showAnimation = false
          }, 4000)
        }
      }, 50) // Adjust the interval time as needed
    }
  },

  beforeMount() {
    this.showAnimation = true
  },

  mounted() {
    this.incrementTitle()
    const timeline = new TimelineLite()
    timeline.to(
      '.contact_title',
      { top: '145px', left: '159px', ease: 'power2.out', duration: 2 },
      4
    )
  }
}
</script>

<style lang="scss" scoped>
.contact-view {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  padding: 0 20px;
  h1 {
    color: #181818;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .contact_container_form {
    width: 21.45vw;
    height: auto;
    @media screen and (max-width: 700px) {
      width: 100%;
    }
  }
  .contact_container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media screen and (max-width: 700px) {
      flex-direction: column-reverse;
    }
    h2 {
      width: 60%;
      @media screen and (max-width: 700px) {
        width: 100%;
        margin-top: 7em;
      }
    }
    button {
      background: none;
      border: none;
      font-size: 2.4vw;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: black;
      color: white;
      cursor: pointer;
      margin-top: 30px;
      font-family: GalanoGrotesque-SemiBold;
      &:hover {
        -webkit-text-stroke-width: 0px;
        color: #54cc7c;
      }
    }
    .form {
      width: 100%;
      position: relative;
      height: 60px;
      overflow: hidden;
      color: #181818;
      margin-top: 70px;

      input {
        width: 100%;
        height: 100%;
        color: black;
        padding-top: 20px;

        border: none;
        background: none;
        &:focus {
          outline: none;
        }
      }

      label {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 49px;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;
        color: white;
        font-family: GalanoGrotesque-SemiBold;
        pointer-events: none;
        border-bottom: 1px solid black;

        &::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 100%;
          border-bottom: 3px solid #54cc7c;
          transform: translateX(-100%);
          transition: all 0.3s ease;
        }
      }

      input:focus + .label-name,
      input:valid + .label-name {
        .content-name {
          transform: translateY(-150%);
          font-size: 14px;
          -webkit-text-stroke-width: 0px;
          left: 0;
          color: #54cc7c;
        }

        &::after {
          transform: translateX(0%);
        }
      }

      .content-name {
        position: absolute;
        bottom: 0;
        left: 0;
        // padding-bottom: 5px;
        transition: all 0.3s ease;
      }
    }
  }
}
</style>
