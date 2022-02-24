<template>
  <!--MAIN-->
  <main>
    <!--REVIEW ADDRESS-->
    <div class="reviewPage mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-8">
            <div class="a-spacing-top-medium">
              <h1 class="a-spacing-base">
                <b>Create Review</b>
              </h1>
              <div class="row">
                <!-- Product Photo -->
                <div class="col-md-2 col-sm-3 col-3">
                  <img :src="product.photo" style="width: 80px" />
                </div>
                <!-- Product Title -->
                <div class="col-md-10 col-sm-9 col-9 m-auto">
                  <h4>
                    <b>{{ product.title }}</b>
                  </h4>
                </div>
              </div>
              <div class="a-spacing-top-medium"></div>
              <hr />
              <h2 class="a-spacing-base">Overall Rating</h2>
                <b-form-rating    variant="warning" v-model="rating"></b-form-rating>
              <div class="a-row a-spacing-top-large">
                <h2>Add photo or video</h2>
                <p style="font-size: 14px; font-weight: 700">
                  Shoppers find images and videos more helpful than text alone.
                </p>
              </div>
              <div class="a-row a-spacing-top-medium">
                <!-- Choose a Photo -->
                <label class="choosefile-button">
                  <i class="fal fa-plus"></i>
                  <input required type="file" @change="onFileSelected" />
                </label>
              </div>
              <div class="a-spacing-top-large"></div>
              <hr />
              <!-- Headline -->
              <div class="headline a-spacing-large">
                <h2 class="a-spacing-base">Add a headline</h2>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 70%"
                  placeholder="What's most important to know?"
                  v-model="headline"
                  required
                />
              </div>
              <!-- Body -->
              <div class="a-spacing-base">
                <h2 class="a-spacing-base">Write your review</h2>
                <textarea
                  placeholder="What do you like or dislike? What did you see this product for?"
                  style="height: 6em; width: 100%"
                  required
                  v-model="body"
                ></textarea>
              </div>
            </div>
            <hr />
            <div class="a-row text-right a-spacing-top-large">
               <b-button variant="outline-primary" @click="onAddReview">Button</b-button>
            </div>
          </div>
          <div class="col-sm-2"></div>
        </div>
        <div class="a-spacing-large pb-5"></div>
        <hr />
      </div>
    </div>
    <!--/REVIEW ADDRESS-->
  </main>
  <!--/MAIN-->
</template>

<script>
export default {
  data() {
    return {
      rating: 0,
      body: "",
      headline: "",
      selectedFile: null,
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    async onAddReview() {
      try{
        let data = new FormData()
        data.append("headline", this.headline)
        data.append("body", this.body)
        data.append("rating", this.rating)
        data.append("photo", this.selectedFile)

        let response = await this.$axios.$post(`/api/reviews/${this.$router.history.current.params.id}/`, data)
        if(response.success){
          this.$router.push( `/product/${this.$router.history.current.params.id}`)
        }
      }catch (e) {
        console.log(e)
      }
    },
  },
  async asyncData({ $axios, params }) {
    try {
      let ProductResponse = await $axios
        .$get(`/api/products/${params.id}`)
        .then((response) => response);
      return {
        product: ProductResponse.product[0],
      };
    } catch (e) {
      console.log(e);
    }
  },
};
</script>