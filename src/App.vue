<template>
  <div class="contenedorSupremo">
    <vue-headful :title="title" />

    <div class="menu" v-if="logged">
  
        <router-link
          class="sidebarUser"
          style="text-decoration:none"
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
            Home</router-link
          >
        </li>
        <li>
          <router-link
            to="/listarUsuarios"
            title="Listar Usuarios"
            class="router-link"
          >
            <i class="far fa-user"></i>
            Listar Usuarios</router-link
          >
        </li>
        <li>
          <router-link
            to="/listarMaterias"
            title="Listar Materia"
            class="router-link"
          >
            <i class="fal fa-books"></i>

            Listar Materia
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/listarGrupo"
            title="Listar Grupo"
            class="router-link"
          >
            <i class="far fa-users"></i>Listar Grupo
          </router-link>
        </li>
            <li>
          <router-link to="/noticias" title="Home" class="router-link">
          <i class="fas fa-newspaper"></i>

            Noticias</router-link
          >
        </li>
        <li>
          <router-link to="/historial" class="router-link">
            <i class="fas fa-history"></i>
            Historial Acciones
          </router-link>
        </li>
      </ul>

      <div class="perfil">
        <div style="color:white;display:flex;">
        

          <span id="google_translate_element">  </span>

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
                Home</router-link
              >
            </li>
            <li v-on:click="bajarMenu()">
              <router-link to="/listarUsuarios" title="Listar Usuarios">
                <i class="far fa-user"></i>
                Listar Personas</router-link
              >
            </li>
            <li v-on:click="bajarMenu()">
              <router-link to="/listarMaterias" title="Listar Materia">
                <i class="fal fa-books"></i>

                Listar Materia
              </router-link>
            </li>
            <li v-on:click="bajarMenu()">
              <router-link to="/listarGrupo" title="Listar Grupo">
                <i class="far fa-users"></i>Listar Grupo
              </router-link>
            </li>
            <li v-on:click="bajarMenu()">
              <router-link to="/contacto" title="Contacto">
                <i class="far fa-address-book"></i>
                Contacto
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
      usuario: "",
      logged: false,
      imgB64: "",
      title: "BackOffice",
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
        .get(Global.url + "foto?id=" + this.usuario.username, config)
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
      localStorage.clear();
      location.reload();
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
  background: url(./assets/images/img.png);
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
