<template>
  <div>
    <div class="contenedor_menu">
      <h2>Agregar Alumno</h2>
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
        style="width: 35%; background-color: #ffffff"
      >
        <div class="imgModificarUser">
          <center>
            <img src="../../assets/images/default_profile.png" alt="" />

            <h3>Nuevo Alumno</h3>
            <hr />
          </center>
        </div>
      </div>

      <div
        class="contenedorDerechoPersona"
        style="width: 64%; background-color: #ffffff"
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
                  v-model="nuevoUsuario.samaccountname"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                  required
                  id="cedula"
                  v-on:keyup="validateCi"
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
              <div
                class="alert alert-warning"
                role="alert"
                v-if="carreras.length == 0 && loading == false"
              >
                Para activar esta funcion primero debes crera una carrera.
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">
                  <span> Carrera</span>
                </p>
                <select
                  v-model="carreraSelect"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                  v-on:change="cargarGrados(carreraSelect)"
                >
                  <option
                    v-for="carrera in carreras"
                    v-bind:key="carrera.id"
                    :value="carrera"
                  >
                    {{ carrera.nombre + "-" + carrera.plan }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">
                  <span> Grado</span>
                </p>
                <select
                  v-model="gradoSelect"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                  v-on:change="cargarGrupos(gradoSelect)"
                >
                  <option
                    v-for="grado in grados"
                    v-bind:key="grado.id"
                    :value="grado.id"
                  >
                    {{ grado.grado }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <p style="font-size: 18px">
                  <span> Grupos</span>
                </p>
                <select
                  v-model="grupoSelect"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                  v-on:change="agregarArray(grupoSelect, nuevoUsuario.grupos)"
                >
                  <option
                    v-for="grupo in grupos"
                    v-bind:key="grupo.id"
                    :value="grupo.idGrupo"
                  >
                    {{ grupo.idGrupo }}
                  </option>
                </select>

                <ul class="list-group mt-4">
                  <li
                    class="list-group-item"
                    v-for="grupo in nuevoUsuario.grupos"
                    v-bind:key="grupo.id"
                  >
                    <span class="d-flex justify-content-between">
                      {{ returnGroupName(grupo).nombre }}
                      <i
                        class="fal fa-times"
                        v-on:click="eliminarArray(grupo, nuevoUsuario.grupos)"
                      ></i
                    ></span>
                  </li>
                </ul>
              </div>

              <div class="d-flex justify-content-end">
                <div
                  disabled
                  v-if="!saveBtn"
                  class="btn btn-primary clase-bajar-btn-agragar"
                >
                  Agregar alumno
                </div>
                <input
                  type="submit"
                  value="Agregar alumno"
                  class="btn btn-primary clase-bajar-btn-agragar"
                  v-else
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

import $ from "jquery";
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
        ou: "Alumno",
        grupos: [],
      },

      roles: roles,
      saveBtn: false,
      carreraSelect: "",
      gradoSelect: "",
      grupoSelect: "",
      carreras: "",
      grados: "",
      grupos: "",
    };
  },
  mounted() {
    if (this.usuario.cargo == roles.adscripto) {
      this.$router.push("/alumnos");
    }

    this.getAllCareras();
  },
  methods: {
    getAllCareras() {
      this.loading = true;
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "carrera", config)
        .then((response) => {
          if (response.status == 200) {
            this.carreras = response.data;
            this.loading = false;
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Error al cargar carreras",
          });
        });
    },

    cargarGrados(carrera) {
      this.grados = carrera.grado;
    },
    cargarGrupos() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "grado/" + this.gradoSelect, config)
        .then((response) => {
          if (response.status == 200) {
            this.grupos = response.data.grupos;
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Error al cargar grupos",
          });
        });
    },

    agregarArray(id, array) {
      if (!array.includes(id)) {
        array.push(id);
      }
    },
    returnGroupName(idGrupo) {
      for (let g of this.grupos) {
        if (g.id == idGrupo) {
          return { nombre: g.idGrupo, id: g.id };
        }
      }
    },
    eliminarArray(id, array) {
      const element = (element) => element == id;
      let index = array.findIndex(element);
      array.splice(index, 1);
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
            this.$router.push("/alumnos");
          }
        })
        .catch(() => {
          this.$swal.fire({
            icon: "error",
            title: "Error al crear alumno",
            text: "Verifique que la cedula no este registrada en el sistema",
          });
        });
    },

    returnImgProfile(img) {
      return "data:image/png;base64," + img;
    },
    cerrarModal(id) {
      $("#" + id).click();
    },
    validation_digit(ci) {
      var a = 0;
      var i = 0;
      if (ci.length <= 6) {
        for (i = ci.length; i < 7; i++) {
          ci = "0" + ci;
        }
      }
      for (i = 0; i < 7; i++) {
        a += (parseInt("2987634"[i]) * parseInt(ci[i])) % 10;
      }
      if (a % 10 === 0) {
        return 0;
      } else {
        return 10 - (a % 10);
      }
    },
    validate_ci(ci) {
      ci = this.clean_ci(ci);
      var dig = ci[ci.length - 1];
      ci = ci.replace(/[0-9]$/, "");
      return dig == this.validation_digit(ci);
    },
    clean_ci(ci) {
      return ci.replace(/\D/g, "");
    },
    validateCi() {
      let ci = this.nuevoUsuario.samaccountname;
      this.nuevoUsuario.samaccountname = ci.replace(/[^0-9]/g, "");

      const valinput = document.getElementById("cedula");
      if (this.validate_ci(valinput.value)) {
        valinput.style.borderBottom = "3px solid #9deb91";
        this.saveBtn = true;
      } else {
        valinput.style.borderBottom = "3px solid #eb91ae";
        this.saveBtn = false;
      }
    },
  },
};
</script>
