<template>
  <div>
    <div class="contenedor_menu">
      <h2>Modificar Personas</h2>
    </div>

    <div class="contenedorGeneral">
      <div
        class="contenedorIzquierdo"
        style="width: 35%; background-color: whitesmoke"
      >
        <div class="imgModificarUser">
          <center>
            <img
              src="https://i1.sndcdn.com/artworks-e9OCBHHsxpCAKjNV-oB7t1g-t500x500.jpg"
              alt=""
            />

            <h3>Agus Kuster</h3>
            <hr />
          </center>
          <p class="text-muted">CI: 40494949</p>
        </div>
      </div>

      <div
        class="contenedorDerechoPersona"
        style="width: 64%; background-color: whitesmoke"
      >
        <div class="formModificar"></div>
      </div>
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
        }
      });
    },
    modificarUsuario() {
      let user = this.$route.params.user;
      let parametros = {
        username: user,
        newPassword: document.getElementById("password").value,
        nuevoNombre: document.getElementById("nombre").value,
        nuevoEmail: document.getElementById("email").value,
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
              title: Global.nombreSitio,
              message: "Usuario Modificado",
            });
            this.$router.push("/listarUsuarios");
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Error inesperado.",
          });
        });
    },
  },
};
</script>
