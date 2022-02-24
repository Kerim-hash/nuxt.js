<template>
  <di>
    <h1>{{ product.title }}</h1>
    <div class="product_items">
      <b-col md="12" xl="4">
        <img class="product-image" :src="product.photo" alt="product-photo" />
        <h5 style="margin-top: 30px">Author</h5>
        <b-row align-v="center">
          <img class="product-avatar" :src="product.owner.photo" alt="avatar" />
          <h6 class="product-author">{{ product.owner.name }}</h6>
        </b-row>
      </b-col>
      <b-col md="12" xl="8">
        <b-card>
          <h2>{{ product.title }}</h2>
          <p>{{ product.description }}</p>
          <b-card-text> ${{ product.price }} </b-card-text>
          <b-button variant="info" @click="addProductToCart(product)"
            >Add to Cart</b-button
          >
        </b-card>
      </b-col>
    </div>

    <reviewSerction :reviews="reviews" :product="product" />
  </di>
</template>

<script>
import reviewSerction from "../../components/reviewsSection.vue";
import { mapActions } from "vuex";
export default {
  components: { reviewSerction },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["addProductToCart"]),
  },

  async asyncData({ $axios, params }) {
    try {
      let singleProduct = await $axios.$get(`/api/products/${params.id}`);
      let manyReviews = await $axios.$get(`/api/reviews/${params.id}`);

      const [ProductResponse, ReviewsResponse] = await Promise.all([
        singleProduct,
        manyReviews,
      ]);
      console.log(ReviewsResponse);
      return {
        product: ProductResponse.product[0],
        reviews: ReviewsResponse.reviews,
      };
    } catch (e) {
      console.log(e);
    }
  },
};
</script>



<style scoped>
.product-image {
  width: 350px;
  height: 400px;
  object-fit: contain;
}
.product-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
.product-author {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
  margin-left: 20px;
}
.product_items {
  display: flex;
}

@media (max-width: 910px) {
  .product_items {
    flex-direction: column-reverse;
  }
}

@media (max-width: 768px) {
  .product-image {
    width: 160px;
    height: 290px;
  }
}
</style>