 <template>
  <div>
    <div class="contenedor_menu">
      <h2>Listado de Personas</h2>

      <button class="btn btn-primary">
        <router-link style="color: white" to="/usuario">
          <i class="far fa-user-plus"></i>
        </router-link>
      </button>
    </div>
    <div></div>
    <div class="menu_buscar">
      <input
        placeholder="Buscar..."
        id="filtro"
        v-on:keyup="filtrarPorNombre"
      />

      <select name="" v-on:change="filtrarPorRol()" v-model="selectedRol">
        <option value="Alumno">Alumnos</option>
        <option value="Profesor">Profesores</option>
        <option value="Adscripto">Adscripto</option>
        <option value="Director">Director</option>
        <option value="Subdirector">Subdirector</option>
        <option value="Bedelias">Bedelias</option>
        <option value=" ">Emmpty</option>
      </select>
    </div>
    <div class="contenedorGeneral">
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
            >
              <td>{{ todo.id }}</td>
              <td>{{ todo.nombre }}</td>
              <td>{{ todo.ou }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="contenedorDerechoPersona" v-if="showProfile">
        <div class="imgContDer">
          <img :src="returnImgProfile(userInfo.profile_img)" />
        </div>
        <div class="DerTexl">
          <div>
            <span>Cedula:</span> <span>{{ userInfo.user.id }}</span>
          </div>
          <div>
            <span>Nombre:</span> <span>{{ userInfo.user.nombre }}</span>
          </div>
          <div>
            <span>Cargo:</span> <span>{{ userInfo.user.ou }}</span>
          </div>
          <div>
            <span>Correo:</span> <span>{{ userInfo.user.email }}</span>
          </div>
        </div>
        <div class="DerTexl">
          <div><i class="fas fa-pencil-alt"></i> Modificar Usuario</div>
          <div><i class="fas fa-trash-alt"></i>Eliminar Usuario</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Global } from "../Global";
import axios from "axios";
import $ from "jquery";
export default {
  name: "listarUsuarios",
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
      if (selectedRol.length !=0 && selectedRol.trim()!=="") {
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