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
      let materia = this.$route.params.materia;
      axios.get(Global.url + "materia?idMateria=" + materia).then((res) => {
      
        if (res.status == 200) {
          this.materiaDatos = res.data;
        } else {
          alert("no se pudo conectar");
        }
      });
    },
    eliminarMateria() {
    
   axios
        .delete(Global.url + "materia", {
        headers: {
            "Content-Type": "application/json",
            "token": Global.token
        },
        data: { 
            "idMateria": this.$route.params.materia,
         },
        })
        .then((response) => {
          if (response.status == 200) {
        
    
            this.flashMessage.show({
              status: "success",
              title: "BackOffice",
              message: "Materia Eliminada",
            });

            this.$router.push("/listarMaterias");
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: "BackOffice",
            message: "Error, la materia esta vinculada a otros elementos",
          });
        });
    },
  },
};
</script>
