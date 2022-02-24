<template>
  <div>
    <b-form @submit.prevent="">
      <b-form-group id="input-group-3" label="Owner:" label-for="input-3">
        <b-form-select v-model="form.ownerID" class="mb-3">
          <b-form-select-option
            v-for="owner in owners"
            :key="owner._id"
            :value="owner._id"
          >
            {{ owner.name }}
          </b-form-select-option>
        </b-form-select>
      </b-form-group>

      <b-form-group id="input-group-3" label="Category:" label-for="input-3">
        <b-form-select v-model="form.categoryID" class="mb-3">
          <b-form-select-option
            v-for="category in categories"
            :key="category._id"
            :value="category._id"
          >
            {{ category.type }}
          </b-form-select-option>
        </b-form-select>
      </b-form-group>

      <b-form-group id="input-group-1" label="Title" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.title"
          type="text"
          placeholder="Enter title"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Stock Quantity" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.stockQuantity"
          placeholder="Enter stock Quantity"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Price" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.price"
          placeholder="Enter price"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description" label-for="input-2">
        <b-form-textarea
          id="input-2"
          v-model="form.description"
          placeholder="Enter Description"
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
      </b-form-group>
      <b-form-file
        @change="onFileSelected"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        class="mb-2"
      ></b-form-file>
      <b-button @click="onAddProduct" type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        ownerID: null,
        categoryID: null,
        title: "",
        price: 0,
        stockQuantity: 1,
        description: "",
        selectedFile: [],
      },
    };
  },
  methods: {
    onFileSelected(event) {
      this.form.selectedFile =  event.target.files[0]
    },
    selectedFileGallery(event) {
      this.form.selectedFileGallery =  event.target.files
    },
    async onAddProduct() {
     	let data = new FormData()
      data.append("title", this.form.title);
      data.append("owner", this.form.ownerID);
      data.append("category", this.form.categoryID);
      data.append("price", this.form.price);
      data.append("stockQuantity", this.form.stockQuantity);
      data.append("photo", this.form.selectedFile);
      data.append("description", this.form.description);

      let result = await this.$axios.$post(
        "/api/products/",
        data
      );
      this.$router.push("/");
    },
  },

  async asyncData({ $axios }) {
    try {
      let responseOwners = $axios.$get("/api/owners");
      let responseCategory = $axios.$get(
        "/api/categories"
      );
      const [Owners, Categories] = await Promise.all([
        responseOwners,
        responseCategory,
      ]);
      return {
        owners: Owners.owners,
        categories: Categories.categories,
      };
    } catch (e) {
      console.log(e);
    }
  },
};
</script>