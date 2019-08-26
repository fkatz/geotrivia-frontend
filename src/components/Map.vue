<template>
  <div class="full">
    <v-layout column id="buttons">
      <v-btn
        class="my-1"
        :small="mode!='show'&&mode!='delete'"
        @click="mode=(mode=='delete'?'show':'delete')"
        fab
        dark
        color="red"
        :depressed="mode!='show'&&mode!='delete'"
      >
        <v-icon dark>delete</v-icon>
      </v-btn>
      <v-btn
        class="my-1"
        :small="mode!='show'&&mode!='modify'"
        @click="mode=(mode=='modify'?'show':'modify')"
        fab
        dark
        color="accent"
        :depressed="mode!='show'&&mode!='modify'"
      >
        <v-icon dark>edit</v-icon>
      </v-btn>
      <v-btn
        class="my-1"
        :small="mode!='show'&&mode!='create'"
        @click="mode=(mode=='create'?'show':'create')"
        fab
        dark
        color="accent"
        :depressed="mode!='show'&&mode!='modify'"
      >
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-layout>
    <div ref="map" id="map"></div>
    <v-dialog class="dialog" persistent v-model="dialog" max-width="290">
      <POIForm :mode="mode" :poi="currentPOI" @close="dialog=false" @update="updateMarkers()" />
    </v-dialog>
  </div>
</template>
<script lang="ts">
/// <reference types="@types/googlemaps" />
import { Component, Vue } from "vue-property-decorator";
import UserModule from "../UserModule";
import GoogleMapsLoader from "google-maps";
import POI from "../entities/POI";
import POIRepository from "../repositories/POIRepository";
import POIForm from "./POIForm.vue";

@Component({
  components: { POIForm }
})
export default class Map extends Vue {
  map?: google.maps.Map;
  markers: google.maps.Marker[] = [];
  currentPOI: POI | null = null;
  dialog: boolean = false;
  mode: "create" | "show" | "modify" | "delete" = "show";
  mounted() {
    this.loadMap();
  }
  async loadMap(): Promise<void> {
    GoogleMapsLoader.KEY = "AIzaSyCCOg98LwjccVQIwGqqeE9uxXXVppVeAVc";
    GoogleMapsLoader.VERSION = "";
    let map = GoogleMapsLoader.load(async google => {
      this.map = new google.maps.Map(<Element>this.$refs.map, {
        center: { lat: -32.9546, lng: -60.6438 },
        zoom: 14,
        styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
        disableDoubleClickZoom: true,
        disableDefaultUI: true
      });
      this.updateMarkers();
      this.map.addListener("click", event => {
        if (this.mode == "create")
          this.showPOIDialog(
            new POI("", event.latLng.lat(), event.latLng.lng())
          );
      });
    });
  }
  async updateMarkers() {
    this.markers.map(marker => marker.setMap(null));
    let pois = await POIRepository.getAll();
    if (pois != null)
      this.markers = pois.map(poi => {
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(poi.lat, poi.lng),
          map: this.map,
          title: poi.name
        });
        marker.set("poi", poi);
        marker.addListener("click", () => {
          this.showPOIDialog(marker.get("poi"));
        });
        return marker;
      });
  }
  showPOIDialog(poi: POI) {
    this.currentPOI = poi;
    this.dialog = true;
  }
}
</script>
<style lang="scss" scoped>
#map {
  height: 100%;
}
.full {
  height: 100%;
}
#buttons {
  width: 56px;
  position: fixed;
  bottom: 20px;
  right: 10px;
  z-index: 1;
  align-content: center;
  align-items: center;
}
.v-btn {
  transition: 0.5s;
}
</style>