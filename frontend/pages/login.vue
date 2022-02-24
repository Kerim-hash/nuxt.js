<template>
  <div>
    <h1>Sign in</h1>
    <b-form @submit.prevent="onSignin">
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

      <b-button type="submit" variant="primary" >Submit</b-button>
    </b-form>
    <b-row>
      <h6>Already have an account?</h6>
      <nuxt-link to="signup">Sign up</nuxt-link>
    </b-row>
  </div>
</template>

<script>

import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  middleware: "auth",
  auth: "quest",
  layout: "none",
  data() {
    return {
      form: {
        email: "",
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
    },
  },
  methods: {
    async onSignin() {
      try {
     const  succesfulLogin =  await this.$auth.loginWith('local', {  data: this.form})
         if (succesfulLogin) {
        await this.$auth.setUser({
         email: this.form.email,
         password: this.form.password,
        })
        this.$router.push('/profile')
      }
        this.$router.push("/admin");
        this.clearForm();
      } catch (e) {
        console.log(e);
      }
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.onSignin();
      }
    },
    clearForm() {
      this.form.email = "";
      this.form.password = "";
    },
  },
};
</script>

<style>
</style>