<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/navbar/NavBar.vue';

</script>

<template>
  <NavBar />
  <!-- <header>
    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

