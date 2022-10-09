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

