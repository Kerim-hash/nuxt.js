<template>
  <div>
    <Header />
    <b-container>
      <nuxt />
    </b-container>
  </div>
</template>

<script>
import Header from "./../components/header/index.vue";

export default {
  components: { Header },
};
</script>

<style>
</style>