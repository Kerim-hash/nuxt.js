<template>
  <div>
    <h1>Category</h1>
    <b-form>
      <label class="sr-only" for="inline-form-input-name">Add new a category</label>
      <b-form-input
        id="inline-form-input-name"
        class="mb-2"
        v-model="type"
        placeholder="Type...."
      ></b-form-input>
      <b-button @click="onAddCategory" variant="primary">Save</b-button>
    </b-form>
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
      type: "",
    };
  },
  methods: {
    async onAddCategory() {
      const data = { type: this.type };
      const result = await this.$axios.$post(
        "/api/categories/",
        data
      );
    },
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