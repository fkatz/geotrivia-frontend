<template>
  <div v-if="question!=null&&question.poi!=null">
    <div class="detail title">
      <v-btn text :to="'/pois/'+question.poi.id" class="mb-1">
        <v-icon small class="backArrow mr-2">mdi-arrow-left-thick</v-icon>
        {{question.poi.name}}
      </v-btn>
      <h2 class="name mb-3">
        <strong>{{question.content}}</strong>
      </h2>
    </div>
    <v-divider></v-divider>
    <div class="questions mb-3">
      <div class="detail title">
        <h3>Respuestas</h3>
      </div>
      <AnswerList :question="question"></AnswerList>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import AnswerList from "../components/AnswerList.vue";
import POI from "../entities/POI";
import POIRepository from "../repositories/POIRepository";
import QuestionRepository from "../repositories/QuestionRepository";
import Question from "../entities/Question";
@Component({
  components: {
    AnswerList
  }
})
export default class QuestionDetail extends Vue {
  question: Question | null = null;
  mounted() {
    this.setPOI();
  }
  async setPOI() {
    let question = await QuestionRepository.getOne(
      parseInt(this.$router.currentRoute.params.id),
      parseInt(this.$router.currentRoute.params.questionId)
    );
    if (question != null) this.question = question;
    let poi = await POIRepository.getOne(
      parseInt(this.$router.currentRoute.params.id)
    );
    if (poi != null && this.question != null) this.question.poi = poi;
    this.$forceUpdate();
  }
}
</script>
<style lang="scss" scoped>
.detail {
  padding: 15px;
  line-height: 200%;
}
.detail {
  padding-bottom: 0px;
  .name {
    color: #444 !important;
  }
  .backArrow {
    color: #444 !important;
    position: relative;
    bottom: 1px;
  }
}
.theme--light.v-btn--active:before, .theme--light.v-btn--active:hover:before, .theme--light.v-btn:focus:before {
    opacity:0!important;
}
</style>