<template>
  <div class="contenedorSupremo">
    <vue-headful :title="title" />

    <div class="menu" v-if="logged">
      <router-link
        class="sidebarUser"
        style="text-decoration: none"
        :to="{
          name: 'modificar-perfil',
          params: {
            idUsuario: usuario.username,
          },
        }"
      >
        <img :src="returnImgProfile(imgB64)" />
        <div class="userInfo">
          <p>{{ usuario.nombre }}</p>

          <small style="color: white">{{ usuario.cargo }}</small>
        </div>
      </router-link>

      <ul>
        <li>
          <router-link to="/home" title="Home" class="router-link">
            <i class="far fa-home"></i>
            Inicio</router-link
          >
        </li>
        <li v-if="usuario.cargo != roles.adscripto && usuario.cargo != roles.administrativo">
          <router-link
            to="/bedelias"
            title="Listar Usuarios"
            class="router-link"
          >
            <i class="far fa-user"></i>
            Administradores</router-link
          >
        </li>
        <li>
          <router-link
            to="/alumnos"
            title="Listar Usuarios"
            class="router-link"
          >
            <i class="far fa-users"></i>
            Alumnos</router-link
          >
        </li>
        <li>
          <router-link
            to="/profesores"
            title="Listar Usuarios"
            class="router-link"
          >
            <i class="far fa-chalkboard-teacher"></i>
            Profesores</router-link
          >
        </li>
        <li>
          <router-link to="/carrera" class="router-link">
            <i class="fas fa-graduation-cap"></i>
            Carreras
          </router-link>
        </li>

        <li>
          <router-link to="/noticias" title="Home" class="router-link">
            <i class="fas fa-newspaper"></i>

            Noticias</router-link
          >
        </li>
          <li v-if="usuario.cargo != roles.adscripto && usuario.cargo != roles.administrativo">
          <router-link to="/historial" class="router-link">
            <i class="fas fa-history"></i>
            Historial Acciones
          </router-link>
        </li>
      </ul>

      <div class="perfil">
        <div style="color: white; display: flex">
          <span id="google_translate_element"> </span>
        </div>

        <div class="contenedorPerfil">
          <i class="far fa-sign-out-alt logout" v-on:click="cerrarSesion()"></i>
        </div>
      </div>
    </div>

    <!-- Separacion---------------------------------------------------------------- -->
    <div>
      <nav class="navbar navclase" style="padding: 0" v-if="logged">
        <span>
          <router-link to="/home" title="Home"
            ><img
              src="./assets/images/LogoFinal.png"
              alt="Logo"
              style="width: 70px"
            />
          </router-link>
        </span>

        <button
          class="navbar-toggler boton-nav-celular"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span style="color: white">
            <i class="fas fa-stream"></i>
          </span>
        </button>

        <div class="collapse navcel-Contenedor" id="navbarSupportedContent">
          <ul>
            <li v-on:click="bajarMenu()">
              <router-link to="/home" title="Home" class="nav-link">
                <i class="far fa-home"></i>
                Inicio</router-link
              >
            </li>
            <li v-on:click="bajarMenu()"  v-if="usuario.cargo != roles.adscripto && usuario.cargo != roles.administrativo">
              <router-link to="/bedelias" title="Listar Usuarios">
                <i class="far fa-user"></i>
                Bedelia</router-link
              >
            </li>
            <li v-on:click="bajarMenu()">
              <router-link to="/alumnos" title="Listar Usuarios">
                <i class="far fa-user"></i>
                Alumno</router-link
              >
            </li>
            <li v-on:click="bajarMenu()">
              <router-link to="/profesores" title="Listar Usuarios">
                <i class="far fa-user"></i>
                Profesor</router-link
              >
            </li>

            <li v-on:click="bajarMenu()">
              <router-link to="/carrera" class="router-link">
                <i class="fas fa-history"></i>
                Carreras
              </router-link>
            </li>

            <li v-on:click="bajarMenu()">
              <router-link to="/noticias" title="Home" class="router-link">
                <i class="fas fa-newspaper"></i>

                Noticias</router-link
              >
            </li>
            <li v-on:click="bajarMenu()" v-if="usuario.cargo != roles.adscripto && usuario.cargo != roles.administrativo">
              <router-link to="/historial" class="router-link">
                <i class="fas fa-history"></i>
                Historial Acciones
              </router-link>
            </li>

            <li>
              <i
                class="far fa-sign-out-alt logout"
                v-on:click="cerrarSesion()"
                style="font-size: 1.2rem"
              >
                Cerrar Sesion
              </i>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="contenedor_res pagina" v-if="logged">
      <br />
      <router-view> </router-view>
    </div>

    <div class="contenedor_res" v-if="!logged">
      <br />
      <LoginComponent></LoginComponent>
    </div>

    <FlashMessage></FlashMessage>
  </div>
</template>
<script>
import { Global } from "./Global";
import { roles } from "./Global";
import axios from "axios";
import vueHeadful from "vue-headful";
import LoginComponent from "./components/LoginComponent.vue";
export default {
  name: "App",
  components: {
    vueHeadful,
    LoginComponent,
  },
  data() {
    return {
      roles:roles,
      usuario: "",
      logged: false,
      imgB64: "",
      title: "Back Office",
      nav: false,
    };
  },
  mounted() {
    this.verificarLogueo();
  },
  methods: {
    returnImgProfile(img) {
      return "data:image/png;base64," + img;
    },
    bajarMenu() {
      let elemento = document.getElementById("navbarSupportedContent");
      if (this.nav) {
        elemento.classList.add("show");
      } else {
        elemento.classList.remove("show");
      }
    },
    getProfileImage() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .get(
          Global.url + "usuario/" + this.usuario.username + "/imagen-perfil",
          config
        )
        .then((res) => {
          if (res.status == 200) {
            this.imgB64 = res.data;
          }
        })
        .catch(() => {
          
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al cargar foto",
          });
        });
    },
    verificarLogueo() {
      if (localStorage.getItem("auth_token_BO")) {
        this.logged = true;
        this.usuario = JSON.parse(
          window.atob(localStorage.getItem("auth_token_BO"))
        );
        this.getProfileImage();
      }
    },
    cerrarSesion() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .post(Global.url + "logout", config)
        .then((res) => {
          if (res.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Sesion cerrada correctamente",
            });
            this.logged = false;
            localStorage.clear();
            location.reload();
          }
        })
    },
  },
};
</script>
<style>
body {
  background: url(./assets/images/background-login.png);
  --color: #50b7f5;
  --background: #cbd5e0;

  --colorLetra: #4f5468;
  background-color: #0e0d17;
}
.pagina {
  background-color: #ebe9f1;
}
@import "./assets/css/estilos.css";

.sidebarUser img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
}

.sidebarUser {
  display: flex;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  background-color: #13111e;
}

.sidebarUser:hover {
  cursor: pointer;
  background-color: #1f1c31;
}

.sidebarUser p {
  font-size: 17px;
  font-weight: 600;
  margin-left: 15px;
  text-decoration: none;
  color: white;
}
</style>
