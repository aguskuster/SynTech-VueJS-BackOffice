 <template>
  <div>
    <div class="contenedor_menu">
      <h2>Listado de Carreras</h2>
      <div v-if="loading">
        <button class="btn btn-primary mr-2" disabled>
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
         
            @on-search="onSearch"
            :columns="columns"
            :rows="rows"
            :search-options="{ enabled: true }"
            theme="polar-bear"
            :pagination-options="pagination"
          >
            <div slot="emptystate" style="text-align: center">
              No hay carreras para listar
            </div>
            <div slot="table-actions">
              <button
                class="btn btn-primary"
                v-if="listarEliminados"
                @click="getTodos()"
              >
                Activos
              </button>
              <button
                class="btn btn-primary"
                v-else
                @click="listarCarrerasEliminadas()"
              >
                Elimnados
              </button>
            </div>
            <template slot="table-row" slot-scope="props">
              <span
                v-if="props.column.field == 'btn'"
                style="display: flex; justify-content: space-evenly"
              >
                <span
                  v-if="!listarEliminados"
                  style="font-weight: bold; color: blue; margin-right: 10px"
                  @click="modificarCarerra(props.row.id)"
                >
                  <i
                    class="far fa-pencil"
                    style="color: orange; cursor: pointer"
                    v-if="!listarEliminados && usuario.cargo != roles.adscripto"
                  ></i>
                  <i
                    class="far fa-eye"
                    style="color: orange; cursor: pointer"
                    v-else
                  ></i>
                </span>

                <span
                  v-if="!listarEliminados && usuario.cargo != roles.adscripto"
                  style="font-weight: bold; color: blue; margin-right: 10px"
                  @click="eliminarCarrera(props.row.id)"
                >
                  <i
                    class="far fa-trash"
                    style="color: red; cursor: pointer"
                  ></i>
                </span>

                <span
                  v-if="listarEliminados && usuario.cargo != roles.adscripto"
                  style="color: green; cursor: pointer"
                  @click="activarCarrera(props.row.id)"
                >
                  <i
                    class="fas fa-check"
                    style="color: green; cursor: pointer"
                  ></i>
                  Activar
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
      roles: roles,
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
      listarEliminados: false,
    };
  },

  mounted() {
    if (!localStorage.getItem("auth_token_BO")) {
      localStorage.clear();
    }
    this.getTodos();
  },
  methods: {
    activarCarrera(id) {
      this.loading = true;
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .put(Global.url + "carrera/" + id + "/activar", null, config)
        .then((res) => {
          if (res.status == 200) {
            this.listarCarrerasEliminadas();
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Carrera activada correctamente",
            });
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al cargar ",
          });
        });
    },
    listarCarrerasEliminadas() {
      this.listarEliminados = true;
      this.loading = true;
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "carrera?eliminado=true", config)
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
    modificarCarerra(id) {
      this.$router.push("/carrera/" + id);
    },
    eliminarCarrera(id) {
      this.$swal
        .fire({
          icon: "info",
          title: "¿Estas seguro de eliminar la carrera?",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Eliminar",
        })
        .then((result) => {
          if (result.isConfirmed == true) {
            let config = {
              headers: {
                token: Global.token,
              },
            };
            axios
              .delete(Global.url + "carrera/" + id, config)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Carrera eliminada correctamente",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  this.getTodos();
                }
              })
              .catch(() => {
                this.flashMessage.show({
                  status: "warning",
                  title: Global.nombreSitio,
                  message:
                    "Compruebe que la carrera selecionada no contenga grupos ni materias",
                });
              });
          }
        });
    },
    getTodos() {
      this.listarEliminados = false;
      this.loading = true;
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
      axios.post(Global.url + "logout", config).then((res) => {
        if (res.status == 200) {
          this.flashMessage.show({
            status: "success",
            title: Global.nombreSitio,
            message: "Sesion cerrada correctamente",
          });
          this.logged = false;
          localStorage.clear();
          this.$router.push("/");
        }
      });
    },
    onSearch(params) {
      if (params.searchTerm.length == 0) {
        this.getTodos();
      }
    },
  
  },
};
</script>