<template>
<div>
     <h1>Modificado Grupo</h1>
<div class="container p-3 my-3 border">

   <form name="form" id="form" v-on:submit.prevent="modificarMateria()">

  <div class="form-group">
    <label for="password" style="color:white">Nombre Materia</label>
    <input type="text" class="form-control" name="acronimoGrupo" id="name" placeholder="Acronimo Grupo" v-model="nuevoNombreMateria"  required>
  </div>
   <input
        type="submit"
        value="Modificar Materia"
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
  name: "modificarMateriaComponent.vue",
  data() {
    return {
     
    nuevoNombreMateria: "",
     
    };
  },
  mounted() {
    this.getMateria(); 
  },
  methods: {

    modificarMateria() {
      let materia = this.$route.params.materia;
      let parametros = {  
            "idMateria": materia,
            "nuevoNombre" : this.nuevoNombreMateria
         };


      let config = {
        headers: {
            "Content-Type": "application/json",
             token: Global.token
        },
      };
      
   axios
        .put(Global.url + "materia",parametros,config)
        .then((response) => {
          if (response.status == 200) {
        
    
            this.flashMessage.show({
              status: "success",
              title: "BackkOffice",
              message: "Materia Modificada",
            });

            this.$router.push("/listarMaterias");
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
