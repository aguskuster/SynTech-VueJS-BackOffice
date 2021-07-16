<template>
<div>
  <h1>Eliminar Grupo</h1>
<div class="container p-3 my-3 border">
    <p class="form-control"><b> Acronimo Grupo	 :</b> {{ GrupoDatos.idGrupo }}</p>
    <p class="form-control"><b>Nombre Completo Grupo	 :</b> {{ GrupoDatos.nombreCompleto }}</p>
    <p class="form-control"><b> Año Electivo	 : </b>{{ GrupoDatos.anioElectivo }}</p>
    <input
      type="submit"
      value="Eliminar Grupo"
      class="btn btn-danger"
      v-on:click="eliminarGrupo()"
    />
  </div>
</div>
</template>
<script>
import { Global } from "../Global";
import axios from "axios";
export default {
  name: "eliminarGrupoComponent.vue",
  data() {
    return {
      GrupoDatos: "",
    };
  },
  mounted() {
    this.getGrupo();
  },
  methods: {
    getGrupo() {
       let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      let grupo = this.$route.params.grupo;
      axios.get(Global.url + "grupo?idGrupo=" + grupo, config).then((res) => {
        if (res.status == 200) {
          this.GrupoDatos = res.data;
        }
      });
    },
    eliminarGrupo() {
   axios
        .delete(Global.url + "grupo", {
        headers: {
            "Content-Type": "application/json",
            "token": Global.token
        },
        data: { 
            "idGrupo": this.GrupoDatos.idGrupo,
         },
        })
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title:  Global.nombreSitio,
              message: "Grupo Eliminado",
            });

            this.$router.push("/listarGrupo");
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Grupo se encuentra vinculado a datos.",
          });
        });
    },
  },
};
</script>
