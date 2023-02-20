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
          <p style="font-size: 18px">Categoria <em>*</em></p>
          <input
            required
            type="text"
            v-model="carrera.categoria"
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
      </div>

      <div
        class="contenedorIzquierdo p-4"
        style="width: 32%; background-color: whitesmoke"
      >
        <form v-on:submit.prevent="agregarGradoCarrera()">
          <div class="mb-3">
            <p style="font-size: 18px">Tipo <em>*</em></p>
            <select class="form-control" v-model="grado.tipo">
              <option value="año">Año</option>
              <option value="semestre">Semestre</option>
              <option value="otro">Otro</option>
            </select>
            <p style="font-size: 18px">Grado <em>*</em></p>
            <input type="text" disabled v-if="grado.tipo == null" class="form-control">
            <select
              class="form-control"
              v-model="grado.nombre"
              v-if="grado.tipo == 'año'"
            >
              <option value="1er Año">1er Año</option>
              <option value="2do Año">2do Año</option>
              <option value="3er Año">3er Año</option>
              <option value="4to Año">4to Año</option>
              <option value="5to Año">5to Año</option>
              <option value="6to Año">6to Año</option>
            </select>
            <select
              class="form-control"
              v-model="grado.nombre"
              v-if="grado.tipo == 'semestre'"
            >
              <option value="1er Semestre">1er Semestre</option>
              <option value="2do Semestre">2do Semestre</option>
              <option value="3er Semestre">3er Semestre</option>
              <option value="4to Semestre">4to Semestre</option>
              <option value="5to Semestre">5to Semestre</option>
              <option value="6to Semestre">6to Semestre</option>
            </select>
            <input type="text"  class="form-control" v-model="grado.nombre" v-if="grado.tipo == 'otro'">
          </div>
          <div class="mb-3">
            <p style="font-size: 18px">Materias <em>*</em></p>

            <select
              class="form-control"
              v-model="materiaSelect"
              v-on:change="agregarArray(materiaSelect, grado.materias)"
            >
              <option :value="m.id" v-for="m in materias" :key="m.id">
                {{ m.nombre }}
              </option>
            </select>
            <div class="contenedorMateriaForm">
              <span
                class="btnAgregarComp"
                v-for="selectedSubject in grado.materias"
                :key="selectedSubject.id"
              >
                <div
                  style="
                    width: 80%;
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                    margin: 0 auto;
                  "
                >
                  <span>{{ returnSubjectNameById(selectedSubject) }} </span>
                  <i
                    @click="eliminarArray(selectedSubject, grado.materias)"
                    class="fas fa-times"
                  ></i>
                </div>
              </span>
            </div>
          </div>
           <input
                type="submit"
                value="Agregar Grado"
                class="btn btn-primary"
              />
        </form>
      </div>

      <div
        class="contenedorDerechoPersona p-4"
        style="width: 32%; background-color: whitesmoke"
      >
      {{carrera.grados}}
        <div class="w-50 ml-auto mt-4 mr-auto mb-auto">
          <form v-on:submit.prevent="agregarCarrera()">
            <div class="d-flex justify-content-end">
              <input
                type="submit"
                value="Agregar usuario"
                class="btn btn-primary"
              />
            </div>
          </form>
        </div>
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
        grados:[],
      },
      grado: {
        nombre: "",
        materias: [],
      },
    };
  },
  mounted() {
    this.getAllMaterias();
  },
  methods: {
    agregarCarrera() {
      alert("hola");
    },
    agregarArray(id, array) {
      if (!array.includes(id)) {
        array.push(id);
      }
    },
    agregarGradoCarrera(){
      this.carrera.grados.push(this.grado);
      this.grado = {
        nombre: "",
        materias: [],
      };
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
