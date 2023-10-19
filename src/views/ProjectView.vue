<template>
  <div class="project-view">
    <h1>Project {{ currentData[0].name }} this</h1>
  </div>
</template>

<script>
import data from '../utils/data.json'
export default {
  name: 'ProjectView',

  computed: {
    getData() {
      return data
    },
    currentData() {
      return this.getData.filter((item) => item.name === this.$route.params.name)
    }
  },

}
</script>

<style>

</style>