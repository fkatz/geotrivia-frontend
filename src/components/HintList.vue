<template>
  <div>
    <div class="ctrl flex row">
      <v-text-field
        @keypress.enter="send()"
        outlined
        hide-details
        label="Pista"
        name="description"
        type="text"
        v-model="description"
      />
      <v-btn elevation="0" small fab dark color="accent" @click="send()">
        <v-icon dark>add</v-icon>
      </v-btn>
    </div>
    <v-list>
      <v-list-item
        v-for="hint in poi.hints"
        :key="hint.id"
        class="header title"
        @click="showHintDialog(hint)"
      >{{hint.description}}</v-list-item>
    </v-list>
    <v-dialog class="dialog" v-model="dialog" max-width="390">
      <HintForm :poi="poi" :hint="currentHint" @close="dialog=false" @update="updateHints()" />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import POI from "../entities/POI";
import Hint from "../entities/Hint";
import UserModule from "../UserModule";
import HintRepository from "../repositories/HintRepository";
import HintForm from "./HintForm.vue";
@Component({
  components: { HintForm }
})
export default class HintList extends Vue {
  public description: string = "";
  currentHint: Hint | null = null;
  dialog: boolean = false;
  @Prop() public poi?: POI;
  mounted() {
    this.updateHints();
  }
  hints: Hint[] = [];
  public async send(): Promise<void> {
    if (
      this.poi != undefined &&
      this.poi.id != undefined &&
      this.description != null &&
      this.description != ""
    ) {
      try {
        let res = HintRepository.postOne(
          this.poi.id,
          new Hint(this.description)
        );
        this.description = "";
        this.updateHints();
      } catch (e) {
        console.log(e);
      }
    }
  }
  private async updateHints() {
    if (this.poi != undefined && this.poi.id != undefined) {
      let obj: Hint[] | null = await HintRepository.getAll(this.poi.id);
      obj = obj == null ? [] : obj;
      obj = obj.map(hint => {
        hint.poi = this.poi;
        return hint;
      });
      this.$set(this.poi, "hints", obj);
    }
  }
  showHintDialog(hint: Hint) {
    this.currentHint = hint;
    this.dialog = true;
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
  align-content: center;
  align-items: center;
  > * {
    margin: 5px !important;
  }
  margin: 10px 5px;
}
.v-list {
  background: transparent;
}
</style>
