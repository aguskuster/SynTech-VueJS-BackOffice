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
            <img :src="returnImgProfile(usuarioDatos.imagen_perfil)" alt="" />

            <h3>{{ usuarioDatos.nombre }}</h3>
            <hr />
          </center>
          <p class="text-muted">CI: {{ usuarioDatos.id }}</p>
        </div>
      </div>

      <div
        class="contenedorDerechoPersona"
        style="width: 64%; background-color: whitesmoke"
      >
        <div class="formModificar">
          <h3>Information Personal</h3>
          <div class="personalDetails">
            <div>
              <p>Nombre</p>
              <input :value="nombre" />
            </div>
            <div>
              <p>Apellido</p>
              <input :value="apellido" />
            </div>
            <div>
              <p>Mail</p>
              <input :value="usuarioDatos.email" />
            </div>
            <div>
              <p>OU</p>
              <input :value="usuarioDatos.ou" />
            </div>
            <div>
              <p>Genero</p>
              <input :value="usuarioDatos.genero" />
            </div>
          </div>
          <div class="frmProfesor">
            <h3>Materias</h3>
            <div class="frmProfesorMaterias">
              <div>Matematica</div>
              <div>Matematica</div>
              <div>Matematica</div>
              <div>Matematica</div>
              <div>Matematica</div>
              <div>Matematica</div>
              <div>Matematica</div>
            </div>
          </div>
        </div>
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
       usuario: JSON.parse(window.atob(localStorage.getItem("auth_token"))),
      usuarioDatos: "",
      nombre: "",
      apellido: "",
    };
  },
  mounted() {
    this.getUsuario();
  },
  methods: {
    getUsuario() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      let user = this.$route.params.user;
      axios
        .get(Global.url + "usuario?username=" + user, config)
        .then((res) => {
          if (res.status == 200) {
            this.usuarioDatos = res.data;
            this.recortarNombre();
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al cargar",
          });
        });
    },
    recortarNombre() {
      let user = this.usuarioDatos.nombre;
      let res = user.split(" ");
      this.nombre = res[0];
      this.apellido = res[1];
    },
    returnImgProfile(img) {
      return "data:image/png;base64," + img;
    },
  },
};
</script>
