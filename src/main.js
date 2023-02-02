import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import FlashMessage from "@smartweb/vue-flash-message";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import HomeComponent from './components/HomeComponent.vue';
import listarUsuariosComponent from './components/listarUsuariosComponent.vue';
/* import agregarUsuarioComponent from './components/agregarUsuarioComponent.vue'; */
import modificarUsuarioComponent from './components/modificarUsuarioComponent.vue';
import listarGrupoComponent from './components/listarGrupoComponent.vue';
import modificarGrupoComponent from './components/modificarGrupoComponent.vue';
import modificarMateriaComponent from './components/modificarMateriaComponent.vue';
import ErrorComponent from './components/ErrorComponent.vue';
import listarMateriaComponent from './components/listarMateriaComponent.vue';
import agregarUsuarioGrupoComponent from './components/agregarUsuarioGrupoComponent.vue';
import historialDeAccionesComponent from './components/historialDeAccionesComponent.vue';
import modificarPerfilComponent from './components/modificarPerfilComponent.vue';
import agregarNoticiasComponent from './components/agregarNoticiasComponent.vue';

import agregarUsuariosComponent from './components/agregarUsuariosComponent.vue';

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(FlashMessage);
Vue.use(VueRouter);
Vue.use(Vuelidate);

//acá declaramos todas nuestras rutas de navegación
const routes = [
    { path: '/', redirect: 'home' },
    { path: '/home', name: 'home', component: HomeComponent },
    { path: '/usuarios', name: 'listarUsuarios', component: listarUsuariosComponent },
    { path: '/usuarios/crear', name: 'usuarioAgregar', component: agregarUsuariosComponent },
    { path: '/modificarUsuario/:user', name: 'listar-usuario-modificar', component: modificarUsuarioComponent },
    { path: '/listarGrupo', name: 'listarGrupo', component: listarGrupoComponent },
    { path: '/modificarGrupo/:idGrupo', name: 'listar-grupo-modificar', component: modificarGrupoComponent },
    { path: '/listarMaterias', name: 'listarMateria', component: listarMateriaComponent },
    { path: '/modificarMateria/:idMateria/:Materia', name: 'modificarMateria', component: modificarMateriaComponent },
    { path: '/miembro-grupo/:grupo', name: 'miembroGrupo', component: agregarUsuarioGrupoComponent },
    { path: '/historial', name: 'historial-acciones', component: historialDeAccionesComponent },
    { path: '/noticias', name: 'noticias', component: agregarNoticiasComponent },
    { path: '/perfil/:idUsuario', name: 'modificar-perfil', component: modificarPerfilComponent },
    { path: '*', name: 'error404', component: ErrorComponent },

];


const router = new VueRouter({ routes, mode: 'history' });

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')