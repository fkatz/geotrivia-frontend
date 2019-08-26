<template>
  <div>
    <v-card v-if="mode&&mode=='show'&&poi">
      <v-card-title class="headline">{{poi.name}}</v-card-title>
      <v-card-text>
        <strong>Coordenadas:</strong>
        {{poi.lat.toFixed(4)}} {{poi.lng.toFixed(4)}}
        <br />
        <p>Acá iría la descripción.</p>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="green lighten-2" text @click="$emit('close')">Cancelar</v-btn>
        <v-btn color="green darken-1" text :to="'/pois/'+poi.id">Ver Detalle</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="mode&&mode=='delete'&&poi">
      <v-card-title class="headline">Eliminar POI</v-card-title>
      <v-card-text>
        <p>
          ¿Está seguro de que desea eliminar el POI
          <strong>{{poi.name}}</strong>?
        </p>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="green lighten-2" text @click="$emit('close')">Cancelar</v-btn>
        <v-btn color="green darken-1" text :loading="loading" @click="deletePOI">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="mode&&mode=='create'&&poi">
      <v-card-title class="headline">Crear POI</v-card-title>
      <v-card-text>
        <strong>Coordenadas:</strong>
        {{poi.lat.toFixed(4)}} {{poi.lng.toFixed(4)}}
        <v-text-field
          @keypress.enter="createPOI()"
          hide-details
          outlined
          label="Nombre"
          name="name"
          type="name"
          class="mt-3"
          v-model="poi.name"
        />
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="green lighten-2" text @click="$emit('close')">Cancelar</v-btn>
        <v-btn color="green darken-2" :loading="loading" text @click="createPOI">Guardar</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="mode&&mode=='modify'&&poi">
      <v-card-title class="headline">Editar POI</v-card-title>
      <v-card-text>
        <v-text-field
          @keypress.enter="modifyPOI()"
          outlined
          hide-details
          label="Nombre"
          name="name"
          type="text"
          class="my-3"
          v-model="poi.name"
        />
        <v-text-field
          @keypress.enter="modifyPOI()"
          outlined
          hide-details
          label="Latitud"
          name="lat"
          type="number"
          class="my-3"
          v-model="poi.lat"
        />
        <v-text-field
          @keypress.enter="modifyPOI()"
          outlined
          hide-details
          label="Longitud"
          name="lng"
          type="number"
          class="my-3"
          v-model="poi.lng"
        />
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="green lighten-2" text @click="$emit('close')">Cancelar</v-btn>
        <v-btn color="green darken-2" :loading="loading" text @click="modifyPOI">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Prop } from "vue-property-decorator";
import POI from "../entities/POI";
import POIRepository from "../repositories/POIRepository";
@Component({
  components: {}
})
export default class POIForm extends Vue {
  @Prop() mode?: "create" | "modify" | "show" | "delete";
  @Prop() poi?: POI;
  loading: boolean = false;
  async createPOI() {
    if (this.poi && this.poi.name != "") {
      this.loading = true;
      await POIRepository.postOne(this.poi);
      this.$emit("update");
      this.$emit("close");
      this.loading = false;
    }
  }
  async modifyPOI() {
    if (this.poi && this.poi.name != "" && this.poi.id) {
      this.loading = true;
      await POIRepository.putOne(this.poi);
      this.$emit("update");
      this.$emit("close");
      this.loading = false;
    }
  }
  async deletePOI() {
    if (this.poi && this.poi.name != "" && this.poi.id) {
      this.loading = true;
      await POIRepository.deleteOne(this.poi);
      this.$emit("update");
      this.$emit("close");
      this.loading = false;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>