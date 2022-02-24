<template>
  <div>
    <b-container>
      <h1>Admin Panel</h1>
      <div class="mb-3">
        <nuxt-link to="/admin/products" class="btn btn-primary"
          >Add Products</nuxt-link
        >
        <nuxt-link to="/admin/owner" class="btn btn-primary"
          >Add owner</nuxt-link
        >
        <nuxt-link to="/admin/category" class="btn btn-primary"
          >Add Category</nuxt-link
        >
      </div>
      <b-row>
        <b-card
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
          v-for="(product, index) in products"
          :key="product._id"
          :img-src="product.photo"
        >
          <b-card-text>
            {{ product.title }}
          </b-card-text>
          <b-card-text>
            {{ product.description }}
          </b-card-text>

          <nuxt-link
            :to="`/admin/products/${product._id}`"
            class="btn btn-primary"
            >update</nuxt-link
          >
          <b-button
            variant="danger"
            @click="onDeleteProduct(product._id, index)"
            class="btn btn-danger"
            >delete</b-button
          >
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  middleware: "auth",
  auth: "quest",
  layout: "none",
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async onDeleteProduct(id, index) {
      try {
        const response = await this.$axios.$delete(`/api/products/${id}`);
        if (response.success) {
          this.products.splice(index, 1);
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/products");
      return {
        products: response.products,
      };
    } catch (e) {}
  },
};
</script>


<style scoped>
.card-img,
.card-img-top {
  height: 200px;
  object-fit: cover;
}
.card {
  width: 350px;
}
</style>
