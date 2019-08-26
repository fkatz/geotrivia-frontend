<template>
  <div>
    <div class="ctrl flex row">
      <v-text-field
        @keypress.enter="send()"
        outlined
        hide-details
        label="Pregunta"
        name="content"
        type="text"
        v-model="content"
      />
      <v-btn elevation="0" small fab dark color="accent" @click="send()">
        <v-icon dark>add</v-icon>
      </v-btn>
    </div>
    <v-list>
      <v-list-item
        v-for="question in poi.questions"
        :key="question.id"
        class="header title"
        @click="showQuestionDialog(question)"
      >{{question.content}}</v-list-item>
    </v-list>
    <v-dialog class="dialog" v-model="dialog" max-width="390">
      <QuestionForm
        :poi="poi"
        :question="currentQuestion"
        @close="dialog=false"
        @update="updateQuestions()"
      />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import POI from "../entities/POI";
import Question from "../entities/Question";
import AnswerList from "./AnswerList.vue";
import UserModule from "../UserModule";
import QuestionRepository from "../repositories/QuestionRepository";
import QuestionForm from "./QuestionForm.vue"
@Component({
  components: { QuestionForm }
})
export default class QuestionList extends Vue {
  public content: string = "";
  currentQuestion: Question | null = null;
  dialog: boolean = false;
  @Prop() public poi?: POI;
  mounted() {
    this.updateQuestions();
  }
  questions: Question[] = [];
  public async send(): Promise<void> {
    if (
      this.poi != undefined &&
      this.poi.id != undefined &&
      this.content != null &&
      this.content != ""
    ) {
      let res = await QuestionRepository.postOne(
        this.poi.id,
        new Question(this.content)
      );
      if(res != null) this.content = "";
      this.updateQuestions();
    }
  }
  private async updateQuestions() {
    if (this.poi != undefined && this.poi.id != undefined) {
      try {
        let obj: Question[] | null = await QuestionRepository.getAll(
          this.poi.id
        );
        obj = obj == null ? [] : obj;
        obj = obj.map(question => {
          question.poi = this.poi;
          return question;
        });
        this.$set(this.poi, "questions", obj);
        this.$forceUpdate();
      } catch (e) {
        console.log(e);
      }
    }
  }
  showQuestionDialog(question: Question) {
    this.currentQuestion = question;
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
