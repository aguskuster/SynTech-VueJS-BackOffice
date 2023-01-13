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
          v-if="usuario.cargo != 'Adscripto'"
        >
          Agregar Materia
        </button>
      </div>
    </div>
       <center v-if="loading" style="margin-top:3rem;font-size:230px;">
      <div
        class="spinner-border text-primary"
        role="status"
        style="color: #13111e !important"
      ></div>
    </center>
    <div  v-else class="contenedorGeneral">
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
        <h4>
          Docentes que dictan {{ materiaSeleccionada }}
          <div  v-if="usuario.cargo != 'Adscripto'">
            <router-link
            v-if="todosMateria.length > 0"
              style="
                text-decoration: none;
                font-size: 17px;
                color: #1D1D1F;
                margin-left: 10px;
              "
              class="cog_hover"
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
        </h4>
        <div class="menu_buscar">
          <div class="botonesMateria"></div>
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
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      title: "BackOffice",
      nav: true,
      todosMateria: "",
      materiaProfesores: "",
      materiaSeleccionada: " ",
      modificar: false,
      nuevoNombreMateria: "",
      idMateria: 0,
      loading:true,
      materia: {
        nombreMateria: "",
      },
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
        perPageDropdown: [8, 5],
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
    if (!localStorage.getItem("auth_token_BO")) {
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
            location.reload();
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
        .get(Global.url + "materia", config)
        .then((res) => {
          if (res.status == 200) {
            this.todosMateria = res.data;
            this.loading=false;
           
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

      // onRowClick(params) {
      //   this.traerProfesoresMateria(params.row.id, params.row.nombre);
      // },
  // funcion de abajo deja de existir 
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

