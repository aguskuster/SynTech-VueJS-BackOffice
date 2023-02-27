<template>
  <div>
    <div class="contenedor_menu">
      <h2>Agregar Usuario</h2>
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
            <img src="../../assets/images/default_profile.png" alt="" />

            <h3>Nuevo Usuario</h3>
            <hr />
          </center>
        </div>
      </div>

      <div
        class="contenedorDerechoPersona"
        style="width: 64%; background-color: whitesmoke"
      >
        <form v-on:submit.prevent="agregarUsuario()">
          <div class="d-flex justify-content-around p-4 mt-3">
            <div class="personal-info" style="width: 40% !important">
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
            </div>
            <div class="user-rol" style="width: 35% !important">
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
                  <option v-for="rol in roles" v-bind:key="rol.id" :value="rol">
                    {{ rol }}
                  </option>
                </select>
              </div>

              <div class="mb-3" v-if="nuevoUsuario.ou == 'Profesor'">
                <p style="font-size: 18px">Materias</p>
                <select
                  v-model="materiaSelect"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                  v-on:change="
                    agregarArray(materiaSelect, nuevoUsuario.materias)
                  "
                >
                  <option
                    v-for="materia in materias"
                    v-bind:key="materia.id"
                    :value="materia.id"
                  >
                    {{ materia.nombre }}
                  </option>
                </select>

                <ul class="list-group mt-4">
                  <li
                    class="list-group-item"
                    v-for="materia in nuevoUsuario.materias"
                    v-bind:key="materia.id"
                  >
                    <span class="d-flex justify-content-between">
                      {{ returnSubjectNameById(materia).nombre }}
                      <i
                        class="fal fa-times"
                        v-on:click="
                          eliminarArray(materia, nuevoUsuario.materias)
                        "
                      ></i
                    ></span>
                  </li>
                </ul>
              </div>
              <div class="mb-3" v-if="nuevoUsuario.ou == 'Alumno'">
                <p style="font-size: 18px">Grupos</p>
                <select
                  v-model="nuevoUsuario.grupos"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                  required
                >
                  <option
                    v-for="grupo in grupos"
                    v-bind:key="grupo.id"
                    :value="grupo"
                  >
                    {{ grupo.idGrupo }} - {{ grupo.nombreCompleto }}
                  </option>
                </select>
              </div>
              <div class="d-flex justify-content-end">
                <input
                  type="submit"
                  value="Agregar usuario"
                  class="btn btn-primary"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { Global } from "../../Global";
import { roles } from "../../Global";
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
        materias: [],
        grupos: [],
      },
      materiaSelect: "",
      roles: roles,
      materias: [],
      grupos: [],
    };
  },
  mounted() {
    this.getAllMaterias();
    this.getAllGrupos();
  },
  methods: {
    agregarArray(id, array) {
      if (!array.includes(id)) {
        array.push(id);
      }
    },
    returnSubjectNameById(idSub) {
      for (let m of this.materias) {
        if (m.id == idSub) {
          return { nombre: m.nombre, id: m.id };
        }
      }
    },
    eliminarArray(id, array) {
      const element = (element) => element == id;
      let index = array.findIndex(element);
      array.splice(index, 1);
    },
    getAllMaterias() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios.get(Global.url + "materia", config).then((res) => {
        if (res.status == 200) {
          this.materias = res.data;
        }
      });
    },
    getAllGrupos() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios.get(Global.url + "grupo", config).then((res) => {
        if (res.status == 200) {
          this.grupos = res.data;
        }
      });
    },
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
