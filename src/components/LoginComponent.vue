<template>
  <div>
    <h1>Ingresa tus datos para acceder</h1>
    <form name="form" id="form" v-on:submit.prevent="procesar();">
      <p>
        Username: <input type="text" name="username" placeholder="username" class="form-control" v-model="contacto.username" />
      </p>
      <p>
        Contraseña: <input type="password" name="password" placeholder="Contraseña" class="form-control" v-model="contacto.password" />
      </p>
      
      <hr />
      <input type="submit" value="Enviar" title="Enviar" class="btn btn-primary" />
    </form>
    <FlashMessage></FlashMessage>
  </div>
</template>

<script>
   
    import { Global } from "../Global";
    import axios from "axios";
    export default {
        name: 'LoginComponent',
        data() {
            return {
               
                contacto: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            procesar() {
              
              let config = {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }; 
                axios
                .post(Global.url + 'login', this.contacto,config)
                .then( (response) => {
                  console.log('Golaso panini')
                  if(response.status==200)
                  {
                    //console.log(response.data.nombre);
                    this.flashMessage.show({status: 'success', title: 'Mi aplicación', message: 'Te has logueado exitosamente!!!.'});
                    localStorage.setItem('auth_token', response.data.token);
                    localStorage.setItem('auth_nombre', response.data.username);
                    this.$router.push('/home');
                  }
                }

                )
                .catch( (error) => {
                  this.flashMessage.show({status: 'error', title: 'Mi aplicación', message: 'Los datos ingresados no son válidos.'+error})
                  document.form.reset(); 
                });

            },
            
        },
        

    }
</script>