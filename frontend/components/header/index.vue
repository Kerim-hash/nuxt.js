<template>
  <header class="header">
    <div class="hader__inner">
      <div class="header__logo">
        <nuxt-link to="/">
          <img class="logo" src="@./../../static/icon.png" alt="logo" />
        </nuxt-link>
      </div>

      <b-sidebar id="sidebar-1" title="Sidebar" shadow>
        <div class="px-3 py-2">
          <div class="header__vidgets" v-if="mobileNav">
            <div v-if="auth">
              {{ this.$store.state.auth.user.email }}
            </div>

            <nuxt-link to="login" v-else>
              <b-container class="bv-example-row bv-example-row-flex-cols">
                <img
                  class="header__icon"
                  src="https://www.pikpng.com/pngl/b/283-2837538_login-icon-line-icons-iconscout-login-icon-images.png"
                  alt="login"
                />
                <h6>Войти</h6>
              </b-container>
            </nuxt-link>

            <nuxt-link to="/cart">
              <b-container class="bv-example-row bv-example-row-flex-cols">
                <img
                  class="header__icon"
                  src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                  alt="login"
                />
                <h6>Корзина ({{ getCartLength }})</h6>
              </b-container>
            </nuxt-link>
          </div>
        </div>
      </b-sidebar>

      <div class="header__search">
        <input class="header__search-input" placeholder="Я ищу.." />
      </div>
      <button
        v-b-toggle.sidebar-1
        v-if="mobileNav"
        :class="`burger ${mobileNav && 'burger--active'}`"
      >
        <span></span>
      </button>
      <div class="header__vidgets" v-if="!mobileNav">
        <div v-if="auth">
          <nuxt-link to="/admin">
            {{ this.$store.state.auth.user.email }}
          </nuxt-link>
        </div>
        <nuxt-link to="login" v-else>
          <b-container class="bv-example-row bv-example-row-flex-cols">
            <img
              class="header__icon"
              src="https://www.pikpng.com/pngl/b/283-2837538_login-icon-line-icons-iconscout-login-icon-images.png"
              alt="login"
            />
            <h6>Войти</h6>
          </b-container>
        </nuxt-link>

        <nuxt-link to="/cart">
          <b-container class="bv-example-row bv-example-row-flex-cols">
            <img
              class="header__icon"
              src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
              alt="login"
            />
            <h6>Корзина ({{ getCartLength }})</h6>
          </b-container>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  created() {
    if (process.browser) {
      window.addEventListener("resize", this.checkScreen);
      this.checkScreen();
    }
  },
  data() {
    return {
      auth: !!this.$store.state.auth.user,
      mobileNav: null,
      windowWidth: null,
    };
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 768) {
        this.mobileNav = true;
        return;
      }
      this.mobileNav = false;
      return;
    },
  },
  computed: {
    ...mapGetters(["getCartLength"]),
  },
  mounted() {
    console.log(!!this.$store.state.auth.user);
  },
};
</script>

<style>
.header {
  background-color: rgb(91, 184, 132);
}
.hader__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1220px;
  padding: 10px 15px;
  margin: 0 auto;
}
.logo {
  width: 120px;
  height: 120px;
}
.header__search-input {
  background: rgb(23 50 33 / 27%);
  padding: 16px 32px;
  border: none;
  display: block;
  font-weight: 600;
  color: #fff;
  -webkit-appearance: none;
  transition: all 240ms ease-out;
  width: 500px;
  border-radius: 12px;
}
.header__search-input::placeholder {
  color: #fff;
}

.header__search-input:focus {
  outline: none;
}
.header__vidgets {
  display: flex;
  align-items: center;
}
.header__icon {
  width: 40px;
  height: 40px;
}
.burger {
  display: flex;
  justify-content: center;
  width: 22px;
  height: 19px;
  position: relative;
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
}
.burger::after,
.burger::before {
  content: "";
  width: 100%;
  height: 2px;
  background-color: #0a3622;
  position: absolute;
  transition: all 0.5s;
}
.burger.collapsed span {
  width: 100%;
  height: 2px;
  background-color: #0a3622;
  top: 9px;
  position: absolute;
}

.burger::after {
  bottom: 0;
}
.burger::before {
  top: 0;
}
.burger.burger--active.not-collapsed {
  z-index: 3;
}
.burger.burger--active.not-collapsed span {
  opacity: 0;
  transition: opacity 0.3s;
}
.burger.burger--active.not-collapsed::after {
  width: 26px;
  transform: translateY(-10px) rotate(-135deg);
}
.burger.burger--active.not-collapsed::before {
  width: 26px;
  transform: translateY(7px) rotate(135deg);
}
@media (max-width: 768px) {
  .header__search-input {
    max-width: 300px;
  }
  .header__vidgets {
    flex-direction: column;
  }
  .logo {
    width: 50px;
    height: 50px;
  }
}
@media (max-width: 468px) {
  .header__search-input {
    max-width: 210px;
    padding: 8px 12px;
  }
}
</style>