<template>
  <div>
    <div class="contenedor_menu">
      <vue-headful :title="title" />
      <h2>Historial de Registros</h2>
    </div>

    <div class="container p-3 mt-4" style='height: 50rem;'>
      <div width="70%">
        <vue-good-table
          :columns="columns"
          :rows="historialAcciones"
          :search-options="{ enabled: true }"
          theme="polar-bear"
          :pagination-options="pagination"
        >
        </vue-good-table>
      </div>
    </div>
  </div>
</template>
<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import { Global } from "../Global";
import axios from "axios";
import vueHeadful from "vue-headful";
export default {
  name: "HistorialAcciones",
  components: {
    VueGoodTable,
    vueHeadful,
  },
  data() {
    return {
      title: "Historial Acciones",
      historialAcciones: "",
      columns: [
        {
          label: "ID Autor",
          field: "idUsuario",
        },
         {
          label: "Nombre autor",
          field: "nombre",
        },
        {
          label: "Aplicacion",
          field: "app",
        },
        {
          label: "Accion",
          field: "accion",
        },
        {
          label: "Descripcion",
          field: "mensaje",
        },
        {
          label: "Fecha",
          field: "created_at",
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
    };
  },
  mounted() {
    this.getHistorialCompleto();
  },
  methods: {
    getHistorialCompleto() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "historial", config)
        .then((res) => {
          if (res.status == 200) {
            this.historialAcciones = res.data;
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