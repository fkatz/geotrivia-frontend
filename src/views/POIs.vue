<template>
  <div class="pois">
    <h1>Agregar un nuevo POI</h1>
    <div class="newPOI flex">
      <div class="flex column">
        <div class="ctrl">
          <label for="name">Nombre</label>
          <input name="name" type="text" v-model="name" />
        </div>
        <div class="ctrl">
          <label for="lat">Latitud</label>
          <input name="lat" type="number" v-model="lat" />
        </div>
        <div class="ctrl">
          <label for="lng">Longitud</label>
          <input name="lng" type="number" v-model="lng" />
        </div>
        <div class="ctrl right">
          <input type="button" @click="send()" value="Enviar" />
        </div>
      </div>
    </div>
    <h1>POIs actuales</h1>
    <div class="listPOIS flex">
      <table class="table">
        <thead>
          <td>ID</td>
          <td>Nombre</td>
          <td>Latitud</td>
          <td>Longitud</td>
        </thead>
        <tr v-for="poi in pois" :key="poi.id">
          <td>{{poi.id}}</td>
          <td>{{poi.name}}</td>
          <td>{{poi.lat}}</td>
          <td>{{poi.lng}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import POI from "../entities/POI";
@Component({
  components: {}
})
export default class POIs extends Vue {
  public name: string = "";
  public lat: number = 0;
  public lng: number = 0;
  public pois: POI[] = [];
  mounted() {
    this.updatePOIS();
  }
  public async send(): Promise<void> {
    if (
      this.name != undefined &&
      this.lat != undefined &&
      this.lng != undefined
    ) {
      try {
        let poi = new POI(this.name, this.lat, this.lng);
        let res = await fetch("/api/poi", {
          method: "POST",
          body: JSON.stringify(poi),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJma2F0eiJ9.GEFFTyZcHGQhW0SIyJQ4m-Wi1LCqyM-aRbQOhiXq4Q4ajUP2qjB0eiN5Do32Z7HyHe8TlrLi0mD5bDKIAOVuiA"
          }
        });
        let obj: any = await res.json();
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
          Authorization:
            "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJma2F0eiJ9.GEFFTyZcHGQhW0SIyJQ4m-Wi1LCqyM-aRbQOhiXq4Q4ajUP2qjB0eiN5Do32Z7HyHe8TlrLi0mD5bDKIAOVuiA"
        }
      });
      let obj = await res.json();
      this.pois = obj;
    } catch (e) {
      console.log(e);
    }
  }
}
</script>
<style scoped lang="scss">
.table {
  border-spacing: 0;
  thead {
    font-weight: bold;
  }
  tr {
    &:nth-child(even) {
      background: #f8f8f8;
    }
  }
  td {
    text-align: left;
    padding: 5px;
  }
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
.ctrl {
  width: 250px;
  display: flex;
  flex-basis: 100%;
  justify-content: space-between;
  &.right {
    justify-content: flex-end;
  }
  &.left {
    justify-content: flex-start;
  }
  input {
    margin: 0 5px;
  }
  margin: 10px auto;
}
</style>
