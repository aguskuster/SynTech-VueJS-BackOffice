<template>
  <div>
    <div class="contenedor_menu">
      <h2>Agregar Bedelia</h2>
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

            <h3>Nuevo Bedelia</h3>
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
              <div class="mb-3">
                <p style="font-size: 18px">Rol <em>*</em></p>
                <select
                  v-model="nuevoUsuario.cargo"
                  class="form-select inputFachero"
                  style="height: 50px; font-size: 16px"
                >
                  <option value="" disabled selected>Seleccione un rol</option>
                  <option v-for="rol in roles" :value="rol" :key="rol.id">
                    {{ rol }}
                  </option>
                </select>
              </div>
              <div class="d-flex justify-content-end">
                <div class="btn btn-primary" disabled v-if="!saveBtn">
                  Agregar bedelias
                </div>
                <input
                  type="submit"
                  value="Agregar bedelia"
                  class="btn btn-primary"
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
        cargo: "",
      },
      roles: roles,
      saveBtn: false,
    };
  },
  mounted() {
    if (
      this.usuario.cargo == roles.administrativo ||
      this.usuario.cargo == roles.adscripto
    ) {
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
            title: "Error al crear bedelia",
            text: "Verifique que la cedula no este registrada en el sistema",
          });
        });
    },

    returnImgProfile(img) {
      return "data:image/png;base64," + img;
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
      const valinput = document.getElementById("cedula");

      let ci = this.nuevoUsuario.samaccountname;
      this.nuevoUsuario.samaccountname = ci.replace(/[^0-9]/g, "");

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
