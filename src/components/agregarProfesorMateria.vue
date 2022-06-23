<template>
  <div>
    <vue-headful :title="title" />
    <div class="contenedor_menu" style="margin-bottom: 30px">
      <vue-headful :title="title" />
      <h2>Agregar Profesores a {{ this.$route.params.Materia }}</h2>
    </div>

    <div class="contTableProfesor">
      <div>
        <h3>Listado de Profesores</h3>
        <hr />
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
        >
        </vue-good-table>
      </div>
      <div class="talbeProfesorDerecha">
        <div>
          <h3>Profesores Seleccionado</h3>
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
        <button @click="agregarProfesorMateria()">Agregar Profesor</button>
      </div>
    </div>
  </div>
</template>
<script>
import vueHeadful from "vue-headful";
import { Global } from "../Global";
import axios from "axios";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "agregarProfesorMateria",
  components: {
    vueHeadful,
    VueGoodTable,
  },
  data() {
    return {
      title: "BackOffice",
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
      rows: [],
      selectedRows: "",
    };
  },
  mounted() {
    if (!localStorage.getItem("auth_token")) {
      localStorage.clear();
    }
    this.getProfesores();
  },
  methods: {
    selectionChanged(params) {
      this.selectedRows = params.selectedRows;
    },
    getProfesores() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(
          Global.url + "profesores?idMateria=" + this.$route.params.idMateria,
          config
        )
        .then((res) => {
          if (res.status == 200) {
            this.rows = res.data;
          }
        });
    },
    agregarProfesorMateria() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .post(Global.url + "profesor", this.crearArrayProfesores(), config)
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Profesor se agrego a la materia",
            });
            this.$router.push("/listarMaterias");
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Profesor ya tiene esa materia",
          });
        });
    },
    crearArrayProfesores() {
      let newArray = [];
      this.selectedRows.forEach(function (user) {
        newArray.push(user.id);
      });
      let objeto = {
        idMateria: this.$route.params.idMateria,
        profesores: newArray,
      };
      return objeto;
    },
  },
};
</script>
