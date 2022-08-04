<template>
  <div>
    <div class="contenedor_menu">
      <vue-headful :title="title" />
      <h2>Listado de Materias</h2>
      <div>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalAgregarMateria"
        >
          Agregar Materia
        </button>
      </div>
    </div>

    <div class="contenedorGeneral">
      <div class="contenedorIzquierdo">
        <h4>Asignaturas</h4>

        <div class="contenedor_table">
          <vue-good-table
            @on-row-click="onRowClick"
            :columns="materiasColumnas"
            :rows="todosMateria"
            :search-options="{ enabled: true }"
            theme="polar-bear"
            :pagination-options="pagination"
          >
          </vue-good-table>
        </div>
      </div>

      <!--     MODAL AGREGAR MATERIA  -->
      <div
        class="modal fade"
        id="modalAgregarMateria"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Agregar materia
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form name="form" id="form" v-on:submit.prevent="crearMateria()">
                <p>
                  Nombre Materia<em> *</em> :
                  <input
                    type="text"
                    name="nombreMateria"
                    placeholder="Ejemplo: Matematica"
                    class="form-control"
                    v-model="materia.nombreMateria"
                    autocomplete="=off"
                    required
                  />
                </p>

                <input
                  data-bs-dismiss="modal"
                  type="submit"
                  value="Agregar Materia"
                  title="Enviar"
                  class="btn btn-primary"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <!--     FIN MODAL AGREGAR MATERIA  -->

      <div class="contenedorDerechoPersona">
        <h4>Docentes que dictan {{ materiaSeleccionada }}</h4>
        <div class="menu_buscar">
          <div class="botonesMateria">
            <div class="btn btn-primary ml-2">
              <router-link
                style="
                  text-decoration: none;
                  font-size: 14px;
                  padding: 0px !important;
                  color: white;
                "
                :to="{
                  name: 'modificarMateria',
                  params: {
                    idMateria: idMateria,
                    Materia: materiaSeleccionada,
                  },
                }"
              >
                <i class="fas fa-cog"></i>
              </router-link>
            </div>
          </div>
        </div>

        <div class="contenedor_table">
          <vue-good-table
            :columns="profesorColumnas"
            :rows="materiaProfesores"
            :search-options="{ enabled: true }"
            theme="polar-bear"
            :pagination-options="pagination"
          >
          </vue-good-table>
          <button v-if="sacarProfesor" class="btn-danger btn">
            Eliminar Profesores
          </button>
          <!--  "Sweet alert listando nombres de los profes y confirmar" -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Global } from "../Global";
import axios from "axios";
import vueHeadful from "vue-headful";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
export default {
  name: "listadoMaterias",

  components: {
    vueHeadful,
    VueGoodTable,
  },
  data() {
    return {
       usuario: JSON.parse(window.atob(localStorage.getItem("auth_token"))),
      title: "BackOffice",
      nav: true,
      todosMateria: "",
      materiaProfesores: "",
      materiaSeleccionada: " ",
      modificar: false,
      nuevoNombreMateria: "",
      idMateria: 0,
      materia: {
        nombreMateria: "",
      },
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
      sacarProfesor: false,
      selectedRows: "",
      materiasColumnas: [
        {
          label: "Asignatura",
          field: "nombre",
        },
      ],
      profesorColumnas: [
        {
          label: "Docente",
          field: "nombre",
        },
        {
          label: "Email",
          field: "email",
        },
      ],
    };
  },
  mounted() {
    if (!localStorage.getItem("auth_token")) {
      localStorage.clear();
    }
    this.getTodos();
  },
  methods: {


    crearMateria() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .post(Global.url + "materia", this.materia, config)
        .then((response) => {
          if (response.status == 200) {
            console.log(response.data);
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Materia Agregado",
            });
            this.getTodos();
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Materia ya existe",
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
        .get(Global.url + "materias", config)
        .then((res) => {
          if (res.status == 200) {
            this.todosMateria = res.data;
            this.traerProfesoresMateria(
              this.todosMateria[0].id,
              this.todosMateria[0].nombre
            );
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
      this.traerProfesoresMateria(params.row.id, params.row.nombre);
    },

    traerProfesoresMateria(idMateria, nombreMateria) {
      this.idMateria = idMateria;
      this.materiaSeleccionada = nombreMateria;
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "materia-profesores?idMateria=" + idMateria, config)
        .then((res) => {
          if (res.status == 200) {
            this.materiaProfesores = res.data;
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

