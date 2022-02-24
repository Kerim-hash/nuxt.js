<template>
  <div>
    <h1>Profile</h1>
    <a class="a-button-toggle">23</a>
    <b-form @submit.prevent="validateUser">
      <b-form-group>
        <b-form-group>
          <label for="email">Email:</label>
          <b-form-input
            type="email"
            name="email"
            id="email"
            autocomplete="email"
            v-model="form.email"
           
            :state="$v.form.email.required && $v.form.email.email"
          />
          <span class="md-error" v-if="!$v.form.email.required"
            >The email is required</span
          >
          <span class="md-error" v-else-if="!$v.form.email.email"
            >Invalid email</span
          >
        </b-form-group>
      </b-form-group>
      <b-form-group>
        <b-form-group>
          <label for="name">Name:</label>
          <b-form-input
            type="text"
            name="name"
            id="name"
            autocomplete="name"
            v-model="form.name"
            :state="$v.form.name.required"
          />
          <span class="md-error" v-if="!$v.form.name.required"
            >The name is required</span
          >
        </b-form-group>
      </b-form-group>
      <b-form-group>
        <label for="password">Password</label>
        <b-form-input
          type="password"
          name="password"
          id="password"
          autocomplete="password"
          v-model="form.password"
          :state="$v.form.password.required && $v.form.password.minLength"
        />
        <span class="md-error" v-if="!$v.form.password.required"
          >The password is required</span
        >
        <span class="md-error" v-else-if="!$v.form.password.minLength"
          >the password must contain at least 8 characters</span
        >
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  layout: "none",
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
      },
    };
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(8),
      },
      email: {
        required,
        email,
      },
      name: {
        required,
      },
    },
  },
  methods: {
    async onUpdate() {
        let data = {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
        };
      try {
        let response = await this.$axios.$put("/api/auth/user", data);

        if(response.success){
            this.name = "";
            this.email = "";
            this.password = "";

            await this.$auth.fetcUser()
        }
      } catch (e) {
        console.log(e);
      }
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.onUpdate();
      }
    },
    clearForm() {
      this.form.email = "";
      this.form.name = "";
      this.form.password = "";
      this.form.confirmPassword = "";;
    },
  },
};
</script>

<style>
</style>