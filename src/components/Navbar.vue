<template>
  <div>
    <v-app-bar app flat dark color="accent">
      <v-app-bar-nav-icon v-show="$vuetify.breakpoint.xs" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{currentTitle}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer
      app
      dark
      v-model="drawer"
      :permanent="!$vuetify.breakpoint.xs"
      color="accent"
    >
      <div v-show="!$vuetify.breakpoint.xs">
        <v-list-item>
          <v-list-item-title class="title">GeoTrivia</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
      </div>
      <v-list class="elevation-0" dense nav>
        <v-list-item link to="/">Home</v-list-item>
        <v-list-item link v-if="logged" to="/pois">POIs</v-list-item>
        <v-list-item link v-if="logged" to="/users">Users</v-list-item>
        <v-list-item link v-if="logged" to="#" @click.native.prevent="logout()">Cerrar Sesión</v-list-item>
        <v-list-item link v-if="!logged" to="/login">Iniciar Sesión</v-list-item>
        <v-list-item link v-if="!logged" to="/register">Registrarse</v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import UserModule from "../UserModule";

@Component
export default class Navbar extends Vue {
  drawer: boolean = false;
  logged: boolean = false;
  currentTitle:string = "";
  mounted() {
    this.logged = UserModule.logged;
    UserModule.emitter.addEventListener("login", () => (this.logged = true));
    UserModule.emitter.addEventListener("logout", () => (this.logged = false));
    this.currentTitle = this.$router.currentRoute.meta.title
    this.$router.afterEach(()=>{
      this.currentTitle = this.$router.currentRoute.meta.title
      });
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



<style>
.v-overlay.v-overlay--active.theme--dark {
  z-index: 6 !important;
}
.v-list-group-active {
  color: white;
}
.v-toolbar__title {
  user-select: none;
}
.v-list-item--active {
  color: white !important;
}
</style>