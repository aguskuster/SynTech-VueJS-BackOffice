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
<div>
 <div class="menu_buscar">
      <input placeholder="Buscar..." id='filtro'   v-on:keyup="filtrarPorNombre"/>
      <button><i class="fas fa-search"></i></button>
    </div>
   
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
          <tr v-for="todo in todosUsuarios" :key="todo.id" v-on:click="buscarUser(todo.username)">
            <td>{{ todo.username }}</td>
            <td>{{ todo.nombre }}</td>
            <td>{{ todo.ou }}</td>
         
          </tr>
        </tbody>
      </table>
    </div>
    <div class="contenedorDerechoPersona">
      <div class="imgContDer">
        <img src="https://sportshub.cbsistatic.com/i/2022/02/26/a7550e46-0c91-42a2-92c7-ee68ce8b2976/bleach-art.jpg" alt="">
      </div>
      <div class="DerTexl">
        <div><span>Cedula:</span> <span>4989522</span></div>
        <div><span>Nombre:</span> <span>Ichigo</span></div>
        <div><span>Cargo:</span> <span>Shinigami</span></div>
        <div><span>Correo:</span> <span>fedeblengoo@gmail.com</span></div>
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
    };
  },
  mounted() {
    if (!localStorage.getItem("auth_token")) {
      this.$router.push("/login");
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
    buscarUser(username){
    alert(username)
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
  },
};
</script>