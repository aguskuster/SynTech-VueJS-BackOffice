<template>
  <div>
    <div class="contenedor_menu">
 
      <h2>Modificar Grupo</h2>
    </div>
    <div
      class="container p-3 my-3 border"
      style="background-color: whitesmoke; height: 47rem"
    >
      <p>
        <label for="nombreGrupo">Identificador del Grupo </label>
        <input
          type="text"
          id="nombreGrupo"
          name="nombreGrupo"
          :value="idGrupo"
        />
      </p>
      <p>
        <label for="nombreGrupo">Descripcion del Grupo</label>
        <input
          type="text"
          id="nombreGrupo"
          name="nombreGrupo"
          :value="grupoSeleccionado.nombreCompleto"
        />
      </p>

      <div class="ml-auto">
        <button class="btn btn-secondary">Agregar Profesor</button>
        <button class="btn btn-secondary">Agregar Alumnos</button>
      </div>

      <details>
        <summary>Agregar Profesores</summary>

        <div class="contTableProfesor">
          <div>
            <h3>Listado de Profesores</h3>
            <hr />
            <vue-good-table
              @on-selected-rows-change="selectionChanged"
              :columns="columns"
              :rows="profesores"
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
          </div>
          <div class="talbeProfesorDerecha">
            <div>
              <h3>Profesores Seleccionados</h3>
              <hr />
              <div class="contProfeSelec">
                <div
                  v-for="todo in selectedRows"
                  :key="todo.id"
                  data-toggle="tooltip"
                  data-placement="top"
                  :title="todo.nombre"
                  style="cursor: help"
                >
                  {{ todo.nombre }}
                </div>
              </div>
            </div>
            <button class="btn-primary">Agregar Profesor</button>
          </div>
        </div>
      </details>
      <details>
        <summary>Agregar Alumnos</summary>
        <div class="contTableProfesor">
          <div>
            <h3>Listado de Alumnos</h3>
            <hr />
            <vue-good-table
              @on-selected-rows-change="selectionChanged"
              :columns="columns"
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
            >
            </vue-good-table>
          </div>
          <div class="talbeProfesorDerecha">
            <div>
              <h3>Alumnos Seleccionados</h3>
              <hr />
              <div class="contProfeSelec">
                <div
                  v-for="todo in selectedRows"
                  :key="todo.id"
                  data-toggle="tooltip"
                  data-placement="top"
                  :title="todo.nombre"
                  style="cursor: help"
                >
                  {{ todo.nombre }}
                </div>
              </div>
            </div>
            <button class="btn-primary">Agregar Alumnos</button>
          </div>
        </div>
      </details>
       <button class="btn-danger btn">Cancelar</button>
      <button class="btn-success btn">Guardar Cambios</button>
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
      grupoSeleccionado: "",
      columns: [
        {
          label: "ID",
          field: "id",
        },
        {
          label: "Nombre",
          field: "nombre",
        },
      ],
      profesores: [],
      alumnos: [],
      selectedRows: "",
    };
  },
  mounted() {
    this.getGrupo();
  },
  methods: {
    selectionChanged(params) {
      this.selectedRows = params.selectedRows;
    },
    getGrupo() {
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
    modificarGrupo() {
      let parametros = {
        idGrupo: this.idGrupo,
        nuevoGrupo: document.getElementById("nombreAcronimo").value,
        nuevoNombreCompleto: document.getElementById("nombreCompletoGrupo")
          .value,
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
