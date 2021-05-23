<template>
<div>
     <h1>Modificado Persona</h1>

<div class="container p-3 my-3 border">
   

   <form name="form" id="form" v-on:submit.prevent="modificarUsuario()">
  <div class="form-group">
    <label for="username" style="color:white">Usuario</label>
    <p class="form-control" id="username"> {{usuarioDatos.username}}</p>
  </div>


  <div class="form-group">
    <label for="password" style="color:white">Nuevo nombre</label>
    <input type="text" class="form-control" name="nombre" id="name" placeholder="Nuevo nombre" v-model="updateUser.newName"  required>
  </div>
   <div class="form-group">
    <label for="password" style="color:white">Nuevo email</label>
    <input type="email" class="form-control" id="email" placeholder="Nuevo email" v-model="updateUser.newEmail" required>
  </div>
   <div class="form-group">
    <label for="password" style="color:white">Nueva contraseña</label>
    <input type="password" class="form-control" id="password" placeholder="Nueva contraseña" v-model="updateUser.newPassword" required>
  </div>
   <div class="form-group">
    <label for="Nombre" style="color:white">Tipo de Usuario</label>
    <p class="form-control" id="Nombre"> {{usuarioDatos.ou}}</p>
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
      updateUser: {
        newPassword: "",
        newName:"",
        newEmail:"",

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
      let user = this.$route.params.user;
      let parametros = {
            
            "username": user,
            "newPassword":this.updateUser.newPassword,
            "nuevoNombre": this.updateUser.newName,
            "nuevoEmail":this.updateUser.newEmail,
            
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
