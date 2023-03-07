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
            <img :src="returnImgProfile(profesor.info.imagen_perfil)" alt="" />

            <h3>{{ profesor.info.nombre }}</h3>
            <hr />
          </center>
          <p class="text-muted">CI: {{ profesor.info.id }}</p>
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
                  v-model="profesor.info.email"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Rol</p>
                <input
                  disabled
                  v-model="profesor.info.ou"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Genero</p>
                <select
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                  v-model="profesor.info.genero"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                  <option value="Otro">Prefiero no decirlo</option>
                </select>
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
                  v-model="profesor.info.email"
                  disabled
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Rol</p>
                <input
                  disabled
                  v-model="profesor.info.ou"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Genero</p>
                <input
                  disabled
                  v-model="profesor.info.genero"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
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
            <div class="mb-3" v-if="usuario.cargo != 'Adscripto'">
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
                v-on:change="agregarArray(materiaSelect, profesor.materias)"
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
                  v-for="materia in profesor.materias"
                  v-bind:key="materia.id"
                >
                  <span class="d-flex justify-content-between">
                    {{ returnSubjectNameById(materia).nombre }}
                    <i
                      class="fal fa-times"
                      v-on:click="eliminarArray(materia, profesor.materias)"
                    ></i
                  ></span>
                </li>
              </ul>
            </div>

            <div v-else>
               <p style="font-size: 18px">
                  <span> Materias</span>
              
                </p>
                 <ul class="list-group mt-4">
                <li
                  class="list-group-item"
                  v-for="materia in profesor.materias"
                  v-bind:key="materia.id"
                >
                  <span class="d-flex justify-content-between">
                    {{ returnSubjectNameById(materia).nombre }}
                   </span>
                </li>
              </ul>
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
  name: "modificarProfesorComponent.vue",
  data() {
    return {
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      usuarioDatos: "",

      usuarioInfo: {
        materias: [],
      },
      loading: true,
      roles: roles,
      modificar: false,
      todosMateria: "",
      materiaSelect: "",

      profesor: {
        info: "",
        materias: [],
      },
      materias: "",
      idProfesor: this.$route.params.user,
      nuevaMateria: {
        nombre: "",
      },
      nombre: "",
      apellido: "",
    };
  },
  mounted() {
    this.getUsuario();
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
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Nueva materia agregada",
            });
            this.getAllMaterias();
            this.cerrarModal("closeModal");
            this.nuevaMateria = "";
          }
        })
        .catch(() => {
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
          this.loading = false;
        }
      });
    },

    comprobarModificarInfo() {
      this.$swal
        .fire({
          icon: "info",
          title: "Modificar Usuario",
          html:
            "¿ Estas seguro de que desea modificar la informacion del usuario <u><b>" +
            this.profesor.info.nombre +
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
    modificarUsuario() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      if (!this.profesor.info.genero) {
        this.profesor.info.genero = "Sin especificar";
      }
      let user = {
        idUsuario: this.usuarioDatos.id,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.profesor.info.email,
        genero: this.profesor.info.genero,
        materias: this.profesor.materias,
      };
   

      axios
        .put(Global.url + "profesor/" + this.idProfesor, user, config)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire("Usuario Modificado", "", "success");
          }

          this.$router.push("/profesores");
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
    returnOnlyId(materias) {
      let aux = [];
      for (let m of materias) {
        aux.push(m.id);
      }
      return aux;
    },
    restablecerFoto() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
   
      axios
        .post(Global.url + "usuario/"+this.idProfesor+"/imagen-perfil", config)
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
        .get(Global.url + "profesor/" + this.idProfesor, config)
        .then((res) => {
          if (res.status == 200) {
            this.profesor.info = res.data.usuario;
            this.profesor.materias = this.returnOnlyId(res.data.materia);
            this.recortarNombre();
          }
        });
    },
    recortarNombre() {
      let user = this.profesor.info.nombre;
      let res = user.split(" ");
      this.nombre = res[0];
      this.apellido = res[1];
    },
    parseInfoUser(materias) {
      let arrayIdMaterias = [];
      for (let materia of materias) {
        arrayIdMaterias.push(materia.id);
      }
      return arrayIdMaterias;
    },

    returnImgProfile(img) {
      return "data:image/png;base64," + img;
    },
  },
};
</script>
