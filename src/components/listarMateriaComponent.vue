<template>
  <div>
    <div class="contenedor_menu">
      <vue-headful :title="title" />
      <h2>Listado de Materias</h2>
      <div>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalAgregarMateria"
        >
          <i class="far fa-books-medical"></i>
          Materia
        </button>
      </div>
    </div>

    <div class="contenedorGeneral">
      <div class="contenedorIzquierdo">
        <h4>Asignaturas</h4>
        <div class="menu_buscar" style="justify-content: center">
          <input placeholder="Buscar..." />
        </div>
        <div class="contenedor_table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Asignatura</th>
                <th scope="col">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="todo in todosMateria" :key="todo.id">
                <td v-if="todo.id == idModificar && modificar">
                  <input type="text" v-model="nuevoNombreMateria" />
                </td>
                <td v-else>{{ todo.nombre }}</td>
                <td class="tdMateria">
                  <i
                    class="fas fa-times"
                    style="
                      font-size: 20px;
                      margin-left: 20px;
                      color: red;
                      cursor: pointer;
                    "
                    v-if="modificar && idModificar == todo.id"
                    @click="modificar = false"
                  ></i>

                  <i
                    v-else
                    v-on:click="alternarModificar(todo.id, true)"
                    class="far fa-pen"
                    style="font-size: 20px; margin-left: 20px; color: orange"
                  ></i>
                  <i
                    class="fas fa-check"
                    v-if="modificar && idModificar == todo.id"
                    style="
                      font-size: 20px;
                      margin-left: 20px;
                      color: green;
                      cursor: pointer;
                    "
                    v-on:click="modificarMateria(todo.id)"
                  ></i>
                  <i
                    v-else
                    class="fas fa-search"
                    style="
                      font-size: 20px;
                      margin-left: 20px;
                      color: blue;
                      cursor: pointer;
                    "
                    v-on:click="traerProfesoresMateria(todo.id, todo.nombre)"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!--     MODAL AGREGAR PERSONA  -->
      <div
        class="modal fade"
        id="modalAgregarMateria"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Agregar materia
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form name="form" id="form" v-on:submit.prevent="crearMateria()">
                <p>
                  Nombre Materia<em> *</em> :
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

                <input
                  data-bs-dismiss="modal"
                  type="submit"
                  value="Agregar Materia"
                  title="Enviar"
                  class="btn btn-primary"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <!--     FIN MODAL AGREGAR PERSONA  -->
      <div class="contenedorDerechoPersona">
        <h4>Docentes que dictan {{ materiaSeleccionada }}</h4>
        <div class="menu_buscar">
          <input placeholder="Buscar..." />
          <div class="botonesMateria">
            <button type="button" class="btn btn-success ml-2">
              <i class="fas fa-plus"></i>
            </button>
            <button type="button" class="btn btn-primary ml-2">
              <i class="fas fa-pen"></i>
            </button>
            <button type="button" class="btn btn-danger ml-2">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="contenedor_table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Docente</th>
                <th scope="col">Email</th>
                <th scope="col">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="todo in materiaProfesores" :key="todo.id">
                <td>{{ todo.nombre }}</td>
                <td>{{ todo.email }}</td>
                <td><a href="">Ver Perfil</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Global } from "../Global";
import axios from "axios";
import vueHeadful from "vue-headful";

export default {
  name: "Listado Materias",

  components: {
    vueHeadful,
  },
  data() {
    return {
      title: "BackOffice",
      nav: true,
      todosMateria: "",
      materiaProfesores: "",
      materiaSeleccionada: "",
      modificar: false,
      nuevoNombreMateria: "",
      idModificar: "",
      materia: {
        nombreMateria: "",
      },
    };
  },
  mounted() {
    if (!localStorage.getItem("auth_token")) {
      this.$router.push("/login");
    }
    this.getTodos();
  },
  methods: {
    alternarModificar(idMateria, boolean) {
      this.idModificar = idMateria;
      this.modificar = boolean;
    },
    crearMateria() {
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
              title: Global.nombreSitio,
              message: "Materia Agregado",
            });
            this.getTodos();
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Materia ya existe",
          });
        });
    },
    getTodos() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "materias", config)
        .then((res) => {
          if (res.status == 200) {
            this.todosMateria = res.data;
            this.traerProfesoresMateria(
              this.todosMateria[0].id,
              this.todosMateria[0].nombre
            );
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al cargar",
          });
        });
    },
    modificarMateria(idMateria) {
      let parametros = {
        idMateria: idMateria,
        nuevoNombre: this.nuevoNombreMateria,
      };
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .put(Global.url + "materia", parametros, config)
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Materia modificada.",
            });
            this.modificar = false;
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Error al modificar",
          });
        });
    },
    traerProfesoresMateria(idMateria, nombreMateria) {
      this.materiaSeleccionada = nombreMateria;
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "materia-profesores?idMateria=" + idMateria, config)
        .then((res) => {
          if (res.status == 200) {
            this.materiaProfesores = res.data;
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al cargar",
          });
        });
    },
  },
};
</script>

