<template>
  <div>
    <form name="form" id="form" v-on:submit.prevent="procesar()">
      <p>
        Cedula<em> *</em> :
        <input
          type="text"
          name="Cedula"
          placeholder="Escriba Cedula..."
          class="form-control"
          v-model="persona.samaccountname"
          autocomplete="=off"
          required
          minlength="8"
          maxlength="8"
        />
      </p>

      <p>
        Nombre<em> *</em> :
        <input
          type="text"
          name="nombre"
          placeholder="Escriba Nombre..."
          class="form-control"
          v-model="persona.name"
          required
        />
      </p>
      <p>
        Apellido<em> *</em> :
        <input
          type="text"
          name="nombre"
          placeholder="Escriba Nombre..."
          class="form-control"
          v-model="persona.surname"
          required
        />
      </p>
      <p>
        Correo :
        <input
          type="email"
          name="Correo"
          placeholder="Escriba Correo..."
          class="form-control"
          v-model="persona.userPrincipalName"
        />
      </p>

      <p>
        Rol<em> *</em> :
        <select class="form-control" v-model="persona.ou" required>
          <option value="Bedelias">Bedelias</option>
          <option value="Profesor">Profesor</option>
          <option value="Alumno">Alumno</option>
        </select>
      </p>

      <div v-if="persona.ou == 'Alumno'">
        {{ getGrupos() }}
        <p>
          Grupo<em> *</em> :
          <select
            class="form-control"
            v-on:change="agregarArray(grupoSelect, persona.idGrupos)"
            v-model="grupoSelect"
            required
          >
            <option :value="g.idGrupo" v-for="g in grupos" :key="g.id">
              {{ g.nombreCompleto }} | {{ g.idGrupo }} |
            </option>
          </select>
        </p>
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
      <div v-if="persona.ou == 'Bedelias'">
        <p>
          Cargo<em> *</em> :
          <select class="form-control" v-model="persona.cargo" required>
            <option value="Adscripto">Adscripto</option>
            <option value="Administrativo">Administrativo</option>
            <option value="Subdirector">Subdirector</option>
            <option value="Director">Director</option>
          </select>
        </p>
      </div>
      <div v-if="persona.ou == 'Profesor'">
        {{ getMaterias() }}
        <p>
          Materias<em> *</em> :
          <select
            class="form-control"
            v-model="materiaSelect"
            v-on:change="agregarArray(materiaSelect, persona.idMaterias)"
            required
          >
            <option :value="m.id" v-for="m in materias" :key="m.id">
              {{ m.nombre }}
            </option>
          </select>
        </p>
        <div class="contenedorMateriaForm">
          <span
            class="btnAgregarComp"
            v-for="selectedSubject in persona.idMaterias"
            :key="selectedSubject.id"
          >
            <span>{{ returnSubjectNameById(selectedSubject) }}</span>
            <i
              @click="eliminarArray(selectedSubject, persona.idMaterias)"
              class="fas fa-times"
            ></i>
          </span>
        </div>
      </div>

      <hr />
      <input
        type="submit"
        value="Agregar Usuario"
        title="Enviar"
        class="btn btn-primary"
        data-bs-dismiss="modal"
      />
    </form>
  </div>
</template>
<script>
import { Global } from "../Global";
import axios from "axios";
export default {
  name: "ContactoComponent",
  data() {
    return {
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token"))),
      submited: false,
      persona: {
        samaccountname: "",
        unicodePwd: "",
        name: "",
        surname: "",
        userPrincipalName: "",
        ou: "",
        idGrupos: [],
        idMaterias: [],
        cargo: "",
        mate: "",
      },
      materiaSelect: "",
      grupoSelect: "",
      materias: "",
      grupos: "",
    };
  },

  methods: {
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
    procesar() {
      this.submited = true;
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };

      axios
        .post(Global.url + "usuario", this.persona, config)
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Usuario Agregado",
            });
            document.form.reset();
            this.materiaSelect = "";
            this.grupoSelect = "";
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: Global.nombreSitio,
            message: "Usuario ya existe",
          });
        });
    },
  },
};
</script>
