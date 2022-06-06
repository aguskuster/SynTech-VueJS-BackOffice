<template>
  <div>
    <div class="container p-3 my-3 border">
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
          <select
            class="form-control"
            v-model="persona.ou"
            aria-label="Default select example"
            required
          >
            <option value="Bedelias">Bedelias</option>
            <option value="Profesor">Profesor</option>
            <option value="Alumno">Alumno</option>
          </select>
        </p>
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
            this.$router.push("/listarUsuarios");
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