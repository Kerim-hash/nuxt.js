<template>
  <!--MAIN-->
  <main>
    <!--SHOPPING CART-->
    <div v-if="!getCartLength" style="text-align: center; margin-top: 20px">
      <h1>Cart is empty</h1>
      <p>To order food, go to the main page.</p>
      <img
        src="https://i1.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?resize=603%2C288&ssl=1"
        alt=""
      />
    </div>
    <div class="mt-4" v-for="product in getCart" :key="product._id">
      <b-card
        :img-src="product.photo"
        img-alt="Card image"
        img-left
        class="mb-3 card-item"
      >
        <h5>
          {{ product.title }}
        </h5>
        <b-card-text class="cart-description">
          {{ product.description }}
        </b-card-text>
        <select @change="onChangeQuantity($event, product)">
          <option
            v-for="i in 10"
            :key="i"
            :value="i"
            :selected="checkQty(product.quantity, i)"
          >
            Qty: &nbsp;{{ i }}
          </option>
        </select>
        <b-button
          class="ml-2"
          variant="danger"
          @click="$store.commit('removeProduct', product)"
          >Delete</b-button
        >
      </b-card>
      <b-row align-v="center" class="justify-content-md-spacebetween">
        <b-button @click="bayNow" style="margin-left: 20px" variant="success"
          >Bay Now</b-button
        >
        <div class="text-right">
          <p class="a-spacing-none a-spacing-top-mini">
            <span class="a-size-medium"
              >Subtotal ({{ getCartLength }} item)</span
            >
            <span class="a-color-price a-text-bold">
              <span class="a-size-medium a-color-price">{{
                getCartTotalPrice
              }}</span>
            </span>
          </p>
        </div>
      </b-row>
    </div>
  </main>
  <!--/MAIN-->
</template>


<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getCart", "getCartTotalPrice", "getCartLength"]),
  },
  methods: {
    onChangeQuantity(event, product) {
      let qty = +event.target.value;
      this.$store.commit("changeQty", { product, qty });
    },
    checkQty(prodQty, qty) {
      if (parseInt(prodQty) === parseInt(qty)) {
        return true;
      } else {
        return false;
      }
    },
    bayNow() {
      this.$store.dispatch("clearProduct");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.card-item {
  display: flex;
}
@media (max-width: 767px) {
  .card-item {
    flex-direction: column !important;
  }
  .cart-description {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 1.3em;
    height: 3.9em;
  }
  .card-img-left {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
}
</style>