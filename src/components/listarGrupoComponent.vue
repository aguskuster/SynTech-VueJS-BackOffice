<template>
  <div>
    <div class="contenedor_menu">
      <h2>Listado de Grupos</h2>
      <div>
        <button type="button" class="right btn btn-primary">
          <router-link style="color: white; text-decoration: none" to="/grupo"
            ><i class="far fa-users-medical"></i
          ></router-link>
        </button>
      </div>
    </div>

    <div class="menu_buscar">
      <input placeholder="Buscar..." />
      <button><i class="fas fa-search"></i></button>
    </div>

    <div class="contenedor_table">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Acronimo Grupo</th>
            <th scope="col">Nombre Completo Grupo</th>
            <th scope="col">Año Electivo</th>
            <th scope="col">Agregar Miembro</th>
            <th scope="col">Accion</th>
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
                  name: 'miembroGrupo',
                  params: { grupo: todo.idGrupo },
                }"
              >
                <i
                  class="fal fa-plus-octagon"
                  style="font-size: 20px; margin-left: 40px; color: green"
                ></i>
              </router-link>
            </td>
            <td>
              <router-link
                :to="{
                  name: 'listar-grupo-modificar',
                  params: { grupo: todo.idGrupo },
                }"
              >
                <i
                  class="far fa-pen"
                  style="font-size: 20px; margin-left: 20px; color: blue"
                ></i>
              </router-link>
              <router-link
                :to="{
                  name: 'listar-grupo-eliminar',
                  params: { grupo: todo.idGrupo },
                }"
              >
                <i
                  class="far fa-user-times"
                  style="font-size: 20px; margin-left: 20px; color: red"
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
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "grupos", config)
        .then((res) => {
          if (res.status == 200) {
            this.todosGrupo = res.data;
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