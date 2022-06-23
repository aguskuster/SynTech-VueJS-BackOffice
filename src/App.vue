<template>
  <div class="contenedorSupremo">
    <vue-headful :title="title" />

    <div class="menu" v-if="logged">
      <h3 class="text-muted">
        <router-link to="/home" title="Home"
          ><img
            src="./assets/images/LogoFinal.png"
            alt="Logo"
            style="width: 70px; margin: auto; display: block; margin-top: 20px"
          />
        </router-link>
      </h3>

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
          <router-link to="/contacto" title="Contacto" class="router-link">
            <i class="far fa-address-book"></i>
            Contacto
          </router-link>
        </li>
      </ul>

      <div class="perfil">
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
      title: "BackOffice",
      nav: false,
    };
  },
  mounted() {
    this.verificarLogueo();
  },
  methods: {
    bajarMenu() {
      let elemento = document.getElementById("navbarSupportedContent");
      if (this.nav) {
        elemento.classList.add("show");
      } else {
        elemento.classList.remove("show");
      }
    },
    verificarLogueo() {
      if (localStorage.getItem("auth_token")) {
        this.logged = true;
        this.usuario = localStorage.getItem("auth_nombre");
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
  background:  url(./assets/images/background-login.png);

}
.pagina {
  background: url(./assets/images/img.png) ;
}
@import "./assets/css/estilos.css";
</style>
