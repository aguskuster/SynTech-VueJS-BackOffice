import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import FlashMessage from "@smartweb/vue-flash-message";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import HomeComponent from './components/HomeComponent.vue';


import ErrorComponent from './components/ErrorComponent.vue';

import historialDeAccionesComponent from './components/historialDeAccionesComponent.vue';
import modificarPerfilComponent from './components/modificarPerfilComponent.vue';
import agregarNoticiasComponent from './components/agregarNoticiasComponent.vue';




import listarCarreraComponent from './components/Carrera/listarCarreraComponent.vue';
import agregarCarreraComponent from './components/Carrera/agregarCarreraComponent.vue';
import modificarCarreraComponent from './components/Carrera/modificarCarreraComponent.vue';

import listarUsuariosComponent from './components/Usuario/listarUsuariosComponent.vue';
import agregarUsuariosComponent from './components/Usuario/agregarUsuariosComponent.vue';
import modificarUsuarioComponent from './components/Usuario/modificarUsuarioComponent.vue';

import listarBedeliasComponent from './components/Bedelias/listarBedeliasComponent.vue';
import agregarBedeliasComponent from './components/Bedelias/agregarBedeliasComponent.vue';
import modificarBedeliasComponent from './components/Bedelias/modificarBedeliasComponent.vue';

import listarAlumnoComponent from './components/Alumno/listarAlumnoComponent.vue';
import agregarAlumnoComponent from './components/Alumno/agregarAlumnoComponent.vue';
import modificarAlumnoComponent from './components/Alumno/modificarAlumnoComponent.vue';

import listarProfesorComponent from './components/Profesor/listarProfesorComponent.vue';
import agregarProfesorComponent from './components/Profesor/agregarProfesorComponent.vue';
import modificarProfesorComponent from './components/Profesor/modificarProfesorComponent.vue';

import modificarGrupoComponent from './components/Grupo/modificarGrupoComponent.vue';

import listarMateriaComponent from './components/Materia/listarMateriaComponent.vue';

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(FlashMessage);
Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.component('vue-multiselect', window.VueMultiselect.default)
//acá declaramos todas nuestras rutas de navegación
const routes = [
    { path: '/home', redirect: '/' },
    { path: '/index', redirect: '/' },
    { path: '/', name: 'inicio', component: HomeComponent },
    // { path: '/home', name: 'home', component: HomeComponent },

    { path: '/historial', name: 'historial-acciones', component: historialDeAccionesComponent },
    { path: '/noticias', name: 'noticias', component: agregarNoticiasComponent },
    { path: '/perfil/:idUsuario', name: 'modificar-perfil', component: modificarPerfilComponent },


    { path: '/usuarios', name: 'listar-usuario', component: listarUsuariosComponent },
    { path: '/usuarios/crear', name: 'agregar-usuario', component: agregarUsuariosComponent },
    { path: '/usuarios/:user', name: 'modificar-usuario', component: modificarUsuarioComponent },

    { path: '/bedelias', name: 'listar-bedelia', component: listarBedeliasComponent },
    { path: '/bedelia/crear', name: 'agregar-bedelia', component: agregarBedeliasComponent },
    { path: '/bedelia/:user', name: 'modificar-bedelia', component: modificarBedeliasComponent },

    { path: '/alumnos', name: 'listar-alumno', component: listarAlumnoComponent },
    { path: '/alumno/crear', name: 'agregar-alumno', component: agregarAlumnoComponent },
    { path: '/alumno/:user', name: 'modificar-alumno', component: modificarAlumnoComponent },

    { path: '/profesores', name: 'listar-profesor', component: listarProfesorComponent },
    { path: '/profesor/crear', name: 'agregar-profesor', component: agregarProfesorComponent },
    { path: '/profesor/:user', name: 'modificar-profesor', component: modificarProfesorComponent },

    { path: '/carrera', name: 'listar-carrera', component: listarCarreraComponent },
    { path: '/carrera/crear', name: 'crear-carrera', component: agregarCarreraComponent },
    { path: '/carrera/:carrera', name: 'modificar-carrera', component: modificarCarreraComponent },

    { path: '/materia', name: 'listar-materia', component: listarMateriaComponent },
   
   


    { path: '/grupo/:idGrupo', name: 'modificar-grupo', component: modificarGrupoComponent },
   
    { path: '*', name: 'error404', component: ErrorComponent },
];


const router = new VueRouter({ routes, mode: 'history' });

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')





