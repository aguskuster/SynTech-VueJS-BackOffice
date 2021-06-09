<template>
<div>
    <h1>Listado de Grupos</h1>
<div class="container p-3 my-3 border">
    <button type="button" class="right btn btn-primary">
      <router-link style="color: white; text-decoration: none" to="/grupo"
        >Agregar Grupos</router-link>
    </button>
    <table class="table">
      <thead>
        <tr>
          
          <th scope="col">Acronimo Grupo</th>
          <th scope="col">Nombre Completo Grupo</th>
          <th scope="col">Año Electivo</th>
            <th scope="col">Modificar</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>
       
        <tr v-for="todo in todosGrupo" :key="todo.idGrupo">
         
          <th scope="row">{{ todo.idGrupo }}</th>
          <td>{{ todo.nombreCompleto }}</td>
          <td>{{ todo.anioElectivo }}</td>
          <td>

            <router-link
              :to="{
                name: 'listar-grupo-modificar',
                params: { grupo: todo.idGrupo },
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
                name: 'listar-grupo-eliminar',
                params: { grupo: todo.idGrupo  },
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
  name: "listarGrupo",

  data() {
    return {
      todosGrupo: null,
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
      axios.get(Global.url + "grupos").then((res) => {
        if (res.status == 200) {
          this.todosGrupo= res.data;
        }
        
      }
      ) .catch( (error) => {
                  this.flashMessage.show({status: 'warning', title: 'BackOffice', message: 'Error inesperado al cargar '+error})
                  
                });
    },
  },
};
</script>