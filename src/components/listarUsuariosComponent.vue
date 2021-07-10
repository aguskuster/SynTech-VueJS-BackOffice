<template>
<div>
  

<div class="contenedor_menu">

<h2>Listado de Usuarios</h2>
   
     <button class="btn btn-primary">
      <router-link style="color: white;" to="/usuario">
      Agregar Usuarios
      </router-link>
    </button>

    
    
</div>

<div class="menu_buscar">
  <input placeholder="Buscar...">
  <button><i class="fas fa-search"></i></button>
</div>
<div class="contenedor_table">   
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Nombre</th>
          <th scope="col">OU</th>
          <th scope="col">Accion</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todosUsuarios" :key="todo.id">
          <td>{{ todo.username }}</td>
          <td >{{ todo.nombre }}</td>
          <td>{{ todo.ou }}</td>
          <td>
            <router-link
              :to="{
                name: 'listar-usuario-modificar',
                params: { user: todo.username },
              }"
            >
              <i
                style="font-size: 20px; margin-left: 20px; color: blue"
                class="fas fa-pencil-alt hover"
              ></i>
            </router-link>
             <router-link
              :to="{
                name: 'listar-usuario-eliminar',
                params: { user: todo.username },
              }"
            >
              <i
                style="font-size: 20px; margin-left: 20px; color: red"
                class="fas fa-user-times hover"
              ></i>
            </router-link>
          </td>
        
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { Global } from "../Global";
import axios from "axios";
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
                        'token': Global.token
                    } 
                } 
      axios.get(Global.url + "usuarios",config).then((res) => {
        //console.log('servicios', res.status);
        if (res.status == 200) {
          this.todosUsuarios = res.data;
          //console.log('servicios', this.servicios);
        }
        
      }
      ) .catch( (error) => {
                  this.flashMessage.show({status: 'warning', title: 'BackOffice', message: 'Error inesperado al cargar '+error})
                  
                });
    },
  },
};
</script>