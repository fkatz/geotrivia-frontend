<template>
  <div class="pois">
    <div class="newPOI flex">
      <div class="flex column">
        <div class="ctrl">
          <label for="username">Nombre de Usuario</label>
          <input name="username" type="text" v-model="username" />
        </div>        
        <div class="ctrl">
          <label for="password">Contraseña</label>
          <input name="password" type="password" v-model="password" />
        </div>
        <div v-if="error!=''" class="error">{{error}}</div>
        <div class="ctrl right">
          <input type="button" @click="send()" value="Ingresar" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import User from "../entities/User";
@Component({
  components: {}
})
export default class LoginForm extends Vue {
  public username: string = "";
  public password: string = "";
  public error: string = "";
  @Watch("username") watchUsername(){
    this.error = "";
  }
    @Watch("password") watchPassword(){
    this.error = "";
  }
  public async send(): Promise<void> {
    if (
      this.username != undefined &&
      this.password != undefined
    ) {
      try {
        let user = new User(this.username, this.password);
        let res = await fetch("/api/auth", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          }
        });
        if(res.ok){
        let jwt: string = await res.text();
        localStorage.setItem("jwt",jwt);
        if(this.$router.currentRoute.name=="home"){
          this.$router.go(0);
        }
        else {
          this.$router.push("/home");
        }
        console.log(jwt);
        }
        else{
          let obj:any = await res.json();
          if(obj.error == "Wrong password"){
            this.error = "Usuario o contraseña incorrectos";
          } else if(obj.error == "Username not found"){
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
.table {
  border-spacing: 0;
  thead{
    font-weight: bold;

  }
  tr {
    &:nth-child(even) {
      background: #f8f8f8;
    }
  }
  td {
    text-align: left;
    padding: 5px;
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
.ctrl {
  width: 250px;
  flex-basis: 100%;
  justify-content: space-between;
  &.right {
    justify-content: flex-end;
  }
  &.left {
    justify-content: flex-start;
  }
  label{
    display:block;
    padding-bottom:10px;
  }
  input {
    margin: 0 5px;
  }
  margin: 10px auto;
}
.error{
  color: #dd3333;
}
</style>
