 <template>
  <div>
    <div class="contenedor_menu">
      <h2>Listado de Personas</h2>
      <button class="btn btn-primary" disabled v-if="loading">
        Agregar Persona
      </button>
 <router-link
   v-if="usuario.cargo != 'Adscripto' && !loading"
            to="/usuarios/crear"
            title="Listar Usuarios"
            class="btn btn-primary router-link"
          >
           
             Agregar Persona</router-link
          >
  
    </div>
    <center v-if="loading" style="margin-top:3rem;font-size:230px;">
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
            @on-row-click="onRowClick"
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
import { Global } from "../Global";
import axios from "axios";
import $ from "jquery";
import agregarUsuarioComponent from "./agregarUsuariosComponent";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
export default {
  name: "listarUsuarios",
  components: {
    agregarUsuarioComponent,
    VueGoodTable,
  },
  data() {
    return {
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      todosUsuarios: null,
      userInfo: "",
      showProfile: false,
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
    eliminarUsuario(userInfo) {
      this.$swal
        .fire({
          icon: "info",
          title: "Eliminar Usuario",
          html:
            "Estas seguro que quieres eliminar al usuario  <b>" +
            userInfo.nombre +
            "</b>",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Eliminar",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            axios
              .delete(Global.url + "usuario", {
                headers: {
                  "Content-Type": "application/json",
                  token: Global.token,
                },
                data: {
                  id: userInfo.id,
                },
              })
              .then((response) => {
                if (response.status == 200) {
                  this.$swal.fire("Usuario eliminado", "", "success");
                  this.getTodos();
                }
              })
              .catch(() => {
                this.$swal.fire("Error al eliminar", "", "error");
              });
          }
        });
    },
    filtrarPorRol() {
      var selectedRol = this.selectedRol;
      var listaUser = [];
      if (selectedRol.length != 0 && selectedRol.trim() !== "") {
        this.todosUsuarios.forEach(function (users) {
          if (users.ou == selectedRol) {
            listaUser.push(users);
          }
        });
      } else {
        listaUser = this.todosUsuarios;
      }

      return listaUser;
    },
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
            this.buscarUser(this.rows[0]);
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
    onRowClick(usuario) {
      this.buscarUser(usuario.row);
    },
    buscarUser(persona) {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "usuario?username=" + persona.id, config)
        .then((res) => {
          if (res.status == 200) {
            this.userInfo = res.data.user;
            this.showProfile = true;
          }
          this.loading=false
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al cargar ",
          });
        });
    },

    comprobarArrayVacio(array) {
      return $.isEmptyObject(array);
    },
    returnImgProfile(img) {
      return "data:image/png;base64," + img;
    },
  },
};
</script>