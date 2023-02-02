<template>
  <div>
    <div class="contenedor_menu">
      <h2>Agregar Persona</h2>
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
        <div class="imgModificarUser">
          <center>
            <img src="../assets/images/default_profile.png" alt="" />

            <h3>Nuevo Usuario</h3>
            <hr />
          </center>
        </div>
        <div></div>
      </div>

      <div
        class="contenedorDerechoPersona"
        style="width: 64%; background-color: whitesmoke"
      >
        <div class="w-50 ml-auto mt-4 mr-auto mb-auto">
          <form v-on:submit.prevent="agregarUsuario()">
            <div class="mb-3">
              <p style="font-size: 18px">Nombre <em>*</em></p>
              <input
                required
                v-model="nuevoUsuario.name"
                class="form-control inputFachero"
                style="height: 50px; font-size: 16px"
              />
            </div>
            <div class="mb-3">
              <p style="font-size: 18px">Apellido <em>*</em></p>
              <input
                required
                v-model="nuevoUsuario.surname"
                class="form-control inputFachero"
                style="height: 50px; font-size: 16px"
              />
            </div>
            <div class="mb-3">
              <p style="font-size: 18px">Cedula <em>*</em></p>
              <input
                maxlength="8"
                minlength="8"
                type="phone"
                v-model="nuevoUsuario.samaccountname"
                class="form-control inputFachero"
                style="height: 50px; font-size: 16px"
                required
              />
            </div>
            <div class="mb-3">
              <p style="font-size: 18px">Email <em>*</em></p>
              <input
                required
                type="email"
                v-model="nuevoUsuario.userPrincipalName"
                class="form-control inputFachero"
                style="height: 50px; font-size: 16px"
              />
            </div>
            <div class="mb-3">
              <p style="font-size: 18px">Rol <em>*</em></p>
              <select
                v-model="nuevoUsuario.ou"
                class="form-control inputFachero"
                style="height: 50px; font-size: 16px"
                required
              >
                <option value="Profesor">Profesor</option>
                <option value="Alumno">Alumno</option>
                <option
                  v-if="
                    usuario.ou != roles.administrativo ||
                    usuario.ou != roles.adscripto
                  "
                  value="Bedelias"
                >
                  Bedelias
                </option>
              </select>
            </div>
            <div class="mb-3" v-if="nuevoUsuario.ou == 'Bedelias'">
              <p style="font-size: 18px">Cargo</p>
                 <select
                v-model="nuevoUsuario.cargo"
                class="form-control inputFachero"
                style="height: 50px; font-size: 16px"
                required
              >
                <option v-for="rol in roles" v-bind:key="rol.id"  :value=rol>{{rol}}</option>
              </select>
            </div>

            <div class="mb-3" v-if="nuevoUsuario.ou == 'Profesor'">
              <p style="font-size: 18px">Materias</p>
              <input
                type="submit"
                v-model="usuario.materias"
                class="btn btn-primary"
                style="height: 50px; font-size: 16px"
                value="Asignar Materias"
              />
            </div>
            <div class="mb-3" v-if="nuevoUsuario.ou == 'Alumno'">
              <p style="font-size: 18px">Grupos</p>
              <input
                type="submit"
                v-model="usuario.grupos"
               class="btn btn-primary"
                style="height: 50px; font-size: 16px"
                value="Asignar Grupo"
              />
            </div>
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
import { Global } from "../Global";
import { roles } from "../Global";
import axios from "axios";
export default {
  name: "agregarUsuarioComponent.vue",
  data() {
    return {
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      loading: false,
      nuevoUsuario: {
        name: "",
        surname: "",
        samaccountname: "",
        userPrincipalName: "",
        ou: "",
        cargo: "",
      },
      roles: roles,
    };
  },
  mounted() {},
  methods: {
    agregarUsuario() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };

      axios
        .post(Global.url + "usuario", this.nuevoUsuario, config)
        .then((response) => {
          if (response.status == 200) {
            this.$swal.fire({
              icon: "success",
              title: "Usuario agregado",
              text: "El usuario se agrego correctamente",
            });
            this.$router.push("/usuarios");
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

    returnImgProfile(img) {
      return "data:image/png;base64," + img;
    },
  },
};
</script>
