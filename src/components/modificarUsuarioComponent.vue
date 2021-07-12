<template>
  <div>
    <h1>Modificar Persona</h1>

    <div class="container p-3 my-3 border">
      <form name="form" id="form" v-on:submit.prevent="modificarUsuario()">
        <div class="form-group">
          <label for="username" x>Usuario :</label>
          <p class="form-control" id="username">{{ usuarioDatos.username }}</p>
        </div>

        <div class="form-group">
          <label for="text">Nuevo nombre :</label>
          <input
            type="text"
            class="form-control"
            name="nombre"
            id="nombre"
            placeholder="Nuevo nombre"
            required
          />
        </div>
        <div class="form-group">
          <label for="password" >Nuevo email :</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Nuevo email"
            
          />
        </div>
        <div class="form-group">
          <label for="password">Nueva contraseña :</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Nueva contraseña"
           
            
          />
        </div>
        <div class="form-group">
          <label for="Nombre">Rol :</label>
          <p class="form-control" id="Nombre">{{ usuarioDatos.ou }}</p>
        </div>
        <input
          type="submit"
          value="Modificar Persona"
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
        newName: "",
        newEmail: "",
      },
    };
  },
  mounted() {
    this.getUsuario();
  },
  methods: {
    usuarioDatoFRM() {
      let nombre = document.getElementById("nombre");
      let email = document.getElementById("email");

      nombre.value = this.usuarioDatos.nombre;
      email.value = this.usuarioDatos.email;
    },
    getUsuario() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      let user = this.$route.params.user;
      axios.get(Global.url + "usuario?username=" + user, config).then((res) => {
       
        if (res.status == 200) {
          this.usuarioDatos = res.data;
          this.usuarioDatoFRM();
        } else {
          alert("Error al contactar con el servidor");
        }
      });
    },
    modificarUsuario() {
      let user = this.$route.params.user;
      let parametros = {
        username: user,

        newPassword: document.getElementById('password').value,
        nuevoNombre:document.getElementById('nombre').value,
        nuevoEmail: document.getElementById('email').value,
      };
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .put(Global.url + "usuario", parametros, config)
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: "BackOffice",
              message: "Usuario Modificado",
            });

            this.$router.push("/listarUsuarios");
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
