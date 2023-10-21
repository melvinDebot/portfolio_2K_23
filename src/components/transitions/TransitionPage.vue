<template>
<div>
  <transition
    :name="transitionName"
    :mode="transitionMode"
    :enter-active-class="transitionEnterActiveClass"
  >
    <slot/>
  </transition>
</div>
</template>

<script>
const DEFAULT_TRANSITION = `fade`;
const DEFAULT_TRANSITION_MODE = `out-in`;
export default {
  name: `TransitionPage`,
  data() {
    return {
      transitionName: DEFAULT_TRANSITION,
      transitionMode: DEFAULT_TRANSITION_MODE,
      transitionEnterActiveClass: ``,
    };
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName || DEFAULT_TRANSITION;
      this.transitionMode = DEFAULT_TRANSITION_MODE;

      this.transitionEnterActiveClass = `${transitionName}-enter-active`;

      if (to.meta.transitionName === `zoom`) {
        this.transitionMode = `in-out`;
        this.transitionEnterActiveClass = `zoom-enter-active`;
      }
      if (from.meta.transitionName === `zoom`) {
        this.transitionMode = null;
        this.transitionEnterActiveClass = null;
      }

      if (to.meta.transitionName === `overlay-left`) {
        this.transitionMode = `in-out`;
        this.transitionEnterActiveClass = `overlay-left-enter-active`;
      }
      if (from.meta.transitionName === `overlay-left`) {
        this.transitionMode = `in-out`;
        this.transitionEnterActiveClass = `overlay-left-enter-active`;
      }

      this.transitionName = transitionName;
      next();
    });
  },
  
};
</script>

<style>
/* ANIMATION OVERLAY LEFT */
.overlay-left {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 0;
  z-index: 7;
  background: #ebeff0;
  transition-duration: .55s;
}
.overlay-left-enter ~ .overlay-left,
.overlay-left-leave-to ~ .overlay-left {
  width: 0;
}

.overlay-left-enter-active ~ .overlay-left,
.overlay-left-leave-active ~ .overlay-left {
  width: 100vw;
}

.overlay-left-enter-active ~ .overlay-left {
  transition-timing-function: ease-in;
}

.overlay-left-leave-active ~ .overlay-left {
  transition-timing-function: ease-out;
}

.overlay-left-enter-active,
.overlay-left-leave-active {
  transition-duration: .55s;
}



.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}
.fade-enter,
.fade-leave-active {
  opacity: 0
}


.zoom-enter-active,
.zoom-leave-active {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: zoom;
}
.zoom-leave-active {
  animation-direction: reverse;
}
@keyframes zoom {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  100% {
    opacity: 1;
  }
}
</style>