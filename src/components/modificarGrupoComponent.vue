<template>
<div>
     <h1>Modificado Grupo</h1>
<div class="container p-3 my-3 border">

   <form name="form" id="form" v-on:submit.prevent="modificarGrupo()">

  <div class="form-group">
    <label for="password">Acronimo Grupo</label>
    <input type="text" class="form-control" name="acronimoGrupo" id="nombreAcronimo" placeholder="Acronimo Grupo"   required>
  </div>
   <div class="form-group">
    <label for="password">Nombre Completo Grupo</label>
    <input type="text" class="form-control" id="nombreCompletoGrupo" placeholder="Nombre Completo Grupo"  required>
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

    datosFRM(){
      document.getElementById('nombreAcronimo').value = this.GrupoDatos.idGrupo;
      document.getElementById('nombreCompletoGrupo').value = this.GrupoDatos.nombreCompleto;
    },
    getGrupo() {
      let config = {
                    headers: {
                        'token': Global.token
                    } 
                } 
      let grupo = this.$route.params.grupo;
      axios.get(Global.url + "grupo?idGrupo=" + grupo,config).then((res) => {
        if (res.status == 200) {
          this.GrupoDatos = res.data;
         this.datosFRM();
        } else {
          alert("no se pudo conectar");
        }
      });
    },
    modificarGrupo() {
      let grupo = this.$route.params.grupo;
      let parametros = {
            
            "idGrupo": grupo,
            "nuevoGrupo": document.getElementById('nombreAcronimo').value,
            "nuevoNombreCompleto":  document.getElementById('nombreCompletoGrupo').value, 
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
              title: "BackOffice",
              message: "Grupo Modificado.",
            });

            this.$router.push("/listarGrupo");
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: "BackOffice",
            message: "Error inesperado.",
          });
        });
    },
  },
};
</script>
