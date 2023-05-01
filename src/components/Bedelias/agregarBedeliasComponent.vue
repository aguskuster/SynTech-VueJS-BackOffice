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
        style="width: 35%; background-color: #FFFFFF"
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
        style="width: 64%; background-color: #FFFFFF"
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
                  v-model="nuevoUsuario.rol"
                  class="form-select inputFachero"
                  style="height: 50px; font-size: 16px"
                >
                  <option value="" disabled selected>Seleccione un rol</option>
                  <option v-for="rol in roles" :value="rol" :key="rol.id">{{ rol }}</option>
                </select>
              </div>

              <div class="d-flex justify-content-end">
                <input
                  type="submit"
                  value="Agregar bedelia"
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
  name: "agregarBedeliasComponent.vue",
  data() {
    return {
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      loading: false,
      nuevoUsuario: {
        name: "",
        surname: "",
        samaccountname: "",
        userPrincipalName: "",
        ou: "Bedelias",
        rol:"",
      },

      roles: roles,
    
    };
  },
  mounted() {
     if (this.usuario.cargo == roles.administrativo || this.usuario.cargo == roles.adscripto) {
      this.$router.push("/home");
    }
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
        .post(Global.url + "usuario", this.nuevoUsuario, config)
        .then((response) => {
          if (response.status == 200) {
            this.$swal.fire({
              icon: "success",
              title: "Usuario agregado",
              text: "El usuario se agrego correctamente",
            });
            this.$router.push("/bedelias");
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
