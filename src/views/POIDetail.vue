<template>
    <div v-if="poi!=undefined">
      <div class="detail title">
        <h2 class="name">
          <strong>{{poi.name}}</strong>
        </h2>
        <h4>Latitud: {{poi.lat}} - Longitud: {{poi.lng}}</h4>
      </div>
      <v-divider></v-divider>
      <div class="questions mb-3">
        <div class="detail title">
          <h3>Preguntas</h3>
        </div>
        <QuestionList :poi="poi"></QuestionList>
      </div>
      <v-divider></v-divider>
      <div class="hints">
        <div class="detail title">
          <h3>Pistas</h3>
        </div>
        <HintList :poi="poi"></HintList>
      </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import QuestionList from "../components/QuestionList.vue";
import HintList from "../components/HintList.vue";
import POI from "../entities/POI";
import POIRepository from "../repositories/POIRepository";
@Component({
  components: {
    QuestionList,
    HintList
  }
})
export default class POIDetail extends Vue {
  poi: POI | null = null;
  mounted() {
    this.setPOI();
  }
  async setPOI() {
    let poi = await POIRepository.getOne(
      parseInt(this.$router.currentRoute.params.id)
    );
    if (poi != null) this.poi = poi;
    this.$forceUpdate();
  }
}
</script>
<style lang="scss" scoped>
.detail {
  padding: 15px;
  line-height: 200%;
}
.questions {
  .detail {
    padding-bottom: 0px;
  }
}
</style>