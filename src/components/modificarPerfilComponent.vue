<template>
  <div>
    <div class="contenedor_menu">
      <h2>Mi Perfil</h2>
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
        style="width: 35%; background-color: #FFFFFF"
      >
        <div class="imgModificarUser">
          <center>
            <img :src="usuarioDatos.imagen_perfil" alt="" />

            <h3>{{ usuarioDatos.nombre }}</h3>
            <hr />
          </center>
          <p class="text-muted">CI: {{ usuarioDatos.id }}</p>
        </div>
        <div>
             <div style="position: absolute; bottom: 10px; width: 100%">
            <div style="display: flex; justify-content: space-between">
           <div class="btn btn-primary"  style="width: 48%">
              <label for="file-input" style="color: white">
                Cambiar Foto
              </label>

              <input
                @change="getFile"
                accept=".jpg, .png, .jpeg,"
                id="file-input"
                type="file"
                style="display: none"
              />
            </div>
              <button
                class="btn btn-primary"
                  @click="modalActualizarContrasenia()"
                v-if="usuario.cargo != 'Adscripto'"
                style="width: 48%"
              >
                Actualizar Contraseña
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="contenedorDerechoPersona"
        style="width: 64%; background-color: #FFFFFF"
      >
        <div class="formModificar">
          <div class="informacion-izquierda">
            <h3 style="text-transform: uppercase">Informacion Personal</h3>
            <div class="personalDetails">
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
                <select
                  class="form-control inputFachero"
                  style="height: 50px; font-size: 16px"
                  v-model="usuarioDatos.genero"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                  <option value="Otro">Prefiero no decirlo</option>
                </select>
              </div>
              
            </div>
          </div>
          <div class="informacion-derecha">
            <div>
              <h3 style="text-transform: uppercase">Cargo</h3>
              <div class="frmProfesorMaterias">
                <div>{{ usuarioInfo.cargo }}</div>
              </div>
            </div>
          </div>
          <div style="position: absolute; right: 40px; bottom: 10px">
            <button
              class="btn btn-success"
              style="margin-right: 10px"
              @click="comprobarModificarInfo()"
            >
              Actualizar
            </button>
            <button class="btn btn-danger" v-on:click="$router.back()">
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
      usuarioDatos: "",
      nombre: "",
      apellido: "",
      usuarioInfo: "",
      loading: false,
    };
  },
  mounted() {
  this.loading = true;
    this.getUsuario();
  },
  methods: {
    getFile(event) {
      let size = event.target.files[0].size;
      let res = size * 0.000001;
      if (res <= 50) {
        this.cambiarFoto(event.target.files[0]);
      } else {
        this.$swal.fire(this.language.archivoMayor50, "", "info");
      }
    },
    comprobarModificarInfo() {
      this.$swal
        .fire({
          icon: "info",
          title: "Modificar Usuario",
          html: "¿ Estas seguro de que quieres actualizar tu perfil ?",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Modificar",
        })
        .then((result) => {
         
          if (result.isConfirmed) {
            this.modificarUsuario();
          }
        });
    },
    modificarUsuario() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      let user = {
        idUsuario: this.usuario.username,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.usuarioDatos.email,
        genero: this.usuarioDatos.genero,
      };
    
      axios
        .put(Global.url + "usuario/"+this.usuario.username, user, config)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire("Perfil Actualizado", "", "success");
          }
          this.getUsuario();
        })
        .catch(() => {
          this.$swal.fire("Error al actualizar perfil", "", "error");
        });
    },

    cambiarFoto(foto) {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data;",
          token: Global.token,
        },
      };
      let formData = new FormData();
      formData.append("archivo", foto);
      axios
        .post(Global.url + "usuario/"+this.usuario.username+"/imagen-perfil", formData, config)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire({
              icon: "success",
              title: "Foto de perfil actualizada",
            });
            this.$router.push("/perfil/"+this.usuario.username);
          }
        })
        .catch(() => {
          this.$swal.fire({
            icon: "error",
            title: "ERROR",
            text: "Algo salio mal",
          });
        });
    },
    modalActualizarContrasenia() {
      this.$swal
        .fire({
          title: "Ingrese nueva contraseña",
          input: "password",
          
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Actualizar",
          showLoaderOnConfirm: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.actualizarContrasenia(result.value);
          }
        });

    },

    actualizarContrasenia(contrasenia) {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      let user = {
        contrasenia: contrasenia,
      };
      axios
        .put(Global.url + "usuario/"+this.usuario.username+"/contrasenia", user, config)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire("Contraseña actualizada", "", "success");
          }
        })
        .catch(() => {
          this.$swal.fire("Error al cambiar contraseña", "", "error");
        });
    },
    getUsuario() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      let user = this.$route.params.idUsuario;
      axios
        .get(Global.url + "usuario/"+ user, config)
        .then((res) => {
          if (res.status == 200) {
           
            
            this.usuarioDatos = res.data.user;
            this.usuarioInfo = res.data.info;
            this.recortarNombre();
            this.usuarioDatos.imagen_perfil = this.returnImgProfile(
              this.usuarioDatos.imagen_perfil
            );

          }
          this.loading = false;
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
