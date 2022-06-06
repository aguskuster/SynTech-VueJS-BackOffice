<template>
  <div>
    <div class="contenedor_menu">
      <vue-headful :title="title" />
      <h2>Listado de Materias</h2>
      <div>
        <button type="button" class="right btn btn-primary">
          <router-link style="color: white; text-decoration: none" to="/materia"
            ><i class="far fa-books-medical"></i> Materia
          </router-link>
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
                <td>{{ todo.nombre }}</td>
                <td class="tdMateria">
                  <router-link
                    :to="{
                      name: 'listar-materia-eliminar',
                      params: { materia: todo.id },
                    }"
                  >
                    <i
                      class="far fa-user-times"
                      style="font-size: 20px; margin-left: 20px; color: red"
                    ></i>
                  </router-link>
                  <!--  <router-link
                  :to="{
                    name: 'listar-materia-modificar',
                    params: { materia: todo.nombre, idMateria: todo.id },
                  }"
                >
                  <i
                    class="far fa-info-circle"
                    style="font-size: 20px; margin-left: 20px; color: blue"
                  ></i>
                </router-link> -->

                  <i
                    class="far fa-info-circle"
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
  name: "HomeComponent",
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
    };
  },
  mounted() {
    if (!localStorage.getItem("auth_token")) {
      this.$router.push("/login");
    }
    this.getTodos();
  },
  methods: {
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