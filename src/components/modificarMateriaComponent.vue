<template>
  <div>
    <div class="contenedor_menu">
      <h2>Modificar Materia</h2>
    </div>
    <div class="contenedorGeneral" style="justify-content: space-evenly">
      <div
        class="contenedorIzquierdo"
        style="width: 30% !important; height: 47rem; position: relative"
      >
        <h4>Asignatura {{ this.$route.params.Materia }}</h4>
        <div class="m-2 p-2">
          <label for="idGrupo" class="form-label"> Nombre de la materia</label>
          <input
            type="text"
            id="idGrupo"
            class="form-control"
            v-model="nombreMateria"
            @keyup="modificar = true"
          />
        </div>

        <div style="position: absolute; right: 10px; bottom: 10px">
          <div class="" v-if="modificar">
            <button class="btn btn-success" @click="modificarMateria()">
              Actualizar
            </button>
            <button
              class="btn btn-danger"
              @click="defaultData()"
              style="margin-right: 5px"
            >
              Cancelar
            </button>
          </div>
          <div v-else>
            <button class="btn btn-danger" @click="eliminarMateria()">
              Eliminar Materia
            </button>
          </div>
        </div>
      </div>

      <div
        class="contenedorDerechoPersona"
        style="width: 65% !important; height: 47rem"
      >
        <h4>
          Administrar docentes que dictan {{ this.$route.params.Materia }}
        </h4>
        <div
          style="
            display: flex;
            flex-direction: row-reverse;
            padding-right: 10px;
          "
        >
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modalAgregarMiembros"
          >
            Ingresar docentes
          </button>
          <button
            type="button"
            style="margin-right: 10px"
            class="btn btn-success"
            @click="traerProfesoresMateria()"
          >
            <i class="fa fa-sync"></i>
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
                  <h2 class="modal-title" id="exampleModalLabel">
                    Agregar Profesores a {{ this.$route.params.Materia }}
                  </h2>

                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <agregarProfesorMateria></agregarProfesorMateria>
                </div>
              </div>
            </div>
          </div>

          <!-- FIN  Modal Agregar Miembro -->
        </div>
        <div class="row p-2">
          <vue-good-table
            @on-selected-rows-change="selectionChanged"
            :columns="columns"
            :rows="rows"
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
          </vue-good-table>

          <div>
            <button class="btn btn-danger" @click="eliminarVariosProfesores()">
              Eliminar Profesores
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import agregarProfesorMateria from "./agregarProfesorMateria.vue";
import { Global } from "../Global";
import axios from "axios";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
export default {
  name: "modificar-materia",
  components: {
    agregarProfesorMateria,
    VueGoodTable,
  },
  data() {
    return {
      idMateria: this.$route.params.idMateria,
      nombreMateria: this.$route.params.Materia,
      modificar: false,
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
      columns: [
        {
          label: "ID",
          field: "idProfesor",
        },
        {
          label: "Docente",
          field: "nombre",
        },
        {
          label: "Email",
          field: "email",
        },
      ],
      rows: [],
      selectedRows: "",
    };
  },
  mounted() {
    this.traerProfesoresMateria();
  },
  methods: {
    eliminarVariosProfesores() {
      alert("Realmente desea eliminar pum lista de coso");
      /*   for (let prof of this.selectedRows) {
        this.eliminarProfesor(prof.idProfesor);
      } */
    },

    eliminarProfesor(idProfesor) {
      axios
        .delete(Global.url + "profesor", {
          headers: {
            "Content-Type": "application/json",
            token: Global.token,
          },
          data: {
            idMateria: this.idMateria,
            idProfesor: idProfesor,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Grupo Eliminado",
            });
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Grupo se encuentra vinculado a datos.",
          });
        });
    },
    eliminarMateria() {
      axios
        .delete(Global.url + "materia", {
          headers: {
            "Content-Type": "application/json",
            token: Global.token,
          },
          data: {
            idMateria: this.idMateria,
          },
        })
        .then((response) => {
          if (response.status == 200) {
           
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Materia Eliminada",
            });
            this.$router.push("/listarMaterias")
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Error",
          });
        });
    },
    traerProfesoresMateria() {
      this.rows = "";
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(
          Global.url + "materia-profesores?idMateria=" + this.idMateria,
          config
        )
        .then((res) => {
          if (res.status == 200) {
            this.rows = res.data;
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
    defaultData() {
      this.nombreMateria = this.$route.params.Materia;
      this.modificar = false;
    },
    modificarMateria() {
      let parametros = {
        idMateria: this.idMateria,
        nuevoNombre: this.nombreMateria,
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
            this.$route.params.Materia = this.nombreMateria;
            this.modificar = false;
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Materia modificada.",
            });
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
  },
};
</script>
