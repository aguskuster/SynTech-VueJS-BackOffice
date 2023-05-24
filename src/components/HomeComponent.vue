<template>
<div class="d-flex align-items-center justify-content-center" style="height: 60vh;">
 
  <div class="d-flex">
   
    <div class="text-center">
      <h2 style="font-size:45px;font-weight:600;"> ¡ Bienvenido !</h2>
      <br>
      <p >Usa la barra navegadora de la izquierda para crear, modificar, o eliminar contenido.</p>
      
    </div>
  </div>
  <div class="position-absolute bottom-0 end-0">
    <img src="../assets/images/hello.svg" alt="Imagen de una persona saludando" width="750" height="350">
  </div>
</div>
</template>

<script>

export default {
  name: "HomeComponent",
 
  data() {
    return {
       usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      title: "BackOffice",
      nombre: "",
      nav: true,
    };
  },

  mounted() {
    if (!localStorage.getItem("auth_token_BO")) {
      localStorage.clear();
    }
  },
};
</script>

