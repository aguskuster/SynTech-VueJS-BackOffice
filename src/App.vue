<template>
  <div>
    <div class="container">
      <!--head-->
      <div class="header clearfix">
        <nav>
          <ul class="nav nav-pills pull-right">
            <li role="presentation">
              <router-link to="/home" active-class="menuActivo" title="Home">Home</router-link>
            </li>
            <li role="presentation">
              <router-link to="/listarUsuarios" active-class="menuActivo" title="Listar Usuarios">Listar Usuarios</router-link>
            </li>
            <li role="presentation">
              <router-link to="/servicios" active-class="menuActivo" title="Servicios">Servicios</router-link>
            </li>
            <li role="presentation">
              <router-link to="/contacto" active-class="menuActivo" title="Contacto">Contacto</router-link>
            </li>
           
             <li role="presentation">
              <router-link to="/login" active-class="menuActivo" title="Login">Login</router-link>
            </li>
          </ul>
        </nav>
        <h3 class="text-muted"><img src="./assets/images/LogoFinal.png" alt="Logo" style="width:70px;" /></h3>
      </div>
      <!--/head-->
      <!--contenido-->
      <router-view></router-view>
      <!--/contenido-->
      <!--footer-->
      <footer class="footer">
        <p>&copy; Desarrollado por Syntech</p>
      </footer>
      <!--/footer-->
    </div>
  </div>
</template>

<script>
//import TestComponent from './components/TestComponent.vue'

export default {
  name: 'App',
  components: {
    //TestComponent
  }
}
</script>

<style>
@import './assets/css/bootstrap.css';
@import './assets/css/jumbotron-narrow.css';
@import './assets/css/estilos.css';
</style>
