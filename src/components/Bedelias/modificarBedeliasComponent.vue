<template>
  <div>
    <div class="contenedor_menu">
      <h2>Modificar Bedelia</h2>
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
            <img :src="returnImgProfile(bedelia.info.imagen_perfil)" alt="" />

            <h3>{{ bedelia.info.nombre }}</h3>
            <hr />
          </center>
          <p class="text-muted">CI: {{ bedelia.info.id }}</p>
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
                  v-model="bedelia.info.email"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Rol</p>
                <input
                  disabled
                  v-model="bedelia.info.ou"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Genero</p>
                <select
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                  v-model="bedelia.info.genero"
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
                  v-model="bedelia.info.email"
                  disabled
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Rol</p>
                <input
                  disabled
                  v-model="bedelia.info.ou"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
              <div class="mb-3">
                <p style="font-size: 18px">Genero</p>
                <input
                  disabled
                  v-model="bedelia.info.genero"
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                />
              </div>
            </div>
          </div>
              <div class="user-rol" style="width: 35% !important" v-if="usuario.cargo != 'Adscripto' &&  usuario.cargo != 'Administrativo'">
           
              <div class="mb-3">
                <p style="font-size: 18px">Rol <em>*</em></p>
                <select
                  v-model="bedelia.cargo"
                  class="form-select inputFachero"
                  style="height: 50px; font-size: 16px"
                >
                  <option value="" disabled selected>Seleccione un rol</option>
                  <option v-for="rol in roles" :value="rol" :key="rol.id">{{ rol }}</option>
                </select>
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
      loading: true,
      roles: roles,
      modificar: false,
      bedelia: {
        info: "",
        cargo: "",
      },
    
      idBedelia: this.$route.params.user,
   
      nombre: "",
      apellido: "",
    };
  },
  mounted() {
    this.getUsuario();

  },
  methods: { 

    comprobarModificarInfo() {
      this.$swal
        .fire({
          icon: "info",
          title: "Modificar Usuario",
          html:
            "¿ Estas seguro de que desea modificar la informacion del usuario <u><b>" +
            this.bedelia.info.nombre +
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
      if (!this.bedelia.info.genero) {
        this.bedelia.info.genero = "Sin especificar";
      }
      let user = {
        idUsuario: this.idBedelia,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.bedelia.info.email,
        genero: this.bedelia.info.genero,
        cargo: this.bedelia.cargo,
      };
    

      axios
        .put(Global.url + "bedelia/" + this.idBedelia, user, config)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire("Usuario Modificado", "", "success");
          }

          this.$router.push("/bedelias");
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
        .post(Global.url + "usuario/"+this.idBedelia+"/imagen-perfil", config)
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
            this.$swal.fire("Bedelia eliminado", "", "success");
            this.$router.push("/bedelias");
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
        .get(Global.url + "bedelia/" + this.idBedelia, config)
        .then((res) => {
          if (res.status == 200) {
            this.bedelia.info = res.data.usuario;
            this.bedelia.cargo = res.data.cargo;
         
            this.recortarNombre();
            this.loading = false;
          }
        });
    },
    recortarNombre() {
      let user = this.bedelia.info.nombre;
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
