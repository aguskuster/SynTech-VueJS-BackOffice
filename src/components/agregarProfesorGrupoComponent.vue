<template>
  <div>
    <h1>Agregar Profesor a un Grupo</h1>
    <div class="container p-3 my-3 border">
      <vue-headful :title="title" />
      <form
        name="form"
        id="form"
        v-on:submit.prevent="agregarProfesorGrupo()"
      >
        <p>
          Profesores<em>*</em>:

          <select
            class="form-control"
            v-model="modelProfeMateria"
            aria-label="Default select example"
            required
          >
            
              <option v-for="profe in materiaProfesor" :key="profe.cedulaProfesor" v-bind:value="[profe.cedulaProfesor, profe.idMateria]">{{ profe.nombreProfesor }} - {{ profe.nombreMateria }}</option>
            
          </select>
        </p>
        <hr />
        <input
          type="submit"
          value="Agregar"
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
  name: "agregarProfesorGrupoComponent",
  components: {
    vueHeadful,
  },
  data() {
    return {
      title: "BackOffice",
      materiaProfesor: "",
      modelProfeMateria:[],
    };
  },

  mounted() {
    if (!localStorage.getItem("auth_token")) {
      this.$router.push("/login");
    }
    this.getMaterias();
  },
  methods: {
    getMaterias() {
      axios.get(Global.url + "profesorMateria").then((res) => {
        if (res.status == 200) {
          this.materiaProfesor = res.data;
        } else {
          alert("no se pudo conectar");
        }
      });
    },

    agregarProfesorGrupo() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
    let grupo = this.$route.params.grupo;
    let parametros = {
        'idGrupo' :grupo,
        'idMateria' : this.modelProfeMateria[1],
        'idProfesor' : this.modelProfeMateria[0]
    };
      axios
        .post(Global.url + "curso", parametros, config)
        .then((response) => {
          if (response.status == 200) {

            this.flashMessage.show({
              status: "success",
              title: "BackOffice",
              message: "Profesor se agrego al grupo",
            });
            document.form.reset();
            this.$router.push("/listarGrupo");
          }
        })
        .catch((error) => {
          console.log(error);
          this.flashMessage.show({
            status: "error",
            title: "BackOffice",
            message: "Grupo ya tiene esta  materia",
          });
        });
    },
  },
};
</script>
