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
        style="width: 49%; background-color: whitesmoke"
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
                <h5 class="modal-title">
                  Agregar Profesor a <b>{{ grupo.idGrupo }}</b>
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <vue-good-table
                  :columns="columnsProfesores"
                  :rows="profesores"
                  :search-options="{ enabled: true }"
                  theme="polar-bear"
                  :pagination-options="pagination"
                >
                </vue-good-table>
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
        style="width: 49%; background-color: whitesmoke"
      >
        <!-- Modal Agregar Alumno -->

        <div
          class="modal fade bd-example-modal-lg agregarAlumno"
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
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <vue-good-table
                  :columns="columnsAlumnos"
                  :rows="alumnos"
                  :search-options="{ enabled: true }"
                  theme="polar-bear"
                  :pagination-options="pagination"
                >
                </vue-good-table>
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
          field: "nombreProfesor",
        },
      ],
      columnsProfesoresAsignados: [
        {
          label: "Nombre",
          field: "nombre",
        },
        {
          label: "Action",
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
          label: "Action",
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

      profesores: "",
      alumnos: "",
    };
  },
  mounted() {
    this.getGrupo();
    this.getProfesoresNoAsignados();
    this.getAlumnosNoAsignados();
  },
  methods: {
    elimniarAlumno(id) {
      alert("alumno" + id + "eliminado");
    },
    eliminarProfesor(id) {
      alert("profesor" + id + "eliminado");
    },

    getProfesoresNoAsignados() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(
          Global.url + "grupo/" + this.$route.params.idGrupo + "/profesores",
          config
        )
        .then((response) => {
          this.profesores = response.data;
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
      if (params.searchTerm.length == 1) {
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
          console.log(this.grupo);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
