<template>
  <div>
    <div class="contenedor_menu">
      <h2>Modificar Grupo</h2>
    </div>
    <center v-if="loading" style="margin-top: 3rem; font-size: 230px">
      <div
        class="spinner-border text-primary"
        role="status"
        style="color: #13111e !important"
      ></div>
    </center>
    <div v-else class="contenedorGeneral">
      <div
        class="contenedorIzquierdo p-4"
        style="width: 49%; background-color: #ffffff"
      >
        <!-- Modal Agregar Profesor -->
        <div
          class="modal fade bd-example-modal-lg agregarProfesor"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Agregar Profesor de :</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  id="cerrarModalProfesor"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div
                  class="alert alert-danger"
                  role="alert"
                  style="display: none"
                  id="emptySelect"
                >
                  Seleccione una materia para buscar profesores
                </div>
                <div class="d-flex">
                  <select
                    v-model="materiaSelect"
                    class="form-control"
                    style="height: 50px; font-size: 16px"
                  >
                    <option value="">Seleccione una materia</option>
                    <option
                      v-for="materia in materiasLibres"
                      v-bind:key="materia.id"
                      :value="materia"
                    >
                      {{ materia.nombre }}
                    </option>
                  </select>
                  <button @click="buscarProfesores()" class="btn btn-primary">
                    Buscar
                  </button>
                </div>
                <br />

                <div v-if="loadingProfesores">
                  <center style="margin-top: 3rem; font-size: 230px">
                    <div
                      class="spinner-border text-primary"
                      role="status"
                      style="color: #13111e !important"
                    ></div>
                  </center>
                </div>
                <div v-else>
                  <vue-good-table
                    :columns="columnsProfesores"
                    :rows="profesores"
                    :search-options="{ enabled: true }"
                    theme="polar-bear"
                    :pagination-options="pagination"
                  >
                      <div slot="emptystate" style="text-align:center">
              No hay profesores para listar
            </div>
                  
                    <template slot="table-row" slot-scope="props">
                      <span
                        v-if="props.column.field == 'btn'"
                        style="display: flex; justify-content: space-evenly"
                      >
                        <span
                          style="
                            font-weight: bold;
                            color: blue;
                            margin-right: 10px;
                            cursor: pointer;
                          "
                          @click="agregarProfesorGrupo(props.row)"
                        >
                          <i
                            class="far fa-plus-square"
                            style="color: green; cursor: pointer"
                          ></i>
                          Agregar Profesor
                        </span>
                      </span>
                    </template>
                  </vue-good-table>

                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Fin Modal -->
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target=".agregarProfesor"
        >
          Agregar Profesor
        </button>

        <vue-good-table
          @on-search="onSearch"
          :columns="columnsProfesoresAsignados"
          :rows="grupo.profesores"
          :search-options="{ enabled: true }"
          theme="polar-bear"
          :pagination-options="pagination"
        >
             <div slot="emptystate" style="text-align:center">
              No hay profesores para listar
            </div>
          <template slot="table-row" slot-scope="props">
            <span
              v-if="props.column.field == 'btn'"
              style="display: flex; justify-content: space-evenly"
            >
              <span
                style="font-weight: bold; color: blue; margin-right: 10px"
                @click="eliminarProfesor(props.row.id)"
              >
                <i class="far fa-trash" style="color: red; cursor: pointer"></i>
              </span>
            </span>
          </template>
        </vue-good-table>
      </div>

      <div
        class="contenedorIzquierdo p-4"
        style="width: 49%; background-color: #ffffff"
      >
        <!-- Modal Agregar Alumno -->

        <div
          class="modal fade bd-example-modal-lg agregarAlumno"
          id="agregarAlumno"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">
                  Agregar alumnos a <b>{{ grupo.idGrupo }}</b>
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  id="cerrarModalAlumno"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <vue-good-table
                  @on-selected-rows-change="selectedAlumnos"
                  :columns="columnsAlumnos"
                  :rows="alumnos"
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
                  :pagination-options="pagination"
                >
                  <div slot="emptystate" style="text-align:center">
              No hay alumnos para listar
            </div>
                </vue-good-table>

                <div>
                  <button class="btn btn-primary" @click="agregarAlumno()">
                    Agregar alumnos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Fin Modal -->

        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target=".agregarAlumno"
        >
          Agregar Alumno
        </button>

        <div class="mb-3">
          <vue-good-table
            @on-search="onSearch"
            :columns="columnsAlumnosAsignados"
            :rows="grupo.alumnos"
            :search-options="{ enabled: true }"
            theme="polar-bear"
            :pagination-options="pagination"
          >
              <div slot="emptystate" style="text-align:center">
              No hay alumnos para listar
            </div>
            <template slot="table-row" slot-scope="props">
              <span
                v-if="props.column.field == 'btn'"
                style="display: flex; justify-content: space-evenly"
              >
                <span
                  style="font-weight: bold; color: blue; margin-right: 10px"
                  @click="elimniarAlumno(props.row.id)"
                >
                  <i
                    class="far fa-trash"
                    style="color: red; cursor: pointer"
                  ></i>
                </span>
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Global } from "../../Global";
import axios from "axios";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
export default {
  components: {
    VueGoodTable,
  },
  name: "modificarCarreraComponent.vue",
  data() {
    return {
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      loading: false,
      grupo: "",
      loadingProfesores: false,
      materiaSelect: "",
      columnsAlumnos: [
        {
          label: "Nombre",
          field: "nombre",
        },
        {
          label: "Enail",
          field: "email",
        },
      ],
      columnsProfesores: [
        {
          label: "Nombre",
          field: "nombre",
        },
        {
          label: "Accion",
          field: "btn",
          html: true,
        },
      ],
      columnsProfesoresAsignados: [
        {
          label: "Nombre",
          field: "nombre",
        },
        {
          label: "Materia",
          field: "materia",
        },
        {
          label: "Accion",
          field: "btn",
          html: true,
        },
      ],
      columnsAlumnosAsignados: [
        {
          label: "Nombre",
          field: "nombre",
        },
        {
          label: "Accion",
          field: "btn",
          html: true,
        },
      ],
      pagination: {
        enabled: true,
        perPage: 10,
        position: "top",
        jumpFirstOrLast: true,
        firstLabel: "Primer Pagina",
        lastLabel: "Ultima Pagina",
        nextLabel: "sig.",
        prevLabel: "ant.",
        ofLabel: "de",
        dropdownAllowAll: false,
        dropdown: false,
        perPageDropdown: [10, 5],
        rowsPerPageLabel: "Filas por pagina",
      },
      materiasLibres: "",
      profesores: "",
      alumnos: "",
      profesorSelected: "",
      selectedAlumnosArray: [],
    };
  },
  mounted() {
    this.getGrupo();
    this.getMateriasNoAsignadas();
    this.getAlumnosNoAsignados();
  },
  methods: {
    selectedAlumnos(params) {
      this.selectedAlumnosArray = params.selectedRows;
    },
    elimniarAlumno(id) {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };

      axios
        .delete(
          Global.url + "grupo/" + this.$route.params.idGrupo + "/alumno/" + id,
          config
        )
        .then((response) => {
          this.grupo = response.data;
          this.getAlumnosNoAsignados();
          this.flashMessage.show({
            status: "success",
            title: Global.nombreSitio,
            message: "Alumno Eliminado",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    eliminarProfesor(id) {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };

      axios
        .delete(
          Global.url +
            "grupo/" +
            this.$route.params.idGrupo +
            "/profesor/" +
            id,
          config
        )
        .then((response) => {
          this.grupo = response.data;
          this.getMateriasNoAsignadas();
          this.profesores = "";
          this.flashMessage.show({
            status: "success",
            title: Global.nombreSitio,
            message: "Profesor Eliminado",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    agregarAlumno() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      if (this.selectedAlumnosArray.length == 0) {
        document.getElementById("cerrarModalAlumno").click();
        return;
      }

      let grupo = {
        alumnos: this.parseAlumnosArray(this.selectedAlumnosArray),
      };

      axios
        .put(Global.url + "grupo/" + this.$route.params.idGrupo, grupo, config)
        .then((response) => {
          this.grupo = response.data;
          this.getAlumnosNoAsignados();
          document.getElementById("cerrarModalAlumno").click();
          this.flashMessage.show({
            status: "success",
            title: Global.nombreSitio,
            message: "Alumnos Agregados",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    parseAlumnosArray(alumnos) {
      let alumnosArray = [];
      alumnos.forEach((alumno) => {
        alumnosArray.push({
          idAlumno: alumno.id,
          idGrupo: this.$route.params.idGrupo,
        });
      });
      return alumnosArray;
    },

    agregarProfesorGrupo(row) {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };

      let grupo = {
        profesores: {
          idProfesor: row.idProfesor,
          idMateria: this.materiaSelect.id,
          idGrupo: this.$route.params.idGrupo,
        },
      };

      axios
        .put(Global.url + "grupo/" + this.$route.params.idGrupo, grupo, config)
        .then((response) => {
          this.grupo = response.data;
          this.profesores = "";
          this.getMateriasNoAsignadas();
          document.getElementById("cerrarModalProfesor").click();
          this.flashMessage.show({
            status: "success",
            title: Global.nombreSitio,
            message: "Profesor Agregado",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    buscarProfesores() {
      if (this.materiaSelect == "") {
        document.getElementById("emptySelect").style.display = "block";
        return;
      } else {
        document.getElementById("emptySelect").style.display = "none";
      }

      this.loadingProfesores = true;
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };

      axios
        .get(Global.url + "profesor?idMateria=" + this.materiaSelect.id, config)
        .then((response) => {
          this.profesores = response.data;
          this.loadingProfesores = false;
        })
        .catch((error) => {
          console.log(error);
          this.loadingProfesores = false;
        });
    },

    getMateriasNoAsignadas() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(
          Global.url +
            "grupo/" +
            this.$route.params.idGrupo +
            "/materias-libres",
          config
        )
        .then((response) => {
          this.materiasLibres = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAlumnosNoAsignados() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(
          Global.url + "grupo/" + this.$route.params.idGrupo + "/alumnos",
          config
        )
        .then((response) => {
          this.alumnos = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSearch(params) {
      if (params.searchTerm.length == 0) {
        this.getGrupo();
      }
    },
    getGrupo() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "grupo/" + this.$route.params.idGrupo, config)
        .then((response) => {
          this.grupo = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
