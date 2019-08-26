<template>
  <v-flex class="main">
    <v-card max-width="344" class="pa-2">
      <v-card-text>
        <v-text-field
          @keypress.enter="send()"
          hide-details
          outlined
          label="Nombre de Usuario"
          name="username"
          type="text"
          v-model="username"
        />
        <v-text-field
          @keypress.enter="send()"
          hide-details
          outlined
          label="Contraseña"
          name="password"
          type="password"
          v-model="password"
        />
        <div v-if="error!=''" class="error">{{error}}</div>
        <v-btn @click="send()">Ingresar</v-btn>
      </v-card-text>
    </v-card>
  </v-flex>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import User from "../entities/User";
import UserModule from "../UserModule";

@Component({
  components: {}
})
export default class LoginForm extends Vue {
  public username: string = "";
  public password: string = "";
  public error: string = "";
  @Watch("username") watchUsername() {
    this.error = "";
  }
  @Watch("password") watchPassword() {
    this.error = "";
  }
  public async send(): Promise<void> {
    if (this.username != undefined && this.password != undefined) {
      try {
        let user = new User(this.username, this.password);
        let res = await fetch("/api/users/auth", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (res.ok) {
          let jwt: string = await res.text();
          UserModule.token = jwt;
          if (this.$router.currentRoute.name == "home") {
            this.$router.go(0);
          } else {
            this.$router.push("/home");
          }
          console.log(jwt);
        } else {
          let obj: any = await res.json();
          if (obj.error == "Wrong password") {
            this.error = "Usuario o contraseña incorrectos";
          } else if (obj.error == "Username not found") {
            this.error = "Usuario o contraseña incorrectos";
          }

          console.log(obj);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>
<style scoped lang="scss">
.main {
  height: 100%;
  align-items: center;
  justify-content: center;
}
.v-card__text {
  display: flex;
  flex-direction: column;
  padding: 12px;
  > * {
    margin: 8px !important;
  }
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
.error {
  color: #dd3333;
}
</style>
