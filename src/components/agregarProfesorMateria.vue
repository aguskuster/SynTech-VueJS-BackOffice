<template>
  <div>
    <h1>Agregar Profesor a una Materia</h1>
    <div class="container p-3 my-3 border">
      <vue-headful :title="title" />
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
  

  {{selectedRows}}
   
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
      selectedRows:"",
    };
  },
  mounted() {
    if (!localStorage.getItem("auth_token")) {
      this.$router.push("/login");
    }
    this.getProfesores();
  },
  methods: {
    selectionChanged(params){
    this.selectedRows = params.selectedRows
    },
    getMaterias() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(
          Global.url +
            "profesor?idProfesor=" +
            this.modelProfeMateria.idProfesor,
          config
        )
        .then((res) => {
          if (res.status == 200) {
            this.materias = res.data;
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
        .post(Global.url + "profesor", this.modelProfeMateria, config)
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Profesor se agrego a la materia",
            });
            document.form.reset();
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
  },
};
</script>
