<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  imagePath: { type: String },
  nameProject: { type: String }
})
const logo = ref()
watchEffect(async () => {
  logo.value = (
    await import(/* @vite-ignore */ `../../assets/${props.nameProject}/${props.imagePath}.png`)
  ).default
})
</script>

<template>
  <img :src="logo" class="image_project" />
</template>

<style lang="scss" scoped>
.image_project {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
