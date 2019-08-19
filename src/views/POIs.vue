<template>
  <div class="pois">
    <h1>POIs actuales</h1>
    <div class="listPOIS flex">
      <POIList></POIList>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import POI from "../entities/POI";
import UserModule from "../UserModule";
import POIList from "../components/POIList.vue";
@Component({
  components: {
    POIList
  }
})
export default class POIs extends Vue {}
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
</style>
