<template>
  <div>
    <vue-headful :title="title" />
    <h1>Página Home</h1>
    <p>
      Bienvenid@ {{ nombre }} |
      <a href="javascript:void(0);" v-on:click="cerrarSesion()">Salir</a>
    </p>
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
    if (localStorage.getItem("auth_token")) {
      this.nombre = localStorage.getItem("auth_nombre");
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    cerrarSesion() {
      localStorage.clear();
      //localStorage.removeItem(nombreDelLocal);
      this.$router.push("/login");
    },
  },
};
</script>

