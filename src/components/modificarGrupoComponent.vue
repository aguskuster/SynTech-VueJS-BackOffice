<template>
  <div>
    <div class="contenedor_menu">
      <h2>Modificar Grupo</h2>
    </div>
    <div class="contenedorGeneral" style="justify-content: space-evenly">
      <div
        class="contenedorIzquierdo"
        style="width: 30% !important; height: 47rem; position: relative"
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
        <div style="position: absolute; right: 10px; bottom: 10px">
          <div class="" v-if="modificar">
            <button
              class="btn btn-success"
              @click="modificarGrupo()"
              style="margin-right: 5px"
            >
              Actualizar
            </button>
            <button class="btn btn-danger" @click="getGrupo()">Cancelar</button>
          </div>
          <div v-else>
            <button class="btn btn-danger" @click="eliminarGrupo()"    v-if="usuario.cargo != 'Adscripto'">
              Eliminar Grupo
            </button>
          </div>
        </div>
      </div>

      <div
        class="contenedorDerechoPersona"
        style="width: 65% !important; height: 47rem"
      >
        <h4>Administrar Integrantes</h4>
        <div
          style="
            display: flex;
            flex-direction: row-reverse;
            padding-right: 10px;
          "
        >
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modalAgregarMiembros"
            @click="cargarUsuariosSinGrupo()"
          >
            Agregar Miebros
          </button>

          <!-- INICIO Modal Agregar Miembro -->
          <div
            class="modal fade"
            id="modalAgregarMiembros"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <p class="modal-title" id="exampleModalLabel">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="tipoDeUser"
                    >
                      <option value="" disabled selected hidden>
                        Tipo de usuario a agregar
                      </option>

                      <option value="Profesores">Profesores</option>
                      <option value="Alumnos">Alumnos</option>
                    </select>
                  </p>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body" v-if="tipoDeUser == 'Profesores'">
                  <vue-good-table
                    @on-selected-rows-change="selectionChanged"
                    :columns="columnsProfesores"
                    :rows="profesores"
                    :select-options="{
                      enabled: true,
                      selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                      selectionInfoClass: 'custom-class',
                      selectionText: 'rows selected',
                      clearSelectionText: 'clear',
                      disableSelectInfo: true, // disable the select info panel on top
                      selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
                    }"
                    :search-options="{ enabled: true }"
                    :pagination-options="pagination"
                    theme="polar-bear"
                  >
                  </vue-good-table>
                  <br />
                  <div style="display: flex; flex-wrap: wrap">
                    <span
                      class="btn btn-primary mb-2"
                      style="margin-right: 10px"
                      v-for="todo in selectedRows"
                      :key="todo.id"
                      >{{ todo.nombre }}</span
                    >
                  </div>
                </div>
                <div class="modal-body" v-if="tipoDeUser == 'Alumnos'">
                  <vue-good-table
                    @on-selected-rows-change="selectionChanged"
                    :columns="columnsAlumnos"
                    :rows="alumnos"
                    :select-options="{
                      enabled: true,
                      selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                      selectionInfoClass: 'custom-class',
                      selectionText: 'rows selected',
                      clearSelectionText: 'clear',
                      disableSelectInfo: true, // disable the select info panel on top
                      selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
                    }"
                    :search-options="{ enabled: true }"
                    :pagination-options="pagination"
                    theme="polar-bear"
                  >
                  </vue-good-table>
                  <br />
                  <div style="display: flex; flex-wrap: wrap">
                    <span
                      class="btn btn-primary"
                      style="margin-right: 10px"
                      v-for="todo in selectedRows"
                      :key="todo.id"
                      >{{ todo.nombre }}</span
                    >
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>

                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="agregarMiembrosGrupo()"
                    data-bs-dismiss="modal"
                  >
                    Agregar Usuarios
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- FIN  Modal Agregar Miembro -->
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
                  style="border-radius: 50%"
                />
                <span
                  style="
                    font-size: 15px;
                    text-align: center;
                    margin: 6px 0;
                    text-transform: uppercase;
                  "
                >
                  {{ todo.nombreProfesor }} - {{ todo.nombreMateria }}
                </span>
                <span class="badge rounded-pill"
                  ><i
                    class="fas fa-times btn"
                    style="color: red; font-size: 1rem"
                    @click="eliminarMiembro(todo, 'Profesor')"
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
                  style="border-radius: 50%"
                />
                <span
                  style="
                    font-size: 15px;
                    text-align: center;
                    margin: 6px 0;
                    text-transform: uppercase;
                  "
                >
                  {{ todo.nombreAlumno }}
                </span>
                <span class="badge rounded-pill"
                  ><i
                    class="fas fa-times btn"
                    style="color: red; font-size: 1rem"
                    @click="eliminarMiembro(todo, 'Alumno')"
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
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "modificarUsuarioComponent.vue",
  components: {
    VueGoodTable,
  },
  data() {
    return {
       usuario: JSON.parse(window.atob(localStorage.getItem("auth_token"))),
      idGrupo: this.$route.params.idGrupo,
      modificar: false,
      tipoDeUser: "Profesores",
      integrantesGrupo: { profesores: {}, alumnos: {} },
      grupoSeleccionado: "",
      columnsAlumnos: [
        {
          label: "ID",
          field: "id",
        },
        {
          label: "Nombre",
          field: "nombre",
        },
      ],
      columnsProfesores: [
        {
          label: "ID",
          field: "idProfesor",
        },
        {
          label: "Nombre",
          field: "nombre",
        },
        {
          label: "Materia",
          field: "nombreMateria",
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
      profesores: [],
      alumnos: [],
      selectedRows: "",
      salir: false,
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
    eliminarAlumno(idAlumno) {
      axios
        .delete(Global.url + "alumno", {
          headers: {
            "Content-Type": "application/json",
            token: Global.token,
          },
          data: {
            idGrupo: this.idGrupo,
            idAlumno: idAlumno,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Alumno retirado de " + this.idGrupo,
            });

            this.buscarGrupoSeleccionado();
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Error inesperado",
          });
        });
    },
    eliminarProfesor(idProfesor, idMateria) {
      axios
        .delete(Global.url + "curso", {
          headers: {
            "Content-Type": "application/json",
            token: Global.token,
          },
          data: {
            idGrupo: this.idGrupo,
            idProfesor: idProfesor,
            idMateria: idMateria,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Profesor retirado de " + this.idGrupo,
            });

            this.buscarGrupoSeleccionado();
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Error inesperado",
          });
        });
    },
    eliminarMiembro(usuario, tipo) {
      if (tipo == "Alumno") {
        this.eliminarAlumno(usuario.idAlumno);
      } else {
        this.eliminarProfesor(usuario.idProfesor, usuario.idMateria);
      }
    },
    agregarMiembrosGrupo() {
      for (let u of this.selectedRows) {
        if (this.tipoDeUser == "Alumnos") {
          this.agregarAlumnoGrupo(u.id, this.idGrupo);
        } else {
          this.agregarProfesorGrupo(u.idProfesor, u.idMateria, this.idGrupo);
        }
      }
     /*  this.filterSelectedRows(); */
      this.buscarGrupoSeleccionado();
    },
