<template>
  <div>
    <h1>Category</h1>
    <b-list-group class="mt-4">
      <b-list-group-item v-for="category in categories" :key="category._id">
        {{ category.type }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  async asyncData({ $axios }) {
    try {
         let responseCategory = await $axios.$get(
        "/api/categories"
      );

      return {
        categories: responseCategory.categories,
      };

    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style>
</style>