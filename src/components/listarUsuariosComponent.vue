<template>
<div>
    <h1>Listado de Usuarios</h1>
<div class="container p-3 my-3 border">
    <button type="button" class="right btn btn-primary">
      <router-link style="color: white; text-decoration: none" to="/usuario"
        >Agregar Usuarios</router-link
      >
    </button>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">Nombre</th>
          <th scope="col">E-Mail</th>
           <th scope="col">OU</th>
          <th scope="col">Modificar</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todosUsuarios" :key="todo.id">
          <th scope="row">{{ todo.id }}</th>
          <td>{{ todo.username }}</td>
          <td>{{ todo.nombre }}</td>
          <td>{{ todo.email }}</td>
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
          </td>
          <td>
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