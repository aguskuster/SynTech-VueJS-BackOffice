<template>
  <div>
    <div class="contenedor_menu">
      <h2>Agregar Carrea</h2>
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
        style="width: 33%; background-color: whitesmoke"
      >
        <div class="mb-3">
          <p style="font-size: 18px">Nombre <em>*</em></p>
          <input
            required
            type="text"
            v-model="carrera.nombre"
            class="form-control inputFachero"
            style="height: 50px; font-size: 16px"
          />
        </div>
        <div class="mb-3">
          <p style="font-size: 18px">Plan <em>*</em></p>
          <input
            required
            type="text"
            v-model="carrera.plan"
            class="form-control inputFachero"
            style="height: 50px; font-size: 16px"
          />
        </div>
        <div class="mb-3">
          <p style="font-size: 18px">Categoria <em>*</em></p>
          <input
            required
            type="text"
            v-model="carrera.categoria"
            class="form-control inputFachero"
            style="height: 50px; font-size: 16px"
          />
        </div>
        {{ carrera }}
      </div>

      <div
        class="contenedorIzquierdo p-4"
        style="width: 32%; background-color: whitesmoke"
      >
        <!-- <form v-on:submit.prevent="agregarArray(gradoSelect, carrera.grados)">
          <div class="mb-3" style="display: flex">
            <select
              class="form-control"
              v-model="tipoSelect"
              style="width: 350px"
            >
              <option value="año">Año</option>
              <option value="semestre">Semestre</option>
            </select>

            <select
              class="form-control"
              v-model="gradoSelect"
              style="width: 135px; margin-left: 20px"
            >
              <option value="1er">1er</option>
              <option value="2do">2do</option>
              <option value="3er">3er</option>
              <option value="4to">4to</option>
              <option value="5to">5to</option>
              <option value="6to">6to</option>
            </select>

            <input
              type="submit"
              value="Agregar Grado"
              class="btn btn-primary"
            />
          </div>
        </form> -->

        <ul class="list-group mt-4">
          <li
            class="list-group-item"
            v-for="grado in carrera.grado"
            v-bind:key="grado.id"
          >
            <span
              class="d-flex justify-content-between"
              @click="cargarGrado(grado)"
            >
              {{ grado.grado }}
            </span>
          </li>
        </ul>
      </div>
      <div
        class="contenedorDerechoPersona p-4"
        style="width: 32%; background-color: whitesmoke"
        v-if="gradoPicked == ''"
      >
        <h5>Seleccione un grado para habilitar esta funcion</h5>
        <br />
        <p style="font-size: 18px">
          <span> Materias</span>
          <i
            class="fa fa-plus-square ml-2"
            style="color: #006799; cursor: pointer"
          ></i>
        </p>
        <input class="form-control inputFachero" type="text" disabled />
        <br /><br />
        <p style="font-size: 18px">
          <span> Grupo</span>
          <i
            class="fa fa-plus-square ml-2"
            style="color: #006799; cursor: pointer"
          ></i>
        </p>
        <input class="form-control inputFachero" type="text" disabled />
      </div>
      <div
        v-else
        class="contenedorDerechoPersona p-4"
        style="width: 32%; background-color: whitesmoke"
      >
        <h5>Modificar grado : {{ gradoPicked.grado }}</h5>
        <p style="font-size: 18px">
          <span> Materias</span>
          <i
            class="fa fa-plus-square ml-2"
            style="color: #006799; cursor: pointer"
          ></i>
        </p>
        <select
          v-model="materiaSelect"
          class="form-control inputFachero"
          style="height: 50px; font-size: 16px"
          v-on:change="agregarArray(materiaSelect, gradoPicked.materias)"
        >
          <option
            v-for="materia in materias"
            v-bind:key="materia.id"
            :value="materia.id"
          >
            {{ materia.nombre }}
          </option>
        </select>

        <ul class="list-group mt-4">
          <li
            class="list-group-item"
            v-for="m in gradoPicked.materias"
            v-bind:key="m.id"
          >
            <span class="d-flex justify-content-between">
              {{ returnSubjectNameById(m) }}
              <button
                class="btn btn-danger"
                v-on:click="eliminarArray(m, gradoPicked.materias)"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </span>
          </li>
        </ul>

        <p style="font-size: 18px">
          <span> Grupo</span>
        </p>
        <input
          type="text"
          id="nombreGrupo"
          maxlength="5"
          minlength="2"
          class="form-control inputFachero"
          v-model="grupoSelect.idGrupo"
        />
        <p style="font-size: 18px">
          <span> Año Electivo</span>
        </p>
        <input
          type="text"
          id="nombreGrupo"
          maxlength="4"
          minlength="4"
          class="form-control inputFachero"
          v-model="grupoSelect.anioElectivo"
        />

        <ul class="list-group mt-4">
          <li
            class="list-group-item"
            v-for="g in gradoPicked.grupos"
            v-bind:key="g.id"
          >
            <span class="d-flex justify-content-between">
              {{ g.idGrupo }}
              <button class="btn btn-danger" v-on:click="eliminarGrupo(g)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </span>
          </li>
        </ul>
        <input
          type="submit"
          value="Agregar Grupo"
          class="btn btn-primary"
          @click="agregarGrupo()"
        />


         <input
          type="submit"
          value="Actualizar Grado"
          class="btn btn-primary"
          @click="actualizarGrado()"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Global } from "../../Global";
