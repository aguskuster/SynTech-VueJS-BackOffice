<template>
  <div>
    

<div class="contenedor_menu">
<h2>Listado de Materias</h2>
<div>

  <button type="button" class="right btn btn-primary">
        <router-link style="color: white; text-decoration: none" to="/materia"
          ><i class="far fa-books-medical"></i> Materia
</router-link
        >
      </button>
      <button type="button" class="right btn btn-primary ml-2">
        <router-link
          style="color: white; text-decoration: none"
          to="/profesor-materia"
          >Agregar Profesor a Materia</router-link
        >
      </button>
  </div> 
</div>

<div class="menu_buscar">
  <input placeholder="Buscar...">
  <button><i class="fas fa-search"></i></button>
</div>


    <div class="contenedor_table">
      
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in todosMateria" :key="todo.id">
            <th scope="row">{{ todo.id }}</th>
            <td>{{ todo.nombre }}</td>
            <td>
              <router-link
                :to="{
                  name: 'listar-materia-modificar',
                  params: { materia: todo.nombre, idMateria: todo.id},

                }"
              >
                <i class="far fa-pen" style="font-size: 20px; margin-left: 20px; color: blue"></i>
              </router-link>
               <router-link
                :to="{
                  name: 'listar-materia-eliminar',
                  params: { materia: todo.id },
                }"
              >
                              <i class="far fa-user-times" style="font-size: 20px; margin-left: 20px; color: red"></i>

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
  name: "listarMateria",

  data() {
    return {
      todosMateria: null,
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
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "materias", config)
        .then((res) => {
          if (res.status == 200) {
            this.todosMateria = res.data;
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: "BackOffice",
            message: "Error inesperado al cargar ",
          });
        });
    },
  },
};
</script>