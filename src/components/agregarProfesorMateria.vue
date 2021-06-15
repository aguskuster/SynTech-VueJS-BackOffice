<template>
  <div>
    <h1>Agregar Profesor a una Materia</h1>
    <div class="container p-3 my-3 border">
      <vue-headful :title="title" />

      <form
        name="form"
        id="form"
        v-on:submit.prevent="agregarProfesorMateria()"
      >
        <p>
          Nombre Profesor<em>*</em>:

          <select
            class="form-control"
            v-model="modelProfeMateria.idProfesor"
            aria-label="Default select example"
            required
          >
            <optgroup v-for="profe in profesores" :key="profe.username">
              <option v-bind:value="profe.username">{{ profe.nombre }}</option>
            </optgroup>
          </select>
        </p>
        <p>
          Materia<em>*</em>:

          <select
            class="form-control"
            v-model="modelProfeMateria.idMateria"
            aria-label="Default select example"
            required
          >
            <optgroup v-for="materia in materias" :key="materia.id">
              <option v-bind:value="materia.id">{{ materia.nombre }}</option>
            </optgroup>
          </select>
        </p>

        <hr />
        <input
          type="submit"
          value="Agregar Usuario"
          title="Enviar"
          class="btn btn-primary"
        />
      </form>
    </div>
  </div>
</template>

<script>
import vueHeadful from "vue-headful";
import { Global } from "../Global";
import axios from "axios";
export default {
  name: "agregarProfesorMateria",
  components: {
    vueHeadful,
  },
  data() {
    return {
      title: "BackOffice",
      nombre: "",
      nav: true,
      materias: "",
      profesores: "",
      modelProfeMateria: {
        idProfesor: "",
        idMateria: "",
      },
    };
  },

  mounted() {
    if (!localStorage.getItem("auth_token")) {
      this.$router.push("/login");
    }
    this.getMaterias();
    this.getProfesores();
  },
  methods: {
    getMaterias() {
      axios.get(Global.url + "materias").then((res) => {
        if (res.status == 200) {
          this.materias = res.data;
        } else {
          alert("no se pudo conectar");
        }
      });
    },
    getProfesores() {
      
      axios.get(Global.url + "profesores").then((res) => {
        if (res.status == 200) {
          this.profesores = res.data;
        } else {
          alert("no se pudo conectar");
        }
      });
    },
    agregarProfesorMateria() {
     
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };

      axios
        .post(Global.url + "profesor", this.modelProfeMateria, config)
        .then((response) => {
          if (response.status == 200) {

            this.flashMessage.show({
              status: "success",
              title: "BackOffice",
              message: "Profesor se agreo a la materia",
            });
            document.form.reset();
            this.$router.push("/home");
          }
        })
        .catch((error) => {
          console.log(error);
          this.flashMessage.show({
            status: "error",
            title: "BackOffice",
            message: "Profesor ya tiene esa materia",
          });
        });
    },
  },
};
</script>
