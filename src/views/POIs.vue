<template>
  <div class="pois">
      <Map></Map>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Map from "../components/Map.vue";
@Component({
  components: {
    Map
  }
})
export default class POIs extends Vue {}
</script>
<style scoped lang="scss">
.pois{
  height:100%;
}
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
