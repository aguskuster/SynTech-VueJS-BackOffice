<template>
<div>
  <h1>Eliminar Usuario</h1>
<div class="container p-3 my-3 border">
    <p class="form-control"><b> Username :</b> {{ usuarioDatos.username }}</p>
    <p class="form-control"><b>Nombre :</b> {{ usuarioDatos.nombre }}</p>
    <p class="form-control"><b> Email : </b>{{ usuarioDatos.email }}</p>
    <p class="form-control">
      <b> Unidad Organizativa : </b>{{ usuarioDatos.ou }}
    </p>

    <input
      type="submit"
      value="Eliminar Usuario"
      class="btn btn-danger"
      v-on:click="eliminarUsuario()"
    />
 
  </div>
</div>
</template>

<script>
import { Global } from "../Global";
import axios from "axios";
export default {
  name: "eliminarUsuarioComponent.vue",
  data() {
    return {
      usuarioDatos: "",
    };
  },
  mounted() {
    //console.log(slug);
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
          alert("no se pudo conectar");
        }
      });
    },
    eliminarUsuario() {
    
   axios
        .delete(Global.url + "usuario", {
        headers: {
            "Content-Type": "application/json",
            "token": Global.token
        },
        data: {
            "cn": this.usuarioDatos.nombre,
            "ou": this.usuarioDatos.ou,
            "username": this.usuarioDatos.username,
         },
        })
        .then((response) => {
          if (response.status == 200) {
        
    
            this.flashMessage.show({
              status: "success",
              title: "BackkOffice",
              message: "Usuario Eliminado",
            });

            this.$router.push("/listarUsuarios");
          }
        })
        .catch((error) => {
          this.flashMessage.show({
            status: "error",
            title: "Mi aplicación",
            message: "Error inesperado." + error,
          });
        });
    },
  },
};
</script>
