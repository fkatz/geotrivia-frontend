<template>
<div id="app">
  <Navbar id="nav"/>
      <router-view/>
      </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import UserModule from "./UserModule";
import Navbar from "./components/Navbar.vue"

@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {
  private drawerVisible: boolean = false;
  get logged(): boolean {
    return UserModule.logged;
  }
  logout(): void {
    UserModule.logout();
    if (this.$router.currentRoute.name == "home") {
      this.$router.go(0);
    } else {
      this.$router.push("/home");
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
</style>