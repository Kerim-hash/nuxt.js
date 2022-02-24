<template>
  <div>
    <hr />
    <div class="reviewsMedley">
      <div class="row">
        <div class="col-lg-4 col-md-5 col-sm-12">
          <!-- Total Customer reviews -->
          <h3>{{ product.reviews.length }} customer reviews</h3>

          <h4>Share your thoughts with other customers</h4>
          <nuxt-link
            :to="`/review/${product._id}`"
            href="#"
            class="a-button-text"
            role="button"
            >Write a customer review</nuxt-link
          >
        </div>
        <div class="col-lg-6 col-md-7 col-sm-12">
          <div class="reviews-image-gallery">
            <h3>Customer images</h3>
            <!-- Review Images -->
            <div class="a-spacing-small a-spacing-top-small">
              <img
                class="img-fluid"
               
                v-for="review in reviews"
                :key="review._id"
                :src="review.photo"
              />
            </div>
          </div>

          <div class="cr-widget-focalreviews">
            <div class="card-padding">
              <div class="review-header">
                <h3>
                 Showing 1-8 of {{ product.reviews.length }} reviews
                </h3>
              </div>
              <!-- Reviews -->
              <div
                class="review-body"
                v-for="review in reviews"
                :key="review._id"
              >
                <div class="genome-widget">
                      <img
                        src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
                      />
                    <div class="profile-content">
                      <span class="profile-name">{{ review.user.name }}</span>
                    </div>
                </div>

                <div class="a-row">
                  <!-- Review Star -->
                  <b-row style="margin-left: 5px; margin-top: 5px">
                    <p v-for="i in review.rating" :key="i">★</p>
                  </b-row>
                  
                  <!-- Review Headline -->
                  <h5 class="review-title">{{ review.headline }}</h5>
                </div>
                
                <!-- Review Body -->
                <div>
                  <span>{{ review.body }}</span>
                </div>
                <hr />
              </div>
              <!-- Reviews -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product", "reviews"],
};
</script>


<style scoped>
  .profile-name{
    margin-left: 20px;
    color: #030303;
    font-size: 16px;

  }
  .review-body{
    margin-top:20px
  }
  .genome-widget{
    display: flex;
    align-items: center;
  }
  .img-fluid{
    width: 150px;
    height: 150px;
    object-fit: contain;
  }
</style>