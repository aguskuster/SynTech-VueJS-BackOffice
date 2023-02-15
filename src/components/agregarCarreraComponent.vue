<template>
  <div>
    <div class="contenedor_menu">
      <h2>Agregar Carrea</h2>
    </div>
    <center v-if="loading" style="margin-top: 3rem; font-size: 230px">
      <div
        class="spinner-border text-primary"
        role="status"
        style="color: #13111e !important"
      ></div>
    </center>
    <div v-else class="contenedorGeneral">
      <div
        class="contenedorIzquierdo"
        style="width: 35%; background-color: whitesmoke"
      >
       Nueva carrera Xd
      </div>

      <div
        class="contenedorDerechoPersona"
        style="width: 64%; background-color: whitesmoke"
      >
        <div class="w-50 ml-auto mt-4 mr-auto mb-auto">
          <form v-on:submit.prevent="agregarCarrera()">
            
         
          
      

           
            
            <div class="d-flex justify-content-end">
              <input
                type="submit"
                value="Agregar usuario"
                class="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { Global } from "../Global";
// import { roles } from "../Global";
// import axios from "axios";
export default {
  name: "agregarUsuarioComponent.vue",
  data() {
    return {
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      loading:false,
    };
  },
  mounted() {
    
  },
  methods: {
    agregarCarrera(){
        alert("hola");
    }
  },
};
</script>
