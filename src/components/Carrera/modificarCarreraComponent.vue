<template>
  <div>
    <div class="contenedor_menu">
      <h2>Modificar Carrera</h2>
    </div>
    <center v-if="loading" style="margin-top: 3rem; font-size: 230px">
      <div class="spinner-border text-primary" role="status" style="color: #13111e !important"></div>
    </center>
    <div v-else class="contenedorGeneral">
      <div class="contenedorIzquierdo p-4" style="width: 33%; background-color: #ffffff">
        <form v-on:submit.prevent="updateCarrera()" v-if="usuario.cargo != roles.adscripto">
          <div class="mb-3">
            <p style="font-size: 18px">Nombre <em>*</em></p>
            <input required type="text" v-model="carrera.nombre" class="form-control inputFachero"
              style="height: 50px; font-size: 16px" />
          </div>
          <div class="mb-3">
            <p style="font-size: 18px">Plan <em>*</em></p>
            <input required type="text" v-model="carrera.plan" class="form-control inputFachero"
              style="height: 50px; font-size: 16px" />
          </div>
          <div class="mb-3">
            <p style="font-size: 18px">Categoria <em>*</em></p>
            <input required type="text" v-model="carrera.categoria" class="form-control inputFachero"
              style="height: 50px; font-size: 16px" />
          </div>

          <input type="submit" value="Actualizar carrera" class="btn btn-primary" />
        </form>
        <div v-else>
          <div class="mb-3">
            <p style="font-size: 18px">Nombre <em>*</em></p>
            <input disabled type="text" v-model="carrera.nombre" class="form-control inputFachero"
              style="height: 50px; font-size: 16px" />
          </div>
          <div class="mb-3">
            <p style="font-size: 18px">Plan <em>*</em></p>
            <input disabled type="text" v-model="carrera.plan" class="form-control inputFachero"
              style="height: 50px; font-size: 16px" />
          </div>
          <div class="mb-3">
            <p style="font-size: 18px">Categoria <em>*</em></p>
            <input type="text" v-model="carrera.categoria" disabled class="form-control inputFachero"
              style="height: 50px; font-size: 16px" />
          </div>
        </div>
      </div>

      <div class="contenedorIzquierdo p-4" style="width: 32%; background-color: #ffffff">
        <form v-on:submit.prevent="agregarGrado()" v-if="usuario.cargo != roles.adscripto">
          <div class="mb-3" style="display: flex">
            <div style="width: 100%">
              <select class="form-control" v-model="gradoSelect">
                <option :value="'1er ' + tipoSelect">
                  1er {{ tipoSelect }}
                </option>
                <option :value="'2do ' + tipoSelect">
                  2do {{ tipoSelect }}
                </option>
                <option :value="'3er ' + tipoSelect">
                  3er {{ tipoSelect }}
                </option>
                <option :value="'4to ' + tipoSelect">
                  4to {{ tipoSelect }}
                </option>
                <option :value="'5to ' + tipoSelect">
                  5to {{ tipoSelect }}
                </option>
                <option :value="'6to ' + tipoSelect">
                  6to {{ tipoSelect }}
                </option>
              </select>
            </div>
            <div>
              <input type="submit" value="Agregar Grado" class="btn btn-primary" />
            </div>
          </div>
        </form>
        <div v-else>
          <h5>Haz click en un grado para listar mas informacion</h5>
        </div>

        <ul class="list-group mt-4">
          <li class="list-group-item" v-for="grado in carrera.grado" v-bind:key="grado.id">
            <span class="d-flex justify-content-between">
              <span @click="cargarGrado(grado)"><a href="javascript:void(0)"> {{ grado.grado }}</a></span>

              <button class="btn btn-danger" v-on:click="eliminarGrado(grado)" v-if="usuario.cargo != roles.adscripto">
                <i class="fas fa-trash-alt"></i>
              </button>
            </span>
          </li>
        </ul>
      </div>
      <div v-if="loadGrado" class="contenedorDerechoPersona p-4" style="width: 32%; background-color: #ffffff">
        <center style="margin-top: 3rem; font-size: 230px">
          <div class="spinner-border text-primary" role="status" style="color: #13111e !important"></div>
        </center>
      </div>
      <div class="contenedorDerechoPersona p-4" style="width: 32%; background-color: #ffffff"
        v-else-if="gradoPicked == ''">
        <h5>Seleccione un grado para habilitar esta funcion</h5>
        <br />
        <div id="accordion">
          <div class="card">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo2"
                  aria-expanded="false" aria-controls="collapseTwo2">
                  Adminsitrar Materias
                </button>
              </h5>
            </div>
            <div id="collapseTwo2" class="collapse" aria-labelledby="headingTwo2" data-parent="#accordion"></div>
          </div>
          <div class="card">
            <div class="card-header" id="headingThree">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree"
                  aria-expanded="false" aria-controls="collapseThree">
                  Administrar Grupo
                </button>
              </h5>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion"></div>
          </div>
        </div>
      </div>
      <div v-else class="contenedorDerechoPersona p-4 scrollbar" style="width: 32%; background-color: #ffffff">
        <h5>Modificar grado : {{ gradoPicked.grado }}</h5>

        <div id="accordion">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true"
                  aria-controls="collapseOne">
                  <a href="javascript:void(0)" @click="hiddeCollapse('collapseTwo')">
                    Administrar Materias</a>
                </button>
              </h5>
            </div>
            <!-- Modal agregar materia -->

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Crear una nueva materia
                    </h5>
                    <button id="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div class="modal-body">
                    <form name="form" id="form" v-on:submit.prevent="agregarMateria()">
                      <p>
                        Nombre de Materia<em> *</em> :
                        <br />
                        <input type="text" v-model="nuevaMateria.nombre" class="form-control" required />
                      </p>
                      <input type="submit" value="Agregar Materia" title="Enviar" class="btn btn-primary" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <!--Fin Modal -->
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">
                <p style="font-size: 18px">
                  <span> Materias</span>
                  <i class="fa fa-plus-square ml-2" style="color: #006799; cursor: pointer" data-toggle="modal"
                    data-target="#exampleModal" v-if="usuario.cargo != roles.adscripto"></i>
                </p>
                <select v-model="materiaSelect" class="form-control inputFachero" style="height: 50px; font-size: 16px"
                  v-if="usuario.cargo != roles.adscripto">
                  <option v-for="materia in materias" v-bind:key="materia.id" :value="materia">
                    {{ materia.nombre }}
                  </option>
                </select>

                <br v-if="usuario.cargo != roles.adscripto" />
                <p style="font-size: 18px" v-if="usuario.cargo != roles.adscripto">
                  <span> Cantidad de horas semanales</span>
                </p>
                <input v-if="usuario.cargo != roles.adscripto" class="form-control inputFachero"
                  v-model="materiaSelect.cantidad_horas" v-on:keyup="validateNumber" />
                <div class="d-flex justify-content-end mt-2" v-if="usuario.cargo != roles.adscripto">
                  <button class="btn btn-primary" @click="agregarMateriaGrado()">
                    Agregar Materia
                  </button>
                </div>

                <ul class="list-group mt-4 mb-4">
                  <li class="list-group-item" v-for="m in gradoPicked.materias" v-bind:key="m.id">
                    <span class="d-flex justify-content-between">
                      {{ returnSubjectNameById(m) }}
                      <button class="btn btn-danger" v-on:click="eliminarMateriaGrado(m)"
                        v-if="usuario.cargo != roles.adscripto">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false"
                  aria-controls="collapseTwo">
                  <a href="javascript:void(0)" @click="hiddeCollapse('collapseOne')">
                    Administrar Grupos</a>
                </button>
              </h5>
            </div>

            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
              <div class="card-body">
                <p style="font-size: 18px">
                  <span> Grupo</span>
                </p>
                <input type="text" id="nombreGrupo" maxlength="5" minlength="2" class="form-control inputFachero"
                  v-model="grupoSelect.idGrupo" v-if="usuario.cargo != roles.adscripto" />

                <ul class="list-group mt-4">
                  <li class="list-group-item" v-for="g in gradoPicked.grupos" v-bind:key="g.id">
                    <span class="d-flex justify-content-between">
                      {{ g.idGrupo }}
                      <span>
                        <button class="btn btn-warning" style="background-color: #f0ad4e; margin-right: 5px"
                          v-on:click="modificarGrupo(g)">
                          <i class="fas fa-pencil-alt" style="color: white"></i>
                        </button>
                        <button class="btn btn-danger" v-on:click="eliminarGrupo(g)"
                          v-if="usuario.cargo != roles.adscripto">
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </span>
                    </span>
                  </li>
                </ul>
                <div class="d-flex justify-content-end mt-4">
                  <input type="submit" value="Agregar Grupo" class="btn btn-primary" @click="agregarGrupo()"
                    v-if="usuario.cargo != roles.adscripto" />
                </div>
              </div>
            </div>
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
import $ from "jquery";
export default {
  name: "modificarCarreraComponent.vue",
  data() {
    return {
      roles: roles,
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      loading: false,
      carrera: "",
      nuevaMateria: {
        nombre: "",
      },
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
      loadGrado: false,
    };
  },
  mounted() {
    this.getCarrera();
    this.getAllMaterias();
  },
  methods: {
    agregarMateria() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .post(Global.url + "materia", this.nuevaMateria, config)
        .then((response) => {
          if (response.status == 201) {
            this.materias.push(response.data);
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Nueva materia agregada",
            });
            this.nuevaMateria.nombre = "";
            this.cerrarModal("closeModal");
          }
        })
        .catch(() => {
          this.cerrarModal("closeModal");
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Materia ya existente",
          });
        });
    },
    cerrarModal(id) {
      $("#" + id).click();
    },
    hiddeCollapse(id) {
      this.materiaSelect = {
        materia_id: "",
        cantidad_horas: "",
        carrera_id: this.$route.params.carrera,
      };
      document.getElementById(id).classList.remove("show");
    },
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
      this.$swal
        .fire({
          icon: "info",
          title: "¿Estas seguro de eliminar la materia?",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Eliminar",
        })
        .then((result) => {
          if (result.isConfirmed == true) {
            let config = {
              headers: {
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
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Materia eliminada correctamente",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  this.gradoPicked = res.data;
                }
              })
              .catch(() => {
                this.flashMessage.show({
                  status: "warning",
                  title: Global.nombreSitio,
                  message: "Error inesperado al cargar",
                });
              });
          }
        });
    },
    eliminarGrado(grado) {
      this.$swal
        .fire({
          icon: "info",
          title: "¿Estas seguro de eliminar el grado?",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Eliminar",
        })
        .then((result) => {
          if (result.isConfirmed == true) {
            let config = {
              headers: {
                token: Global.token,
              },
            };
            axios
              .delete(
                Global.url +
                "carrera/" +
                this.carrera.id +
                "/grado/" +
                grado.id,
                config
              )
              .then(() => {
                this.$swal.fire({
                  icon: "success",
                  title: "Grado eliminado correctamente",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.getCarrera();
              })
              .catch(() => {
                this.flashMessage.show({
                  status: "warning",
                  title: Global.nombreSitio,
                  message:
                    "Error inesperado al eliminar el grado, intente nuevamente",
                });
              });
          }
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
      this.$swal
        .fire({
          icon: "info",
          title: "¿Estas seguro de eliminar el grupo?",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Eliminar",
        })
        .then((result) => {
          if (result.isConfirmed == true) {
            let config = {
              headers: {
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
          }
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
      this.loadGrado = true;
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
          this.loadGrado = false;
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
        if (
          materia.id == this.materiaSelect.id ||
          this.materiaSelect.cantidad_horas.length > 2 ||
          this.materiaSelect.cantidad_horas > 168
        ) {
          this.flashMessage.show({
            status: "warning",
            title: Global.nombreSitio,
            message: "Compruebe la informacion y vuelva a intentar",
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
        .post(
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
          this.materiaSelect = {
            materia_id: "",
            cantidad_horas: "",
            carrera_id: this.$route.params.carrera,
          };
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
          return m.nombre + " " + idSub.pivot.cantidad_horas +' horas semanales';
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
    validateNumber() {
      let input = this.materiaSelect.cantidad_horas;
      this.materiaSelect.cantidad_horas = input.replace(/[^0-9]/g, "");
    },
  },
};
</script>

<style scoped>
.scrollbar {
  overflow-y: scroll;
}
</style>
