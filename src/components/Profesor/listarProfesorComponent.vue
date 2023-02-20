 <template>
  <div>
    <div class="contenedor_menu">
    
      <h2>Listado de Profesores</h2>
      <button class="btn btn-primary" disabled v-if="loading">
        Agregar Profesor
      </button>
      <router-link
        v-if="usuario.cargo != 'Adscripto' && !loading"
        to="/usuarios/crear"
        title="Listar Usuarios"
        class="btn btn-primary router-link"
      >
        Agregar Profesor</router-link
      >
    </div>
    <center v-if="loading" style="margin-top: 3rem; font-size: 230px">
      <div
        class="spinner-border text-primary"
        role="status"
        style="color: #13111e !important"
      ></div>
    </center>
    <div v-else>
     
      <div class="contenedorGeneral">
        <div
          class="contenedorIzquierdo"
          style="width: 100%; background-color: transparent"
        >
          <vue-good-table
            @on-row-dblclick="onRowDoubleClick"
           
            @on-search="onSearch"
            :columns="columns"
            :rows="rows"
            :search-options="{ enabled: true }"
            theme="polar-bear"
            :pagination-options="pagination"
          >
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
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import $ from 'jquery'
import 'popper.js'

window.jQuery = $
window.$ = $
export default {
  name: "listar-profesores",
  components: {
    VueGoodTable,
  },
  data() {
    return {
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      todoProfesres: null,
      userInfo: "",
      selectedRol: "",
      loading: true,
      columns: [
        {
          label: "ID",
          field: "id",
        },
        {
          label: "Nombre",
          field: "nombre",
        },
        {
          label: "Rol",
          field: "ou",
        },
        {
          label: "Email",
          field: "email",
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
      rows: [],
    };
  },

  mounted() {
    if (!localStorage.getItem("auth_token_BO")) {
      localStorage.clear();
    }
    this.getTodos();
  },
  methods: {
 
    getTodos() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "usuario", config)
        .then((res) => {
          if (res.status == 200) {
            this.rows = res.data;
            this.loading = false;
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al cargar ",
          });
        });
    },
    onSearch(params) {
      if (params.searchTerm.length == 1) {
        this.getTodos();
      }
    },
    onRowDoubleClick(usuario) {
       this.$router.push('/profesores/'+usuario.row.id);
    },

    returnImgProfile(img) {
      return "data:image/png;base64," + img;
    },
  },
};
</script>