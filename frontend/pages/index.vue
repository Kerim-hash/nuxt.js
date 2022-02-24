<template>
  <div>
    <b-container>
      <b-row align-h="between" style="margin-top: 30px">
        <b-card
          v-for="product in products"
          :key="product._id"
          :title="product.title"
          :img-src="product.photo"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-card-text class="card__description">
            {{ product.description }}
          </b-card-text>
          <div>category: {{product.category.type}}</div>
          <nuxt-link :to="`/product/${product._id}`">
            <b-button variant="success">More</b-button>
          </nuxt-link>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Categories from "../components/category.vue";
export default {
  name: "IndexPage",
  components: { Categories },
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
.card-img-top {
  width: 100%;
  height: 260px;
  object-fit: cover;
}
.card__description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.3em;
  height: 3.9em;
}
.card-body{
        background: rgb(0 43 255 / 20%);
}
</style>
