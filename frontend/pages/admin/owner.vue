<template>
  <div>
    <h1>Add new a Owner</h1>
    <b-form>
      <b-form-group id="input-group-2" label="Name:" label-for="name">
        <b-form-input
          id="name"
          v-model="name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="About:" label-for="about">
        <b-form-input
          id="about"
          v-model="about"
          placeholder="Enter about"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-file
        @change="onFileSelected"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>

      <b-button @click="onAddCategory" variant="primary">Save</b-button>
    </b-form>
    <b-list-group class="mt-2">
      <b-list-group-item v-for="owner in owners" :key="owner._id">
        {{ owner.name }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      about: "",
      selectedFile: [],
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    async onAddCategory() {
        try{

            let data = new FormData();
            data.append("name", this.name);
            data.append("about", this.about);
            data.append("photo", this.selectedFile);
      
            let result = await this.$axios.$post(
              "/api/owners/",
              data
            );
            this.owners.push({name: this.name});
        }catch (e) {
            console.error(e)
        }

    },
  },

  async asyncData({ $axios }) {
    try {
      let responseOwners = await $axios.$get(
        "/api/owners"
      );

      return {
        owners: responseOwners.owners,
      };
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style>
</style>