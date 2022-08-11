 <template>
  <div>
    <div class="contenedor_menu">
      <h2>Listado de Personas</h2>
      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregarPersona"
        v-if="usuario.cargo != 'Adscripto'"
      >
        Agregar Persona
      </button>
    </div>

    <div class="contenedorGeneral">
      <div
        class="contenedorIzquierdo"
        style="width: 70%; background-color: transparent"
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

      <div
        class="contenedorDerechoPersona"
        v-if="showProfile"
        style="width: 30%; background-color: transparent"
      >
        <div class="infoUser">
          <div class="imgContDer">
            <center>
              <img :src="returnImgProfile(userInfo.imagen_perfil)" />
            </center>
          </div>

          <div class="DerTexl">
            <div class="derTexNombre">
              <h4>{{ userInfo.nombre }}</h4>
              <hr />
            </div>
            <div>
              <span>Cargo:</span> <span>{{ userInfo.ou }}</span>
            </div>
            <div>
              <span>Cedula:</span> <span>{{ userInfo.id }}</span>
            </div>
            <div>
              <span>Correo:</span> <span>{{ userInfo.email }}</span>
            </div>
          </div>
          <div class="listaModificar" v-if="usuario.cargo != 'Adscripto'">
            <div>
              <router-link
                class="router-link-listarUsers"
                :to="{
                  name: 'listar-usuario-modificar',
                  params: {
                    user: userInfo.id,
                  },
                }"
              >
                <i
                  class="fas fa-pencil-alt"
                  style="background-color: var(--mostaza)"
                ></i
                >Modificar Usuario
              </router-link>
            </div>
            <div @click="eliminarUsuario(userInfo)">
              <i
                class="fas fa-trash-alt"
                style="background-color: var(--bordo)"
              ></i
              >Eliminar Usuario
            </div>
          </div>
          <div class="listaModificar" v-else>&zwnj;</div>
        </div>
      </div>
    </div>

    <!--     MODAL AGREGAR PERSONA  -->
    <div
      class="modal fade"
      id="modalAgregarPersona"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Agregar Persona</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <agregarUsuarioComponent></agregarUsuarioComponent>
          </div>
        </div>
      </div>
    </div>

    <!--     FIN MODAL AGREGAR PERSONA  -->
  </div>
</template>
<script>
import { Global } from "../Global";
import axios from "axios";
import $ from "jquery";
import agregarUsuarioComponent from "./agregarUsuarioComponent";
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
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token"))),
      todosUsuarios: null,
      userInfo: "",
      showProfile: false,
      selectedRol: "",
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
    if (!localStorage.getItem("auth_token")) {
      localStorage.clear();
    }

    this.getTodos();
  },
  methods: {
    eliminarUsuario(userInfo) {
      this.$swal
        .fire({
           icon: 'info',
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
        .get(Global.url + "usuarios", config)
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
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al cargar ",
          });
        });
    },
    filtrarPorNombre() {
      var input = document.getElementById("filtro").value.toLowerCase();
      var listaUser = [];

      if (input == "") {
        this.loading = true;
        this.getTodos();
      }
      this.todosUsuarios.forEach(function (users) {
        if (users.nombre.toLowerCase().indexOf(input) !== -1)
          listaUser.push(users);
      });

      this.todosUsuarios = listaUser;
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