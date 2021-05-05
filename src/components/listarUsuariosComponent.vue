<template>
  <div>
 <button type="button" class="right btn btn-primary"><router-link style="color:white;text-decoration:none;" to="/usuario">Agregar Usuarios</router-link></button>
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Username</th>
      <th scope="col">Nombre</th>
      <th scope="col">E-Mail</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="todo in todosUsuarios" :key="todo.id">
      <th scope="row">{{ todo.id }}</th>
      <td>{{ todo.username }}</td>
      <td>{{ todo.nombre }}</td>
      <td>{{ todo.email }}</td>
    </tr>
   
  </tbody>
</table>

 
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
    this.getTodos();
  },
  methods: {
    getTodos() {
      /*   let config = {
                    headers: {
                        'token': Global.token
                    } 
                } */
      axios.get(Global.url + "usuarios").then((res) => {
        //console.log('servicios', res.status);
        if (res.status == 200) {
          this.todosUsuarios = res.data;
          //console.log('servicios', this.servicios);
        } else {
          alert("no se pudo conectar");
        }
      });
    },
  },
};
</script>