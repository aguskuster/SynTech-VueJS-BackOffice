<template>
  <div>
    <h1>Agregar Materia</h1>
    <div class="container p-3 my-3 border">
      <form name="form" id="form" v-on:submit.prevent="procesar()">
        <p style="color: white; text-decoration: none">
          Nombre Materia<em>*</em>:
          <input
            type="text"
            name="nombreMateria"
            placeholder="Ejemplo: Matematica"
            class="form-control"
            v-model="materia.nombreMateria"
            autocomplete="=off"
            required
           
          />
        </p>
        <hr />
        <input
          type="submit"
          value="Agregar Materia"
          title="Enviar"
          class="btn btn-primary"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { Global } from "../Global";
import axios from "axios";
export default {
  name: "agregarMateria",
  data() {
    return {
      submited: false,
      materia: {
        nombreMateria: "",
      },
    };
  },
  methods: {
    procesar() {
      this.submited = true;

      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .post(Global.url + "materia", this.materia, config)
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: "BackOffice",
              message: "Materia Agregado",
            });
            document.form.reset();
            this.$router.push("/listarMaterias");
          }
        })
        .catch((error) => {
          console.log(error);
          this.flashMessage.show({
            status: "error",
            title: "BackOffice",
            message: "Materia ya existe",
          });
        });
    },
  },
};
</script>