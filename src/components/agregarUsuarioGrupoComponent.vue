<template>
  <div>
    <h1>Agregar Usuario a un Grupo</h1>
    <div class="container p-3 my-3 border">
      <vue-headful :title="title" />

      <form
        name="form"
        id="form"
        v-on:submit.prevent="agregarUsuarioGrupo()"
      >
        <p>
          Tipo Miembro<em>*</em>:
          <select
            v-on:change="buscarMiembro()"
            class="form-control"
            v-model="tipo"
            aria-label="Default select example"
            required
          >
            <option>Alumno</option>

            <option>Profesor</option>
          </select>
        </p>

        <p>
          Miembro<em>*</em>:
          <select
            class="form-control"
            v-model="miembro"
            aria-label="Default select example"
            required
            v-on:change="getProfeMateria()"
          >
            <option
              v-for="user in usuarios"
              :key="user.id"
              v-bind:value="user.username"
            >
              {{ user.nombre }}
            </option>
          </select>
        </p>
        
        <p v-if='profesor'>
          Materia<em>*</em>:
          <select
            class="form-control"
            v-model="materias"
            aria-label="Default select example"
            required
          >
            <option
              v-for="mate in materiaProfesor"
              :key="mate.id"
              v-bind:value="mate.idMateria"
            >
              {{ mate.materia }}
            </option>
          </select>
        </p>
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
      tipo: "",
      materiaProfesor: "",
      modelProfeMateria: [],
      usuarios: "",
      profesor: false,
      materias: "",
    };
  },

  mounted() {
    if (!localStorage.getItem("auth_token")) {
      this.$router.push("/login");
    }
   
  },
  methods: {
    buscarMiembro() {
      if (this.tipo === "Alumno") {
        this.getAlumnos();
      } else {
        this.profesor = true;
        this.getProfesores();
      }
    },

    getAlumnos() {
       let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios.get(Global.url + "alumnos",config).then((res) => {
        if (res.status == 200) {
          this.usuarios = res.data;
        } else {
          alert("no se pudo conectar");
        }
      });
    },

    getProfeMateria() {
       let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      let grupo = this.$route.params.grupo;
      axios.get(Global.url + "grupo-materia?idGrupo=" + grupo + "&idProfesor=" + this.miembro,config).then((res) => {
        if (res.status == 200) {
          this.materiaProfesor = res.data;
        } else {
          alert("no se pudo conectar");
        }
      });
    }, 

    
    getProfesores() {
       let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios.get(Global.url + "profesores",config).then((res) => {
        if (res.status == 200) {
          this.usuarios = res.data;
        } else {
          alert("no se pudo conectar");
        }
      });
    },

    getMaterias() {
       let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios.get(Global.url + "profesorMateria",config).then((res) => {
        if (res.status == 200) {
          this.materiaProfesor = res.data;
        } else {
          alert("no se pudo conectar");
        }
      });
    },

    agregarUsuarioGrupo() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      let grupo = this.$route.params.grupo;
      let url;
      let parametros;

      if (this.tipo === "Alumno") {
           parametros = {
          idGrupo: grupo,
          idAlumnos: this.miembro,
        };

        url = 'alumno';
      } else {
           parametros = {
          idGrupo: grupo,
          idMateria: this.materias,
          idProfesor: this.miembro,
        };
          url = 'curso';
      }
      axios
        .post(Global.url + url, parametros, config)
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: "BackOffice",
              message: "Miembro se agrego al grupo",
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
