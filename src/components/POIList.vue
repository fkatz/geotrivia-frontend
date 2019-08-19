<template>
  <div>
    <div class="ctrl flex row">
      <input name="name" type="text" v-model="name" placeholder="Nombre" />
      <input name="lat" type="number" v-model="lat" placeholder="Latitud" />
      <input name="lng" type="number" v-model="lng" placeholder="Longitud" />
      <input type="button" @click="send" value="+" />
    </div>

    <div v-for="entry in poiEntries" :key="entry.poi.id" class="poi flex column">
      <div class="flex row header" @click="togglePOI(entry)">
        <div class="name">{{entry.poi.name}}</div>
        <span class="sym">▼</span>
      </div>
      <div class="detail" v-bind:class="{ active: entry.shown }">
          <div><strong>ID</strong> {{entry.poi.id}} - <strong>Posición</strong> {{entry.poi.lat}}, {{entry.poi.lng}}</div>
      <h3>Pistas</h3>
      <HintList :poi="entry.poi" v-show="entry.shown"></HintList>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import POI from "../entities/POI";
import HintList from "./HintList.vue";
import UserModule from "../UserModule";
@Component({
  components: { HintList }
})
export default class POIList extends Vue {
  public name: string = "";
  public lat: number | null = null;
  public lng: number | null = null;
  public poiEntries: { poi: POI; shown: boolean }[] = [];
  mounted() {
    this.updatePOIS();
  }
  public async send(): Promise<void> {
    if (
      this.name != null &&
      this.name != "" &&
      this.lat != null &&
      this.lng != null
    ) {
      try {
        let poi = new POI(this.name, this.lat, this.lng);
        let res = await fetch("/api/pois", {
          method: "POST",
          body: JSON.stringify(poi),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: UserModule.token
          }
        });
        let obj: any = await res.json();
        this.name = "";
        this.lat = null;
        this.lng = null;
        this.updatePOIS();
      } catch (e) {
        console.log(e);
      }
    }
  }
  private async updatePOIS() {
    try {
      let res = await fetch("/api/pois", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: UserModule.token
        }
      });
      let obj: POI[] = await res.json();
      this.poiEntries = obj.map(poi => {
        return { poi, shown: false };
      });
    } catch (e) {
      console.log(e);
    }
  }
  togglePOI(entry: { poi: POI; shown: boolean }): void {
    entry.shown = !entry.shown;
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
  input {
    display: block;
  }
  margin: 10px 5px;
}
.downArrow {
  width: 100%;
  text-align: center;
  font-weight: bolder;
}
.poi {
  border: 1px solid #ddd;
  .header {
    justify-content: space-between;
    padding: 10px;
    font-weight: bolder;
    font-size:1.5rem;
  }
  .detail {
    width: 100%;
    text-align:left;
    height:0;
    overflow:hidden;
    &.active{
        padding:10px;
        padding-top:0px;
        height:auto;
    }
  }
}
</style>
