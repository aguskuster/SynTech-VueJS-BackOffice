<template>
  <div>
    <div class="contenedor_menu">
      <h2>Modificar Grupo</h2>
    </div>
    <div class="contenedorGeneral" style="justify-content: space-evenly">
      <div
        class="contenedorIzquierdo"
        style="width: 30% !important; height: 47rem"
      >
        <h4>Grupo {{ idGrupo }}</h4>
        <div class="m-2 p-2">
          <label for="idGrupo" class="form-label">
            Identificador de grupo</label
          >
          <input
            type="text"
            id="idGrupo"
            disabled
            class="form-control"
            v-model="grupoSeleccionado.idGrupo"
            @keyup="modificar = true"
          />
        </div>
        <div class="m-2 p-2">
          <label for="idGrupo" class="form-label">
            Nombre completo de grupo</label
          >
          <input
            type="text"
            id="idGrupo"
            class="form-control"
            v-model="grupoSeleccionado.nombreCompleto"
            @keyup="modificar = true"
          />
        </div>

        <div class="" v-if="modificar">
          <button class="btn btn-success mr-" @click="modificarGrupo()">
            Actualizar
          </button>
          <button class="btn btn-danger" @click="getGrupo()">Cancelar</button>
        </div>
        <div v-else>
          <button class="btn btn-danger" @click="eliminarGrupo()">
            Eliminar Grupo
          </button>
        </div>
      </div>

      <div
        class="contenedorDerechoPersona"
        style="width: 65% !important; height: 47rem"
      >
        <h4>Administrar Integrantes</h4>
        <div style="width: 100%">
          <button class="btn btn-primary">Agregar Miebros</button>
        </div>
        <div class="row p-2">
          <div style="width: 45%" class="col">
            <center>
              <h5>Profesores</h5>
            </center>
            <ul class="list-group">
              <li
               v-for="todo in integrantesGrupo.profesores"
                :key="todo.id"
                class="
                  list-group-item
                  d-flex
                  justify-content-between
                  align-items-center
                "
              >
               <img
                  :src="b64Decode(todo.imagen_perfil)"
                  width="50px"
                  height="50px"
                  style="border-radius: 50%;"
                />
                {{ todo.nombreProfesor }}
                <span class="badge rounded-pill"
                  ><i
                    class="fas fa-times"
                    style="color: red; font-size: 1rem"
                  ></i
                ></span>
              </li>
         
            </ul>
          </div>
          <div style="width: 45%" class="col">
            <center>
              <h5>Alumnos</h5>
            </center>
            <ul class="list-group">
              <li
                v-for="todo in integrantesGrupo.alumnos"
                :key="todo.id"
                class="
                  list-group-item
                  d-flex
                  justify-content-between
                  align-items-center
                "
              >
                <img
                  :src="b64Decode(todo.imagen_perfil)"
                  width="50px"
                  height="50px"
                  style="border-radius: 50%;"
                />
                {{ todo.nombreAlumno }}
                <span class="badge rounded-pill"
                  ><i
                    class="fas fa-times"
                    style="color: red; font-size: 1rem"
                  ></i
                ></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { Global } from "../Global";
import axios from "axios";

/* import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table"; */
export default {
  name: "modificarUsuarioComponent.vue",
  components: {
    /*    VueGoodTable, */
  },
  data() {
    return {
      idGrupo: this.$route.params.idGrupo,
      modificar: false,
      integrantesGrupo: { profesores: {}, alumnos: {} },
      grupoSeleccionado: "",
      columns: [
        {
          label: "ID",
          field: "id",
        },
        {
          label: "Nombre",
          field: "nombre",
        },
      ],
      profesores: [],
      alumnos: [],
      selectedRows: "",
    };
  },
  mounted() {
    this.getGrupo();
    this.buscarGrupoSeleccionado();
  },
  methods: {
    b64Decode(img) {
      return "data:image/png;base64," + img;
    },
    buscarGrupoSeleccionado() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "integrantes-curso?idGrupo=" + this.idGrupo, config)
        .then((res) => {
          if (res.status == 200) {
            this.integrantesGrupo = res.data;
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
    selectionChanged(params) {
      this.selectedRows = params.selectedRows;
    },
    getGrupo() {
      this.modificar = false;
      let config = {
        headers: {
          token: Global.token,
        },
      };

      axios
        .get(Global.url + "grupo?idGrupo=" + this.idGrupo, config)
        .then((res) => {
          if (res.status == 200) {
            this.grupoSeleccionado = res.data;
          }
        });
    },
    eliminarGrupo() {
      /*      axios
        .delete(Global.url + "grupo", {
          headers: {
            "Content-Type": "application/json",
            token: Global.token,
          },
          data: {
            idGrupo: this.GrupoDatos.idGrupo,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Grupo Eliminado",
            });
            this.$router.push("/listarGrupo");
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Error Inesperado",
          });
        }); */
      alert("Sweet alert confirmacion");
    },

    modificarGrupo() {
      let parametros = {
        idGrupo: this.idGrupo,
        nuevoGrupo: this.grupoSeleccionado.idGrupo,
        nuevoNombreCompleto: this.grupoSeleccionado.nombreCompleto,
      };
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .put(Global.url + "grupo", parametros, config)
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Grupo Modificado.",
            });
            this.$router.push("/listarGrupo");
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Error inesperado.",
          });
        });
    },
  },
};
</script>
