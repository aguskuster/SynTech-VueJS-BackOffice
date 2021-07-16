<template>
<div>
  <h1>Eliminar Persona</h1>
<div class="container p-3 my-3 border">
    <p class="form-control"><b> Usuario :</b> {{ usuarioDatos.username }}</p>
    <p class="form-control"><b> Nombre :</b> {{ usuarioDatos.nombre }}</p>
    <p class="form-control"><b> Email : </b>{{ usuarioDatos.email }}</p>
    <p class="form-control">
      <b> Rol : </b>{{ usuarioDatos.ou }}
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
    this.getUsuario();
  },
  methods: {
    getUsuario() {
        let config = {
                    headers: {
                        'token': Global.token
                    } 
                };
      let user = this.$route.params.user;
      axios.get(Global.url + "usuario?username=" + user ,config).then((res) => {
        if (res.status == 200) {
          this.usuarioDatos = res.data;
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
            "username": this.usuarioDatos.username,
            "ou": this.usuarioDatos.ou,
         },
        })
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title:  Global.nombreSitio,
              message: "Usuario Eliminado.",
            });
            this.$router.push("/listarUsuarios");
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title:  Global.nombreSitio,
            message: "Usuario contiene vinculacion.",
          });
        });
    },
  },
};
</script>
