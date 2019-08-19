<template>
  <div class="pois">
    <h1>Usuarios registrados</h1>
    <div class="listUsers flex">
      <table class="table">
        <thead>
          <td>ID</td>
          <td>Nombre de usuario</td>
        </thead>
        <tr v-for="user in users" :key="user.id">
          <td>{{user.id}}</td>
          <td>{{user.username}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import User from "../entities/User";
import UserModule from "../UserModule"

@Component({
  components: {}
})
export default class Users extends Vue {
  public name: string = "";
  public lng: number = 0;
  public lat: number = 0;
  public users: User[] = [];
  mounted() {
    this.updateUsers();
  }
  private async updateUsers() {
    try {
      let res = await fetch("/api/users", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: UserModule.token
        }
      });
      let obj = await res.json();
      this.users = obj;
    } catch (e) {
      console.log(e);
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
  display: flex;
  flex-basis: 100%;
  justify-content: space-between;
  &.right {
    justify-content: flex-end;
  }
  &.left {
    justify-content: flex-start;
  }
  input {
    margin: 0 5px;
  }
  margin: 10px auto;
}
</style>
