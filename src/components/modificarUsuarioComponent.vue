<template>
<div>
     <h1>Modificado Persona</h1>

<div class="container p-3 my-3 border">
   

   <form name="form" id="form" v-on:submit.prevent="modificarUsuario()">
  <div class="form-group">
    <label for="Nombre">Nombre</label>
    <p class="form-control" id="Nombre"> {{usuarioDatos.nombre}}</p>
  </div>


  <div class="form-group">
    <label for="password">Contraseña Nueva</label>
    <input type="password" class="form-control" id="password" placeholder="Contraseña Nueva" v-model="nuevaContrasenia.password">
  </div>
   <input
        type="submit"
        value="Modificar Contraseña"
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
      usuarioDatos: "",
      nuevaContrasenia: {
        password: "",
      },

    };
  },
  mounted() {
    this.getUsuario();
   
  },
  methods: {
    getUsuario() {
      let user = this.$route.params.user;
      axios.get(Global.url + "usuario?username=" + user).then((res) => {
        //console.log('servicios', res.status);
        if (res.status == 200) {
          this.usuarioDatos = res.data;
        } else {
          alert("Error al contactar con el servidor");
        }
      });
    },
    modificarUsuario() {
      let parametros = {
            
            "cn": this.usuarioDatos.nombre,
            "ou": this.usuarioDatos.ou,
            "unicodePwd":this.nuevaContrasenia.password,
            
         };
      let config = {
        headers: {
            "Content-Type": "application/json",
             token: Global.token
        },
      };
   axios
        .put(Global.url + "usuario",parametros,config)
        .then((response) => {
          if (response.status == 200) {
        
    
            this.flashMessage.show({
              status: "success",
              title: "BackkOffice",
              message: "Usuario Modificado",
            });

            this.$router.push("/listarUsuarios");
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
