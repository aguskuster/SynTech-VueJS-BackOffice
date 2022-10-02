<template>
  <div>
    <form @submit="agregarUsuario">
      <div class="form-group">
        <label for="type">Tipo de Usuario :</label>
    
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
        <select v-model="persona.cargo" class="form-control" name="cargo" required>
          <option value="Adscripto">Adscripto</option>
          <option value="Administrativo">Administrativo</option>
          <option value="Subdirector">Subdirector</option>
          <option value="Director">Director</option>
        </select>
      </div>
      <div class="form-group" v-if="persona.ou == 'Profesor'">
        <label for="cargo">Agregar Materia:</label>
        <select class="form-control" v-model="materiaSelect">
          <option :value="m.id" v-for="m in materias" :key="m.id">
            {{ m.nombre }}
          </option>
        </select>
      </div>
      <div class="form-group" v-if="persona.ou == 'Alumno'">
        <label for="cargo">Agregar Grupo:</label>
        <select class="form-control" v-model="grupoSelect">
          <option :value="g.idGrupo" v-for="g in grupos" :key="g.id">
            [ {{ g.idGrupo }} ] {{ g.nombreCompleto }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
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
    
      axios
        .post(Global.url + "usuario", this.persona, config)
        .then((response) => {
           
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: Global.nombreSitio,
              message: "Usuario Agregado",
            });
         
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
