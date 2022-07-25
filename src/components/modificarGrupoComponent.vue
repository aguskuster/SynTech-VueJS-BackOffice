<template>
  <div>
    <div class="contenedor_menu">
      <h2>Modificar Grupo</h2>
    </div>
    <div class="contenedorGeneral" style="justify-content: space-evenly">
      <div
        class="contenedorIzquierdo"
        style="width: 30% !important; height: 47rem"
      >
        <h4>Grupo {{ idGrupo }}</h4>
        <div class="m-2 p-2">
          <label for="idGrupo" class="form-label">
            Identificador de grupo</label
          >
          <input
            type="text"
            id="idGrupo"
            disabled
            class="form-control"
            v-model="grupoSeleccionado.idGrupo"
            @keyup="modificar = true"
          />
        </div>
        <div class="m-2 p-2">
          <label for="idGrupo" class="form-label">
            Nombre completo de grupo</label
          >
          <input
            type="text"
            id="idGrupo"
            class="form-control"
            v-model="grupoSeleccionado.nombreCompleto"
            @keyup="modificar = true"
          />
        </div>

        <div class="" v-if="modificar">
          <button class="btn btn-success mr-" @click="modificarGrupo()">
            Actualizar
          </button>
          <button class="btn btn-danger" @click="getGrupo()">Cancelar</button>
        </div>
        <div v-else>
          <button class="btn btn-danger" @click="eliminarGrupo()">
            Eliminar Grupo
          </button>
        </div>
      </div>

      <div
        class="contenedorDerechoPersona"
        style="width: 65% !important; height: 47rem"
      >
        <h4>Administrar Integrantes</h4>
        <div style="width: 100%">
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modalAgregarMiembros"
          >
            Agregar Miebros
          </button>

          <!-- INICIO Modal Agregar Miembro -->
          <div
            class="modal fade"
            id="modalAgregarMiembros"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <p class="modal-title" id="exampleModalLabel">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="tipoDeUser"
                      v-on:change="selectedRows = ''"
                    >
                      <option value="" disabled selected hidden>
                        Tipo de usuario a agregar
                      </option>

                      <option value="Profesores">Profesores</option>
                      <option value="Alumnos">Alumnos</option>
                    </select>
                  </p>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body" v-if="tipoDeUser == 'Profesores'">
                  <vue-good-table
                    @on-selected-rows-change="selectionChanged"
                    :columns="columnsProfesores"
                    :rows="integrantesGrupo.profesores"
                    :select-options="{
                      enabled: true,
                      selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                      selectionInfoClass: 'custom-class',
                      selectionText: 'rows selected',
                      clearSelectionText: 'clear',
                      disableSelectInfo: true, // disable the select info panel on top
                      selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
                    }"
                    :search-options="{ enabled: true }"
                    theme="polar-bear"
                  >
                  </vue-good-table>
                  <br />
                  <div v-for="todo in selectedRows" :key="todo.id">
                    <span class="btn btn-primary">{{
                      todo.nombreProfesor
                    }}</span>
                  </div>
                </div>
                <div class="modal-body" v-if="tipoDeUser == 'Alumnos'">
                  <vue-good-table
                    @on-selected-rows-change="selectionChanged"
                    :columns="columnsAlumnos"
                    :rows="integrantesGrupo.alumnos"
                    :select-options="{
                      enabled: true,
                      selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                      selectionInfoClass: 'custom-class',
                      selectionText: 'rows selected',
                      clearSelectionText: 'clear',
                      disableSelectInfo: true, // disable the select info panel on top
                      selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
                    }"
                    :search-options="{ enabled: true }"
                    theme="polar-bear"
                  >
                  </vue-good-table>
                  <br />
                  <div style="display: flex; flex-wrap: wrap">
                    <span
                      class="btn btn-primary"
                      style="margin-right: 10px"
                      v-for="todo in selectedRows"
                      :key="todo.id"
                      >{{ todo.nombreAlumno }}</span
                    >
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- FIN  Modal Agregar Miembro -->
        </div>
        <div class="row p-2">
          <div style="width: 45%" class="col">
            <center>
              <h5>Profesores</h5>
            </center>
            <ul class="list-group">
              <li
                v-for="todo in integrantesGrupo.profesores"
                :key="todo.id"
                class="
                  list-group-item
                  d-flex
                  justify-content-between
                  align-items-center
                "
              >
                <img
                  :src="b64Decode(todo.imagen_perfil)"
                  width="50px"
                  height="50px"
                  style="border-radius: 50%"
                />
                {{ todo.nombreProfesor }}
                <span class="badge rounded-pill"
                  ><i
                    class="fas fa-times"
                    style="color: red; font-size: 1rem"
                  ></i
                ></span>
              </li>
            </ul>
          </div>
          <div style="width: 45%" class="col">
            <center>
              <h5>Alumnos</h5>
            </center>
            <ul class="list-group">
              <li
                v-for="todo in integrantesGrupo.alumnos"
                :key="todo.id"
                class="
                  list-group-item
                  d-flex
                  justify-content-between
                  align-items-center
                "
              >
                <img
                  :src="b64Decode(todo.imagen_perfil)"
                  width="50px"
                  height="50px"
                  style="border-radius: 50%"
                />
                {{ todo.nombreAlumno }}
                <span class="badge rounded-pill"
                  ><i
                    class="fas fa-times"
                    style="color: red; font-size: 1rem"
                  ></i
                ></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { Global } from "../Global";
