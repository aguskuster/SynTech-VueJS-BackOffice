<template>
  <div>
    <div class="container">
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
          value="Enviar"
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
                title: "BackOffice",
                message: "Error , credenciales invalidas",
              });
              localStorage.clear();
            } else {
              this.$router.push("/home");
              location.reload();
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.flashMessage.show({
            status: "error",
            title: "BackOffice",
            message: "Error , credenciales invalidas" + error,
          });
          document.form.reset();
        });
    },
  },
};
</script>

<style>

.login-container {
  position: relative;
  width: 300px;
  margin: 80px auto;
  padding: 20px 40px 40px;
  text-align: center;
  background: #393e41be;
  border: 1px solid #ccc;
}


.avatar {
  background:url(../assets/images/LogoFinal.png);
  width: 100px;
  height: 100px;
  margin: 10px auto 30px;
  background-size: cover;
  
}
.letraslogin{
  color:white;
}

</style>