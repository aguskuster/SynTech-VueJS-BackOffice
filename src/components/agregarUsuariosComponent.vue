<template>
  <div>
    <div class="contenedor_menu">
      <h2>Agregar Persona</h2>
    </div>
     <center v-if="loading" style="margin-top:3rem;font-size:230px;">
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
        <div class="imgModificarUser">
          <center>
            <img src="https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U" alt="" />

            <h3>Nuevo Usuario</h3>
            <hr />
          </center>
        
        </div>
        <div>
  
        </div>
      </div>

      <div
        class="contenedorDerechoPersona"
        style="width: 64%; background-color: whitesmoke"
      >
        <div class="formModificar">
          <div class="informacion-izquierda">
            <h3 style="text-transform: uppercase">Informacion Personal</h3>
            <div class="personalDetails" v-if="usuario.cargo != 'Adscripto'">
              <div class="mb-3">
                <p style="font-size: 18px">Nombre</p>
                <input
                  v-model="usuarioDatos.nombre"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Apellido</p>
                <input
                  v-model="usuarioDatos.apellido"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Mail</p>
                <input
                  v-model="usuarioDatos.email"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Rol</p>
                <input
                  disabled
                  v-model="usuarioDatos.ou"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Genero</p>
                <input
                  v-model="usuarioDatos.genero"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
            </div>

            <div class="personalDetails" v-else>
              <div class="mb-3">
                <p style="font-size: 18px">Nombre</p>
                <input
                  v-model="usuarioDatos.nombre"
                  disabled
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Apellido</p>
                <input
                  v-model="usuarioDatos.apellido"
                  disabled
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Mail</p>
                <input
                  v-model="usuarioDatos.email"
                  disabled
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Rol</p>
                <input
                  disabled
                  v-model="usuarioDatos.ou"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Genero</p>
                <input
                  disabled
                  v-model="usuarioDatos.genero"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
            </div>
          </div>
          <div class="informacion-derecha">
            <div v-if="usuarioDatos.ou == 'Bedelias'">
              <h3 style="text-transform: uppercase">Cargo</h3>
              <div class="frmProfesorMaterias">
                <div>{{ usuarioInfo.cargo }}</div>
              </div>
            </div>

            <div v-if="usuarioDatos.ou == 'Profesor'">
              <h3 style="text-transform: uppercase">Materias</h3>
              <div class="frmProfesorMaterias">
                <div v-for="materia in usuarioInfo" :key="materia.id">
                  {{ materia.nombre }}
                </div>
              </div>
            </div>

            <div v-if="usuarioDatos.ou == 'Alumno'">
              <h3 style="text-transform: uppercase">Grupos</h3>
              <div class="frmProfesorMaterias">
                <div v-for="grupo in usuarioInfo" :key="grupo.id">
                  {{ grupo.idGrupo }}
                </div>
              </div>
            </div>
          </div>
          <div style="position: absolute; right: 40px; bottom: 10px">
            <button
              class="btn btn-success"
              style="margin-right: 10px"
              @click="comprobarModificarInfo()"
              v-if="usuario.cargo != 'Adscripto'"
            >
              Actualizar
            </button>
            <button
              class="btn btn-danger"
              v-on:click="$router.back()"
              v-if="usuario.cargo != 'Adscripto'"
            >
              Cancelar
            </button>
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
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      usuarioDatos: {
        email:"",
        ou:"",
        genero:"",
        cargo:"",
        nombre:"",
        apellido:"",
},
       loading:false,
      persona:"",
    };
  },
  mounted() {
   
  },
  methods: {
     agregarUsuario() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
          axios
            .post(Global.url + "usuario", this.usuarioDatos, config)
            .then((response) => {
              if (response.status == 200) {
                location.reload();
              }
            })
            .catch(() => {
              this.$swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salio mal...",
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
