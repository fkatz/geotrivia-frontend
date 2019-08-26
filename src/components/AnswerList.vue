<template>
  <div>
    <div class="ctrl flex row">
      <v-text-field
        @keypress.enter="send()"
        outlined
        hide-details
        label="Respuesta"
        name="content"
        type="text"
        v-model="content"
      />
      <v-checkbox hide-details label="Correcta" name="isCorrect" v-model="isCorrect" />
      <v-btn elevation="0" small fab dark color="accent" @click="send()">
        <v-icon dark>add</v-icon>
      </v-btn>
    </div>
    <v-list class="list" v-if="question.answers&&question.answers.length>0">
      <v-list-item
        class="item"
        v-for="answer in question.answers"
        :key="answer.id"
        @click="showAnswerDialog(answer)"
      >
        <span class="answer" :class="{correct:answer.isCorrect}">{{answer.content}}</span>
      </v-list-item>
    </v-list>
    <v-dialog class="dialog" v-model="dialog" max-width="390">
      <AnswerForm
        :poi="question.poi"
        :question="question"
        :answer="currentAnswer"
        @close="dialog=false"
        @update="updateAnswers()"
      />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Question from "../entities/Question";
import POI from "../entities/POI";
import Answer from "../entities/Answer";
import UserModule from "../UserModule";
import AnswerRepository from "../repositories/AnswerRepository";
import AnswerForm from "./AnswerForm.vue"
@Component({
  components: {AnswerForm}
})
export default class AnswerList extends Vue {
  public content: string = "";
  public isCorrect: boolean = false;
  currentAnswer:Answer|null = null;
    dialog: boolean = false;

  @Prop() public question?: Question;
  mounted() {
    this.updateAnswers();
  }
  answers: Answer[] = [];
  public async send(): Promise<void> {
    if (
      this.question != undefined &&
      this.question.id != undefined &&
      this.question.poi != undefined &&
      this.question.poi.id != undefined &&
      this.content != null &&
      this.content != ""
    ) {
      let res = await AnswerRepository.postOne(
        this.question.poi.id,
        this.question.id,
        new Answer(this.content, this.isCorrect)
      );
      if(res != null) this.content = "";
      this.updateAnswers();
    }
  }
  private async updateAnswers() {
    if (
      this.question != undefined &&
      this.question.id != undefined &&
      this.question.poi != undefined &&
      this.question.poi.id != undefined
    ) {
      let obj: Answer[] | null = await AnswerRepository.getAll(
        this.question.poi.id,
        this.question.id
      );
      obj = obj == null ? [] : obj;
      obj = obj.map(answer => {
        answer.question = this.question;
        return answer;
      });
      this.$set(this.question, "answers", obj);
      this.$forceUpdate();
    }
  }
    showAnswerDialog(answer: Answer) {
    this.currentAnswer = answer;
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
.list {
  margin: 10px;
  border-radius: 5px;
  .item {
    border-bottom: 1px solid #ddd;
    &:last-child {
      border-bottom: 0;
    }
    .answer {
      color: #663333 !important;
      &.correct {
        color: #336633 !important;
      }
    }
  }
}
</style>
