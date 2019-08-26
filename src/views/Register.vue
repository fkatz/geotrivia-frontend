<template>
    <RegisterForm></RegisterForm>
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
