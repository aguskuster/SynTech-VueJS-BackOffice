<template>
  <div>
    <div class="contenedor_menu">
      <h2>Agregar Profesor</h2>
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

            <h3>Nuevo Profesor</h3>
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
              <!-- Modal agregar materia -->

              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Crear una nueva materia
                      </h5>
                      <button
                        id="closeModal"
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <div class="modal-body">
                      <form
                        name="form"
                        id="form"
                        v-on:submit.prevent="agregarMateria()"
                      >
                        <p>
                          Nombre de Materia<em> *</em> :
                          <br />
                          <input
                            type="text"
                            v-model="nuevaMateria.nombre"
                            class="form-control"
                            required
                          />
                        </p>
                        <input
                          type="submit"
                          value="Agregar Materia"
                          title="Enviar"
                          class="btn btn-primary"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <!--Fin Modal -->
              <div class="mb-3" v-if="nuevoUsuario.ou == 'Profesor'">
                <p style="font-size: 18px">
                  <span> Materias</span>
                  <i
                    class="fa fa-plus-square ml-2"
                    style="color: #006799; cursor: pointer"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  ></i>
                </p>

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

              <div class="d-flex justify-content-end">
                <div
                  class="btn btn-primary clase-bajar-btn-agragar"
                  disabled
                  v-if="!saveBtn"
                >
                  Agregar profesor
                </div>
                <input
                  type="submit"
                  value="Agregar profesor"
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
        ou: "Profesor",
        materias: [],
      },
      saveBtn: false,
      materiaSelect: "",
      roles: roles,
      materias: [],
      nuevaMateria: {
        nombre: "",
      },
    };
  },
  mounted() {
    if (this.usuario.cargo == roles.adscripto) {
      this.$router.push("/profesores");
    }
    this.getAllMaterias();
  },
  methods: {
    agregarMateria() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .post(Global.url + "materia", this.nuevaMateria, config)
        .then((response) => {
          if (response.status == 201) {
            this.materias.push(response.data);
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Nueva materia agregada",
            });
            this.nuevaMateria.nombre = "";
            this.cerrarModal("closeModal");
          }
        })
        .catch(() => {
          this.cerrarModal("closeModal");
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Materia ya existente",
          });
        });
    },
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
            this.$router.push("/profesores");
          }
        })
        .catch(() => {
          this.$swal.fire({
            icon: "error",
            title: "Error al crear un profesor",
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
