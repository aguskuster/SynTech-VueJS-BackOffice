<template>
  <div>
    <div class="contenedor_menu">
      <h2>Agregar Carrera</h2>
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
        style="width: 33%; background-color: #FFFFFF"
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
      </div>

      <div
        class="contenedorIzquierdo p-4"
        style="width: 32%; background-color: #FFFFFF"
      >
        <form v-on:submit.prevent="agregarArray(gradoSelect, carrera.grados)">
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
             <option :value="'1er ' + tipoSelect">1er</option>
              <option :value="'2do ' + tipoSelect">2do</option>
              <option :value="'3er ' + tipoSelect">3er</option>
              <option :value="'4to ' + tipoSelect">4to</option>
              <option :value="'5to ' + tipoSelect">5to</option>
              <option :value="'6to ' + tipoSelect">6to</option>
            </select>

            <input
              type="submit"
              value="Agregar Grado"
              class="btn btn-primary"
            />
          </div>
        </form>

        <ul class="list-group mt-4">
          <li
            class="list-group-item"
            v-for="grado in carrera.grados"
            v-bind:key="grado.id"
          >
            <span class="d-flex justify-content-between">
              {{ grado }}
              <button
                class="btn btn-danger"
                v-on:click="eliminarArray(grado, carrera.grados)"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </span>
          </li>
        </ul>
        <div class="d-flex justify-content-end mt-5">
          <input
            v-on:click="agregarCarrera()"
            type="submit"
            value="Agregar carrera"
            class="btn btn-primary"
          />
        </div>
      </div>
      
      <div
        class="contenedorDerechoPersona p-4"
        style="width: 32%; background-color: #FFFFFF"
      >
      <h5 style="text-align:center">Administrar Materias y grupos</h5>
        <p style="font-size: 18px" class="mt-4">
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
          v-on:change="agregarArray(materiaSelect, grado.materias)"
          disabled
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
            v-for="m in grado.materias"
            v-bind:key="m.id"
          >
            <span class="d-flex justify-content-between">
              {{ returnSubjectNameById(m) }}
              <button
                class="btn btn-danger"
                v-on:click="eliminarArray(m, grado.materias)"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </span>
          </li>
        </ul>

        <p style="font-size: 18px">
          <span> Grupo</span>
          <i
            class="fa fa-plus-square ml-2"
            style="color: #006799; cursor: pointer"
            @click="agregarArray(grupoSelect, grado.grupos)"
          ></i>
        </p>
        <label for="nombreGrupo">Acronimo de grupo</label>
        <input
          type="text"
          id="nombreGrupo"
          maxlength="5"
          minlength="2"
          class="form-control inputFachero"
          v-model="grupoSelect"
          disabled
        />

        <ul class="list-group mt-4">
          <li
            class="list-group-item"
            v-for="g in grado.grupos"
            v-bind:key="g.id"
          >
            <span class="d-flex justify-content-between">
              {{ g }}
              <button
                class="btn btn-danger"
                v-on:click="eliminarArray(g, grado.grupos)"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { Global } from "../../Global";
import axios from "axios";
export default {
  name: "agregarUsuarioComponent.vue",
  data() {
    return {
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      loading: false,
      materias: "",
      materiaSelect: "",
      carrera: {
        nombre: "",
        categoria: "",
        plan: "",
        grados: [],
      },
      tipoSelect: "año",
      gradoSelect: "",

      grado: {
        materias: [],
        grupos: [],
      },
      grupoSelect: "",
      acronimoGrupo: "",

      groupAccess: false,
    };
  },
  mounted() {
    this.getAllMaterias();
  },
  methods: {
    agregarCarrera() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      
      axios
        .post(Global.url + "carrera", this.carrera, config)
        .then((res) => {
          this.flashMessage.show({
            status: "success",
            title: Global.nombreSitio,
            message: "Carrera creada correctamente",
          });
          this.$router.push("/carrera/" + res.data.id);
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al crear",
          });
        });
    },
    parseResultData(data) {
      let carrera = {
        nombre: data.nombre,
        categoria: data.categoria,
        plan: data.plan,
        grados: [],
      };
      for (let g of data.grados) {
        carrera.grados.push(g.grado);
      }
      return carrera;
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
