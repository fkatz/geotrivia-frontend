<template>
  <div class="pois">
    <v-list>
        <v-list-item v-for="user in users" :key="user.id">
          <div class="px-2"><h3>{{user.id}}</h3></div>
          <div class="px-2"><h2>{{user.username}}</h2></div>
        </v-list-item>
    </v-list>
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
</style>
