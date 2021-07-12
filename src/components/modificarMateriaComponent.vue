<template>
<div>
     <h1>Modificado de Materia</h1>
<div class="container p-3 my-3 border">

   <form name="form" id="form" v-on:submit.prevent="modificarMateria()">

  <div class="form-group">
    <label for="password">Nuevo nombre de Materia :</label>
    <input type="text" class="form-control" name="acronimoGrupo" id="name" placeholder="Ejemplo: Tecnicatura Nocturna" v-model="nuevoNombreMateria"  required>
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

    this.cargarDatosfrm();
  },
  methods: {


    cargarDatosfrm(){
  
      document.getElementById('name').value = this.$route.params.materia;
    },
    modificarMateria() {
      let idMateria = this.$route.params.idMateria;
      let parametros = {  
            "idMateria": idMateria,
            "nuevoNombre" : document.getElementById('name').value,

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
              title: "BackOffice",
              message: "Materia Modificada.",
            });
            this.$router.push("/listarMaterias");
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: "BackOffice",
            message: "Materia ya vinculada.",
          });
        });
    },
  },
};
</script>
