<template>
  <v-flex class="main" column>
    <v-card class="welcome" max-width="350">
      <v-card-text class="title">
        <h2>Bienvenido a GeoTrivia</h2>
        <v-divider></v-divider>
        <p>
          GeoTrivia es un juego basado en geolocalización.
          Utilizando el gps de tu celular, respondés preguntas y ganás puntos.
        </p>
      </v-card-text>
    </v-card>
    <div v-if="!logged">
      <v-btn to="/login" color="primary" class="my-5">Iniciar sesión</v-btn>
      <v-btn to="/register" color="accent" class="my-5 ml-3">Registrarse</v-btn>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserModule from "../UserModule";
import Map from "../components/Map.vue"
@Component({
  components: {Map}
})
export default class Home extends Vue {
  get logged(): boolean {
    return UserModule.logged;
  }
}
</script>
<style lang="scss" scoped>
.main {
  height: 100%;
  align-items: center;
  justify-content: center;
}
.flex {
  display: flex;
  flex-direction: row;
  &.row {
    flex-direction: row;
  }
  &.column {
    flex-direction: column;
  }
  justify-content: center;
}
.welcome {
  p {
    display: block;
    margin-top: 10px;
    margin-bottom: 0;
    text-align: justify;
  }
}
</style>