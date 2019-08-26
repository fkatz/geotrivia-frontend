<template>
  <div>
    <v-card v-if="hint&&poi">
      <v-card-title class="headline">Editar Pista</v-card-title>
      <v-card-text>
        <v-text-field
          @keypress.enter="modifyHint()"
          outlined
          hide-details
          label="Pista"
          name="description"
          type="text"
          class="my-3"
          v-model="hint.description"
        />
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1 right">
        <v-btn color="red lighten-2" :loading="deleteLoading" text @click="deleteHint">Eliminar</v-btn>
        <v-btn color="green lighten-2" text @click="$emit('close')">Cancelar</v-btn>
        <v-btn color="green darken-2" :loading="saveLoading" text @click="modifyHint">Guardar</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Prop } from "vue-property-decorator";
import POI from "../entities/POI";
import HintRepository from "../repositories/HintRepository";
import Hint from '../entities/Hint';
@Component({
  components: {}
})
export default class HintForm extends Vue {
  @Prop() poi?: POI;
  @Prop() hint?: Hint;
  saveLoading: boolean = false;
  deleteLoading: boolean = false;
  async modifyHint() {
    if (this.hint && this.hint.id && this.poi && this.poi.id) {
      this.saveLoading = true;
      await HintRepository.putOne(this.poi.id,this.hint);
      this.$emit("update");
      this.$emit("close");
      this.saveLoading = false;
    }
  }
  async deleteHint() {
    if (this.hint && this.hint.id && this.poi && this.poi.id) {
      this.deleteLoading = true;
      await HintRepository.deleteOne(this.poi.id,this.hint);
      this.$emit("update");
      this.$emit("close");
      this.deleteLoading = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.right{
  text-align:right;
}
</style>