<template>
  <div style=''>
    <div class="">
      <div class="login-container">
        <div id="output"></div>
        <div class="avatar">
        </div>
        <div class="form-box">
          <form form name="form" id="form" v-on:submit.prevent="procesar()">
            <p class="letraslogin">
              Documento:
              <input
                type="text"
                name="username"
                placeholder="Documento"
                class="form-control"
                v-model="contacto.username"
              />
            </p>
            <p class="letraslogin">
              Contraseña:
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                class="form-control"
                v-model="contacto.password"
              />
            </p>
           <input
          type="submit"
          value="Login"
          title="Enviar"
          class="btn"
        />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Global } from "../Global";
import axios from "axios";
export default {
  name: "LoginComponent",
  data() {
    return {
      contacto: {
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    localStorage.clear();
  },

  methods: {
    procesar() {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post(Global.url + "login", this.contacto, config)
        .then((response) => {
          if (response.status == 200) {
            let uncodeResponseData = JSON.parse(
              window.atob(response.data.datos)
            );
            localStorage.setItem("auth_token", response.data.datos);
            localStorage.setItem("auth_nombre", uncodeResponseData.nombre);

            if (uncodeResponseData.ou != "Bedelias") {
              this.flashMessage.show({
                status: "error",
                title: Global.nombreSitio,
                message: "Error, credenciales invalidas",
              });
              localStorage.clear();
            } else {
              this.$router.push("/home");
              location.reload();
            }
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Error, credenciales invalidas",
          });
          document.form.reset();
        });
    },
  },
};
</script>
