<template>
<div>
     <h1>Modificado Grupo</h1>
<div class="container p-3 my-3 border">

   <form name="form" id="form" v-on:submit.prevent="modificarGrupo()">

  <div class="form-group">
    <label for="password" style="color:white">Acronimo Grupo</label>
    <input type="text" class="form-control" name="acronimoGrupo" id="name" placeholder="Acronimo Grupo" v-model="updateGrupo.nuevoGrupo"  required>
  </div>
   <div class="form-group">
    <label for="password" style="color:white">Nombre Completo Grupo</label>
    <input type="text" class="form-control" id="nombreCompletoGrupo" placeholder="Nombre Completo Grupo" v-model="updateGrupo.nuevoNombreCompleto" required>
  </div>
   <input
        type="submit"
        value="Modificar Grupo"
        title="Enviar"
        class="btn btn-primary"
      />
</form>
</div>
</div>
</template>



<script>
import { Global } from "../Global";
import axios from "axios";
export default {
  name: "modificarUsuarioComponent.vue",
  data() {
    return {
      GrupoDatos: "",
      updateGrupo: {
        nuevoGrupo: "",
        nuevoNombreCompleto:"",
      },
    };
  },
  mounted() {
    this.getGrupo(); 
  },
  methods: {
    getGrupo() {
      let grupo = this.$route.params.grupo;
      axios.get(Global.url + "grupo?idGrupo=" + grupo).then((res) => {
        if (res.status == 200) {
          this.GrupoDatos = res.data;
        } else {
          alert("no se pudo conectar");
        }
      });
    },
    modificarGrupo() {
      let grupo = this.$route.params.grupo;
      let parametros = {
            
            "idGrupo": grupo,
            "nuevoGrupo":this.updateGrupo.nuevoGrupo,
            "nuevoNombreCompleto": this.updateGrupo.nuevoNombreCompleto, 
         };


      let config = {
        headers: {
            "Content-Type": "application/json",
             token: Global.token
        },
      };
      
   axios
        .put(Global.url + "grupo",parametros,config)
        .then((response) => {
          if (response.status == 200) {
        
    
            this.flashMessage.show({
              status: "success",
              title: "BackkOffice",
              message: "Grupo Modificado",
            });

            this.$router.push("/listarGrupo");
          }
        })
        .catch((error) => {
          this.flashMessage.show({
            status: "error",
            title: "BackOffice",
            message: "Error inesperado." + error,
          });
        });
    },
  },
};
</script>
