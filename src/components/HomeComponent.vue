<template>
<div>
<h1>Página Home</h1>
<div class="container p-3 my-3 border">
    <vue-headful :title="title" />
    
  
</div>
</div>
</template>

<script>
import vueHeadful from "vue-headful";
export default {
  name: "HomeComponent",
  components: {
    vueHeadful,
  },
  data() {
    return {
      title: "BackOffice",
      nombre: "",
    };
  },

  mounted() {
/*     if (localStorage.getItem("auth_token")) {
      this.nombre = localStorage.getItem("auth_nombre");
    } else {
      this.$router.push("/login");
    } */
  },
 
};
</script>

