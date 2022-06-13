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
          <option value="Administrador">Administrador</option>
          <option value="Profesor">Profesor</option>
          <option value="Alumno">Alumno</option>
        </select>
      </p>

      <div v-if="persona.ou == 'Alumno'">
        <p>
          Grupo<em> *</em> :
          <select class="form-control" v-model="persona.grupo" required>
            <option value="TB1">TB1</option>
            <option value="TB2">TB2</option>
            <option value="TB3">TB3</option>
          </select>
        </p>
      </div>
      <div v-if="persona.ou == 'Administrador'">
        <p>
          Cargo<em> *</em> :
          <select class="form-control" v-model="persona.cargo" required>
            <option value="Adscripto">Adscripto</option>
            <option value="Administrativo">Administrativo</option>
            <option value="Director">Director</option>
            <option value="Subdirector">Subdirector</option>
          </select>
        </p>
      </div>
      <div v-if="persona.ou == 'Profesor'">
        <p>
          Materias<em> *</em> :
          <select class="form-control" v-model="persona.materias" required>
            <option value="1">Matematica</option>
            <option value="2">Fisica</option>
            <option value="3">Biologia</option>
            <option value="4">Quimica</option>
          </select>
        </p>
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
      submited: false,
      persona: {
        samaccountname: "",
        unicodePwd: "",
        name: "",
        surname: "",
        userPrincipalName: "",
        ou: "",
        grupo: "",
        materias: "",
        cargo: "",
      },
    };
  },
  methods: {
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