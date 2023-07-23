<template>
  <div>
    <div class="contenedor_menu">
      <h2>Listado de Profesores</h2>
      <div>
        <button type="button" class="btn btn-primary mr-4" data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="usuario.cargo != 'Adscripto' && !loading">
          Importar Profesores
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Importar</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div>
                  <input type="file" ref="fileInput" accept=".csv" />
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="importarArchivo">Importar</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary" disabled v-if="loading && usuario.cargo != roles.adscripto">
          Agregar Profesor
        </button>
        <router-link v-if="usuario.cargo != 'Adscripto' && !loading" to="/profesor/crear" title="Listar Usuarios"
          class="btn btn-primary router-link">
          Agregar Profesor</router-link>
      </div>
    </div>
    <center v-if="loading" style="margin-top: 3rem; font-size: 230px">
      <div class="spinner-border text-primary" role="status" style="color: #13111e !important"></div>
    </center>
    <div v-else>
      <div class="contenedorGeneral">
        <div class="contenedorIzquierdo" style="width: 100%; background-color: transparent">
          <vue-good-table  @on-search="onSearch" :columns="columns" :rows="rows"
            :search-options="{ enabled: true }" theme="polar-bear" :pagination-options="pagination">
            <div slot="emptystate" style="text-align:center">
              No hay profesores para listar
            </div>
            <div slot="table-actions">
              <button class="btn btn-primary" v-if="listarEliminados" @click="getTodos()">
                Activos
              </button>
              <button class="btn btn-primary" v-else @click="listarUsuariosEliminados()">
                Elimnados
              </button>
            </div>
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'btn'" style="display: flex; justify-content: space-evenly">
                <span style="font-weight: bold; color: blue; margin-right: 10px" @click="modificarProfesor(props.row.id)"
                  v-if="!listarEliminados">
                  <i class="far fa-pencil" style="color: orange; cursor: pointer"
                    v-if="usuario.cargo != roles.adscripto"></i>
                  <i class="far fa-eye" style="color: orange; cursor: pointer" v-else></i>
                </span>
                <span style="font-weight: bold; color: blue" @click="eliminarProfesor(props.row.id)"
                  v-if="usuario.cargo != 'Adscripto' && !listarEliminados">
                  <i class="far fa-trash" style="color: red; cursor: pointer"></i>
                </span>
                <span v-if="listarEliminados && usuario.cargo != roles.adscripto" style="color: green; cursor: pointer"
                  @click="activarUsuario(props.row.id)">
                  <i class="fas fa-check" style="color: green; cursor: pointer"></i>
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
import axios from "axios";
import { roles } from "../../Global";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
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
      roles: roles,
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
    importarArchivo() {
      const file = this.$refs.fileInput.files[0];
      let formData = new FormData();
      formData.append('file', file);
      let config = {
        headers: {
          token: Global.token,
          'Content-Type': 'multipart/form-data'
        },
      };
      axios.post(Global.url + 'profesor/importar', formData, config)
        .then(() => {
          this.flashMessage.show({
            status: "success",
            title: Global.nombreSitio,
            message: "Se importo el archivo correctamente",
          });
          location.reload();

        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "No se importo el archivo correctamente",
          });
        });

    },
    activarUsuario(id) {
      this.loading = true;
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .put(Global.url + "usuario/" + id + "/activar", null, config)
        .then((res) => {
          if (res.status == 200) {
            this.listarUsuariosEliminados();
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Usuario activado correctamente",
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
    listarUsuariosEliminados() {
      this.loading = true;
      this.listarEliminados = true;
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "profesor?eliminados=true", config)
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
    getTodos() {
      this.loading = true;
      this.listarEliminados = false;
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "profesor", config) // profesor
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
    onSearch(params) {
      if (params.searchTerm.length == 0) {
        this.getTodos();
      }
    },
  

    modificarProfesor(id) {
      this.$router.push("/profesor/" + id);
    },
    eliminarProfesor(id) {
      this.$swal
        .fire({
          icon: "info",
          title: "¿Estas seguro de eliminar el usuario?",
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
              .delete(Global.url + "usuario/" + id, config)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Usuario eliminado correctamente",
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
                  message: "Error inesperado al cargar ",
                });
              });
          }
        });
    },

    returnImgProfile(img) {
      return "data:image/png;base64," + img;
    },
  },
};
</script>