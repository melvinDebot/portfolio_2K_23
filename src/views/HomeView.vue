<template>
  <main>
    <ul>
      <li v-for="(item, index) in getData" :key="index">
        <RouterLink :to="{ name: 'project', params: { name: item.name } }">
          {{ item.name }}
        </RouterLink>
      </li>
    </ul>
  </main>
</template>

<script>
import data from '../utils/data.json'
export default {
  name: 'HomeView',
  computed: {
    getData() {
      return data
    },
  },

}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  ul{
    display: flex;
    border: 1px solid red;
    li {
      width: 1129px;
      height: 573px;
      background: gray;
      margin: 10px;
      border-radius: 10px;
      text-align: center;
    }
  }
}
</style>