import axios from "axios";
export default {
  name: "modificarCarreraComponent.vue",
  data() {
    return {
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      loading: false,
      carrera: "",
      gradoPicked: "",
      materias: "",
      gradoSelect: "",
      tipoSelect: "",
      materiaSelect: "",
      grado: "",
      grupoSelect:{
        idGrupo: "",
        anioElectivo: "",
      },
    };
  },
  mounted() {
    
    this.getCarrera();
    this.getAllMaterias();
  },
  methods: {
    eliminarGrupo(grupo){
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .delete(Global.url + "grupo/" + grupo.idGrupo, config)
        .then(() => {
           this.flashMessage.show({
            status: "success",
            title: Global.nombreSitio,
            message: "Grupo eliminado correctamente",
          });
          this.cargarGrado(this.gradoPicked);
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error al eliminar",
          });
        });

    },
    agregarGrupo() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      let grupo = {
        idGrupo: this.grupoSelect.idGrupo,
        nombreCompleto: this.gradoPicked.grado + " " + this.grupoSelect,
        grado_id: this.gradoPicked.id,
        anioElectivo: this.grupoSelect.anioElectivo,
      };
      axios
        .post(Global.url + "grupo", grupo, config)
        .then(() => {
          this.cargarGrado(this.gradoPicked);
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Grupo existente",
          });
        });
    },
    cargarGrado(grado) {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .get(Global.url + "grado/" + grado.id, config)
        .then((response) => {
          this.gradoPicked = response.data;
          this.loading = false;
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al cargar",
          });
        });
    },
    actualizarGrado() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      let grado = {
        carrera_id: this.$route.params.carrera,
        grado: this.gradoPicked.grado,
        materias: {},
      };
      axios
        .put(Global.url + "grado/" + this.gradoPicked.id, grado, config)
        .then(() => {
          this.flashMessage.show({
            status: "success",
            title: Global.nombreSitio,
            message: "Grado actualizado correctamente",
          });
         
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al cargar",
          });
        });
    },
    getCarrera() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      this.loading = true;
      axios
        .get(Global.url + "carrera/" + this.$route.params.carrera, config)
        .then((response) => {
          this.carrera = response.data;
          this.loading = false;
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al cargar",
          });
        });
    },

    addTipoGrado(grados, tipo) {
      let gradosConTipo = [];
      for (let g of grados) {
        gradosConTipo.push(g + " " + tipo);
      }
      return gradosConTipo;
    },
    agregarArray(id, array) {
      if (id == "" || id == null) {
        return;
      }
      if (!array.includes(id)) {
        array.push(id);
      }
    },
    returnSubjectNameById(idSub) {
      for (let m of this.materias) {
        if (m.id == idSub) {
          return m.nombre;
        }
      }
    },
    eliminarArray(id, array) {
      const element = (element) => element == id;
      let index = array.findIndex(element);
      array.splice(index, 1);
    },

    getAllMaterias() {
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
            this.materias = res.data;
            this.loading = false;
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