import axios from "axios";

import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
export default {
  name: "modificarUsuarioComponent.vue",
  components: {
    VueGoodTable,
  },
  data() {
    return {
      idGrupo: this.$route.params.idGrupo,
      modificar: false,
      tipoDeUser: "",
      integrantesGrupo: { profesores: {}, alumnos: {} },
      grupoSeleccionado: "",
      columnsAlumnos: [
        {
          label: "ID",
          field: "idAlumno",
        },
        {
          label: "Nombre",
          field: "nombreAlumno",
        },
      ],
      columnsProfesores: [
        {
          label: "ID",
          field: "idProfesor",
        },
        {
          label: "Nombre",
          field: "nombreProfesor",
        },
        {
          label: "Materia",
          field: "nombreProfesor",
        },
      ],
      profesores: [],
      alumnos: [],
      selectedRows: "",
    };
  },
  mounted() {
    this.getGrupo();
    this.buscarGrupoSeleccionado();
  },
  methods: {
    b64Decode(img) {
      return "data:image/png;base64," + img;
    },
    buscarGrupoSeleccionado() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "integrantes-curso?idGrupo=" + this.idGrupo, config)
        .then((res) => {
          if (res.status == 200) {
            this.integrantesGrupo = res.data;
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
    selectionChanged(params) {
      this.selectedRows = params.selectedRows;
    },
    getGrupo() {
      this.modificar = false;
      let config = {
        headers: {
          token: Global.token,
        },
      };

      axios
        .get(Global.url + "grupo?idGrupo=" + this.idGrupo, config)
        .then((res) => {
          if (res.status == 200) {
            this.grupoSeleccionado = res.data;
          }
        });
    },
    eliminarGrupo() {
      /*      axios
        .delete(Global.url + "grupo", {
          headers: {
            "Content-Type": "application/json",
            token: Global.token,
          },
          data: {
            idGrupo: this.GrupoDatos.idGrupo,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Grupo Eliminado",
            });
            this.$router.push("/listarGrupo");
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Error Inesperado",
          });
        }); */
      alert("Sweet alert confirmacion");
    },

    modificarGrupo() {
      let parametros = {
        idGrupo: this.idGrupo,
        nuevoGrupo: this.grupoSeleccionado.idGrupo,
        nuevoNombreCompleto: this.grupoSeleccionado.nombreCompleto,
      };
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .put(Global.url + "grupo", parametros, config)
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Grupo Modificado.",
            });
            this.$router.push("/listarGrupo");
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Error inesperado.",
          });
        });
    },
  },
};
</script>
