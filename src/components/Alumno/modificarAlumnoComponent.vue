<template>
  <div>
    <div class="contenedor_menu">
      <h2>Modificar Alumno</h2>
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
            <img :src="returnImgProfile(alumno.info.imagen_perfil)" alt="" />

            <h3>{{ alumno.info.nombre }}</h3>
            <hr />
          </center>
          <p class="text-muted">CI: {{ alumno.info.id }}</p>
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
                  v-model="alumno.info.email"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Rol</p>
                <input
                  disabled
                  v-model="alumno.info.ou"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Genero</p>
                <select
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                  v-model="alumno.info.genero"
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
                  v-model="alumno.info.email"
                  disabled
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Rol</p>
                <input
                  disabled
                  v-model="alumno.info.ou"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Genero</p>
                <input
                  disabled
                  v-model="alumno.info.genero"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
            </div>
          </div>
            <div class="user-rol" style="width: 35% !important">
             <div class="mb-3" v-if="usuario.cargo != 'Adscripto'">
              <div class="mb-3">
                <p style="font-size: 18px">
                  <span> Carrera</span>
                </p>
                <select
                  v-model="carreraSelect"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                  v-on:change="
                   cargarGrados(carreraSelect)
                  "
                >
                  <option
                    v-for="carrera in carreras"
                    v-bind:key="carrera.id"
                    :value="carrera"
                  >
                    {{ carrera.nombre +"-"+ carrera.plan}}
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
                  v-on:change="
                   cargarGrupos(gradoSelect)
                  "
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
                  v-on:change="
                    agregarArray(grupoSelect, alumno.grupos)
                  "
                >
                  <option
                    v-for="grupo in grupos"
                    v-bind:key="grupo.id"
                    :value="grupo.id"
                  >
                    {{ grupo.idGrupo +"-"+grupo.nombreCompleto }}
                  </option>
                </select>

                <ul class="list-group mt-4">
                  <li
                    class="list-group-item"
                    v-for="grupo in alumno.grupos"
                    v-bind:key="grupo.id"
                  >
                    <span class="d-flex justify-content-between">
                      {{ returnGroupName(grupo).nombre }}
                      <i
                        class="fal fa-times"
                        v-on:click="
                          eliminarArray(grupo, alumno.grupos)
                        "
                      ></i
                    ></span>
                  </li>
                </ul>
              </div>

              <div class="d-flex justify-content-end">
                <input
                  type="submit"
                  value="Agregar usuario"
                  class="btn btn-primary"
                />
              </div>

             </div>
               <div v-else>
                <p style="font-size: 18px">
                  <span> Grupos</span>
                
                </p>
               <ul class="list-group mt-4">
                <li
                  class="list-group-item"
                  v-for="grupo in alumno.grupos"
                  v-bind:key="grupo.id"
                >
                  <span class="d-flex justify-content-between">
                    {{ returnGroupName(grupo).nombre }}
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
              @click="eliminarUsuario(idAlumno)"
              v-if="usuario.cargo != 'Adscripto'"
            >
              Eliminar Alumno
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
      todosGrupo: "",
      grupoSelect: "",

      alumno: {
        info: "",
        grupos: [],
      },
      grupos: "",
      idAlumno: this.$route.params.user,
      
      nombre: "",
      apellido: "",

       carreraSelect: "",
      gradoSelect: "",
      
      carreras:"",
      grados:"",
    
    };
  },
  mounted() {
    this.getUsuario();
    this.getAllGrupos();
  },
  methods: {
      cargarGrados(carrera){
     
      this.grados = carrera.grado; 
    },
    cargarGrupos(){
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "grado/"+this.gradoSelect, config)
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
          return { nombre: g.idGrupo+" - "+g.nombreCompleto, id: g.id };
        }
      }
    },
    eliminarArray(id, array) {
      const element = (element) => element == id;
      let index = array.findIndex(element);
      array.splice(index, 1);
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
            this.alumno.info.nombre +
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
      if (!this.alumno.info.genero) {
        this.alumno.info.genero = "Sin especificar";
      }
      let user = {
        idUsuario: this.idAlumno,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.alumno.info.email,
        genero: this.alumno.info.genero,
        grupos: this.alumno.grupos,
      };

     

      axios
        .put(Global.url + "alumno/" + this.idAlumno, user, config)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire("Alumno Modificado", "", "success");
          }

          this.$router.push("/alumnos");
        })
        .catch(() => {
          this.$swal.fire("Error al modifcar alumno", "", "error");
        });
    },
    comprobarAccion(accion) {
      this.$swal
        .fire({
          icon: "info",
          title: "Modificar Alumno",
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
    returnOnlyId(grupos) {
      let aux = [];
      for (let g of grupos) {
        aux.push(g.id);
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
        .post(Global.url + "usuario/"+this.idAlumno+"/imagen-perfil", config)
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


      axios
        .delete(Global.url + "usuario/" + this.idAlumno, config)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire("Alumno eliminado", "", "success");
            this.$router.push("/alumnos");
          }
        })
        .catch(() => {
          this.$swal.fire("Error al eliminar alumno", "", "error");
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
        .get(Global.url + "alumno/" + this.idAlumno, config)
        .then((res) => {
          if (res.status == 200) {
            this.alumno.info = res.data.usuario;
            this.alumno.grupos = this.returnOnlyId(res.data.grupos);
            this.recortarNombre();
          }
        });
    },
    recortarNombre() {
      let user = this.alumno.info.nombre;
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
