<template>
  <div>
              <router-link to="/">Home</router-link>
              <router-link v-if="logged" to="/pois">POIs</router-link>
              <router-link v-if="logged" to="/users">Users</router-link>
              <router-link v-if="logged" to="#" @click.native.prevent="logout()">Cerrar Sesión</router-link>
              <router-link v-if="!logged" to="/login">Iniciar Sesión</router-link>
              <router-link v-if="!logged" to="/register">Registrarse</router-link>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import UserModule from "../UserModule";

export default class Navbar extends Vue {
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