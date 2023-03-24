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
        <form v-on:submit.prevent="updateCarrera()">
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

          <input
            type="submit"
            value="Actualizar carrera"
            class="btn btn-primary"
          />
        </form>
      </div>

      <div
        class="contenedorIzquierdo p-4"
        style="width: 32%; background-color: whitesmoke"
      >
        <form v-on:submit.prevent="agregarGrado()">
          <div class="mb-3" style="display: flex">
            <select
              class="form-control"
              v-model="gradoSelect"
              style="width: 135px; margin-left: 20px"
            >
              <option :value="'1er ' + tipoSelect">1er {{ tipoSelect }}</option>
              <option :value="'2do ' + tipoSelect">2do {{ tipoSelect }}</option>
              <option :value="'3er ' + tipoSelect">3er {{ tipoSelect }}</option>
              <option :value="'4to ' + tipoSelect">4to {{ tipoSelect }}</option>
              <option :value="'5to ' + tipoSelect">5to {{ tipoSelect }}</option>
              <option :value="'6to ' + tipoSelect">6to {{ tipoSelect }}</option>
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
            v-for="grado in carrera.grado"
            v-bind:key="grado.id"
          >
            <span class="d-flex justify-content-between">
              <span @click="cargarGrado(grado)"> {{ grado.grado }}</span>

              <button class="btn btn-danger" v-on:click="eliminarGrado(grado)">
                <i class="fas fa-trash-alt"></i>
              </button>
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
        >
          <option
            v-for="materia in materias"
            v-bind:key="materia.id"
            :value="materia"
          >
            {{ materia.nombre }}
          </option>
        </select>
        <br />
        <p style="font-size: 18px">
          <span> Cantidad de horas semanales</span>
        </p>
        <input
          type="text"
          class="form-control inputFachero"
          v-model="materiaSelect.cantidad_horas"
        />
        <div class="d-flex justify-content-end mt-2">
          <button class="btn btn-primary" @click="agregarMateriaGrado()">
            Agregar Materia
          </button>
        </div>

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
                v-on:click="eliminarMateriaGrado(m)"
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

        <ul class="list-group mt-4">
          <li
            class="list-group-item"
            v-for="g in gradoPicked.grupos"
            v-bind:key="g.id"
          >
            <span class="d-flex justify-content-between">
              {{ g.idGrupo }}
              <span>
                <button class="btn btn-danger" v-on:click="eliminarGrupo(g)">
                  <i class="fas fa-trash-alt"></i>
                </button>
                <button class="btn btn-warning" v-on:click="modificarGrupo(g)">
                  <i class="fas fa-pencil-alt"></i>
                </button>
              </span>
            </span>
          </li>
        </ul>
        <input
          type="submit"
          value="Agregar Grupo"
          class="btn btn-primary"
          @click="agregarGrupo()"
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
      materiaSelect: {
        materia_id: "",
        cantidad_horas: "",
        carrera_id: this.$route.params.carrera,
      },
      grado: "",
      grupoSelect: {
        idGrupo: "",
      },
    };
  },
  mounted() {
    this.getCarrera();
    this.getAllMaterias();
  },
  methods: {
    agregarGrado() {
      for (let grado of this.carrera.grado) {
        if (grado.grado == this.gradoSelect || this.gradoSelect == "") {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Grado ya pertenece a la carrera",
          });
          this.gradoSelect = "";
          return;
        }
      }

      this.updateCarrera();
    },
    eliminarMateriaGrado(materia) {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };

      axios
        .delete(
          Global.url +
            "grado/" +
            this.gradoPicked.id +
            "/materia/" +
            materia.id,
          config
        )
        .then((res) => {
          this.gradoPicked = res.data;
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
    eliminarGrado(grado) {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .delete(
          Global.url + "carrera/" + this.carrera.id + "/grado/" + grado.id,
          config
        )
        .then(() => {
          this.getCarrera();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getOnlyGrados() {
      let grados = [];
      for (let grado of this.carrera.grado) {
        grados.push(grado.grado);
      }
      if (this.gradoSelect != "") {
        if (!grados.includes(this.gradoSelect)) {
          grados.push(this.gradoSelect);
        }
      }
      return grados;
    },

    updateCarrera() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      let carrera = {
        nombre: this.carrera.nombre,
        plan: this.carrera.plan,
        categoria: this.carrera.categoria,
        grados: this.getOnlyGrados(this.carrera.grados),
      };

      axios
        .put(Global.url + "carrera/" + this.carrera.id, carrera, config)
        .then(() => {
          this.flashMessage.show({
            status: "success",
            title: Global.nombreSitio,
            message: "Carrera actualizada correctamente",
          });
          this.getCarrera();
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error al actualizar",
          });
        });
    },
    modificarGrupo(grupo) {
      this.$router.push("/grupo/" + grupo.idGrupo);
    },

    eliminarGrupo(grupo) {
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
        anioElectivo: new Date().getFullYear(),
      };

      axios
        .post(Global.url + "grupo", grupo, config)
        .then(() => {
          this.cargarGrado(this.gradoPicked);
          this.grupoSelect = {
            idGrupo: "",
          };
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
    agregarMateriaGrado() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };

      for (let materia of this.gradoPicked.materias) {
        if (materia.id == this.materiaSelect.id) {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Materia ya pertenece al grado",
          });
          this.materiaSelect = {
            materia_id: "",
            cantidad_horas: "",
            carrera_id: this.$route.params.carrera,
          };
          return;
        }
      }

      let grado = {
        materia_id: this.materiaSelect.id,
        cantidad_horas: this.materiaSelect.cantidad_horas,
      };

      axios
        .put(
          Global.url + "grado/" + this.gradoPicked.id + "/materia",
          grado,
          config
        )
        .then((res) => {
          this.gradoPicked = res.data;
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

    parseSubjectForBackend(materias) {
      let aux = [];
      for (let m of materias) {
        aux.push({
          materia_id: m.id,
          cantidad_horas: m.cantidad_horas,
          carrera_id: this.$route.params.carrera,
        });
      }

      return aux;
    },
    getOnlySubjectId(materias) {
      let materiasId = [];
      for (let materia of materias) {
        materiasId.push(materia.id);
      }
      return materiasId;
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
          this.tipoSelect = this.getTypeOfGrado();
        })
        .catch(() => {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Error inesperado al cargar",
          });
        });
    },
    getTypeOfGrado() {
      let tipo = this.carrera.grado[0].grado.split(" ")[1];
      return tipo;
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
        if (m.id == idSub.id || m.id == idSub.materia_id) {
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
