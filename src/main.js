import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import FlashMessage from "@smartweb/vue-flash-message";


import HomeComponent from './components/HomeComponent.vue';
import listarUsuariosComponent from './components/listarUsuariosComponent.vue';
import agregarUsuarioComponent from './components/agregarUsuarioComponent.vue';
import eliminarUsuarioComponent from './components/eliminarUsuarioComponent.vue';
import modificarUsuarioComponent from './components/modificarUsuarioComponent.vue';
import listarGrupoComponent from './components/listarGrupoComponent.vue';
import eliminarGrupoComponent from './components/eliminarGrupoComponent.vue';
import modificarGrupoComponent from './components/modificarGrupoComponent.vue';
import ErrorComponent from './components/ErrorComponent.vue';
import listarMateriaComponent from './components/listarMateriaComponent.vue';
import agregarProfesorMateria from './components/agregarProfesorMateria.vue';
import agregarUsuarioGrupoComponent from './components/agregarUsuarioGrupoComponent.vue';
Vue.config.productionTip = false

Vue.use(FlashMessage);
Vue.use(VueRouter);
Vue.use(Vuelidate);

//acá declaramos todas nuestras rutas de navegación
const routes = [
    { path: '/', redirect: 'home' },
    { path: '/home', name: 'home', component: HomeComponent },
    { path: '/listarUsuarios', name: 'listarUsuarios', component: listarUsuariosComponent },
    { path: '/usuario', name: 'usuarioAgregar', component: agregarUsuarioComponent },
    { path: '/eliminarUsuario/:user', name: 'listar-usuario-eliminar', component: eliminarUsuarioComponent },
    { path: '/modificarUsuario/:user', name: 'listar-usuario-modificar', component: modificarUsuarioComponent },
    { path: '/listarGrupo', name: 'listarGrupo', component: listarGrupoComponent },
    { path: '/eliminarGrupo/:grupo', name: 'listar-grupo-eliminar', component: eliminarGrupoComponent },
    { path: '/modificarGrupo/:idGrupo', name: 'listar-grupo-modificar', component: modificarGrupoComponent },
    { path: '/listarMaterias', name: 'listarMateria', component: listarMateriaComponent },
    { path: '/profesor-materia/:idMateria/:Materia', name: 'profesorMateria', component: agregarProfesorMateria },
    { path: '/miembro-grupo/:grupo', name: 'miembroGrupo', component: agregarUsuarioGrupoComponent },
    { path: '*', name: 'error404', component: ErrorComponent },




];


const router = new VueRouter({ routes, mode: 'history' });

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')