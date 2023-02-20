<template>
  <div>
    <div class="contenedor_menu">
      <h2>Modificar Profesor</h2>
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
        style="width: 30%; background-color: whitesmoke"
      >
        <div class="imgModificarUser">
          <center>
            <img :src="returnImgProfile(usuarioDatos.imagen_perfil)" alt="" />

            <h3>{{ usuarioDatos.nombre }}</h3>
            <hr />
          </center>
          <p class="text-muted">CI: {{ usuarioDatos.id }}</p>
        </div>
        <div>
          <div style="position: absolute; bottom: 10px; left: 37px">
            <button
              class="btn btn-primary"
              @click="comprobarAccion('foto')"
              v-if="usuario.cargo != 'Adscripto'"
            >
              Restablecer Foto
            </button>
            <button
              class="btn btn-primary"
              @click="comprobarAccion('contraseña')"
              v-if="usuario.cargo != 'Adscripto'"
            >
              Restablecer Contraseña
            </button>
          </div>
        </div>
      </div>

      <div
        class="contenedorDerechoPersona"
        style="width: 69%; background-color: whitesmoke"
      >
        <div class="formModificar">
          <div class="informacion-izquierda">
            <h3 style="text-transform: uppercase">Informacion Personal</h3>
            <div class="personalDetails" v-if="usuario.cargo != 'Adscripto'">
              <div class="mb-3">
                <p style="font-size: 18px">Nombre</p>
                <input
                  v-model="nombre"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Apellido</p>
                <input
                  v-model="apellido"
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
                  v-model="nombre"
                  disabled
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Apellido</p>
                <input
                  v-model="apellido"
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
            <div v-if="usuarioDatos.ou == 'Profesor'">
              <h3 style="text-transform: uppercase">
                Materias
                <i
                  style="font-size: 16px"
                  class="fas fa-edit"
                  v-on:click="modificar = !modificar"
                ></i>
              </h3>

              <div class="frmProfesorMaterias" v-if="modificar">
                <select
                  class="form-control"
                  v-model="materiaSelect"
                  v-on:change="
                    agregarArray(materiaSelect, usuarioInfo.materias)
                  "
                >
                  <option :value="m.id" v-for="m in todosMateria" :key="m.id">
                    {{ m.nombre }}
                  </option>
                </select>
                <div class="contenedorMateriaForm">
                  <span
                    class="btnAgregarComp"
                    v-for="selectedSubject in usuarioInfo.materias"
                    :key="selectedSubject.id"
                  >
                    <div
                      style="
                        width: 80%;
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                        margin: 0 auto;
                      "
                    >
                      <span>{{ returnSubjectNameById(selectedSubject) }} </span>
                      <i
                        @click="
                          eliminarArray(selectedSubject, persona.idMaterias)
                        "
                        class="fas fa-times"
                      ></i>
                    </div>
                  </span>
                </div>
              </div>

              <div class="frmProfesorMaterias" v-else>
                <div v-for="materia in usuarioInfo.materias" :key="materia.id">
                  {{ returnSubjectNameById(materia) }}
                </div>
              </div>
            </div>
          </div>

          <div
            style="
              width: 85%;
              display: flex;
              justify-content: space-between;
              position: absolute;
              right: 40px;
              bottom: 10px;
            "
          >
            <button
              class="btn btn-danger"
              style="margin-right: 10px; width: 200px"
              @click="eliminarUsuario(usuarioDatos.id)"
              v-if="usuario.cargo != 'Adscripto'"
            >
              Eliminar Usuario
            </button>
            <div>
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
  </div>
</template>
<script>
import { Global } from "../../Global";
import axios from "axios";
import { roles } from "../../Global";
export default {
  name: "modificarUsuarioComponent.vue",
  data() {
    return {
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      usuarioDatos: "",
      nombre: "",
      apellido: "",
      usuarioInfo: {
        materias: [],
      },
      loading: true,
      roles: roles,
      modificar: false,
      todosMateria: "",
      materiaSelect: "",
    };
  },
  mounted() {
    this.getUsuario();
    this.getAllMaterias();
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
          return m.nombre;
        }
      }
    },
    eliminarArray(id, array) {
      const element = (element) => element == id;
      let index = array.findIndex(element);
      array.splice(index, 1);
    },
    comprobarModificarInfo() {
      this.$swal
        .fire({
          icon: "info",
          title: "Modificar Usuario",
          html:
            "¿ Estas seguro de que desea modificar la informacion del usuario <u><b>" +
            this.usuarioDatos.nombre +
            " </b></u> ?",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Modificar",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.modificarUsuario();
          } else {
            return false;
          }
        });
    },
    getAllMaterias() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "materia", config)
        .then((res) => {
          if (res.status == 200) {
            this.todosMateria = res.data;
            this.loading = false;
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
    modificarUsuario() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      let user = {
        idUsuario: this.usuarioDatos.id,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.usuarioDatos.email,
        materias: this.usuarioInfo.materias,
        genero: this.usuarioDatos.genero,
      };

      axios
        .put(Global.url + "usuario/" + user.idUsuario, user, config)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire("Usuario Modificado", "", "success");
          }

          this.$router.push("/usuarios");
        })
        .catch(() => {
          this.$swal.fire("Error al modifcar usuario", "", "error");
        });
    },
    comprobarAccion(accion) {
      this.$swal
        .fire({
          icon: "info",
          title: "Modificar Usuario",
          html:
            "Si haces click en restablecer , la " +
            accion +
            " volvera a tener el valor por defecto.",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Restablecer",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            if (accion == "contraseña") {
              this.restablecerContrasenia();
            }
            if (accion == "foto") {
              this.restablecerFoto();
            }
          }
        });
    },
    restablecerFoto() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      let user = { id: this.$route.params.user };
      axios
        .post(Global.url + "foto", user, config)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire("Foto actualizada", "", "success");
          }
          this.getUsuario();
        })
        .catch(() => {
          this.$swal.fire("Error al restablecer foto", "", "error");
        });
    },
    eliminarUsuario() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      let user = this.$route.params.user;

      axios
        .delete(Global.url + "usuario/" + user, config)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire("Profesor eliminado", "", "success");
            this.$router.push("/profesores");
          }
        })
        .catch(() => {
          this.$swal.fire("Error al eliminar usuario", "", "error");
        });
    },
    restablecerContrasenia() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      let user = { id: this.$route.params.user };
      axios
        .put(Global.url + "contrasenia", user, config)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire("Contraseña actualizada", "", "success");
          }
        })
        .catch(() => {
          this.$swal.fire("Error al restablecer contraseña", "", "error");
        });
    },
    getUsuario() {
      let config = {
        headers: {
          token: Global.token,
        },
      };

      axios
        .get(Global.url + "usuario/" + this.$route.params.user, config)
        .then((res) => {
          if (res.status == 200) {
            this.usuarioDatos = res.data.user;
            this.usuarioInfo.materias = this.parseInfoUser(res.data.info);

            this.recortarNombre();
            this.loading = false;
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
    parseInfoUser(materias) {
      let arrayIdMaterias = [];
      for (let materia of materias) {
        arrayIdMaterias.push(materia.id);
      }
      return arrayIdMaterias;
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
