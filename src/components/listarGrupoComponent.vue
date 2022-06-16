<template>
  <div>
    <div class="contenedor_menu">
      <vue-headful :title="title" />
      <h2>Listado de Grupos</h2>
      <div>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalAgregarGrupo"
        >
          Agregar Grupo
        </button>
      </div>
    </div>

    <div class="contenedorGeneral">
      <div class="contenedorIzquierdo">
        <h4>Grupos</h4>
        <div class="menu_buscar" style="justify-content: center">
          <input placeholder="Buscar..." />
        </div>
        <div class="contenedor_table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Acronimo Grupo</th>
                <th scope="col">Nombre Completo Grupo</th>
                <th scope="col">Año Electivo</th>
                <th scope="col">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="todo in todosGrupo"
                :key="todo.id"
                v-on:click="buscarGrupoSeleccionado(todo.idGrupo)"
                style="cursor: pointer"
              >
                <td>{{ todo.idGrupo }}</td>
                <td>{{ todo.nombreCompleto }}</td>
                <td>{{ todo.anioElectivo }}</td>
                <!--    <td v-if="todo.id == idMateria && modificar">
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
                      line-height: unset;
                    "
                    v-if="modificar && idMateria == todo.id"
                    @click="modificar = false"
                  ></i>

                  <i
                    v-else
                    v-on:click="alternarModificar(todo.id, true)"
                    class="far fa-pen"
                    style="
                      font-size: 20px;
                      margin-left: 20px;
                      color: orange;
                      line-height: unset;
                    "
                  ></i>
                  <i
                    class="fas fa-check"
                    v-if="modificar && idMateria == todo.id"
                    style="
                      font-size: 20px;
                      margin-left: 20px;
                      color: green;
                      cursor: pointer;
                      line-height: unset;
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
                      line-height: unset;
                    "
                    v-on:click="traerProfesoresMateria(todo.id, todo.nombre)"
                  ></i>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="contenedorDerechoPersona">
        <div class="contListarGrupo">
          <h4 class="tituloGrupoPertenecen">
            Materias Perenecientes a {{ acronimoGrupo }}
          </h4>
          <hr />

          <div class="btnGrupo">
            <button class="btn btn-danger">Quitar Miembro</button>
            <button class="btn btn-success">Agregar Miembro</button>
          </div>
          <div class="contCardGrupoo">
            <div
              class="conteinerCardGrupo"
              v-for="todo in grupoSeleccionado.profesores"
              :key="todo.id"
            >
              <center>
                <h3>{{ todo.nombreMateria }}</h3>

                <img
                  src="https://c4.wallpaperflare.com/wallpaper/17/753/97/bleach-ulquiorra-cifer-wallpaper-preview.jpg"
                  alt=""
                />
              </center>
              <h2>{{ todo.nombreProfesor }}</h2>
            </div>
          </div>
          <!-- <p v-for="todo in grupoSeleccionado.profesores" :key="todo.id">
            {{ todo.nombreProfesor }}
          </p> -->
          <!--    Alumnos
          <p v-for="todo in grupoSeleccionado.alumnos" :key="todo.id">
            {{ todo.nombreAlumno }}
          </p> -->
        </div>
      </div>

      <!--     MODAL AGREGAR GRUPO  -->
      <div
        class="modal fade"
        id="modalAgregarGrupo"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Agregar Grupo</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form name="form" id="form" v-on:submit.prevent="procesar()">
                <p>
                  Acronimo de Grupo<em>*</em> :
                  <input
                    type="text"
                    name="acronimoGrupo"
                    placeholder="Ejemplo: TB1"
                    class="form-control"
                    v-model="grupo.idGrupo"
                    autocomplete="=off"
                    required
                  />
                </p>
                <p>
                  Nombre completo de grupo<em>*</em> :
                  <input
                    type="text"
                    name="nombreCompletoGrupo"
                    placeholder="Ejemplo: Tecnicatura Nocturno"
                    class="form-control"
                    v-model="grupo.nombreCompleto"
                    required
                  />
                </p>

                <input
                  type="submit"
                  value="Agregar Grupo"
                  title="Enviar"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <!--     FIN MODAL AGREGAR GRUPO  -->
    </div>
  </div>
</template>
<script>
import { Global } from "../Global";
import vueHeadful from "vue-headful";

import axios from "axios";
export default {
  name: "listarGrupo",
  components: {
    vueHeadful,
  },
  data() {
    return {
      todosGrupo: null,
      title: "BackOffice",
      grupoSeleccionado: { profesores: {}, alumnos: {} },
      acronimoGrupo: "",
      grupo: {
        idGrupo: "",
        nombreCompleto: "",
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
    procesar() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .post(Global.url + "grupo", this.grupo, config)
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Grupo Agregado",
            });
            document.form.reset();

            this.getTodos();
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Grupo ya existe",
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
        .get(Global.url + "grupos", config)
        .then((res) => {
          if (res.status == 200) {
            this.todosGrupo = res.data;
            this.buscarGrupoSeleccionado(this.todosGrupo[0].idGrupo);
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
    buscarGrupoSeleccionado(idGrupo) {
      this.acronimoGrupo = idGrupo;
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "integrantes-curso?idGrupo=" + idGrupo, config)
        .then((res) => {
          if (res.status == 200) {
            this.grupoSeleccionado = res.data;
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