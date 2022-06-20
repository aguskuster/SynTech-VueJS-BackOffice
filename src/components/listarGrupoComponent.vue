<template>
  <div>
    <div class="contenedor_menu">
      <vue-headful :title="title" />
      <h2>Listado de Grupos</h2>
      <div>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalAgregarGrupo"
        >
          Agregar Grupo
        </button>
      </div>
    </div>

    <div class="contenedorGeneral">
      <div class="contenedorIzquierdo">
        <div class="contenedor_table mt-3">
          <vue-good-table
            @on-row-click="onRowClick"
            :columns="columns"
            :rows="rows"
            :search-options="{ enabled: true }"
            theme="polar-bear"
            :pagination-options="pagination"
          >
          </vue-good-table>
        </div>
      </div>

      <div class="contenedorDerechoPersona">
        <div class="contListarGrupo">
          <h4 class="tituloGrupoPertenecen">
            Materias Perenecientes a {{ acronimoGrupo }}
          </h4>
          <hr />

          <div class="btnGrupo">
            <button class="btn btn-warning">Modificar Grupo</button>
          </div>
          <div class="contCardGrupoo">
            <div
              class="conteinerCardGrupo"
              v-for="todo in grupoSeleccionado.profesores"
              :key="todo.id"
            >
              <center>
                <h3>{{ todo.nombreMateria }}</h3>

                <img :src="b64Decode(todo.imagen_perfil)" alt="" />
              </center>
              <h2>{{ todo.nombreProfesor }}</h2>
            </div>
          </div>
          <br />
          <br />

          <div class="contCardGrupoo">
            <div
              class="conteinerCardGrupo"
              v-for="todo in grupoSeleccionado.alumnos"
              :key="todo.id"
            >
              <center>
                <h3>{{ todo.nombreMateria }}</h3>

                <img :src="b64Decode(todo.imagen_perfil)" alt="" />
              </center>
              <h2>{{ todo.nombreAlumno }}</h2>
            </div>
          </div>
        </div>
      </div>

      <!--     MODAL AGREGAR GRUPO  -->
      <div
        class="modal fade"
        id="modalAgregarGrupo"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Agregar Grupo</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form name="form" id="form" v-on:submit.prevent="procesar()">
                <p>
                  Acronimo de Grupo<em>*</em> :
                  <input
                    type="text"
                    name="acronimoGrupo"
                    placeholder="Ejemplo: TB1"
                    class="form-control"
                    v-model="grupo.idGrupo"
                    autocomplete="=off"
                    required
                  />
                </p>
                <p>
                  Nombre completo de grupo<em>*</em> :
                  <input
                    type="text"
                    name="nombreCompletoGrupo"
                    placeholder="Ejemplo: Tecnicatura Nocturno"
                    class="form-control"
                    v-model="grupo.nombreCompleto"
                    required
                  />
                </p>

                <input
                  type="submit"
                  value="Agregar Grupo"
                  title="Enviar"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <!--     FIN MODAL AGREGAR GRUPO  -->
    </div>
  </div>
</template>
<script>
import { Global } from "../Global";
import vueHeadful from "vue-headful";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import axios from "axios";
export default {
  name: "listarGrupo",
  components: {
    vueHeadful,
    VueGoodTable,
  },
  data() {
    return {
      title: "BackOffice",
      grupoSeleccionado: { profesores: {}, alumnos: {} },
      acronimoGrupo: "",
      grupo: {
        idGrupo: "",
        nombreCompleto: "",
      },
      imgB64: "",
      columns: [
        {
          label: "Acronimo Grupo",
          field: "idGrupo",
        },
        {
          label: "Nombre Completo",
          field: "nombreCompleto",
        },
        {
          label: "Año electivo",
          field: "anioElectivo",
        },
      ],
      pagination: {
        enabled: true,
        perPage: 10,
        position: "top",
        jumpFirstOrLast: true,
        firstLabel: "Primer Pagina",
        lastLabel: "Ultima Pagina",
        nextLabel: "sig.",
        prevLabel: "ant.",
        ofLabel: "de",
        dropdownAllowAll: false,
        dropdown: false,
        perPageDropdown: [10, 5],
        rowsPerPageLabel: "Filas por pagina",
      },
      rows: [],
    };
  },
  mounted() {
    if (!localStorage.getItem("auth_token")) {
      this.$router.push("/login");
    }
    this.getTodos();
  },
  methods: {
    procesar() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .post(Global.url + "grupo", this.grupo, config)
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Grupo Agregado",
            });
            document.form.reset();

            this.getTodos();
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Grupo ya existe",
          });
        });
    },
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
            this.rows = res.data;
            this.buscarGrupoSeleccionado(this.rows[0]);
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
    onRowClick(params) {
      this.buscarGrupoSeleccionado(params.row);
    },
    buscarGrupoSeleccionado(grupo) {
      this.acronimoGrupo = grupo.idGrupo;
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "integrantes-curso?idGrupo=" + grupo.idGrupo, config)
        .then((res) => {
          if (res.status == 200) {
            this.grupoSeleccionado = res.data;
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
    b64Decode(img) {
      return "data:image/png;base64," + img;
    },
  },
};
</script>