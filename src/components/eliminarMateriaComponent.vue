<template>
<div>
  <h1>Eliminar Materia</h1>
<div class="container p-3 my-3 border">
    <p class="form-control"><b> Nombre Materia :</b> {{ materiaDatos[0].nombre }}</p>
    <input
      type="submit"
      value="Eliminar Materia"
      class="btn btn-danger"
      v-on:click="eliminarMateria()"
    />
  </div>
</div>
</template>
<script>
import { Global } from "../Global";
import axios from "axios";
export default {
  name: "eliminarMateriaComponent.vue",
  data() {
    return {
      materiaDatos: "",
    };
  },
  mounted() {
    this.getMateria();
  },
  methods: {
    getMateria() {
        let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      let materia = this.$route.params.materia;
      axios.get(Global.url + "materia?idMateria=" + materia,config).then((res) => {
        if (res.status == 200) {
          this.materiaDatos = res.data;
        }
      });
    },

  },
};
</script>
