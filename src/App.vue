<template>
  <div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
   <h3 class="text-muted"><router-link to="/home" title="Home"><img src="./assets/images/LogoFinal.png" alt="Logo" style="width:70px;" /></router-link></h3>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/home" class="nav-link navMargin" active-class="menuActivo" title="Home">Home</router-link>
      </li>
      <li class="nav-item">
       <router-link to="/listarUsuarios"  class="nav-link navMargin"  active-class="menuActivo" title="Listar Usuarios">Listar Usuarios</router-link>
      </li>
       <li class="nav-item">
       <router-link to="/contacto" active-class="menuActivo"  class="nav-link navMargin" title="Contacto">Contacto</router-link>
      </li>
      
    </ul>
    
      
      
      <router-link to="/login" active-class="menuActivoL"  class="btn btn-success my-2 my-sm-0"  title="Login">Login</router-link>
      
    
  </div>
  
  </nav>

     <div class="container">
     
      <br>
      <!--contenido-->
      <router-view></router-view>
      <!--/contenido-->
    
      <footer class="footer">
        <p>&copy; Desarrollado por Syntech</p>
      </footer>
    
</div>
<FlashMessage></FlashMessage>
</div>
 
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
@import "./assets/css/estilos.css";
</style>
