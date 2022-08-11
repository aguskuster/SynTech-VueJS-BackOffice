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

        <div
          style="
          margin-top:60%
            width:100%
            position: absolute;
            padding-left: 1rem;
            padding-right: 1rem;
            display: flex;
            
            justify-content: space-evenly;
          "
        >
          <button class="btn btn-primary">Restablecer Foto</button>
          <button class="btn btn-primary">Restablecer Contraseña</button>
        </div>
      </div>

      <div
        class="contenedorDerechoPersona"
        style="width: 64%; background-color: whitesmoke"
      >
        <div class="formModificar">
          <h3 style="text-transform: uppercase">Informacion Personal</h3>
          <div class="personalDetails">
            <div class="mb-3">
              <p style="font-size:18px">Nombre</p>
              <input :value="nombre" class="form-control inputFachero" style='height: 50px;font-size:16px'/>
            </div>
            <div class="mb-3">
              <p style="font-size:18px">Apellido</p>
              <input :value="apellido" class="form-control inputFachero" style='height: 50px;font-size:16px'/>
            </div>
            <div class="mb-3">
              <p style="font-size:18px">Mail</p>
              <input :value="usuarioDatos.email" class="form-control inputFachero" style='height: 50px;font-size:16px'/>
            </div>
            <div class="mb-3">
              <p  style="font-size:18px">Rol</p>
              <input :value="usuarioDatos.ou" class="form-control inputFachero" style='height: 50px;font-size:16px' />
            </div>
            <div class="mb-3">
              <p style="font-size:18px">Genero</p>
              <input :value="usuarioDatos.genero" class="form-control inputFachero" style='height: 50px;font-size:16px' />
            </div>
          </div>

          <div class="frmProfesor" v-if="usuarioDatos.ou == 'Bedelias'">
            <h3 style="text-transform: uppercase">Cargo</h3>
            <div class="frmProfesorMaterias">
              <div>{{ usuarioInfo.cargo }}</div>
            </div>
          </div>

          <div class="frmProfesor" v-if="usuarioDatos.ou == 'Profesor'">
            <h3 style="text-transform: uppercase">Materias</h3>
            <div class="frmProfesorMaterias">
              <div v-for="materia in usuarioInfo" :key="materia.id">
                {{ materia.nombre }}
              </div>
            </div>
          </div>

          <div class="frmProfesor" v-if="usuarioDatos.ou == 'Alumno'">
            <h3 style="text-transform: uppercase">Grupos</h3>
            <div class="frmProfesorMaterias">
              <div v-for="grupo in usuarioInfo" :key="grupo.id">
                {{ grupo.idGrupo }}
              </div>
            </div>
          </div>

          <div style="position: absolute; right: 40px; bottom: 4.3rem">
            <button class="btn btn-success" style="margin-right: 10px">
              Actualizar
            </button>
            <button class="btn btn-danger" v-on:click='$router.back()'>Cancelar</button>
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
      usuarioInfo: "",
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
            this.usuarioDatos = res.data.user;
            this.usuarioInfo = res.data.info;
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
