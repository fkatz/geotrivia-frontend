<template>
    <div>
        <div class="ctrl flex row">
        <input name="description" type="text" v-model="description" />
        <input type="button" @click="send" value="+" />
        </div>
    <div v-for="hint in poi.hints" :key="hint.id">{{hint.description}}</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import POI from "../entities/POI";
import Hint from "../entities/Hint";
import UserModule from "../UserModule";
@Component({
  components: {}
})
export default class HintList extends Vue {
  public description: string = "";
  @Prop() public poi?: POI;
  mounted() {
    this.updateHints();
  }
  hints: Hint[] = [];
  public async send(): Promise<void> {
    if (
      this.poi != undefined &&
      this.description != null &&
      this.description != ""
    ) {
      try {
        let hint = new Hint(this.description);
        let res = await fetch("/api/pois/" + this.poi.id + "/hints", {
          method: "POST",
          body: JSON.stringify(hint),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: UserModule.token
          }
        });
        let obj: any = await res.json();
        this.description = "";
        this.updateHints();
      } catch (e) {
        console.log(e);
      }
    }
  }
  private async updateHints() {
    if (this.poi != undefined) {
      try {
        let res = await fetch("/api/pois/" + this.poi.id + "/hints", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: UserModule.token
          }
        });
        let obj = await res.json();
        this.$set(this.poi, "hints", obj);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>
<style scoped lang="scss">
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
  text-align: left;
  input {
    display: block;
    width:auto;
    flex-grow: 1;
  }
  margin: 10px 5px;
}
.downArrow {
  width: 100%;
  text-align: center;
  font-weight: bolder;
}
</style>
