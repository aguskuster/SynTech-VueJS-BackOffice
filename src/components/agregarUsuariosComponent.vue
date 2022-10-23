<template>
  <div>
    <form>
      <div class="form-group">
        <label for="type">Tipo de Usuario<em> *</em> :</label>

        <select
          v-model="persona.ou"
          class="form-select"
          aria-label="Default select example"
          @change="getTypeUserData"
        >
          <option
            selected
            value="Bedelias"
            v-if="usuario.cargo != 'Administrativo'"
          >
            Bedelias
          </option>
          <option value="Profesor">Profesor</option>
          <option value="Alumno">Alumno</option>
        </select>
      </div>
      <div class="form-group">
        <label for="nombre">Nombre <em>*</em> :</label>
        <input
          v-model="persona.name"
          type="text"
          class="form-control"
          id="nombre"
          placeholder="Ingrese Nombre"
          required
        />
      </div>
      <div class="form-group">
        <label for="apellido">Apellido <em>*</em> :</label>
        <input
          v-model="persona.surname"
          type="text"
          class="form-control"
          id="apellido"
          placeholder=" Ingrese Apellido"
          required
        />
      </div>
      <div class="form-group">
        <label for="cedula">Cedula <em>*</em> :</label>
        <input
          type="text"
          name="Cedula"
          placeholder="Escriba Cedula"
          class="form-control"
          v-model="persona.samaccountname"
          autocomplete="=off"
          required
          minlength="8"
          maxlength="8"
        />
      </div>
      <div class="form-group">
        <label for="email">E-mail <em>*</em> :</label>
        <input
          v-model="persona.userPrincipalName"
          type="email"
          class="form-control"
          id="email"
          placeholder="Ingrese Email"
          required
        />
      </div>
      <div class="form-group" v-if="persona.ou == 'Bedelias'">
        <label for="cargo">Cargo<em> *</em> :</label>
        <select
          v-model="persona.cargo"
          class="form-control"
          name="cargo"
          required
        >
          <option value="Adscripto">Adscripto</option>
          <option value="Administrativo">Administrativo</option>
          <option value="Subdirector">Subdirector</option>
          <option value="Director">Director</option>
        </select>
      </div>
      <div class="form-group" v-if="persona.ou == 'Profesor'">
        <label for="cargo">Agregar Materia:</label>
        <select
          class="form-control"
          v-model="materiaSelect"
          v-on:change="agregarArray(materiaSelect, persona.idMaterias)"
        >
          <option :value="m.id" v-for="m in materias" :key="m.id">
            {{ m.nombre }}
          </option>
        </select>
        <div class="contenedorMateriaForm">
          <span
            class="btnAgregarComp"
            v-for="selectedSubject in persona.idMaterias"
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
                @click="eliminarArray(selectedSubject, persona.idMaterias)"
                class="fas fa-times"
              ></i>
            </div>
          </span>
        </div>
      </div>
      <div class="form-group" v-if="persona.ou == 'Alumno'">
        <label for="cargo">Agregar Grupo:</label>
        <select
          class="form-control"
          v-model="grupoSelect"
          v-on:change="agregarArray(grupoSelect, persona.idGrupos)"
        >
          <option :value="g.idGrupo" v-for="g in grupos" :key="g.id">
            [ {{ g.idGrupo }} ] {{ g.nombreCompleto }}
          </option>
        </select>
        <div class="contenedorMateriaForm">
          <span
            class="btnAgregarComp"
            v-for="selectedGroup in persona.idGrupos"
            :key="selectedGroup.id"
          >
            <span>{{ selectedGroup }}</span>
            <i
              @click="eliminarArray(selectedGroup, persona.idGrupos)"
              class="fas fa-times"
            ></i>
          </span>
        </div>
      </div>

      <input
        type="button"
        class="btn btn-primary"
        @click="agregarUsuario"
        data-bs-dismiss="modal"
        data-dismiss="modal"
        value="Crear"
      />
    </form>
  </div>
</template>
<script>
import { Global } from "../Global";
import axios from "axios";
export default {
  name: "AgregarUsuario",
  components: {},
  data() {
    return {
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      persona: {
        name: "",
        surname: "",
        userPrincipalName: "",
        samaccountname: "",
        ou: "",
        idGrupos: [],
        idMaterias: [],
        cargo: "",
      },
      materiaSelect: "",
      grupoSelect: "",
      materias: "",
      grupos: "",
    };
  },
  methods: {
    getTypeUserData() {
      if (this.persona.ou == "Profesor") {
        this.getMaterias();
      }
      if (this.persona.ou == "Alumno") {
        this.getGrupos();
      }
    },
    getGrupos() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios.get(Global.url + "grupos", config).then((res) => {
        if (res.status == 200) {
          this.grupos = res.data;
        }
      });
    },
    returnSubjectNameById(idSub) {
      for (let m of this.materias) {
        if (m.id == idSub) {
          return m.nombre;
        }
      }
    },
    agregarArray(id, array) {
      if (!array.includes(id)) {
        array.push(id);
      }
    },
    eliminarArray(id, array) {
      const element = (element) => element == id;
      let index = array.findIndex(element);
      array.splice(index, 1);
    },
    getMaterias() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios.get(Global.url + "materias", config).then((res) => {
        if (res.status == 200) {
          this.materias = res.data;
        }
      });
    },
    agregarUsuario() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      this.$swal.fire({
        title: "Creando Usuario",
        html: "<small class='text-muted'>Aguarde a que el usario sea creado </small>",
        allowOutsideClick: false,
        timerProgressBar: true,
        allowEscapeKey: false,
        didOpen: () => {
          this.$swal.showLoading();
          axios
            .post(Global.url + "usuario", this.persona, config)
            .then((response) => {
              if (response.status == 200) {
                location.reload();
              }
            })
            .catch(() => {
              this.$swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salio mal...",
              });
            });
        },
        willClose: () => {
          clearInterval(5);
        },
      });
    },
  },
};
</script>
