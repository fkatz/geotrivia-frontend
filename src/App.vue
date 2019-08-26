<template>
<v-app>
  <Navbar/>
  <v-content id="app">
      <router-view/>
  </v-content>
</v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import UserModule from "./UserModule";
import Navbar from "./components/Navbar.vue"
import "vuetify/dist/vuetify.css";

@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {
  private drawerVisible: boolean = false;
}
</script>
<style lang="scss">
body {
  overscroll-behavior: contain;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin:5px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.v-list-item--active .v-icon {
    color: #444;
}
</style>