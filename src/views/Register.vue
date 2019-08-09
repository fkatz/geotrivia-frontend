<template>
  <div>
    <h1>Registrarse</h1>
    <RegisterForm></RegisterForm>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RegisterForm from "../components/RegisterForm.vue";
@Component({
  components: {
    RegisterForm
  }
})
export default class Register extends Vue {}
</script>
