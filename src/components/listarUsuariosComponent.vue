 <template>
  <div>
    <div class="contenedor_menu">
      <h2>Listado de Personas</h2>
      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregarPersona"
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
          :columns="columns"
          :rows="rows"
          :search-options="{ enabled: true }"
          theme="polar-bear"
        >
        </vue-good-table>
      </div>

      <div
        class="contenedorDerechoPersona"
        v-if="showProfile"
        style="width: 30%; margin-top: 83px; background-color: transparent"
      >
        <div class="infoUser">
          <div class="imgContDer">
            <center>
              <img :src="returnImgProfile(userInfo.profile_img)" />
            </center>
          </div>
          <div class="DerTexl">
            <div class="derTexNombre">
              <h4>{{ userInfo.user.nombre }}</h4>
              <hr />
            </div>
            <div>
              <span>Cargo:</span> <span>{{ userInfo.user.ou }}</span>
            </div>
            <div>
              <span>Cedula:</span> <span>{{ userInfo.user.id }}</span>
            </div>
            <div>
              <span>Correo:</span> <span>{{ userInfo.user.email }}</span>
            </div>
          </div>
          <div class="listaModificar">
            <div>
              <router-link
                class="router-link-listarUsers"
                :to="{
                  name: 'listar-usuario-modificar',
                  params: {
                    user: userInfo.user.id,
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
            <div>
              <i
                class="fas fa-trash-alt"
                style="background-color: var(--bordo)"
              ></i
              >Eliminar Usuario
            </div>
          </div>
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
      todosUsuarios: null,
      userInfo: { user: {}, profile_img: {} },
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
      rows: [],
    };
  },

  mounted() {
    if (!localStorage.getItem("auth_token")) {
      this.$router.push("/login");
    }

    this.getTodos();
  },
  methods: {
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
            this.userInfo = res.data;
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