<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  imagePath: { type: String },
  nameProject: { type: String },
})
const logo = ref()
watchEffect(async () => {
  logo.value = (await import(/* @vite-ignore */ `../../assets/${props.nameProject}/${props.imagePath}.gif`)).default
})
</script>

<template>
  <img :src="logo" class="gif_project"/>
</template>

<style lang="scss" scoped>
  .gif_project {
    width: 100%;
    object-fit: cover;
  }
</style>