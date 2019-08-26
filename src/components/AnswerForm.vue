<template>
  <div>
    <v-card v-if="answer&&poi">
      <v-card-title class="headline">Editar Pregunta</v-card-title>
      <v-card-text>
        <v-text-field
          @keypress.enter="modifyAnswer()"
          outlined
          hide-details
          label="Pregunta"
          name="content"
          type="text"
          class="my-3"
          v-model="answer.content"
        />
        <v-checkbox hide-details label="Correcta" name="isCorrect" v-model="answer.isCorrect" />
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1 right">
          <v-btn color="red lighten-2" :loading="deleteLoading" text @click="deleteAnswer">Eliminar</v-btn>
          <v-btn color="green lighten-2" text @click="$emit('close')">Cancelar</v-btn>
          <v-btn color="green darken-2" :loading="saveLoading" text @click="modifyAnswer">Guardar</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Prop } from "vue-property-decorator";
import POI from "../entities/POI";
import Question from "../entities/Question";
import AnswerRepository from "../repositories/AnswerRepository";
import Answer from "../entities/Answer";
@Component({
  components: {}
})
export default class AnswerForm extends Vue {
  @Prop() poi?: POI;
  @Prop() question?: Question;
  @Prop() answer?: Answer;
  saveLoading: boolean = false;
  deleteLoading: boolean = false;
  async modifyAnswer() {
    if (
      this.answer &&
      this.answer.id &&
      this.question &&
      this.question.id &&
      this.poi &&
      this.poi.id
    ) {
      this.saveLoading = true;
      await AnswerRepository.putOne(this.poi.id, this.question.id, this.answer);
      this.$emit("update");
      this.$emit("close");
      this.saveLoading = false;
    }
  }
  async deleteAnswer() {
    if (
      this.answer &&
      this.answer.id &&
      this.question &&
      this.question.id &&
      this.poi &&
      this.poi.id
    ) {
      this.deleteLoading = true;
      await AnswerRepository.deleteOne(
        this.poi.id,
        this.question.id,
        this.answer
      );
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