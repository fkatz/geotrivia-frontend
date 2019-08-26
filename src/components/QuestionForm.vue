<template>
  <div>
    <v-card v-if="question&&poi">
      <v-card-title class="headline">Editar Pregunta</v-card-title>
      <v-card-text>
        <v-text-field
          @keypress.enter="modifyQuestion()"
          outlined
          hide-details
          label="Pregunta"
          name="content"
          type="text"
          class="my-3"
          v-model="question.content"
        />
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1 right">
          <v-btn
            color="green lighten-2"
            text
            :to="'/pois/'+poi.id+'/questions/'+question.id"
          >Respuestas</v-btn>
          <v-btn
            color="red lighten-2"
            :loading="deleteLoading"
            text
            @click="deleteQuestion"
          >Eliminar</v-btn>
          <v-btn color="green lighten-2" text @click="$emit('close')">Cancelar</v-btn>
          <v-btn color="green darken-2" :loading="saveLoading" text @click="modifyQuestion">Guardar</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Prop } from "vue-property-decorator";
import POI from "../entities/POI";
import QuestionRepository from "../repositories/QuestionRepository";
import Question from "../entities/Question";
@Component({
  components: {}
})
export default class QuestionForm extends Vue {
  @Prop() poi?: POI;
  @Prop() question?: Question;
  saveLoading: boolean = false;
  deleteLoading: boolean = false;
  async modifyQuestion() {
    if (this.question && this.question.id && this.poi && this.poi.id) {
      this.saveLoading = true;
      await QuestionRepository.putOne(this.poi.id, this.question);
      this.$emit("update");
      this.$emit("close");
      this.saveLoading = false;
    }
  }
  async deleteQuestion() {
    if (this.question && this.question.id && this.poi && this.poi.id) {
      this.deleteLoading = true;
      await QuestionRepository.deleteOne(this.poi.id, this.question);
      this.$emit("update");
      this.$emit("close");
      this.deleteLoading = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.right {
  text-align: right;
}
</style>