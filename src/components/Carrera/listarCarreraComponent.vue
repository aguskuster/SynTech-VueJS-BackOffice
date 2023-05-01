 <template>
  <div>
    <div class="contenedor_menu">
      <h2>Listado de Carreras</h2>
      <div v-if="loading">
        <button
          class="btn btn-primary mr-2"
          disabled
        >
          Administrar Materias
        </button>
        <button
          class="btn btn-primary"
          disabled
          v-if="usuario.cargo != roles.adscripto"
        >
          Agregar Carrera
        </button>
      </div>

      <div v-else-if="!loading">
        <router-link
          to="/materia"
          title="Administrar Materias"
          class="btn btn-primary router-link mr-2"
        >
          Administrar Materias</router-link
        >
        <router-link
        v-if="usuario.cargo != roles.adscripto"
          to="/carrera/crear"
          title="Listar carrera"
          class="btn btn-primary router-link"
        >
          Agregar Carrera</router-link
        >
      </div>
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
          <div slot="emptystate" style="text-align:center">
            No hay carreras para listar
           </div>
            <template slot="table-row" slot-scope="props">
              <span
                v-if="props.column.field == 'btn'"
                style="display: flex; justify-content: space-evenly"
              >
                <span
                  style="font-weight: bold; color: blue; margin-right: 10px"
                  @click="modificarCarerra(props.row.id)"
                >
                  <i
                    class="far fa-pencil"
                    style="color: orange; cursor: pointer"
                    v-if="usuario.cargo != roles.adscripto"
                  ></i>
                  <i
                    class="far fa-eye"
                    style="color: orange; cursor: pointer"
                    v-else
                  ></i>
                </span>

                <span
                  style="font-weight: bold; color: blue; margin-right: 10px"
                  @click="eliminarCarrera(props.row.id)"
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
import { roles } from "../../Global";
import axios from "axios";

import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

import $ from "jquery";

window.jQuery = $;
window.$ = $;
export default {
  name: "listarUsuarios",
  components: {
    VueGoodTable,
  },
  data() {
    return {
      roles:roles,
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      todosUsuarios: null,
      userInfo: "",
      showProfile: false,
      selectedRol: "",
      loading: true,
      columns: [
        {
          label: "Nombre",
          field: "nombre",
        },
        {
          label: "Categoria",
          field: "categoria",
        },
        {
          label: "Plan",
          field: "plan",
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
   
    modificarCarerra(id) {
      this.$router.push("/carrera/" + id);
    },
    eliminarCarrera(id){
  let config = {
          headers: {
            token: Global.token,
          },
        };
      axios
        .delete(Global.url + "carrera/"+id, config)
        .then((res) => {
          if (res.status == 200) {
           this.getTodos();
           this.flashMessage.show({
            status: "success",
            title: Global.nombreSitio,
            message: "Carrera eliminada correctamente",
          });
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Compruebe que la carrera selecionada no contenga grupos ni materias",
          });
        });
    },
    getTodos() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "carrera", config)
        .then((res) => {
          if (res.status == 200) {
            this.rows = res.data;
            this.loading = false;
          }
        })
        .catch(() => {
           this.cerrarSesion();
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al cargar ",
          });
        });
    },
    cerrarSesion() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .post(Global.url + "logout", config)
        .then((res) => {
          if (res.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Sesion cerrada correctamente",
            });
            this.logged = false;
            localStorage.clear();
            location.reload();
          }
        })
    },
    onSearch(params) {
      if (params.searchTerm.length == 0) {
        this.getTodos();
      }
    },
    onRowDoubleClick() {
      alert("Double Click");
    },
  },
};
</script>