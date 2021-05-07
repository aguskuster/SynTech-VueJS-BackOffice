<template>
  <div>
    <h1>Agregar Usuario</h1>

    <div class="container p-3 my-3 border">
      <form name="form" id="form" v-on:submit.prevent="procesar()">
        
        <p>
          Cedula<em>*</em>:
          <input
            type="text"
            name="Cedula"
            placeholder="Cedula"
            class="form-control"
            v-model="persona.samaccountname"
            autocomplete="=off"
          />
        </p>

     
        <p>
          Contraseña<em>*</em>:
          <input
            type="text"
            name="password"
            placeholder="Contreseña"
            class="form-control"
            v-model="persona.unicodePwd"
          />
        </p>

       
        <p>
          Nombre<em>*</em>:
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            class="form-control"
            v-model="persona.cn"
          />
        </p>

     
        <p>
          Correo<em>*</em>:
          <input
            type="text"
            name="Correo"
            placeholder="Correo"
            class="form-control"
            v-model="persona.userPrincipalName"
          />
        </p>

       
        <p>
          Unidad Organizativa<em>*</em>:
          <input
            type="text"
            name="ou"
            placeholder="Unidad Organizativa"
            class="form-control"
            v-model="persona.ou"
          />
        </p>

        <hr />
        <input
          type="submit"
          value="Agregar Usuario"
          title="Enviar"
          class="btn btn-primary"
        />
      </form>
      <FlashMessage></FlashMessage>
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
        cn: "",
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
        },
      };
      /* let parametros =
        "samaccountname=" +
        this.persona.samaccountname +
        "&unicodePwd=" +
        this.persona.unicodePwd +
        "&cn=" +
        this.persona.cn +
        "&userPrincipalName=" +
        this.persona.userPrincipalName +
        "&ou="+ 
        this.persona.ou; */
      axios
        .post(Global.url + "usuario", this.persona, config)
        .then((response) => {
          if (response.status == 200) {
            this.flashMessage.show({
              status: "success",
              title: "BackOffice",
              message: "Usuario Agregado",
            });
            document.form.reset();
            this.$router.push("/listarUsuarios");
          }
        })
        .catch((error) => {
          console.log(error);
        });
        
    },
  },
  

    
  
    
};
</script>