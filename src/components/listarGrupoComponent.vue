<template>
  <div>
    <div class="contenedor_menu">
      <vue-headful :title="title" />
      <h2>Listado de Grupos</h2>
      <div>
        <button type="button" class="right btn btn-primary">
          <router-link style="color: white; text-decoration: none" to="/grupo"
            ><i class="far fa-users-medical"></i
          ></router-link>
        </button>
      </div>
    </div>

    <div class="contenedorGeneral">
      <div class="contenedorIzquierdo">
        <h4>Grupos</h4>
        <div class="menu_buscar" style="justify-content: center">
          <input placeholder="Buscar..." />
        </div>
        <div class="contenedor_table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Acronimo Grupo</th>
                <th scope="col">Nombre Completo Grupo</th>
                <th scope="col">Año Electivo</th>
                <th scope="col">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="todo in todosGrupo" :key="todo.id">
                <td>{{ todo.idGrupo }}</td>
                <td>{{ todo.nombreCompleto }}</td>
                <td>{{ todo.anioElectivo }}</td>
                <!--    <td v-if="todo.id == idMateria && modificar">
                  <input type="text" v-model="nuevoNombreMateria" />
                </td>
                <td v-else>{{ todo.nombre }}</td>
                <td class="tdMateria">
                  <i
                    class="fas fa-times"
                    style="
                      font-size: 20px;
                      margin-left: 20px;
                      color: red;
                      cursor: pointer;
                      line-height: unset;
                    "
                    v-if="modificar && idMateria == todo.id"
                    @click="modificar = false"
                  ></i>

                  <i
                    v-else
                    v-on:click="alternarModificar(todo.id, true)"
                    class="far fa-pen"
                    style="
                      font-size: 20px;
                      margin-left: 20px;
                      color: orange;
                      line-height: unset;
                    "
                  ></i>
                  <i
                    class="fas fa-check"
                    v-if="modificar && idMateria == todo.id"
                    style="
                      font-size: 20px;
                      margin-left: 20px;
                      color: green;
                      cursor: pointer;
                      line-height: unset;
                    "
                    v-on:click="modificarMateria(todo.id)"
                  ></i>
                  <i
                    v-else
                    class="fas fa-search"
                    style="
                      font-size: 20px;
                      margin-left: 20px;
                      color: blue;
                      cursor: pointer;
                      line-height: unset;
                    "
                    v-on:click="traerProfesoresMateria(todo.id, todo.nombre)"
                  ></i>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="contenedorDerechoPersona">
        <div class="contListarGrupo">
          <h4 class="tituloGrupoPertenecen">Materias Perenecientes a ~TB1~</h4>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Global } from "../Global";
import vueHeadful from "vue-headful";
import axios from "axios";
export default {
  name: "listarGrupo",
  components: {
    vueHeadful,
  },
  data() {
    return {
      todosGrupo: null,
      title: "BackOffice",
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
            title: Global.nombreSitio,
            message: "Error inesperado al cargar",
          });
        });
    },
  },
};
</script>