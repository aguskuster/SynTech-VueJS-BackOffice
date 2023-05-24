<template>
  <div>
    <div class="contenedor_menu">
      <h2>Administrar Materias</h2>
    </div>
    <center v-if="loading" style="margin-top: 3rem; font-size: 230px">
      <div
        class="spinner-border text-primary"
        role="status"
        style="color: #13111e !important"
      ></div>
    </center>
    <div v-else class="contenedorGeneral">
      <div
        class="contenedorIzquierdo p-4"
        style="width: 49%; background-color: #ffffff"
      >
        <vue-good-table
          @on-search="onSearch"
          :columns="columns"
          :rows="materias"
          :search-options="{ enabled: true }"
          theme="polar-bear"
          :pagination-options="pagination"
        >
          <div slot="emptystate" style="text-align: center">
            No hay materias para listar
          </div>
          <template slot="table-row" slot-scope="props">
            <span
              v-if="props.column.field == 'btn'"
              style="display: flex; justify-content: space-evenly"
            >
              <span
                style="font-weight: bold; color: blue; margin-right: 10px"
                @click="cargarMateria(props.row.id)"
              >
                <i
                  class="far fa-share"
                  style="color: lightseagreen; cursor: pointer"
                ></i>
              </span>
            </span>
          </template>
        </vue-good-table>
      </div>

      <div
        class="contenedorIzquierdo p-4"
        style="width: 49%; background-color: #ffffff"
      >
        <div class="form-group" v-if="materiaSelect">
          <h4 class="d-block" v-if="usuario.cargo != roles.adscripto">
            Modificar Materia
          </h4>
          <h4 class="d-block" v-else>Listar Materia</h4>
          <form
            v-on:submit.prevent="modificarMateria()"
            v-if="usuario.cargo != roles.adscripto"
          >
            <div class="d-flex">
              <input
                type="text"
                class="form-control w-50"
                id="nombre"
                required
                v-model="materiaSelect.nombre"
              />
              <i
                class="fas fa-times btn-danger btn"
                @click="materiaSelect = ''"
              ></i>
            </div>
            <input
              type="submit"
              value="Actualizar"
              class="btn btn-primary mt-4"
            />

            <input
              type="button"
              @click="eliminarMateria()"
              value="Eliminar"
              class="btn btn-danger ml-4 mt-4"
            />
          </form>
          <div v-else>
            <div class="d-flex">
              <input
                type="text"
                class="form-control w-50"
                id="nombre"
                required
                disabled
                v-model="materiaSelect.nombre"
              />
              <i
                class="fas fa-times btn-danger btn"
                @click="materiaSelect = ''"
              ></i>
            </div>
          </div>
        </div>

        <div class="form-group" v-else>
          <h4 class="d-block" v-if="usuario.cargo != roles.adscripto">
            Agregar Materia
          </h4>
          <h4 class="d-block" v-else>Listar Materia</h4>
          <form
            v-on:submit.prevent="agregarMateria()"
            v-if="usuario.cargo != roles.adscripto"
          >
            <input
              type="text"
              class="form-control w-50"
              v-model="nuevaMateria.nombre"
              required
            />

            <input
              type="submit"
              value="Agregar Materia"
              class="btn btn-primary mt-4"
            />
          </form>
          <div v-else>
            <input type="text" class="form-control w-50" disabled required />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Global } from "../../Global";
import { roles } from "../../Global";
import axios from "axios";

import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "ListarMateriasComponent",
  components: {
    VueGoodTable,
  },
  data() {
    return {
      roles: roles,
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      loading: true,
      materiaSelect: "",
      materias: "",
      columns: [
        {
          label: "Nombre",
          field: "nombre",
        },
        {
          label: "Acciones",
          field: "btn",
        },
      ],
      pagination: {
        enabled: true,
        perPage: 8,
        position: "top",
        jumpFirstOrLast: true,
        firstLabel: "Primer Pagina",
        lastLabel: "Ultima Pagina",
        nextLabel: "sig.",
        prevLabel: "ant.",
        ofLabel: "de",
        dropdownAllowAll: false,
        dropdown: false,
        perPageDropdown: [8],
        rowsPerPageLabel: "Filas por pagina",
      },
      nuevaMateria: {
        nombre: "",
      },
    };
  },
  mounted() {
    this.getAllMaterias();
  },
  methods: {
    agregarMateria() {
      this.loadingMateria = true;
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .post(Global.url + "materia", this.nuevaMateria, config)
        .then((res) => {
          if (res.status == 201) {
            this.getAllMaterias();
            this.loadingMateria = false;
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Materia agregada con exito",
            });
            this.nuevaMateria.nombre = "";
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Materia Existente",
          });
        });
    },

    modificarMateria() {
      this.loadingMateria = true;
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .put(
          Global.url + "materia/" + this.materiaSelect.id,
          this.materiaSelect,
          config
        )
        .then((res) => {
          if (res.status == 200) {
            this.getAllMaterias();
            this.loadingMateria = false;
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Materia modificada con exito",
            });
            this.materiaSelect = "";
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
    eliminarMateria() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .delete(Global.url + "materia/" + this.materiaSelect.id, config)
        .then((res) => {
          if (res.status == 200) {
            this.materiaSelect = "";
            this.getAllMaterias();
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Materia Eliminada",
            });
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al eliminar ",
          });
        });
    },
    cargarMateria(materia) {
      this.loadingMateria = true;
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "materia/" + materia, config)
        .then((res) => {
          if (res.status == 200) {
            this.materiaSelect = res.data;
            this.loadingMateria = false;
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
    getAllMaterias() {
      let config = {
        headers: {
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "materia", config)
        .then((res) => {
          if (res.status == 200) {
            this.materias = res.data;
            this.loading = false;
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
    onSearch(params) {
      if (params.searchTerm.length == 0) {
        this.getAllMaterias();
      }
    },
  },
};
</script>
