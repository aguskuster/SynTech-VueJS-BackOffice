<template>
  <div>
    <h1>Agregar Grupo</h1>
    <div class="container p-3 my-3 border">
      <form name="form" id="form" v-on:submit.prevent="procesar()">
        <p>
          Acronimo de Grupo<em>*</em> :
          <input
            type="text"
            name="acronimoGrupo"
            placeholder="Ejemplo: TB1"
            class="form-control"
            v-model="grupo.idGrupo"
            autocomplete="=off"
            required
          />
        </p>
        <p>
          Nombre completo de grupo<em>*</em> :
          <input
            type="text"
            name="nombreCompletoGrupo"
            placeholder="Ejemplo: Tecnicatura Nocturno"
            class="form-control"
            v-model="grupo.nombreCompleto"
            required
          />
        </p>   
        
        <input
          type="submit"
          value="Agregar Grupo"
          title="Enviar"
          class="btn btn-primary"
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
      grupo: {
        idGrupo: "",
        nombreCompleto: "",
      },
    };
  },
  methods: {
    procesar() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios
        .post(Global.url + "grupo", this.grupo, config)
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: "BackOffice",
              message: "Grupo Agregado",
            });
            document.form.reset();
            this.$router.push("/listarGrupo");
          }
        })
        .catch(() => {
          this.flashMessage.show({
            status: "error",
            title: "BackOffice",
            message: "Grupo ya existe",
          });
        });
    },
  },
};
</script>