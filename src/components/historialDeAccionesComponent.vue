<template>
  <div>
    <div class="contenedor_menu">
 
      <h2>Historial de Registros</h2>
    </div>
      <center v-if="loading" style="margin-top:3rem;font-size:230px;">
      <div
        class="spinner-border text-primary"
        role="status"
        style="color: #13111e !important"
      ></div>
    </center>
    <div v-else class="container p-3 mt-4" style='height: 50rem;'>
      <div width="70%">
        <vue-good-table
          :columns="columns"
          :rows="historialAcciones"
          :search-options="{ enabled: true }"
          theme="polar-bear"
          :pagination-options="pagination"
        >
        <div slot="emptystate" style="text-align:center">
            No hay registros
           </div>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>
<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import { Global } from "../Global";
import { roles } from "../Global";
import axios from "axios";

export default {
  name: "HistorialAcciones",
  components: {
    VueGoodTable,

  },
  data() {
    return {
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      roles:roles,
      title: "Historial Acciones",
      historialAcciones: "",
      loading:true,
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
      if (this.usuario.cargo == roles.administrativo || this.usuario.cargo == roles.adscripto) {
      this.$router.push("/home");
    }
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
            this.loading=false
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