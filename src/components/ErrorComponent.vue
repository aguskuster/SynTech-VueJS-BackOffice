<template>
  <div>
    <h1>Página no encontrada</h1>
    <vue-headful :title="title" />
    <br />
    <center>
      <div style="display: flex; flex-direction: row;justify-content:center">
        <div style="width: 10%">
          <img
          width="200px"
            src="https://i.pinimg.com/originals/76/ba/75/76ba7583218cf74f05fd5607b7d1a709.png"
            alt=""
          />
        </div>
      
        <h5 style="width: 20%;margin-top:100px">
          Oops, parece que te perdistes por el sendero de la vida . . .
        </h5>
      </div>

      <small><a href="/home">Volver Inicio</a></small>
    </center>
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
      title: "Error 404",
    };
  },
};
</script>