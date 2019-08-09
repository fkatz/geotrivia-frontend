<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link v-if="logged" to="/pois">POIs</router-link>
      <router-link v-if="logged" to="/users">Users</router-link>
      <router-link v-if="logged" to="#" @click.native.prevent="logout()">Cerrar Sesión</router-link>
      <router-link v-if="!logged" to="/login">Iniciar Sesión</router-link>
      <router-link v-if="!logged" to="/register">Registrarse</router-link>
    </div>
    <router-view />
  </div>
</template>

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
<script lang="ts">
import { Vue } from "vue-property-decorator";
import POI from "./entities/POI";
export default class App extends Vue {
  get logged(): boolean {
    return localStorage.getItem("jwt") != null;
  }
  logout(): void {
    localStorage.removeItem("jwt");
    if (this.$router.currentRoute.name == "home") {
      this.$router.go(0);
    } else {
      this.$router.push("/home");
    }
  }
}
</script>