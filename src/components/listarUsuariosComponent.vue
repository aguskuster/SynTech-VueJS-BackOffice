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
        <div class="menu_buscar" style="margin-bottom: 30px; display: block">
          <input
            placeholder="Buscar..."
            id="filtro"
            v-on:keyup="filtrarPorNombre"
          />

          <select name="" v-on:change="filtrarPorRol()" v-model="selectedRol">
            <option value="">Todos</option>
            <option value="Alumno">Alumnos</option>
            <option value="Bedelias">Bedelias</option>
            <option value="Profesor">Profesores</option>
            <option value="Adscripto">Adscripto</option>
            <option value="Director">Director</option>
            <option value="Subdirector">Subdirector</option>
          </select>
        </div>

        <div class="contenedor_table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Usuario</th>
                <th scope="col">Nombre</th>
                <th scope="col">Rol</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="todo in filtrarPorRol()"
                :key="todo.id"
                v-on:click="buscarUser(todo.id)"
                style="cursor: pointer"
              >
                <td>{{ todo.id }}</td>
                <td>{{ todo.nombre }}</td>
                <td>{{ todo.ou }}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
              <i
                class="fas fa-pencil-alt"
                style="background-color: var(--mostaza)"
              ></i
              >Modificar Usuario
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
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Send message</button>
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
export default {
  name: "listarUsuarios",
  components: {
    agregarUsuarioComponent,
  },
  data() {
    return {
      todosUsuarios: null,
      userInfo: { user: {}, profile_img: {} },
      showProfile: false,
      selectedRol: "",
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
            this.todosUsuarios = res.data;
            this.buscarUser(this.todosUsuarios[0].id);
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
    buscarUser(id) {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "usuario?username=" + id, config)
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