/*     filterSelectedRows() {
      let a = this.selectedRows.reduce((acc, materia) => {
        acc[materia.nombreMateria] = ++acc[materia.nombreMateria] || 0;
        return acc;
      }, {});


      console.log(a);
    }, */
    agregarAlumnoGrupo(idAlumno, idGrupo) {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      let parametros = {
        idGrupo: idGrupo,
        idAlumno: idAlumno,
      };
      axios
        .post(Global.url + "alumno", parametros, config)
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Miembro se agrego al grupo",
            });
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Grupo ya tiene esta  materia",
          });
        });
    },
    agregarProfesorGrupo(idProfesor, idMateria, idGrupo) {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };

      let parametros = {
        idGrupo: idGrupo,
        idMateria: idMateria,
        idProfesor: idProfesor,
      };
      axios
        .post(Global.url + "curso", parametros, config)
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Miembro se agrego al grupo",
            });
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Grupo ya tiene esta  materia",
          });
        });
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
    cargarUsuariosSinGrupo() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "materiaSinGrupo?idGrupo=" + this.idGrupo, config)
        .then((res) => {
          if (res.status == 200) {
            this.profesores = res.data;
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al cargar",
          });
        });

      axios
        .get(Global.url + "alumnos?idGrupo=" + this.idGrupo, config)
        .then((res) => {
          if (res.status == 200) {
            this.alumnos = res.data;
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
           axios
        .delete(Global.url + "grupo", {
          headers: {
            "Content-Type": "application/json",
            token: Global.token,
          },
          data: {
            idGrupo: this.idGrupo,
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
        });
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
